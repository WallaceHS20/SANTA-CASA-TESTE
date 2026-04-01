export class Validations {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidTaxId(taxId: string): boolean {
    const cleanId = taxId.replace(/\D/g, "");

    if (cleanId.length === 11) return this.isCpf(cleanId);
    if (cleanId.length === 14) return this.isCnpj(cleanId);

    return false;
  }

  static isCpf(cpf: string): boolean {
    const cleanCpf = cpf.replace(/\D/g, "");

    if (cleanCpf.length !== 11 || /^(\d)\1+$/.test(cleanCpf)) return false;

    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cleanCpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cleanCpf.substring(10, 11))) return false;

    return true;
  }

  static isCnpj(cnpj: string): boolean {
    const cleanCnpj = cnpj.replace(/\D/g, "");

    if (cleanCnpj.length !== 14 || /^(\d)\1+$/.test(cleanCnpj)) return false;

    let size = cleanCnpj.length - 2;
    let numbers = cleanCnpj.substring(0, size);
    let digits = cleanCnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = cleanCnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  }
}
