import { BasicInputField } from "@/components/FormFields/BasicInputField";
import { useForm } from "./UseForm";
import { AuthParamsKeys } from "@/Interfaces/Auth";
import { Button } from "@/components/Button";
import { PasswordInputField } from "@/components/FormFields/PasswordInputField";

export default function Login() {
  const { form, formError, handleSetField, onSubmit } = useForm();
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <div className="hidden md:flex w-6 h-full login-bg-image">
        <div className="login-image-overlay p-8">
          <h1 className="text-white font-bold login-title-hero">
            Gestão de Saúde <span className="text-blue-500">Redefinida.</span>
          </h1>
          <p className="text-white text-xl mt-3">
            Sua plataforma integrada para suprimentos e logística hospitalar.
          </p>
        </div>
      </div>

      <div className="w-full md:w-6 h-full flex align-items-center justify-content-center">
        <div className="p-5 w-full login-form-wrapper">
          <div className="mb-6 text-center">
            <i className="pi pi-plus-circle text-primary mb-3 login-icon-main"></i>
            <h2 className="font-bold text-900 text-3xl">Acesso ao E-Pharma</h2>
          </div>

          <div className="flex flex-column gap-5">
            <BasicInputField
              label="E-mail"
              error={formError[AuthParamsKeys.EMAIL]}
              id={AuthParamsKeys.EMAIL}
              name={AuthParamsKeys.EMAIL}
              value={form[AuthParamsKeys.EMAIL]}
              onChange={handleSetField}
              className="w-full p-inputtext-lg"
            />

            <PasswordInputField
              label="Senha"
              type="password"
              id={AuthParamsKeys.PASSWORD}
              name={AuthParamsKeys.PASSWORD}
              value={form[AuthParamsKeys.PASSWORD]}
              onChange={handleSetField}
              className="w-full p-inputtext-lg"
              error={formError[AuthParamsKeys.PASSWORD]}
            />

            <Button
              label="Entrar"
              className="w-full p-3 flex justify-content-center"
              onClick={onSubmit}
            />
          </div>

          <div className="mt-8 text-center text-500">
            <small>
              &copy; 2026 Santa Casa Solutions. <br />
              Todos os direitos reservados.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
