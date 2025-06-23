import ProductDetail from '@/components/ProductDetails';
import {allProducts} from '@/data/data';

import {notFound} from 'next/navigation';
import {useMemo} from 'react';

interface PageProps {
  params: Promise<{
    category: string;
    id: number;
  }>;
}

export default async function ProductPage({params}: PageProps) {
  const fetchedProducts = useMemo(() => allProducts, []);
  const {category, id} = await params;

  const products = fetchedProducts[category as keyof typeof fetchedProducts];

  if (!products) {
    notFound();
  }

  const numericId = Number(id);
  const product = products.find((p) => p.id === numericId);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => p.id !== numericId).slice(0, 4);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
