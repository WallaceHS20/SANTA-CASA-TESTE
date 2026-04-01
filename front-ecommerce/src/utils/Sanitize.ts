export class SanitizeField {
  static codeOrName(value: string) {
    let cleanedValue = value
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s{2,}/g, " ");
    cleanedValue = cleanedValue.replace(/^\s+/, "");
    cleanedValue = cleanedValue.replace(/^0+/, "");
    return cleanedValue;
  }

  static cpfCnpj(value: string) {
    // Remove tudo que não for número
    let sanitizedValue = value.replace(/\D/g, "");

    // Se tiver até 11 dígitos, aplica a máscara de CPF progressivamente
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

    // Passou de 11 dígitos, muda para máscara de CNPJ
    // Limita o tamanho máximo a 14 dígitos (tamanho de um CNPJ)
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

  static phraseOnlyLetters(value: string) {
    return value
      .replace(/[^a-zA-Z\s]/g, "")
      .replace(/^\s/, "")
      .replace(/\s{2,}/g, " ");
  }

  static onlyNumberAndLetter(value: string) {
    return value.replace(/[^a-zA-Z0-9]/g, "");
  }



  static onlyNumber(value: string) {
    return value.replace(/[^0-9]/g, "");
  }

  static onlyLetter(value: string) {
    return value.replace(/[^a-zA-Z]/g, "");
  }



  static cep(value: string) {
    let sanitizedValue = value.replace(/\D/g, "");
    if (sanitizedValue.length > 5) {
      sanitizedValue = `${sanitizedValue.slice(0, 5)}-${sanitizedValue.slice(5, 8)}`;
    }
    return sanitizedValue;
  }

  static bankAccount(value: string) {
    let sanitizedValue = value.replace(/\D/g, "");

    if (sanitizedValue.length > 18) {
      sanitizedValue = sanitizedValue.slice(0, 18);
    }

    if (sanitizedValue.length > 1) {
      sanitizedValue = `${sanitizedValue.slice(0, -1)}-${sanitizedValue.slice(-1)}`;
    }

    return sanitizedValue;
  }

  static agency(value: string) {
    let sanitizedValue = value.replace(/\D/g, "");

    if (sanitizedValue.length > 5) {
      sanitizedValue = sanitizedValue.slice(0, 5);
    }

    if (sanitizedValue.length > 4) {
      sanitizedValue = `${sanitizedValue.slice(0, 4)}-${sanitizedValue.slice(4)}`;
    }

    return sanitizedValue;
  }

  static stateRegistration(value?: string) {
    let defaultDescription = "ISENTO";
    if (!value || value === defaultDescription) return defaultDescription;

    let sanitizedValue = value.replace(/\D/g, "");

    if (!sanitizedValue) return defaultDescription;

    if (sanitizedValue.length > 14) {
      sanitizedValue = sanitizedValue.slice(0, 14);
    }

    return sanitizedValue;
  }

  static municipalRegistration(value?: string) {
    let defaultDescription = "ISENTO";

    if (!value || value === defaultDescription) return defaultDescription;

    let sanitizedValue = value.replace(/\D/g, "");

    if (!sanitizedValue) return defaultDescription;

    if (sanitizedValue.length > 15) {
      sanitizedValue = sanitizedValue.slice(0, 15);
    }

    return sanitizedValue;
  }

  static phoneNumber(value: string) {
    let sanitizedValue = value.replace(/\D/g, "");
    if (sanitizedValue.length <= 12) {
      if (sanitizedValue.length <= 10) {
        sanitizedValue = sanitizedValue.replace(
          /^(\d{2})(\d{4})(\d{4})$/,
          "($1) $2-$3",
        );
      } else {
        sanitizedValue = sanitizedValue.replace(
          /^(\d{2})(\d{5})(\d{4})$/,
          "($1) $2-$3",
        );
      }
    } else {
      if (sanitizedValue.length === 13) {
        sanitizedValue = sanitizedValue.replace(
          /^(\d{2})(\d{2})(\d{5})(\d{4})$/,
          "+$1 ($2) $3-$4",
        );
      } else {
        sanitizedValue = sanitizedValue.replace(
          /^(\d{2})(\d{2})(\d{4})(\d{4})$/,
          "+$1 ($2) $3-$4",
        );
      }
    }
    return sanitizedValue;
  }

  static email(value: string) {
    let sanitizedValue = value.trim();
    sanitizedValue = sanitizedValue.toLowerCase();
    sanitizedValue = sanitizedValue.replace(/[^a-z0-9.@_+-]/g, "");
    sanitizedValue = sanitizedValue.replace(/\.{2,}/g, ".");
    const atIndex = sanitizedValue.indexOf("@");
    if (atIndex !== -1) {
      const [localPart, domain] = sanitizedValue.split("@");
      sanitizedValue = `${localPart.replace(/@/g, "")}@${domain.replace(/@/g, "")}`;
    }
    return sanitizedValue;
  }




  static onlyLettersSpacesHyphens(value: string): string {
    let sanitized = value;
    sanitized = sanitized.replace(/\s+/g, " ");
    sanitized = sanitized.replace(/-+/g, "-");
    sanitized = sanitized.replace(/[^a-zA-Z0-9\s-]/g, "");
    return sanitized;
  }
}
