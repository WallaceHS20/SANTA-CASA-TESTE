# Estágio de Build
FROM node:20-slim AS builder

# Instala dependências do sistema necessárias para o Prisma/SQLite
RUN apt-get update && apt-get install -y openssl libsqlite3-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências e gera o Prisma Client
RUN npm install
RUN npx prisma generate

# Copia o restante do código
COPY . .

# Expõe a porta que o seu backend roda (ajuste se for outra)
EXPOSE 3000

# Torna o script de entrada executável
RUN chmod +x ./entrypoint.sh

# Define o ponto de entrada
ENTRYPOINT ["./entrypoint.sh"]