import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🛒 Iniciando o Seed do E-commerce Hospitalar...");

  // Ordem correta para evitar erros de FK
  await prisma.transactionItem.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();

  console.log("🧹 Banco limpo. Inserindo dados mestres...");

  // 🏥 1. CLIENTES COM IDS FIXOS
  const hospitalCentral = await prisma.customer.create({
    data: {
      customer_id: 1, // ID FIXO
      customer_name: "Hospital Central Santa Casa",
      customer_email: "suprimentos@santacasa.org.br",
      customer_tax_id: "60.444.333/0001-22",
      customer_city: "São Paulo",
      customer_state: "SP",
    },
  });

  const farmaciaPopular = await prisma.customer.create({
    data: {
      customer_id: 2, // ID FIXO
      customer_name: "Rede de Farmácias Popular",
      customer_email: "estoque@farmapopular.com.br",
      customer_tax_id: "15.999.888/0001-77",
      customer_city: "Rio de Janeiro",
      customer_state: "RJ",
    },
  });

  const fornecedorBio = await prisma.customer.create({
    data: {
      customer_name: "BioTech Suprimentos Hospitalares",
      customer_email: "vendas@biotech.com.br",
      customer_tax_id: "44.555.666/0001-88",
      customer_city: "Belo Horizonte",
      customer_state: "MG",
    },
  });

  // 💊 2. PRODUTOS (Catálogo Ampliado)
  const products = await Promise.all([
    prisma.product.create({
      data: {
        product_sap_code: "MED-AMX-01",
        product_name: "Amoxicilina 875mg (Caixa 30cp)",
        product_lot: "LT-2024-AX",
        product_quantity: 450,
        product_min_quantity: 100,
        product_unit_val: 92.50,
        product_total_val: 41625.00,
        product_category: 1, // Medicamentos
      }
    }),
    prisma.product.create({
      data: {
        product_sap_code: "EQU-OXI-05",
        product_name: "Oxímetro de Pulso Digital Profissional",
        product_lot: "LT-OXI-2024",
        product_quantity: 85,
        product_min_quantity: 10,
        product_unit_val: 180.00,
        product_total_val: 15300.00,
        product_category: 3, // Equipamentos
      }
    }),
    prisma.product.create({
      data: {
        product_sap_code: "DES-MSK-N95",
        product_name: "Máscara Respiradora N95 (Pacote 50un)",
        product_lot: "LT-MSK-99",
        product_quantity: 1200,
        product_min_quantity: 200,
        product_unit_val: 145.00,
        product_total_val: 174000.00,
        product_category: 2, // Descartáveis
      }
    }),
    prisma.product.create({
      data: {
        product_sap_code: "DES-GEL-70",
        product_name: "Álcool em Gel 70% (Galão 5L)",
        product_lot: "LT-GEL-01",
        product_quantity: 300,
        product_min_quantity: 50,
        product_unit_val: 65.00,
        product_total_val: 19500.00,
        product_category: 2,
      }
    }),
    prisma.product.create({
      data: {
        product_sap_code: "EQU-MON-02",
        product_name: "Monitor Cardíaco Multiparamétrico",
        product_lot: "LT-MON-V3",
        product_quantity: 12,
        product_min_quantity: 2,
        product_unit_val: 4200.00,
        product_total_val: 50400.00,
        product_category: 3,
      }
    })
  ]);

  console.log("📦 Produtos inseridos. Gerando histórico de Compras e Remessas...");

  // 📝 3. TRANSAÇÕES (Terminologia: Compra = Tipo 1, Remessa = Tipo 2)

  // A. Compra de Reposição (ENTRADA - Tipo 1)
  await prisma.transaction.create({
    data: {
      type: 1, 
      description: "Compra de Suprimentos - Lote Trimestral BioTech",
      total_amount: 15000.00,
      customer_id: fornecedorBio.customer_id,
      items: {
        create: [
          { product_id: products[2].product_id, quantity: 100, unit_price: 150.00, subtotal: 15000.00 }
        ]
      }
    }
  });

  // B. Remessa ao Hospital (SAÍDA - Tipo 2)
  await prisma.transaction.create({
    data: {
      type: 2, 
      description: "Remessa para Hospital Central - Pedido Urgente #987",
      total_amount: 12600.00,
      customer_id: hospitalCentral.customer_id,
      items: {
        create: [
          { product_id: products[4].product_id, quantity: 3, unit_price: 4200.00, subtotal: 12600.00 }
        ]
      }
    }
  });

  // C. Remessa para Farmácia (SAÍDA - Tipo 2)
  await prisma.transaction.create({
    data: {
      type: 2,
      description: "Remessa Comercial - Abastecimento Rede Popular",
      total_amount: 4625.00,
      customer_id: farmaciaPopular.customer_id,
      items: {
        create: [
          { product_id: products[0].product_id, quantity: 50, unit_price: 92.50, subtotal: 4625.00 }
        ]
      }
    }
  });

  // D. Gerando histórico aleatório de Remessas (Vendas)
  console.log("⌛ Gerando fluxo de remessas recorrentes...");
  for (let i = 1; i <= 10; i++) {
    const isOdd = i % 2 === 0;
    await prisma.transaction.create({
      data: {
        type: 2,
        description: `Remessa Programada #${2000 + i} - Cliente ${isOdd ? 'Hospital' : 'Farmácia'}`,
        total_amount: 325.00,
        customer_id: isOdd ? hospitalCentral.customer_id : farmaciaPopular.customer_id,
        items: {
          create: [
            { product_id: products[3].product_id, quantity: 5, unit_price: 65.00, subtotal: 325.00 }
          ]
        }
      }
    });
  }

  console.log("✅ Seed finalizado! IDs 1 e 2 garantidos. Terminologia de Compras/Remessas aplicada.");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });