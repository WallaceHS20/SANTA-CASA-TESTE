import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import {
  UserKeys,
  type IAuthParams,
  type IUser,
  type UserRole,
} from "../../Interfaces/Auth";
import { AuthService } from "../../services/Auth";
import { PageRoutesKeys } from "@/Interfaces/Routes";

interface Props {
  user: IUser | null;
  signed: boolean;
  role: UserRole | null; // Facilitador para o Front
  login: (data: IAuthParams) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<Props>({} as Props);

interface AutProviderhContextProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AutProviderhContextProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (data: IAuthParams) => {
    try {
      const response = await AuthService.authLogin(data);
      const { user: userData, token } = response;
      setUser(userData);
      localStorage.setItem("@SantaCasa:token", token);
    } catch (error) {
      throw error;
    }
  };

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  useEffect(() => {
    const storagedUser = localStorage.getItem("@SantaCasa:user");
    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        role: user?.[UserKeys.ROLE] || null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext deve ser usado dentro de um NotificationProvider",
    );
  }
  return context;
};
