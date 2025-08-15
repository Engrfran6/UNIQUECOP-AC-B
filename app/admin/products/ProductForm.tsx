"use client";

import Link from "next/link";
import type React from "react";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {useAdmin} from "@/contexts/AdminContext";
import {useToast} from "@/hooks/use-toast";
import {AdminProduct} from "@/lib/types";
import {UploadButton} from "@/lib/uploadthing";
import {useProductStore} from "@/store/use-product-store";
import {Package, Upload} from "lucide-react";
import {useRouter} from "next/navigation";

type Mode = "create" | "edit";

interface ProductFormProps {
  mode: Mode;
  initialData?: Partial<AdminProduct>;
  onSubmit?: (data: AdminProduct) => Promise<void>;
}

export const ProductForm: React.FC<ProductFormProps> = ({mode, initialData, onSubmit}) => {
  const {hasPermission} = useAdmin();
  const setProduct = useProductStore((state) => state.setProduct);
  const {toast} = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const defaultValues = {
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    description: "",
    longDescription: "",
    images: "",
    badge: "none",
    rating: "4.5",
    reviews: "0",
    stockCount: "",
    colors: "",
    ratingBadge: "",
    tags: "",
    scent: "",
    burnTime: "",
    size: "",
    author: "",
    pages: "",
    genre: "",
    type: "",
    volume: "",
    notes: "",
    products: "",
    href: "",
  };

  const [item, setItem] = useState(() => {
    if (mode === "edit" && initialData) {
      return {
        ...defaultValues,
        ...initialData,
        price: initialData.price?.toString() || "",
        originalPrice: initialData.originalPrice?.toString() || "",
        stockCount: initialData.stockCount?.toString() || "",
        rating: initialData.rating?.toString() || "4.5",
        reviews: initialData.reviews?.toString() || "0",
        colors: Array.isArray(initialData.colors) ? initialData.colors.join(", ") : "",
        images: Array.isArray(initialData.images) ? initialData.images.join(",") : "",
        products: Array.isArray(initialData.products) ? initialData.products.join(", ") : "",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : "",
      };
    }

    return defaultValues;
  });

  if (!hasPermission("manage_products")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to manage products.</p>
            <Button asChild>
              <Link href="/admin">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Required fields for create mode only
    if (mode === "create") {
      if (!item.name || !item.category || !item.price) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);

    try {
      const productData: AdminProduct = {
        name: item.name,
        price: parseFloat(item.price),
        originalPrice: item.originalPrice ? parseFloat(item.originalPrice) : undefined,
        category: item.category as any,
        description: item.description,
        longDescription: item.longDescription,
        images: item.images
          .split(",")
          .map((img) => img.trim())
          .filter((img) => img),
        badge: item.badge || undefined,
        rating: parseFloat(item.rating),
        reviews: parseInt(item.reviews),
        inStock: true,
        stockCount: parseInt(item.stockCount) || 0,
        ratingbadge: item.ratingBadge,
        tags: item.tags
          .split(",")
          .map((img) => img.trim())
          .filter((img) => img),
        colors: item.colors ? item.colors.split(",").map((c) => c.trim()) : [],
        ...(item.category === "Candles" && {
          scent: item.scent,
          burnTime: item.burnTime,
          size: item.size,
        }),
        ...(item.category === "Books" && {
          author: item.author,
          pages: item.pages,
          genre: item.genre,
        }),
        ...(item.category === "Wax" && {
          type: item.type,
          volume: item.volume,
          notes: item.notes,
        }),
        ...(item.category === "Collections" && {
          products: item.products ? item.products.split(",").map((p) => p.trim()) : [],
          href: item.href,
        }),
      };

      if (onSubmit) {
        await onSubmit(productData);

        setProduct(productData);
      }

      toast({
        title: "Success",
        description:
          mode === "create" ? "Product added successfully" : "Product updated successfully",
      });

      router.push("/admin/products/preview");
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: `Failed to ${mode} product`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {mode === "create" ? "Add New Product" : "Edit Product"}
        </h1>
        <p className="text-gray-600">
          {mode === "create"
            ? "Create a new product for your store"
            : "Update the product information"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={item.name}
                  onChange={(e) => setItem({...item, name: e.target.value})}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={item.category}
                  onValueChange={(value) => setItem({...item, category: value})}
                  required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-muted-gold rounded">
                    <SelectItem value="Candles">Candles</SelectItem>
                    <SelectItem value="Wax">Wax Melts</SelectItem>
                    <SelectItem value="Books">Books</SelectItem>
                    <SelectItem value="Collections">Collections</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => setItem({...item, price: e.target.value})}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price ($)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  value={item.originalPrice}
                  onChange={(e) => setItem({...item, originalPrice: e.target.value})}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockCount">Stock Quantity</Label>
                <Input
                  id="stockCount"
                  type="number"
                  value={item.stockCount}
                  onChange={(e) => setItem({...item, stockCount: e.target.value})}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="badge">Badge</Label>
                <Select
                  value={item.badge}
                  onValueChange={(value) => setItem({...item, badge: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select badge (optional)" />
                  </SelectTrigger>
                  <SelectContent className="bg-muted-gold rounded">
                    <SelectItem className="cursor-pointer" value="empty">
                      No Badge
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Best Seller">
                      Best Seller
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="New">
                      New
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Featured">
                      Featured
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Limited Edition">
                      Limited Edition
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Sale">
                      Sale
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  value={item.description}
                  onChange={(e) => setItem({...item, description: e.target.value})}
                  placeholder="Brief product description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea
                  id="longDescription"
                  value={item.longDescription}
                  onChange={(e) => setItem({...item, longDescription: e.target.value})}
                  placeholder="Detailed product description"
                  rows={4}
                />
              </div>
            </div>

            {/* Images and Colors */}
            <div className="space-y-4">
              {/* <div className="space-y-2">
                <Label htmlFor="images">Images (comma-separated URLs)</Label>
                <Textarea
                  id="images"
                  value={product.images}
                  onChange={(e) => setItem({...product, images: e.target.value})}
                  placeholder="/products/image1.jpg, /products/image2.jpg"
                  rows={2}
                />
              </div> */}
              <div className="bg-black/45 p-4 rounded">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (!res) return;

                    const urls = res.map((file) => file.ufsUrl);
                    setItem((prev) => ({
                      ...prev,
                      images: urls.join(","),
                    }));

                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                  className="mb-4"
                />

                <div className="border-t" />

                {item.images && (
                  <div className="flex gap-2 justify-evenly flex-wrap mt-4 ">
                    {item.images.split(",").map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`product image ${i + 1}`}
                        className="w-20 h-20 object-cover border rounded"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="colors">Colors/Variants (comma-separated)</Label>
                <Input
                  id="colors"
                  value={item.colors}
                  onChange={(e) => setItem({...item, colors: e.target.value})}
                  placeholder="Natural, Black, White"
                />
              </div>
            </div>

            {/* Category-specific fields */}
            {item.category === "Candles" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Candle Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scent">Scent</Label>
                    <Input
                      id="scent"
                      value={item.scent}
                      onChange={(e) => setItem({...item, scent: e.target.value})}
                      placeholder="Vanilla & Amber"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="burnTime">Burn Time</Label>
                    <Input
                      id="burnTime"
                      value={item.burnTime}
                      onChange={(e) => setItem({...item, burnTime: e.target.value})}
                      placeholder="45-50 hours"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Size</Label>
                    <Input
                      id="size"
                      value={item.size}
                      onChange={(e) => setItem({...item, size: e.target.value})}
                      placeholder="8 oz"
                    />
                  </div>
                </div>
              </div>
            )}

            {item.category === "Books" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Book Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={item.author}
                      onChange={(e) => setItem({...item, author: e.target.value})}
                      placeholder="Author Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pages">Pages</Label>
                    <Input
                      id="pages"
                      value={item.pages}
                      onChange={(e) => setItem({...item, pages: e.target.value})}
                      placeholder="Under 200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Input
                      id="genre"
                      value={item.genre}
                      onChange={(e) => setItem({...item, genre: e.target.value})}
                      placeholder="Self-Help"
                    />
                  </div>
                </div>
              </div>
            )}

            {item.category === "Wax" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Wax Melt Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      value={item.type}
                      onChange={(e) => setItem({...item, type: e.target.value})}
                      placeholder="Essential Oil"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume</Label>
                    <Input
                      id="volume"
                      value={item.volume}
                      onChange={(e) => setItem({...item, volume: e.target.value})}
                      placeholder="15ml"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input
                      id="notes"
                      value={item.notes}
                      onChange={(e) => setItem({...item, notes: e.target.value})}
                      placeholder="Lavender, Bergamot"
                    />
                  </div>
                </div>
              </div>
            )}

            {item.category === "Collections" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Collection Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="products">Products (comma-separated)</Label>
                    <Textarea
                      id="products"
                      value={item.products}
                      onChange={(e) => setItem({...item, products: e.target.value})}
                      placeholder="Product 1, Product 2, Product 3"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="href">Collection URL</Label>
                    <Input
                      id="href"
                      value={item.href}
                      onChange={(e) => setItem({...item, href: e.target.value})}
                      placeholder="/collections/zen"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" disabled={loading} className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                {loading
                  ? mode === "create"
                    ? "Adding..."
                    : "Saving..."
                  : mode === "create"
                  ? "Add Product"
                  : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
