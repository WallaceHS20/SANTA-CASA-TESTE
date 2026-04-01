/*
  Warnings:

  - You are about to alter the column `product_category` on the `products` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `product_location` on the `products` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
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
INSERT INTO "new_products" ("product_active", "product_category", "product_entry_date", "product_expiry_date", "product_id", "product_location", "product_lot", "product_min_quantity", "product_name", "product_quantity", "product_sap_code", "product_total_val", "product_unit_val", "product_unit_weight") SELECT "product_active", "product_category", "product_entry_date", "product_expiry_date", "product_id", "product_location", "product_lot", "product_min_quantity", "product_name", "product_quantity", "product_sap_code", "product_total_val", "product_unit_val", "product_unit_weight" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_product_sap_code_key" ON "products"("product_sap_code");
CREATE INDEX "products_product_name_idx" ON "products"("product_name");
CREATE INDEX "products_product_category_product_active_idx" ON "products"("product_category", "product_active");
CREATE UNIQUE INDEX "products_product_sap_code_product_lot_key" ON "products"("product_sap_code", "product_lot");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
