"use client";

import ProductDetail from "@/components/ProductDetails";
import {AdminProduct} from "@/lib/types";
import {useProductStore} from "@/store/use-product-store";
import {useEffect} from "react";

interface Props {
  product: AdminProduct;
  relatedProducts: AdminProduct[];
}

export default function ProductDetailWrapper({product, relatedProducts}: Props) {
  const setProduct = useProductStore((state) => state.setProduct);

  useEffect(() => {
    setProduct(product);
  }, [product]);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
