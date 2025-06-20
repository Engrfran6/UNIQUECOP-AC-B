import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const footerLinks = {
    Shop: [
      { name: "Candles", href: "/products/candles" },
      { name: "Scents", href: "/products/scents" },
      { name: "Books", href: "/products/books" },
      { name: "Gift Sets", href: "/collections/gifts" },
    ],
    Support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Size Guide", href: "/size-guide" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Careers", href: "/careers" },
    ],
  };

  return (
    <footer className="bg-charcoal-gray text-warm-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="font-playfair text-2xl font-bold">
              UNIQUECOP AC&B
            </Link>
            <p className="text-warm-white/80 max-w-md">
              Handcrafted candles, premium scents, and curated books to create
              moments of tranquility in your everyday life.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-warm-white/60 hover:text-sage-green transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-warm-white/60 hover:text-sage-green transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-warm-white/60 hover:text-sage-green transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-warm-white/60 hover:text-sage-green transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-warm-white">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-warm-white/60 hover:text-sage-green transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-warm-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-warm-white/60 text-sm">
            © 2024 UNIQUECOP AC&B. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-warm-white/60 hover:text-sage-green text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-warm-white/60 hover:text-sage-green text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
