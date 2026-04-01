import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
//npx prisma db seed

const adapter = new PrismaLibSql({
  url: "file:./dev.db", 
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🛒 Iniciando o Seed do E-commerce Hospitalar...");

  await prisma.transactionItem.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();

  console.log("🧹 Banco limpo. Inserindo dados da loja...");

  const customer1 = await prisma.customer.create({
    data: {
      customer_name: "Clínica Vida Bela (Cliente B2B)",
      customer_email: "compras@vidabela.med.br",
      customer_tax_id: "12.345.678/0001-99",
      customer_city: "São Paulo",
      customer_state: "SP",
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      customer_name: "Dr. Roberto Silva (Médico Parceiro)",
      customer_email: "roberto.silva@medico.com",
      customer_tax_id: "111.222.333-44", // CPF
      customer_city: "Rio de Janeiro",
      customer_state: "RJ",
    },
  });

  const customer3 = await prisma.customer.create({
    data: {
      customer_name: "Fornecedor Global Pharma",
      customer_email: "vendas@globalpharma.com",
      customer_tax_id: "99.888.777/0001-66", 
      customer_city: "Campinas",
      customer_state: "SP",
    },
  });

  // 💊 3. CRIANDO PRODUTOS (Catálogo do E-commerce)
  const product1 = await prisma.product.create({
    data: {
      product_sap_code: "SKU-AMOX-875",
      product_name: "Amoxicilina 875mg c/ Clavulanato (Caixa)",
      product_lot: "LOTE-PHARMA-001",
      product_quantity: 500,
      product_min_quantity: 50,
      product_unit_val: 85.90,
      product_total_val: 42950.00,
      product_category: 1, // 1 = Medicamentos Restritos
    },
  });

  const product2 = await prisma.product.create({
    data: {
      product_sap_code: "SKU-MON-LCD",
      product_name: "Monitor Multiparamétrico Portátil Tela LCD",
      product_lot: "LOTE-EQUIP-22",
      product_quantity: 30,
      product_min_quantity: 5,
      product_unit_val: 3500.00,
      product_total_val: 105000.00,
      product_category: 3, // 3 = Equipamentos Médicos
    },
  });

  const product3 = await prisma.product.create({
    data: {
      product_sap_code: "SKU-LUV-LATEX",
      product_name: "Luva de Procedimento Látex (Caixa 100un)",
      product_lot: "LOTE-DESC-99",
      product_quantity: 2000,
      product_min_quantity: 200,
      product_unit_val: 29.90,
      product_total_val: 59800.00,
      product_category: 2, // 2 = Descartáveis
    },
  });
  
  // 📦 4. TRANSAÇÕES (Compras de Fornecedores e Vendas Online)

  // Transação 1: Reposição de Estoque (ENTRADA - Type 1)
  await prisma.transaction.create({
    data: {
      type: 1, 
      description: "Reposição de Estoque - Pedido Fornecedor #1092",
      total_amount: 59800.00,
      customer_id: customer3.customer_id, // Global Pharma
      items: {
        create: [
          { product_id: product3.product_id, quantity: 2000, unit_price: 29.90, subtotal: 59800.00 }
        ]
      }
    }
  });

  // Transação 2: Venda Avulsa para Médico (SAÍDA - Type 2)
  await prisma.transaction.create({
    data: {
      type: 2, 
      description: "Venda E-commerce - Pedido #WEB-001 (Aprovado)",
      total_amount: 3585.90, // 1 Monitor + 1 Amoxicilina
      customer_id: customer2.customer_id, // Dr. Roberto
      items: {
        create: [
          { product_id: product2.product_id, quantity: 1, unit_price: 3500.00, subtotal: 3500.00 },
          { product_id: product1.product_id, quantity: 1, unit_price: 85.90, subtotal: 85.90 }
        ]
      }
    }
  });

  console.log("Gerando histórico de vendas B2B recorrentes...");
  
  // Transações 3 a 10: Vendas Recorrentes da Clínica Vida Bela
  for (let i = 1; i <= 8; i++) {
    await prisma.transaction.create({
      data: {
        type: 2, // EXIT
        description: `Venda E-commerce B2B - Pedido Assinatura Mensal #${i}`,
        total_amount: (50 * 29.90) + (10 * 85.90), // 50 Caixas de Luva + 10 Amoxicilinas
        customer_id: customer1.customer_id, // Clínica Vida Bela
        items: {
          create: [
            { product_id: product3.product_id, quantity: 50, unit_price: 29.90, subtotal: 1495.00 },
            { product_id: product1.product_id, quantity: 10, unit_price: 85.90, subtotal: 859.00 }
          ]
        }
      }
    });
  }

  console.log("✅ Seed finalizado com sucesso! Seu E-commerce está com as prateleiras cheias.");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });