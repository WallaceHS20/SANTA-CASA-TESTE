import { Request, Response, NextFunction, Router } from "express";

export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER"
}

export const usersMock = [
  {
    id: 1, 
    name: "Admin Santa Casa",
    email: "admin@santacasa.org.br",
    password: "admin123", 
    avatar: "https://ui-avatars.com/api/?name=Admin+Santa+Casa&background=005daa&color=fff",
    role: UserRole.ADMIN
  },
  {
    id: 2, 
    name: "Comprador Rede Popular",
    email: "estoque@farmapopular.com.br",
    password: "user123",
    avatar: "https://ui-avatars.com/api/?name=Rede+Popular&background=ff0000&color=fff",
    role: UserRole.CUSTOMER
  }
];

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = Number(req.headers["x-user-id"]);

  const userExists = usersMock.find(u => u.id === userId);

  if (!userExists) {
    return res.status(401).json({ error: "Usuário não identificado. Por favor, faça login." });
  }

  const { password: _, ...safeUser } = userExists;
  (req as any).user = safeUser;

  next();
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (user?.role !== "ADMIN") {
    return res.status(403).json({ error: "Acesso negado. Rota exclusiva para Administradores." });
  }

  next();
};

const authRoutes = Router();
authRoutes.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  const user = usersMock.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "E-mail ou senha incorretos." });
  }

  const { password: _, ...userResponse } = user;

  return res.json({
    token: `fake-jwt-token-${user.role.toLowerCase()}`,
    user: userResponse
  });
});

export { authRoutes };