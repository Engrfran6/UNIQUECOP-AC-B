"use client";

import CartTemplate from "@/components/cart/CartTemplate";
import {withUserAuth} from "@/HOC/withUserAuth";

const UserCartItems = () => {
  return (
    <div>
      <CartTemplate />
    </div>
  );
};
export default withUserAuth(UserCartItems);
