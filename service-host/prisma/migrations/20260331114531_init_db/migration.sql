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

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_email_key" ON "customers"("customer_email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_tax_id_key" ON "customers"("customer_tax_id");
