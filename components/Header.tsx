'use client';

import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {useCartStore} from '@/store/use-cart-store';
import {useSearchStore} from '@/store/use-search-store';
import {Menu, Search, ShoppingBag, User} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const {openSearch} = useSearchStore();

  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navigation = [
    {name: 'Candles', href: '/products/candles'},
    {name: 'Scents', href: '/products/scents'},
    {name: 'Books', href: '/products/books'},
    {name: 'Collections', href: '/collections'},
    {name: 'About', href: '/about'},
  ];

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-soft-taupe/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-playfair text-2xl font-bold text-charcoal-gray">
            UNIQUECOP AC&B
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-charcoal-gray hover:text-sage-green transition-colors font-medium ${
                  pathname.startsWith(item.href) && 'text-muted-gold'
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

            <Button
              variant="ghost"
              size="icon"
              onClick={openSearch}
              className="text-charcoal-gray hover:text-sage-green">
              <Search className="h-5 w-5" />
            </Button>

            {/* Account */}
            <Link href="/account">
              <Button
                variant="ghost"
                size="icon"
                className="text-charcoal-gray hover:text-sage-green">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
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
                <Button variant="ghost" size="icon" className="md:hidden text-charcoal-gray">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-warm-white">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative text-charcoal-gray hover:text-muted-gold transition-colors font-medium text-lg ${
                        pathname.startsWith(item.href) ? 'text-muted-gold' : ''
                      }`}>
                      {item.name}
                      {pathname.startsWith(item.href) && (
                        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-muted-gold"></span>
                      )}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
