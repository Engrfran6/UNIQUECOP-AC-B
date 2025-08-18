import {Product} from "@/components/ProductGrid";
import {CartItem} from "@/store/use-cart-store";
import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import {Order, OrderItem} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProductUrl = (product: CartItem | Product) => {
  const category = product?.category?.toLowerCase();
  return `/products/${category}/${product.id}`;
};

// Get status description for timeline
export function getStatusDescription(status: Order["status"]): string {
  const descriptions = {
    pending: "Order is pending payment confirmation",
    processing: "Order is being prepared for shipment",
    shipped: "Order has been shipped and is on its way",
    delivered: "Order has been delivered successfully",
    cancelled: "Order has been cancelled",
  };

  return descriptions[status] || `Order status updated to ${status}`;
}

// Generate order number
export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-6);
  return `ORD-${year}-${timestamp}`;
}

// Calculate order totals
export function calculateOrderTotals(items: OrderItem[], shippingCost = 8.99) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 75 ? 0 : shippingCost;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}
