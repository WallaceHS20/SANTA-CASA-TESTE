# 🏥 E-Pharma - Gestão de Logística Hospitalar

O **E-Pharma** é uma plataforma integrada de e-commerce e gestão de suprimentos voltada para o setor de saúde. O sistema permite o controle rigoroso de estoque, registro de **Compras** (entradas) e **Remessas** (saídas), além de oferecer um rastreamento visual do status de entrega para garantir a eficiência na logística hospitalar.

---

## 🛠️ Tecnologias e Stack

### **Frontend**
- **React + Vite** | **TypeScript**
- **PrimeReact** & **PrimeFlex** (UI/UX de alta performance)
- **Context API** (Gerenciamento de Autenticação e Notificações)

### **Backend**
- **Node.js** | **Prisma ORM**
- **SQLite (LibSQL)** (Banco de dados ágil e local)
- **TSX** (Execução direta de TypeScript em ambiente de desenvolvimento)
- **Docker** (Containerização completa do ecossistema)
- **Swagger (OpenAPI)** (Documentação interativa da API)

---

## 🏗️ Padrões de Projeto (Design Patterns)

- **Backend:** Repository Pattern, Service Layer e Strategy/Factory para motores de transação (distinção entre Compras e Remessas).
- **Frontend:** Custom Hooks (Abstração de Lógica), Service Layer (Axios) e Modal Factory Pattern.
- **Segurança:** RBAC (Role Based Access Control) com proteção de rotas via componente `ProtectedRoute` e filtragem de menus por permissão.

---

## 👥 Usuários Disponíveis (Seed)

O sistema já sobe com dados de teste populados para os dois perfis de acesso:

| Perfil   | E-mail                          | Senha    | ID | Instituição                     |
|----------|--------------------------------|----------|----|---------------------------------|
| **Admin**   | `admin@santacasa.org.br`        | `admin123` | 1  | Hospital Central Santa Casa     |
| **Cliente** | `estoque@farmapopular.com.br`  | `user123`  | 2  | Rede de Farmácias Popular       |

---

## 🚀 Como Rodar (Via Docker - Recomendado)

Certifique-se de ter o Docker instalado e, na raiz do projeto (onde está o `docker-compose.yml`), execute:

```bash
docker compose up --build
```

---

## 🚀 Como Rodar o Projeto Manual

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/santa-casa.git
cd santa-casa
```

2. **Backend:**
```bash
cd service-host
npm install

# Prepara o banco de dados e popula os dados
npx prisma migrate dev --name init_setup
npx prisma db seed

# Inicia o servidor
npx tsx server.ts
```

3. **Frontend:**
```bash
cd front-ecommerce
npm install
npm run dev
```

---

## 🌐 Acesso às aplicações

- **Frontend:** http://localhost:5173  
- **Backend:** http://localhost:3000  

---

## 📄 Documentação da API (Swagger)

A API possui documentação interativa via Swagger.

- Acesse: **http://localhost:3000/api-docs**

### 🔐 Autorização no Swagger

Para testar os endpoints protegidos:

1. Clique no botão **"Authorize"** no topo da página.
2. No campo de autenticação, insira:
   ```
   1
   ```
3. Clique em **"Authorize"** e depois em **"Close"**.

> Isso utilizará o usuário **Admin (ID = 1)** já previamente cadastrado no seed para autenticar as requisições.

---

> **Nota:** Durante a inicialização, o Docker executará automaticamente o script `entrypoint.sh`, que realiza as migrações do banco e o **seed** dos dados (Clientes, Produtos e Histórico de Transações).
