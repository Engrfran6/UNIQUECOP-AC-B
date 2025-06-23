'use client';

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useToast} from '@/hooks/use-toast';
import {Heart, Minus, Plus, RotateCcw, Share2, Truck} from 'lucide-react';
import Image from 'next/image';
import {useState} from 'react';

import ProductGrid from '@/components/ProductGrid';
import {useCartStore} from '@/store/use-cart-store';
import ZoomableImage from './ZoomableImage';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  badge?: string;
  description: string;
  longDescription: string;
  colors: string[];
  inStock: boolean;
  stockCount: number;
  [key: string]: any;
}

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({product, relatedProducts}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const {toast} = useToast();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: Number(product.id),
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
    }

    toast({
      title: 'Added to cart!',
      description: `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // In a real app, this would redirect to checkout
    toast({
      title: 'Redirecting to checkout...',
      description: 'Taking you to complete your purchase.',
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Product link copied to clipboard.',
      });
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Images */}
          <div className="space-y-4">
            <ZoomableImage
              src={product.images[selectedImage] || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-[600px] object-cover rounded-lg"
            />

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-sage-green' : 'border-soft-taupe/20'
                    }`}>
                    <Image
                      src={image || '/placeholder.svg'}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              {product.badge && (
                <Badge className="bg-muted-gold/90 text-warm-white">{product.badge}</Badge>
              )}

              <h1 className="font-playfair text-4xl font-bold text-charcoal-gray">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-charcoal-gray">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-charcoal-gray/50 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-lg text-charcoal-gray/80">{product.description}</p>

              {/* Product Specs */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {product.scent && (
                  <div>
                    <span className="font-medium text-charcoal-gray">Scent:</span>
                    <span className="text-charcoal-gray/70 ml-2">{product.scent}</span>
                  </div>
                )}
                {product.burnTime && (
                  <div>
                    <span className="font-medium text-charcoal-gray">Burn Time:</span>
                    <span className="text-charcoal-gray/70 ml-2">{product.burnTime}</span>
                  </div>
                )}
                {product.size && (
                  <div>
                    <span className="font-medium text-charcoal-gray">Size:</span>
                    <span className="text-charcoal-gray/70 ml-2">{product.size}</span>
                  </div>
                )}
                {product.author && (
                  <div>
                    <span className="font-medium text-charcoal-gray">Author:</span>
                    <span className="text-charcoal-gray/70 ml-2">{product.author}</span>
                  </div>
                )}
                {product.pages && (
                  <div>
                    <span className="font-medium text-charcoal-gray">Pages:</span>
                    <span className="text-charcoal-gray/70 ml-2">{product.pages}</span>
                  </div>
                )}
                {product.volume && (
                  <div>
                    <span className="font-medium text-charcoal-gray">Volume:</span>
                    <span className="text-charcoal-gray/70 ml-2">{product.volume}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Color/Size Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-charcoal-gray">
                {product.category === 'Books'
                  ? 'Format'
                  : product.category === 'Scents'
                  ? 'Size'
                  : 'Color'}
                :
              </label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-charcoal-gray">Quantity:</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium text-charcoal-gray w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stockCount}
                  className="h-10 w-10">
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-charcoal-gray/60">
                  ({product.stockCount} available)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 btn-accent">
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`${isWishlisted ? 'text-dusty-rose border-dusty-rose' : ''}`}>
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full btn-primary"
                size="lg">
                Buy It Now
              </Button>
            </div>

            {/* Delivery & Returns */}
            <Card className="bg-creamy-beige border-soft-taupe/20">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-sage-green mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-medium text-charcoal-gray">Delivery</div>
                    <div className="text-sm text-charcoal-gray/70">
                      Estimate delivery times: 12-26 days (International), 3-6 days (United States)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RotateCcw className="h-5 w-5 text-sage-green mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-medium text-charcoal-gray">Returns</div>
                    <div className="text-sm text-charcoal-gray/70">
                      Return within 45 days of purchase. Duties & taxes are non-refundable.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-creamy-beige">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                    Product Description
                  </h3>
                  <p className="text-charcoal-gray/80 leading-relaxed">{product.longDescription}</p>

                  {product.notes && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-charcoal-gray mb-2">Scent Notes:</h4>
                      <p className="text-charcoal-gray/70">{product.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                      Shipping Information
                    </h3>
                    <div className="space-y-3 text-charcoal-gray/80">
                      <p>
                        <strong>United States:</strong> 3-6 business days via standard shipping
                      </p>
                      <p>
                        <strong>International:</strong> 12-26 business days depending on location
                      </p>
                      <p>
                        <strong>Express Shipping:</strong> Available at checkout for faster delivery
                      </p>
                      <p>Free shipping on orders over $75 within the United States.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                      Returns & Exchanges
                    </h3>
                    <div className="space-y-3 text-charcoal-gray/80">
                      <p>We accept returns within 45 days of purchase for a full refund.</p>
                      <p>Items must be unused and in original packaging.</p>
                      <p>Customer is responsible for return shipping costs.</p>
                      <p>Duties & taxes are non-refundable for international orders.</p>
                      <p>Personalized or custom items cannot be returned unless defective.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* You Might Also Like */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-8 text-center">
              You Might Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
