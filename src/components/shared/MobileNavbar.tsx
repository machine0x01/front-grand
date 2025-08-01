'use client';

import Link from 'next/link';

type MobileMenuProps = {
  items: Array<{ label: string; href: string }>;
  authItems: Array<{ label: string; href: string }>;
};

const MobileMenu = ({ items, authItems }: MobileMenuProps) => {
  return (
    <details className="relative md:hidden">
      <summary className="cursor-pointer p-2 text-white">
        <svg
          className="h-6 w-6"
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
        <div className="animate-slideIn absolute top-0 right-0 h-screen w-[90vw] rounded-l-2xl bg-[#1a112b] p-6">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-lg font-bold text-yellow-500">Menu</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                const details = e.currentTarget.closest('details');
                if (details) {
                  details.removeAttribute('open');
                }
              }}
              className="text-2xl text-white hover:text-yellow-500"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {[...items, ...authItems].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-lg text-white hover:text-yellow-500"
                onClick={(e) => {
                  const details = e.currentTarget.closest('details');
                  if (details) {
                    details.removeAttribute('open');
                  }
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
