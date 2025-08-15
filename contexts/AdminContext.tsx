"use client";

import {useAuth} from "@/contexts/AuthContext";
import {toast} from "@/hooks/use-toast";
import {uploadSampleProducts} from "@/lib/bulkUpload";
import {db} from "@/lib/firebase";
import {fetchAllAndGroupedProducts} from "@/lib/products";
import {AdminCustomer, AdminOrder, AdminProduct} from "@/lib/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {createContext, useContext, useEffect, useState} from "react";

// ✅ Extend the interface to include all returned values
interface AdminContextType {
  adminData: any;
  hasPermission: (permission: string) => boolean;
  loading: boolean;
  bulkLoading: boolean;
  products: AdminProduct[];
  orders: AdminOrder[];
  customers: AdminCustomer[];
  refetchAll: () => Promise<void>;
  handleCreateProduct: (newProduct: AdminProduct) => Promise<void>;
  handleDeleteProduct: (category: string, productId: string) => Promise<void>;
  handleEditProduct: (updatedData: Partial<AdminProduct>) => Promise<void>;

  updateOrderStatus: (orderId: string, newStatus: string) => Promise<void>;
  handleBulkUpload: () => Promise<void>;

  // 🔽 Metrics and chart data
  totalProducts: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  salesData: {
    date: string;
    sales: number;
    orders: number;
  }[];
  categoryChartData: {
    name: string;
    value: number;
  }[];
  statusChartData: {
    name: string;
    value: number;
  }[];
}

// ✅ Create the context
const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({children}: {children: React.ReactNode}) => {
  const {adminData, hasPermission} = useAuth();
  const [loading, setLoading] = useState(true);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);

  useEffect(() => {
    if (adminData) {
      fetchAllData();
    }
  }, [adminData]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchProducts(), fetchOrders(), fetchCustomers()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const {allProducts} = await fetchAllAndGroupedProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    const snapshot = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
    setOrders(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as AdminOrder[]
    );
  };

  const fetchCustomers = async () => {
    const snapshot = await getDocs(query(collection(db, "users"), orderBy("createdAt", "desc")));
    setCustomers(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        totalOrders: 0,
        totalSpent: 0,
      })) as AdminCustomer[]
    );
  };

  const handleCreateProduct = async (newProduct: AdminProduct) => {
    if (!hasPermission("manage_products")) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to add products",
        variant: "destructive",
      });
      return;
    }

    try {
      const productRef = doc(collection(db, newProduct.category.toLowerCase()));

      await setDoc(productRef, {
        ...newProduct,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      toast({
        title: "Success",
        description: "Product created successfully",
      });

      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (category: string, productId: string) => {
    if (!hasPermission("manage_products")) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to delete products",
        variant: "destructive",
      });
      return;
    }

    try {
      const productRef = doc(db, category.toLowerCase(), productId);
      await deleteDoc(productRef);

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = async (updatedData: Partial<AdminProduct>) => {
    if (!hasPermission("manage_products")) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to edit products",
        variant: "destructive",
      });
      return;
    }

    try {
      const productRef = doc(db, updatedData.category?.toLowerCase()!, updatedData.id!);
      await updateDoc(productRef, {
        ...updatedData,
        updatedAt: new Date(),
      });

      toast({
        title: "Success",
        description: "Product updated successfully",
      });

      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    if (!hasPermission("manage_orders")) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to update orders",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
      });
      toast({
        title: "Success",
        description: "Order status updated",
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const handleBulkUpload = async () => {
    setBulkLoading(true);
    try {
      const result = await uploadSampleProducts();
      console.log("saved upload products via bulk upload====>", result);
      toast({
        title: "Bulk Upload Complete",
        description: `Uploaded ${result.success} products. ${result.errors.length} errors.`,
        variant: result.errors.length > 0 ? "destructive" : "default",
      });
      fetchProducts(); // Refresh product list after upload
    } catch (error) {
      console.error("Bulk upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload sample products",
        variant: "destructive",
      });
    } finally {
      setBulkLoading(false);
    }
  };

  // ✅ Metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;
  const totalCustomers = customers.length;
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const conversionRate = totalCustomers > 0 ? (totalOrders / totalCustomers) * 100 : 0;

  // ✅ Sales data for chart
  const last7Days = Array.from({length: 7}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  }).reverse();

  const salesData = last7Days.map((date) => {
    const dayOrders = orders.filter(
      (order) => order.createdAt.toISOString().split("T")[0] === date
    );
    return {
      date: new Date(date).toLocaleDateString("en-US", {weekday: "short"}),
      sales: dayOrders.reduce((sum, order) => sum + order.total, 0),
      orders: dayOrders.length,
    };
  });

  // ✅ Category chart
  const categoryData = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  // ✅ Status chart
  const statusData = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = Object.entries(statusData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  return (
    <AdminContext.Provider
      value={{
        adminData,
        hasPermission,
        loading,
        bulkLoading,
        products,
        orders,
        customers,
        refetchAll: fetchAllData,
        handleCreateProduct,
        handleDeleteProduct,
        handleEditProduct,
        updateOrderStatus,
        handleBulkUpload,
        totalProducts,
        totalRevenue,
        averageOrderValue,
        conversionRate,
        salesData,
        categoryChartData,
        statusChartData,
      }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
