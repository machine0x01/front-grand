'use client';

import Link from "next/link";

interface MobileMenuProps {
  items: Array<{ label: string; href: string }>;
  authItems: Array<{ label: string; href: string }>;
}

const MobileMenu = ({ items, authItems }: MobileMenuProps) => {
  return (
    <details className="md:hidden relative">
      <summary className="text-white cursor-pointer p-2">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </summary>
      
      {/* Mobile Menu */}
      <div className="fixed inset-0 z-50 bg-black/50">
        <div className="absolute top-0 right-0 h-screen w-[90vw] bg-[#1a112b] rounded-l-2xl p-6 animate-slideIn">
          <div className="flex justify-between items-center mb-8">
            <span className="text-yellow-500 text-lg font-bold">Menu</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                const details = e.currentTarget.closest('details');
                if (details) details.removeAttribute('open');
              }}
              className="text-white hover:text-yellow-500 text-2xl"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-6">
            {[...items, ...authItems].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-white hover:text-yellow-500 text-lg py-2"
                onClick={(e) => {
                  const details = e.currentTarget.closest('details');
                  if (details) details.removeAttribute('open');
                }}
              >
                {item.label}
              </Link>
            ))}
          
            <div className="mt-8">
              {/* <LanguageSwitcher /> */}
            </div>
          </div>
        </div>
      </div>
    </details>
  );
};

export default MobileMenu;