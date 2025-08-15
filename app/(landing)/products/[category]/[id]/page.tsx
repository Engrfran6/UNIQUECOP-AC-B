// app/(landing)/products/[category]/[id]/page.tsx
import ProductDetailWrapper from "@/components/ProductDetailsWrapper";
import {fetchAllAndGroupedProducts} from "@/lib/products";
import {notFound} from "next/navigation";

interface PageProps {
  params: {
    category: string;
    id: string;
  };
}

export default async function ProductPage({params}: PageProps) {
  const {category, id} = params;

  const {groupedProducts} = await fetchAllAndGroupedProducts();

  const products = groupedProducts[category];

  if (!products) {
    notFound();
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 4);

  return <ProductDetailWrapper product={product} relatedProducts={relatedProducts} />;
}
