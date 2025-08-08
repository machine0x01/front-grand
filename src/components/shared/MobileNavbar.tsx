'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Menu, X, Home, BookOpen, FileText, ShoppingCart, Globe } from 'lucide-react';
import { useState } from 'react';

type MobileMenuProps = {
  items: Array<{ label: string; href: string }>;
};

const MobileMenu = ({ items }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'courses':
        return <BookOpen className="w-5 h-5" />;
      case 'about':
        return <User className="w-5 h-5" />;
      case 'blog':
        return <FileText className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLanguageToggle = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPath}`);
    closeMenu();
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-purple-200 hover:text-white hover:bg-purple-900/30 rounded-lg transition-all duration-300"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-screen w-[85vw] max-w-sm bg-gradient-to-b from-[#0b000f] via-[#1a112b] to-[#0b000f] border-l border-purple-700/30">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-purple-700/30">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GN</span>
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Grand Notion
                  </span>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 text-purple-200 hover:text-white hover:bg-purple-900/30 rounded-lg transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 p-6 space-y-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 group ${
                      isActive(item.href)
                        ? 'bg-purple-900/50 border border-purple-700/50 text-purple-400'
                        : 'text-purple-200 hover:text-white hover:bg-purple-900/30'
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-purple-600/30 text-purple-400'
                        : 'bg-purple-800/30 text-purple-300 group-hover:bg-purple-700/30 group-hover:text-purple-200'
                    }`}>
                      {getIcon(item.label)}
                    </div>
                    <span className="font-medium">{item.label}</span>
                    {isActive(item.href) && (
                      <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-purple-700/30 space-y-4">
                {/* Quick Actions */}
                <div className="flex space-x-2">
                  <Link
                    href="/cart"
                    onClick={closeMenu}
                    className="flex-1 p-3 bg-purple-900/30 border border-purple-700/50 text-purple-200 rounded-lg hover:bg-purple-900/50 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-sm font-medium">Cart</span>
                  </Link>
                  <button 
                    onClick={handleLanguageToggle}
                    className="flex-1 p-3 bg-purple-900/30 border border-purple-700/50 text-purple-200 rounded-lg hover:bg-purple-900/50 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium">{locale === 'en' ? 'العربية' : 'English'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
