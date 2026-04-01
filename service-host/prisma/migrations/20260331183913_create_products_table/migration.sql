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
    "product_category" TEXT NOT NULL,
    "product_location" TEXT,
    "product_entry_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_expiry_date" DATETIME,
    "product_active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "products_product_sap_code_key" ON "products"("product_sap_code");
