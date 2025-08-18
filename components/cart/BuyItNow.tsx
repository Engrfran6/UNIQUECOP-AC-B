import {Product} from "@/components/ProductGrid";
import {useRouter} from "next/navigation";
import {Button} from "../ui/button";

export function BuyItNowButton({product}: {product: Product}) {
  const router = useRouter();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();

    const query = new URLSearchParams({
      id: product.id,
      name: product.name,
      price: String(product.price),
      image: product.image || product.images?.[0] || "/placeholder.svg",
      category: product.category,
    }).toString();

    router.push(`/user/checkout?buyNow=true&${query}`);
  };

  return (
    <Button
      onClick={handleBuyNow}
      disabled={!product.inStock}
      className="w-full  hover:bg-sage-green/90 hover:text-white border text-sage-green px-6 py-3 rounded font-medium transition-colors"
      size="lg">
      Buy It Now
    </Button>
  );
}
