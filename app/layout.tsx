import {Toaster} from "@/components/ui/toaster";
import {AuthProvider} from "@/contexts/AuthContext";
import type {Metadata} from "next";
import {Inter, Playfair_Display} from "next/font/google";
import type React from "react";
import "./globals.css";
import {Providers} from "./Provider";

const inter = Inter({subsets: ["latin"]});
const playfair = Playfair_Display({subsets: ["latin"], variable: "--font-playfair"});

export const metadata: Metadata = {
  title: "Uniquecop AC&B - Premium Handcrafted Candles",
  description:
    "Discover our collection of premium handcrafted candles, wax melts, and home fragrance accessories.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable}`}>
        <Providers>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
