import type { THandleSetFieldProps } from "@/Interfaces/Common";
import { SanitizeField } from "./Sanitize";

export class SanitizeFieldOnChange {
  private static handleFormat(
    event: THandleSetFieldProps,
    sanitize: (value: string) => string,
  ): THandleSetFieldProps {
    const { name, value } = event.target;
    return { target: { name, value: sanitize(value) } };
  }
  static codeOrName(event: THandleSetFieldProps): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.codeOrName);
  }

  static phraseOnlyLetters(event: THandleSetFieldProps): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.phraseOnlyLetters);
  }

  static onlyNumberAndLetter(
    event: THandleSetFieldProps,
  ): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.onlyNumberAndLetter);
  }

  static onlyNumber(event: THandleSetFieldProps): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.onlyNumber);
  }

  static bankAccount(event: THandleSetFieldProps): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.bankAccount);
  }

  static cpfCnpj(event: THandleSetFieldProps): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.cpfCnpj);
  }

  static agency(event: THandleSetFieldProps): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.agency);
  }

  static stateRegistration(event: THandleSetFieldProps): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.stateRegistration);
  }

  static municipalRegistration(
    event: THandleSetFieldProps,
  ): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.municipalRegistration);
  }

  static onlyLetter(event: THandleSetFieldProps): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.onlyLetter);
  }

  static cep(event: THandleSetFieldProps): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.cep);
  }

  static phoneNumber(event: THandleSetFieldProps): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.phoneNumber);
  }

  static email(event: THandleSetFieldProps): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.email);
  }

  static onlyLettersSpacesHyphens(
    event: THandleSetFieldProps,
  ): THandleSetFieldProps {
    return this.handleFormat(event, SanitizeField.onlyLettersSpacesHyphens);
  }
}
