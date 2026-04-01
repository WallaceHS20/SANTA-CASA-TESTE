FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# O Vite precisa do --host para aceitar conexões de fora do container
CMD ["npm", "run", "dev", "--", "--host"]