export class Masks {
  static removeSpecialChars(value: string): string {
    if (!value) return "";
    return value.replace(/[^a-zA-Z0-9]/g, "").trim();
  }

  static cleanName(name: string): string {
    if (!name) return "";
    return name.replace(/[^a-zA-ZÀ-ÿ ]/g, "").trim();
  }

  static currency(value: string | number): string {
    if (!value) return "R$ 0,00";

    // Garante que o valor seja string e remove tudo que não for número
    const cleanValue = String(value).replace(/\D/g, "");

    // Converte para número e divide por 100 para criar as casas decimais
    const numberValue = Number(cleanValue) / 100;

    // Formata no padrão brasileiro
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue);
  }

  static cpfCnpj(value: string): string {
    if (!value) return "";
    
    // Remove tudo que não for número
    let sanitizedValue = value.replace(/\D/g, "");

    // Se tiver até 11 dígitos, aplica a máscara de CPF
    if (sanitizedValue.length <= 11) {
      if (sanitizedValue.length > 9) {
        return `${sanitizedValue.slice(0, 3)}.${sanitizedValue.slice(3, 6)}.${sanitizedValue.slice(6, 9)}-${sanitizedValue.slice(9)}`;
      }
      if (sanitizedValue.length > 6) {
        return `${sanitizedValue.slice(0, 3)}.${sanitizedValue.slice(3, 6)}.${sanitizedValue.slice(6)}`;
      }
      if (sanitizedValue.length > 3) {
        return `${sanitizedValue.slice(0, 3)}.${sanitizedValue.slice(3)}`;
      }
      return sanitizedValue;
    }

    // Passou de 11 dígitos, muda para máscara de CNPJ e trava em 14 caracteres
    if (sanitizedValue.length > 14) {
      sanitizedValue = sanitizedValue.slice(0, 14);
    }

    if (sanitizedValue.length > 12) {
      return `${sanitizedValue.slice(0, 2)}.${sanitizedValue.slice(2, 5)}.${sanitizedValue.slice(5, 8)}/${sanitizedValue.slice(8, 12)}-${sanitizedValue.slice(12)}`;
    }
    if (sanitizedValue.length > 8) {
      return `${sanitizedValue.slice(0, 2)}.${sanitizedValue.slice(2, 5)}.${sanitizedValue.slice(5, 8)}/${sanitizedValue.slice(8)}`;
    }
    if (sanitizedValue.length > 5) {
      return `${sanitizedValue.slice(0, 2)}.${sanitizedValue.slice(2, 5)}.${sanitizedValue.slice(5)}`;
    }
    if (sanitizedValue.length > 2) {
      return `${sanitizedValue.slice(0, 2)}.${sanitizedValue.slice(2)}`;
    }

    return sanitizedValue;
  }
}