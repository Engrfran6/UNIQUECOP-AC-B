"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {useAdmin} from "@/contexts/AdminContext";
import {AdminProduct} from "@/lib/types";
import {Edit, Plus, Star, Trash2} from "lucide-react";
import Link from "next/link";
import {ProductForm} from "./ProductForm";

const ProductsView = () => {
  const {products, hasPermission, handleDeleteProduct, handleEditProduct} = useAdmin();

  const handleUpdate = async (data: AdminProduct) => {
    await handleEditProduct(data);
  };

  return (
    <section className="space-y-6">
      {/* Products Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button asChild className="flex items-center gap-2">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory ({products?.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    {product.badge && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {product.badge}
                      </Badge>
                    )}
                    {product.stockCount <= 5 && <Badge variant="destructive">Low Stock</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <Badge variant="outline" className="border-green-300 text-green-700">
                      {product.category}
                    </Badge>
                    <span className="font-medium">${product.price}</span>
                    <span>Stock: {product.stockCount}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hasPermission("manage_products") && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-h-[90vh] overflow-y-auto bg-gray-300 min-w-[50%]">
                          <DialogTitle className="hidden"></DialogTitle>
                          <ProductForm
                            key={product.id}
                            mode="edit"
                            initialData={product}
                            onSubmit={(data) => handleUpdate(data)}
                          />
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-h-[90vh] overflow-y-auto bg-gray-300 min-w-[50%]">
                          <DialogHeader>
                            <DialogTitle className="text-red-700">Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this product? This action cannot be
                              undone.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="flex justify-end gap-4 mt-6">
                            <Button variant="outline">Cancel</Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteProduct(product.category, product.id!)}>
                              Confirm Delete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
export default ProductsView;
