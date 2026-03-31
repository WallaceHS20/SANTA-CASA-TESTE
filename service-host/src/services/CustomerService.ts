import {
  IPostCustomerBase,
  IGetCustomerParams,
  IPatchCustomerParams,
  PatchCustomerKeys,
  PostCustomerKeys,
} from "../interfaces/Customer/CustomerDTOs.js";
import { Customer, CustomerKeys } from "../models/Customer.js";
import { CustomerRepository } from "../repositories/CustomerRepository.js";
import { logger } from "../utils/Logger.js";
import { Masks } from "../utils/Masks.js";
import { Validations } from "../utils/Validate.js";

export class CustomerService {
  private repository: CustomerRepository;

  constructor() {
    this.repository = new CustomerRepository();
  }

  async createCustomer(data: IPostCustomerBase): Promise<Customer> {
    try {
      const rawTaxId = data[PostCustomerKeys.TAX_ID];
      const rawEmail = data[PostCustomerKeys.EMAIL];

      logger.info(`[CREATE] Iniciando criação para o cliente: ${data[PostCustomerKeys.NAME]}`);

      const cleanTaxId = Masks.removeSpecialChars(rawTaxId);
      const cleanEmail = rawEmail.trim().toLowerCase();

      // Validações de formato
      if (!Validations.validateEmail(cleanEmail)) {
        throw new Error(`E-mail '${cleanEmail}' inválido.`);
      }

      if (!Validations.isValidTaxId(cleanTaxId)) {
        throw new Error(`Documento (CPF/CNPJ) '${cleanTaxId}' inválido.`);
      }

      // Verificação de duplicidade
      const existingTaxId = await this.repository.findByTaxId(cleanTaxId);
      if (existingTaxId) {
        throw new Error(`Já existe um cliente com o documento ${cleanTaxId}.`);
      }

      const existingEmail = await this.repository.findByEmail(cleanEmail);
      if (existingEmail) {
        throw new Error(`O e-mail ${cleanEmail} já está em uso.`);
      }

      data[PostCustomerKeys.TAX_ID] = cleanTaxId;
      data[PostCustomerKeys.EMAIL] = cleanEmail;

      const newCustomer = await this.repository.createCustomer(data);

      logger.info(`[CREATE] Cliente criado com sucesso! ID: ${newCustomer[CustomerKeys.ID]}`);
      return newCustomer;
    } catch (error: any) {
      logger.error(`[CREATE] Falha ao criar cliente: ${error.message}`);
      throw error; // Repassa o erro para o Controller tratar (status 400 ou 500)
    }
  }

  async listAll(filters: IGetCustomerParams): Promise<Customer[]> {
    try {
      logger.info(`[LIST] Listagem solicitada. Filtros: ${JSON.stringify(filters)}`);
      return await this.repository.findAll(filters);
    } catch (error: any) {
      logger.error(`[LIST] Erro ao listar clientes: ${error.message}`);
      throw new Error("Erro ao processar listagem de clientes.");
    }
  }

  async getById(id: number): Promise<Customer> {
    try {
      logger.info(`[GET] Buscando cliente ID: ${id}`);
      const customer = await this.repository.findById(id);

      if (!customer) {
        throw new Error("Cliente não encontrado.");
      }

      return customer;
    } catch (error: any) {
      logger.error(`[GET] Erro ao buscar cliente ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, data: IPatchCustomerParams): Promise<Customer> {
    try {
      logger.info(`[UPDATE] Tentativa de atualização para o ID: ${id}`);

      const currentCustomer = await this.repository.findById(id);
      if (!currentCustomer) {
        throw new Error("Cliente não encontrado para atualização.");
      }

      if (data[PatchCustomerKeys.EMAIL]) {
        const cleanEmail = data[PatchCustomerKeys.EMAIL]!.trim().toLowerCase();

        if (!Validations.validateEmail(cleanEmail)) {
          throw new Error("Novo e-mail informado é inválido.");
        }

        const emailOwner = await this.repository.findByEmail(cleanEmail);
        if (emailOwner && emailOwner[CustomerKeys.ID] !== id) {
          throw new Error(`O e-mail ${cleanEmail} já pertence a outro cliente.`);
        }

        data[PatchCustomerKeys.EMAIL] = cleanEmail;
      }

      const updated = await this.repository.update(id, data);
      if (!updated) {
        throw new Error("Erro ao atualizar os dados no banco.");
      }

      logger.info(`[UPDATE] Cliente ID: ${id} atualizado com sucesso.`);
      return updated;
    } catch (error: any) {
      logger.error(`[UPDATE] Erro na atualização do ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      logger.info(`[REMOVE] Solicitando exclusão do ID: ${id}`);

      const deleted = await this.repository.delete(id);
      if (!deleted) {
        throw new Error("Não foi possível excluir: Cliente inexistente.");
      }

      logger.info(`[REMOVE] Cliente ID: ${id} removido do sistema.`);
    } catch (error: any) {
      logger.error(`[REMOVE] Erro ao excluir cliente ${id}: ${error.message}`);
      throw error;
    }
  }
}
