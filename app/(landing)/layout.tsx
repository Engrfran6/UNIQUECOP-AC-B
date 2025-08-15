import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type {Metadata} from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Uniquecop Candles - Premium Handcrafted Candles",
  description:
    "Discover our collection of premium handcrafted candles, wax melts, and home fragrance accessories.",
};

export default function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
