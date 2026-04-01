-- CreateTable
CREATE TABLE "customers" (
    "customer_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_name" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "customer_tax_id" TEXT NOT NULL,
    "customer_registration_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_city" TEXT NOT NULL,
    "customer_state" TEXT NOT NULL,
    "customer_state_registration" TEXT,
    "customer_municipal_registration" TEXT
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_sap_code" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_lot" TEXT NOT NULL,
    "product_quantity" INTEGER NOT NULL DEFAULT 0,
    "product_min_quantity" INTEGER NOT NULL DEFAULT 5,
    "product_unit_val" DECIMAL NOT NULL,
    "product_total_val" DECIMAL NOT NULL,
    "product_unit_weight" REAL,
    "product_category" INTEGER NOT NULL,
    "product_location" INTEGER,
    "product_entry_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_expiry_date" DATETIME,
    "product_active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" INTEGER NOT NULL,
    "description" TEXT,
    "total_amount" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" INTEGER,
    CONSTRAINT "transactions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers" ("customer_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "transaction_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transaction_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL NOT NULL,
    "subtotal" DECIMAL NOT NULL,
    CONSTRAINT "transaction_items_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transaction_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("product_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_email_key" ON "customers"("customer_email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_tax_id_key" ON "customers"("customer_tax_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_product_sap_code_key" ON "products"("product_sap_code");

-- CreateIndex
CREATE INDEX "products_product_sap_code_idx" ON "products"("product_sap_code");

-- CreateIndex
CREATE INDEX "products_product_name_idx" ON "products"("product_name");

-- CreateIndex
CREATE INDEX "products_product_category_product_active_idx" ON "products"("product_category", "product_active");

-- CreateIndex
CREATE UNIQUE INDEX "products_product_sap_code_product_lot_key" ON "products"("product_sap_code", "product_lot");

-- CreateIndex
CREATE INDEX "transactions_created_at_type_idx" ON "transactions"("created_at", "type");

-- CreateIndex
CREATE INDEX "transactions_customer_id_idx" ON "transactions"("customer_id");

-- CreateIndex
CREATE INDEX "transaction_items_transaction_id_idx" ON "transaction_items"("transaction_id");

-- CreateIndex
CREATE INDEX "transaction_items_product_id_idx" ON "transaction_items"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_items_transaction_id_product_id_key" ON "transaction_items"("transaction_id", "product_id");
