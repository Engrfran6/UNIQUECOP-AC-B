import {Timestamp} from "firebase/firestore";

// export interface AdminProduct {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   category: "Candles" | "Wax" | "Books" | "Collections";
//   description: string;
//   longDescription: string;
//   images: string[];
//   badge?: string;
//   rating: number;
//   reviews: number;
//   inStock: boolean;
//   stockCount: number;
//   colors?: string[];
//   scent?: string;
//   burnTime?: string;
//   size?: string;
//   author?: string;
//   pages?: string;
//   genre?: string;
//   type?: string;
//   volume?: string;
//   tags?: string[];
//   notes?: string;
//   products?: string[];
//   href?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export interface ProductCategoryType {
  candles: AdminProduct[];
  wax: AdminProduct[];
  books: AdminProduct[];
  collections: AdminProduct[];
}

export interface AdminProduct {
  id?: string;
  name: string;
  price: number;
  originalPrice: number | undefined;
  ratingbadge: string;
  rating: number;
  reviews: number;
  images: string[];
  category: "Candles" | "wax" | "Books" | "Collections";
  description: string;
  longDescription: string;
  colors: string[];
  inStock: boolean;
  stockCount: number;

  // Optional properties based on category
  badge?: string;
  topRated?: boolean;
  featured?: boolean;
  bestSelling?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  tags: string[];

  // Candle-specific
  scent?: string;
  burnTime?: string;
  size?: string;

  // Wax-specific
  type?: string;
  volume?: string;
  notes?: string;

  // Book-specific
  author?: string;
  pages?: string;
  genre?: string;

  // Collection-specific
  products?: string[];
  href?: string;
}

export interface AdminOrder {
  id: string;
  userId: string;
  userEmail: string;
  items: any[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  shippingAddress: any;
  paymentMethod: string;
}

export interface AdminCustomer {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  totalOrders: number;
  totalSpent: number;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type ShippingMethod = "standard" | "express" | "overnight";

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id?: string;
  userId: string | null;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: {
    type: "card" | "bank_transfer";
    provider: "paystack" | "opay";
  };
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  orderNotes?: string;
  method?: ShippingMethod;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentReference?: string;
  trackingNumber?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  timeline?: OrderTimelineEvent[];
}

export interface OrderTimelineEvent {
  status: string;
  date: string;
  time: string;
  description?: string;
}
