"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AdminProvider} from "@/contexts/AdminContext";
import {useAuth} from "@/contexts/AuthContext";
import type React from "react";

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const {isAdmin, adminData} = useAuth();

  if (!isAdmin || !adminData) return null;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarProvider>
        <AdminProvider>
          <AdminSidebar />
          <div className="w-full">
            <AdminHeader user={adminData} adminLevel={adminData.level} />
            <SidebarTrigger />
            <div className="p-6">{children}</div>
          </div>
        </AdminProvider>
      </SidebarProvider>
    </div>
  );
}
