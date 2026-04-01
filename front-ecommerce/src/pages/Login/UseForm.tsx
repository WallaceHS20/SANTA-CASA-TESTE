import { useAuthContext } from "@/contexts/Auth";
import { useNotificationContext } from "@/contexts/Notification";
import { AuthParamsKeys, type IAuthParams } from "@/Interfaces/Auth";
import type { TFormError, THandleSetFieldProps } from "@/Interfaces/Common";
import { PageRoutesKeys } from "@/Interfaces/Routes";
import { useError } from "@/utils/ErrorHandler";
import { Validations } from "@/utils/Validate";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultForm: IAuthParams = {
  [AuthParamsKeys.EMAIL]: "",
  [AuthParamsKeys.PASSWORD]: "",
};

const defaultFormError = {
  [AuthParamsKeys.EMAIL]: "",
  [AuthParamsKeys.PASSWORD]: "",
};

interface Props {
  form: IAuthParams;
  formError: TFormError<IAuthParams>;
  handleSetField: (event: THandleSetFieldProps) => void;
  onSubmit: () => void;
}

export const useForm = (): Props => {
  const { Loading, showToast } = useNotificationContext();
  const { handleError } = useError();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = useState<IAuthParams>(defaultForm);
  const [formError, setFormError] =
    useState<TFormError<IAuthParams>>(defaultFormError);

  const handleSetField = useCallback((event: THandleSetFieldProps) => {
    const key = event.target.name as keyof IAuthParams;
    const value = event.target.value;
    setForm((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });

    setFormError((prev) => {
      if (!prev[key]) return prev;
      return { ...prev, [key]: "" };
    });
  }, []);

  const validateForm: Partial<Record<AuthParamsKeys, (value: any) => string>> =
    {
      [AuthParamsKeys.EMAIL]: (value: string) => {
        if (!value || !Validations.validateEmail(value))
          return "É necessário informar um e-mail válido.";
        return "";
      },
      [AuthParamsKeys.PASSWORD]: (value: string) => {
        if (!value) return "É necessário informar a senha";
        return "";
      },
    };

  const handleValidation = (form: IAuthParams): TFormError<IAuthParams> => {
    const errors: TFormError<IAuthParams> = {};

    Object.entries(form).forEach(([key, value]) => {
      const validationKey = key as AuthParamsKeys;
      if (validationKey in validateForm) {
        const validation = validateForm[validationKey];
        if (validation) {
          errors[key as keyof IAuthParams] = validation(value);
        }
      }
    });

    return errors;
  };

  const onSubmit = () => {
    const validate = handleValidation(form);
    if (Object.values(validate).some(Boolean)) {
      setFormError(validate);
      showToast(
        "error",
        "Formulário inválido",
        "Verifique os campos preenchidos e tente novamente.",
      );
      return;
    }

    postSignIn(form);
  };

  const postSignIn = async (data: IAuthParams) => {
    Loading.show("Validando login...");
    try {
      await login(data);
      navigate(PageRoutesKeys.DASHBOARD);
    } catch (error) {
      handleError("Falha ao logar", error);
    } finally {
      Loading.hide();
    }
  };

  const value: Props = {
    form,
    formError,
    handleSetField,
    onSubmit,
  };

  return value;
};
