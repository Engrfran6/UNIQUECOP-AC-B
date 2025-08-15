"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import UserHeader from "@/components/UserHeader";
import {useAuth} from "@/contexts/AuthContext";
import {usePathname, useRouter} from "next/navigation";
import type React from "react";
import {useEffect} from "react";

const UserLayout = ({children}: {children: React.ReactNode}) => {
  const {user, loading, isGuest} = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const title = pathname.startsWith("/user/orders")
    ? "My Orders"
    : pathname.startsWith("/user/account")
    ? "Account Settings"
    : "";

  useEffect(() => {
    if (!loading && !user && !isGuest) {
      router.push("/auth/signin");
    }
  }, [user, loading, isGuest, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <UserHeader title={title} />
      <main>{children}</main>
    </>
  );
};

export default UserLayout;
