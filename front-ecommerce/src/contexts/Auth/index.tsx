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

interface Props {
  user: IUser | null;
  signed: boolean;
  role: UserRole | null;
  login: (data: IAuthParams) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<Props>({} as Props);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(() => {
    const storagedUser = localStorage.getItem("@SantaCasa:user");
    const storagedToken = localStorage.getItem("@SantaCasa:token");

    if (storagedUser && storagedToken) {
      try {
        return JSON.parse(storagedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = async (data: IAuthParams) => {
    try {
      const response = await AuthService.authLogin(data);
      const { user: userData, token } = response;
      
      localStorage.setItem("@SantaCasa:token", token);
      localStorage.setItem("@SantaCasa:user", JSON.stringify(userData));
      
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  function logout() {
    localStorage.removeItem("@SantaCasa:token");
    localStorage.removeItem("@SantaCasa:user");
    setUser(null);
  }

  useEffect(() => {
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
  if (!context || Object.keys(context).length === 0) {
    throw new Error(
      "useAuthContext deve ser usado dentro de um AuthProvider",
    );
  }
  return context;
};