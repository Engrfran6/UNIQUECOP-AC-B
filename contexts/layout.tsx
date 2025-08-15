import {Toaster} from "@/components/ui/toaster";
import {AuthProvider} from "@/contexts/AuthContext";
import {CartProvider} from "@/contexts/CartContext";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Uniquecop AC&B - Premium Handcrafted Candles",
  description:
    "Discover our collection of premium handcrafted candles, wax melts, and home fragrance accessories.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
