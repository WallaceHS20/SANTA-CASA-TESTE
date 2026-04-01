import { useState } from "react";
import type { IGetProductResponse } from "@/Interfaces/Products";

export const useProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IGetProductResponse | null>(null);

  const openAdd = () => {
    setEditingProduct(null);
    setIsOpen(true);
  };

  const openEdit = (product: IGetProductResponse) => {
    setEditingProduct(product);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditingProduct(null);
  };

  return { isOpen, editingProduct, openAdd, openEdit, close };
};