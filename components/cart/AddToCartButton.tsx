"use client";

import {Button} from "@/components/ui/button";
import {useAuth} from "@/contexts/AuthContext";
import {useToast} from "@/hooks/use-toast";
import {useCartStore} from "@/store/use-cart-store";
import {Product} from "../ProductGrid";

export function AddToCartButton({product}: {product: Product}) {
  const addItem = useCartStore((state) => state.addItem);
  const {isAdmin} = useAuth();
  const {toast} = useToast();

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();

    if (isAdmin) {
      toast({
        title: "Admin Access",
        description: "Admins cannot add products to the cart.",
        variant: "destructive",
      });
      return;
    }

    if (!product.id) return {};

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image || product.images?.[0] || "/placeholder.svg",
    });

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Button
      className="w-full  border bg-muted-gold text-white hover:bg-muted-gold/70 hover:text-white rounded"
      onClick={(e) => handleAddToCart(product, e)}
      disabled={!product.inStock}>
      Add to Cart
    </Button>
  );
}
