"use client";

import CartTemplate from "@/components/cart/CartTemplate";
import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const HomeCart = () => {
  const {isAdmin} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      router.push("/admin");
    }
  }, [isAdmin, router]);

  return (
    <div>
      <CartTemplate />
    </div>
  );
};
export default HomeCart;
