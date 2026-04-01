# 🏥 E-Pharma - Gestão de Logística Hospitalar

O **E-Pharma** é uma plataforma integrada de e-commerce e gestão de suprimentos voltada para o setor de saúde. O sistema permite o controle rigoroso de estoque, registro de **Compras** (entradas) e **Remessas** (saídas), além de oferecer um rastreamento visual do status de entrega para garantir a eficiência na logística hospitalar.

---

## 🛠️ Tecnologias e Stack

O projeto foi construído utilizando o que há de mais moderno no ecossistema JavaScript, focando em tipagem forte e performance.

### **Frontend**
| Tecnologia | Finalidade |
| :--- | :--- |
| **React + Vite** | Framework base e build tool ultrarrápida. |
| **TypeScript** | Garantia de contratos e segurança no código. |
| **PrimeReact** | Biblioteca de componentes de UI de alta performance. |
| **PrimeFlex** | Utilitários CSS para layouts responsivos. |
| **Context API** | Gerenciamento de estado global (Autenticação e Notificações). |

### **Backend**
| Tecnologia | Finalidade |
| :--- | :--- |
| **Node.js** | Ambiente de execução. |
| **Prisma ORM** | Mapeamento e manipulação do banco de dados. |
| **SQLite (LibSQL)** | Banco de dados leve e eficiente para a solução. |
| **TSX** | Execução direta de TypeScript em ambiente de dev. |
| **Docker** | Containerização de todo o ecossistema. |

---

## 🏗️ Padrões de Projeto (Design Patterns)

Para garantir escalabilidade e fácil manutenção, aplicamos os seguintes padrões:

### **No Backend**
* **Repository Pattern:** Camada de abstração de dados que isola a lógica de banco de dados do resto da aplicação.
* **Service Pattern:** Centralização da lógica de negócio, garantindo que os controladores sejam magros.
* **Strategy/Factory Pattern:** Usado no motor de transações para validar estoques e calcular mudanças de saldo dependendo do tipo de operação (Compra vs. Remessa).

### **No Frontend**
* **Custom Hooks:** Toda a lógica de estado e chamadas de API foi abstraída em Hooks, mantendo os componentes puramente visuais.
* **Service Layer:** Camada dedicada para instâncias do Axios e chamadas HTTP.
* **Modal Factory Pattern:** Gerenciamento centralizado de modais para criação, edição e visualização de detalhes.

---

## 👥 Usuários Disponíveis (Seed)

O banco de dados já sobe populado com as seguintes credenciais para teste:

| Perfil | E-mail | Senha | ID Fixo | Instituição |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | `admin@santacasa.org.br` | `admin123` | `1` | Hospital Central Santa Casa |
| **Cliente** | `estoque@farmapopular.com.br` | `user123` | `2` | Rede de Farmácias Popular |

---

## 🚀 Como Rodar o Projeto

Graças à containerização com Docker, você não precisa configurar nada localmente além do próprio Docker.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/santa-casa.git](https://github.com/seu-usuario/santa-casa.git)
    cd santa-casa
    ```

2.  **Suba os containers:**
    Na raiz do projeto (onde está o `docker-compose.yml`), execute:
    ```bash
    docker-compose up --build
    ```

3.  **Acesse as aplicações:**
    * **Frontend:** [http://localhost:5173](http://localhost:5173)
    * **Backend:** [http://localhost:3000](http://localhost:3000)

> **Nota:** Durante a inicialização, o Docker executará automaticamente o script `entrypoint.sh`, que realiza as migrações do banco e o **Seed** dos dados (Clientes, Produtos e Histórico de Transações).

---

## 📦 Funcionalidades em Destaque
* **Freight Tracker:** Visualização em tempo real do status de entrega (Pedido, Processando, Em Trânsito, Entregue).
* **Persistência de Sessão:** Sistema de autenticação que resiste ao recarregamento de página (F5).
* **Estoque Automatizado:** Atualização de saldo e valor total de inventário disparada por transações.