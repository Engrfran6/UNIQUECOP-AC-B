"use client";

import {useAdmin} from "@/contexts/AdminContext";
import {AdminProduct} from "@/lib/types";
import {ProductForm} from "../ProductForm";

export default function AddProductPage() {
  const {handleCreateProduct} = useAdmin();

  const handleCreate = async (data: AdminProduct) => {
    await handleCreateProduct(data);
  };

  return <ProductForm mode="create" onSubmit={handleCreate} />;
}
