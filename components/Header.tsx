"use client";

import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {toast} from "@/components/ui/use-toast";
import {useAuth} from "@/contexts/AuthContext";
import {getUserOrders} from "@/lib/orders";
import {Order} from "@/lib/types";
import {useCartStore} from "@/store/use-cart-store";
import {useSearchStore} from "@/store/use-search-store";
import {
  Loader2,
  LogOut,
  Menu,
  Phone,
  RotateCcw,
  Search,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const {user, isAdmin, isGuest, logout} = useAuth();
  const pathname = usePathname();
  const {openSearch} = useSearchStore();

  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const userOrders = await getUserOrders(user.uid);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast({
          title: "Error loading orders",
          description: "Failed to load your orders. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user, toast]);

  const navigation = [
    {name: "Shop Now", href: "/products/shop"},
    {name: "Candles", href: "/products/candles"},
    {name: "Wax Melts", href: "/products/wax"},
    {name: "Books", href: "/products/books"},
    {name: "Collections", href: "/products/collections"},
  ] as const;

  const topNavigation = [
    {name: "Contact Us", href: "/contact", icon: Phone},
    {name: "About", href: "/about", icon: User},
    {name: "Shipping Info", href: "/shipping", icon: Truck},
    {name: "Returns", href: "/returns", icon: RotateCcw},
    {name: "Size Guide", href: "/size-guide"},
  ];

  const searchableRoutes = [
    navigation[0].href,
    navigation[1].href,
    navigation[2].href,
    navigation[3].href,
    navigation[4].href,
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const isSearch = searchableRoutes.some((route) => pathname.startsWith(route));

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b border-soft-taupe/20">
      {/* Top Navigation Bar */}
      <div className="bg-sage-green/10 border-b border-sage-green/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            {/* Left side - Support links */}
            <div className="hidden md:flex items-center space-x-6 navbar">
              {topNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center space-x-1 text-charcoal-gray/80 hover:text-sage-green transition-colors ${
                    pathname.startsWith(item.href) && "text-muted-gold"
                  }`}>
                  {item.icon && <item.icon className="h-3 w-3" />}
                  <span>{item.name}</span>
                  {pathname.startsWith(item.href) && (
                    <span className="absolute left-0 -bottom-[11px] w-full h-0.5 bg-muted-gold"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Center - Promotional message */}
            <div className="text-center text-charcoal-gray/80 animate-pulse">
              <span className="hidden sm:inline">Free shipping on orders over $50 • </span>
              <span>Handcrafted with love</span>
            </div>

            {/* Right side - User account links */}
            <div className="flex items-center space-x-4">
              {user && !isGuest && !isAdmin && (
                <>
                  <Link
                    href="/user/orders"
                    className={`relative flex items-center text-charcoal-gray/80 hover:text-sage-green transition-colors ${
                      pathname.startsWith("/user/orders") && "text-muted-gold"
                    }`}>
                    My Orders
                    <sup>
                      {isLoading ? (
                        <Loader2 size={10} className="animate-spin" />
                      ) : (
                        <span className="h-5 w-5 flex items-center justify-center border rounded-full bg-muted-gold text-white ml-1 text-xs">
                          {orders.length}
                        </span>
                      )}
                    </sup>
                    {pathname.startsWith("/user/orders") && (
                      <span className="absolute left-0 -bottom-[11px] w-full h-0.5 bg-muted-gold"></span>
                    )}
                  </Link>
                </>
              )}
              <Link
                href="/our-story"
                className={`relative hidden md:inline items-center text-charcoal-gray/80 hover:text-sage-green transition-colors ${
                  pathname.startsWith("/our-story") && "text-muted-gold"
                }`}>
                Our Story
                {pathname.startsWith("/our-story") && (
                  <span className="absolute left-0 -bottom-[11px] w-full h-0.5 bg-muted-gold"></span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-tight">
            <span className="font-playfair text-sm md:text-2xl font-bold text-charcoal-gray tracking-wide">
              UNIQUECOP
            </span>
            <span className="text-[10px] italic md:text-xs text-sage-green tracking-wider group-hover:text-muted-gold transition-colors">
              Artisanal Candles & Books
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative navbar italic text-charcoal-gray hover:text-sage-green transition-colors font-medium ${
                  pathname.startsWith(item.href) && "text-muted-gold"
                }`}>
                {item.name}
                {pathname.startsWith(item.href) && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-muted-gold"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {isSearch && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openSearch}
                className="text-charcoal-gray hover:text-sage-green">
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Account */}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                      <AvatarFallback className="bg-sage-green text-warm-white">
                        {getInitials(user.displayName || user.email || "U")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 bg-white mt-3 rounded-xl shadow-xl border border-soft-taupe/30 p-0"
                  align="end"
                  forceMount>
                  <div className="flex items-center gap-3 px-4 py-3 bg-sage-green/10 rounded-t-xl border-b border-soft-taupe/20">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                      <AvatarFallback className="bg-sage-green text-warm-white text-lg">
                        {getInitials(user.displayName || user.email || "U")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      {user.displayName && (
                        <p className="font-semibold text-charcoal-gray truncate">
                          {user.displayName}
                        </p>
                      )}
                      {user.email && (
                        <p className="w-[160px] truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator className="my-0" />
                  {!isAdmin && (
                    <>
                      <DropdownMenuItem
                        asChild
                        className="px-4 py-3 hover:bg-sage-green/10 rounded-none">
                        <Link
                          href="/user/account"
                          className="flex items-center gap-2 text-charcoal-gray/90 hover:text-sage-green transition-colors w-full">
                          <User className="h-4 w-4" />
                          <span>My Account</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="px-4 py-3 hover:bg-sage-green/10 rounded-none">
                        <Link
                          href="/user/orders"
                          className={`flex items-center gap-2 text-charcoal-gray/90 hover:text-sage-green transition-colors w-full ${
                            pathname.startsWith("/user/orders") ? "text-muted-gold" : ""
                          }`}>
                          <ShoppingBag className="h-4 w-4" />
                          <span>My Orders</span>
                          <sup>
                            {isLoading ? (
                              <Loader2 size={10} className="animate-spin ml-1" />
                            ) : (
                              <span className="ml-1 h-5 w-5 flex items-center justify-center border rounded-full bg-muted-gold text-white text-xs">
                                {orders.length}
                              </span>
                            )}
                          </sup>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="my-0" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="px-4 py-3 text-dusty-rose hover:bg-dusty-rose/10 rounded-b-xl cursor-pointer flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isGuest ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center text-sm text-charcoal-gray/70">
                  <User className="h-5 w-5" />
                  Guest
                </span>
                <Link href="/auth/signin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sage-green hover:text-sage-green/80">
                    Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth/signin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-5 text-sage-green border-sage-green hover:bg-sage-green/10 hover:text-sage-green transition-colors font-medium rounded-full">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    variant="default"
                    size="sm"
                    className="px-4 bg-muted-gold text-white hover:bg-dusty-rose/90 transition-colors font-medium rounded-full shadow">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                disabled={isAdmin}
                className="text-charcoal-gray hover:text-sage-green">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-dusty-rose text-warm-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-charcoal-gray bg-muted-foreground">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-warm-white/90">
                <nav className="flex flex-col space-y-4 mt-8">
                  {/* Main Navigation */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-muted-gold">Shop</h3>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-charcoal-gray hover:text-muted-gold transition-colors font-medium text-sm block pl-4 navbar">
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Support Links */}
                  <div className="space-y-4 pt-4 border-t border-soft-taupe/20">
                    <h3 className="font-semibold text-muted-gold">Support</h3>
                    {topNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-charcoal-gray text-sm hover:text-sage-green transition-colors font-medium block pl-4 navbar">
                        {item.name}
                      </Link>
                    ))}
                    {!isAdmin && (
                      <Link
                        href="/orders"
                        className="text-charcoal-gray hover:text-sage-green transition-colors font-medium block pl-4">
                        My Orders
                      </Link>
                    )}
                  </div>
                  {!user && !isGuest && (
                    <>
                      <Link href="/auth/signin">
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-5 text-sage-green w-full border-sage-green hover:bg-sage-green/10 hover:text-sage-green transition-colors font-medium rounded-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/auth/signup">
                        <Button
                          variant="default"
                          size="sm"
                          className="px-4 bg-muted-gold w-full text-white hover:bg-dusty-rose/90 transition-colors font-medium rounded-full shadow">
                          Sign up
                        </Button>
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
