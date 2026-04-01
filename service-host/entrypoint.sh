#!/bin/sh

# Aguarda um pouco (opcional, bom para DBs externos, mas seguro aqui)
echo "🚀 Preparando o banco de dados..."

# Roda as migrations para criar as tabelas
npx prisma migrate deploy

# Roda o seu Seed maravilhoso que criamos
echo "🌱 Semeando dados (Compras, Remessas e Clientes)..."
npx prisma db seed

echo "🔥 Tudo pronto! Subindo o servidor..."
# Inicia a aplicação
#!/bin/sh

echo "🚀 Aguardando banco de dados..."

# Roda as migrations (cria as tabelas no dev.db)
npx prisma migrate deploy

# Alimenta o banco com o seu seed (clientes e produtos)
echo "🌱 Semeando dados..."
npx prisma db seed

echo "🔥 Iniciando servidor com tsx..."
# 🎯 Usamos o comando que você já conhece:
npx tsx server.ts