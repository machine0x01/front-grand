"use client"
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import MobileMenu from './shared/MobileNavbar';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';

const Navbar =  () => {
  const t = useTranslations('RootLayout');
  const { getItemCount, getTotalPrice } = useCart();

  // Get the current pathname from headers
  // const pathname = headersList.get('x-pathname') || headersList.get('x-url') || '';
  // console.log(pathname);

  const lang =  'en';

  const items = [
    { label: t('home_link'), href: `/${lang}` },
    { label: t('about_link'), href: `/${lang}/about` },
    { label: t('counter_link'), href: `/${lang}/courses` },
    { label: t('portfolio_link'), href: `/${lang}/blog` },
  ];


  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href={`/${lang}`} className="text-lg font-bold text-yellow-500">
          Great Button
        </Link>

        {/* Desktop Nav */}
        <div className="hidden gap-8 md:flex">
          {items.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white transition-colors hover:text-yellow-500"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link
            href={`/${lang}/cart`}
            className="relative text-white transition-colors hover:text-yellow-500 group"
          >
            <ShoppingCart className="w-6 h-6" />
            {getItemCount() > 0 && (
              <>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
                <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 text-xs rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Total: ${getTotalPrice().toFixed(2)}
                </div>
              </>
            )}
          </Link>
          {/* <LanguageSwitcher /> */}
        </div>

        {/* Mobile Menu - This will need to be a separate client component */}
        <MobileMenu items={items} />
      </div>
    </nav>
  );
};

export default Navbar;
