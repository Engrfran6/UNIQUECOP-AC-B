"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {useAuth} from "@/contexts/AuthContext";
import {cn} from "@/lib/utils";
import {
  BarChart3,
  FileText,
  Home,
  Package,
  Settings,
  Shield,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {Badge} from "./ui/badge";

const AdminSidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams!.get("status");
  const {hasPermission, adminLevel} = useAuth();

  const isActivePath = (href: string, exact: boolean = true) => {
    if (exact) return pathname === href;
    return pathname!.startsWith(href);
  };

  const isActiveWithStatus = (href: string, expectedStatus: string) => {
    return pathname === href && status === expectedStatus;
  };

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active
        ? "bg-blue-50 text-blue-700 border border-blue-200"
        : "text-gray-700 hover:!bg-gray-50 hover:text-gray-900"
    }`;

  const SidebarLink = ({
    href,
    children,
    active,
    classnames,
  }: {
    href: string;
    children: React.ReactNode;
    active: boolean;
    classnames?: string;
  }) => (
    <Link href={href} className={cn(linkClass(active), classnames)}>
      {children}
    </Link>
  );

  const menuItems = [
    {name: "Dashboard", href: "/admin", icon: Home, permission: null},
    {name: "Products", href: "/admin/products", icon: Package, permission: "manage_products"},
    {name: "Orders", href: "/admin/orders", icon: ShoppingCart, permission: "view_orders"},
    {name: "Customers", href: "/admin/customers", icon: Users, permission: "view_analytics"},
    {name: "Analytics", href: "/admin/analytics", icon: BarChart3, permission: "view_analytics"},
    {name: "Reports", href: "/admin/reports", icon: FileText, permission: "view_reports"},
    {name: "Admin Users", href: "/admin/admins", icon: Shield, permission: "manage_admins"},
    {name: "Settings", href: "/admin/settings", icon: Settings, permission: "manage_settings"},
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !item.permission || hasPermission(item.permission)
  );

  return (
    <Sidebar className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <SidebarContent className="p-6">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-8 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Admin Panel</span>
            </div>
            <Badge variant="outline" className="text-xs bg-blue-600 text-white">
              {adminLevel?.toUpperCase()} ACCESS
            </Badge>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {filteredMenuItems.map(({name, href, icon: Icon}) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton asChild>
                    <SidebarLink href={href} active={isActivePath(href)}>
                      <Icon className="h-4 w-4" />
                      {name}
                    </SidebarLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* QUICK ACTIONS */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Quick Actions</div>
                <div className="space-y-1">
                  <SidebarLink
                    href="/admin/products/new"
                    active={isActivePath("/admin/products/new")}
                    classnames="text-xs text-gray-500">
                    Add Product
                  </SidebarLink>

                  <SidebarLink
                    href="/admin/orders?status=pending"
                    active={isActiveWithStatus("/admin/orders", "pending")}
                    classnames="text-xs text-gray-500">
                    Pending Orders
                  </SidebarLink>

                  <SidebarLink
                    href="/admin/reports"
                    active={isActivePath("/admin/reports")}
                    classnames="text-xs text-gray-500">
                    View Reports
                  </SidebarLink>
                </div>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
