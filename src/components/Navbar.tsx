"use client"
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import MobileMenu from './shared/MobileNavbar';
import { ShoppingCart, Globe } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import GooeyNav from './shared/GooeyNav';

const Navbar = () => {
  const t = useTranslations('RootLayout');
  const { getItemCount, getTotalPrice } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const items = [
    { label: t('home_link'), href: `` },
    { label: t('about_link'), href: `/#about` },
    { label: t('counter_link'), href: `/#courses` },
    { label: t('portfolio_link'), href: `/#blog` },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleLanguageToggle = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-purple-700/30 backdrop-blur-xl bg-primary">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link 
          href={`/`} 
          className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
        >
          <div className="relative">
            <Image 
              src="/assets/images/logo.webp" 
              alt="Grand Notion Academy" 
              width={45} 
              height={45}
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden relative lg:flex items-center space-x-1">
  {/* <GooeyNav
    items={items}
    particleCount={15}
    particleDistances={[90, 10]}
    particleR={100}
    initialActiveIndex={0}
    animationTime={600}
    timeVariance={300}
    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
  /> */}
</div>


        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <Link
            href={`/cart`}
            className="relative p-2 text-purple-200 hover:text-white hover:bg-purple-900/30 rounded-lg transition-all duration-300 group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            {getItemCount() > 0 && (
              <>
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {getItemCount()}
                </span>
                <div className="absolute top-full right-0 mt-3 bg-purple-900/95 backdrop-blur-sm text-white text-sm rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-purple-700/50 transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4 text-purple-400" />
                    <span>Cart Total: <span className="font-bold text-purple-400">${getTotalPrice().toFixed(2)}</span></span>
                  </div>
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-purple-900/95 transform rotate-45 border-l border-t border-purple-700/50"></div>
                </div>
              </>
            )}
          </Link>

          {/* Language Switcher Icon */}
          <button 
            onClick={handleLanguageToggle}
            className="p-2 text-purple-200 hover:text-white hover:bg-purple-900/30 rounded-lg transition-all duration-300 group"
            title={`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`}
          >
            <Globe className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu items={items} />
      </div>
    </nav>
  );
};

export default Navbar;
