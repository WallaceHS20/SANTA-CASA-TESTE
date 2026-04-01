import { ProductCategoryId, ProductLocationId } from "@/Interfaces/Products";

export const categoryOptions = [
  { label: "Medicamento", value: ProductCategoryId.MEDICINE },
  { label: "Suprimento", value: ProductCategoryId.SUPPLY },
  { label: "Equipamento", value: ProductCategoryId.EQUIPMENT },
  { label: "Limpeza", value: ProductCategoryId.CLEANING },
];

export const locationOptions = [
  { label: "Almoxarifado Central", value: ProductLocationId.CENTRAL_WAREHOUSE },
  {
    label: "Corredor A - Prateleira 1",
    value: ProductLocationId.AISLE_A_SHELF_1,
  },
  { label: "Corredor B - Gaveta 5", value: ProductLocationId.AISLE_B_DRAWER_5 },
  { label: "Farmácia Interna", value: ProductLocationId.INTERNAL_PHARMACY },
];
