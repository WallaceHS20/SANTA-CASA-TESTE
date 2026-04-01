import {
  ButtonIcon,
  ButtonVariant,
  ButtonSeverity,
  Button,
} from "@/components/Button";
import { CopyContent } from "@/components/CopyContent";
import {
  PostProductKeys,
  ProductCategoryId,
  type IGetProductResponse,
} from "@/Interfaces/Products";
import { Tag } from "primereact/tag";
import { UserRole } from "@/Interfaces/Auth";

interface ProductCardViewProps {
  products: IGetProductResponse[];
  onEdit: (product: IGetProductResponse) => void;
  openPurchase: (product: IGetProductResponse) => void;
}

const categoryMap: Record<
  number,
  { label: string; severity: "info" | "success" | "warning" | "danger" | null }
> = {
  [ProductCategoryId.MEDICINE]: { label: "Medicamento", severity: "info" },
  [ProductCategoryId.SUPPLY]: { label: "Suprimento", severity: "success" },
  [ProductCategoryId.EQUIPMENT]: { label: "Equipamento", severity: "warning" },
  [ProductCategoryId.CLEANING]: { label: "Limpeza", severity: "danger" },
};

const DEFAULT_PRODUCT_IMAGE =
  "https://www.sideralsaudeseguros.com.br/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-07-at-17.09.51-785x1024.jpeg";

export const ProductCardView = ({
  products,
  onEdit,
  openPurchase,
}: ProductCardViewProps) => {
  return (
    <div className="grid mt-2">
      {products.map((product) => {
        const cat = categoryMap[product[PostProductKeys.CATEGORY]];
        const isLowStock =
          product[PostProductKeys.QUANTITY] <=
          (product[PostProductKeys.MIN_QUANTITY] ?? 0);

        return (
          <div
            key={product.product_id}
            className="col-12 sm:col-6 lg:col-4 xl:col-3 p-3"
          >
            <div className="bg-white shadow-2 border-round-xl overflow-hidden flex flex-column h-full border-1 border-50 hover:shadow-4 transition-all transition-duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={DEFAULT_PRODUCT_IMAGE}
                  alt={product[PostProductKeys.NAME]}
                  className="w-full block"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="absolute top-0 right-0 m-2">
                  <Tag
                    value={cat?.label}
                    severity={cat?.severity}
                    className="shadow-2"
                  />
                </div>
              </div>

              <div className="p-3 flex flex-column flex-grow-1">
                <div className="flex justify-content-between align-items-start mb-2">
                  <span className="text-xs font-bold text-500 uppercase tracking-wider">
                    SAP:{" "}
                    <CopyContent
                      content={product[PostProductKeys.SAP_CODE]}
                      label={product[PostProductKeys.SAP_CODE]}
                    />
                  </span>
                </div>

                <h5
                  className="text-900 font-bold mb-1 text-truncate"
                  title={product[PostProductKeys.NAME]}
                >
                  {product[PostProductKeys.NAME]}
                </h5>

                <div className="flex align-items-center gap-2 mb-3">
                  <span
                    className={`text-sm ${isLowStock ? "text-red-500 font-bold" : "text-600"}`}
                  >
                    {product[PostProductKeys.QUANTITY]} em estoque
                  </span>
                </div>

                <div className="mt-auto pt-3 border-top-1 border-50 flex justify-content-between align-items-center">
                  <div className="flex flex-column">
                    <span className="text-xs text-500 font-medium">
                      Preço Unitário
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {Number(product[PostProductKeys.UNIT_VAL]).toLocaleString(
                        "pt-BR",
                        { style: "currency", currency: "BRL" },
                      )}
                    </span>
                  </div>

                  <div className="d-flex gap-2">
                    <Button
                      permission={[UserRole.ADMIN]}
                      icon={ButtonIcon.EDIT}
                      variant={ButtonVariant.GHOST}
                      severity={ButtonSeverity.INFO}
                      onClick={() => onEdit(product)}
                      isIconButton
                    />

                    <Button
                      icon={ButtonIcon.BUY}
                      variant={ButtonVariant.GHOST}
                      severity={ButtonSeverity.INFO}
                      onClick={() => openPurchase(product)}
                      isIconButton
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
