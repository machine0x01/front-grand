"use client"
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import MobileMenu from './shared/MobileNavbar';

const Navbar =  () => {
  const t = useTranslations('RootLayout');

  // Get the current pathname from headers
  // const pathname = headersList.get('x-pathname') || headersList.get('x-url') || '';
  // console.log(pathname);

  const lang =  'en';

  const items = [
    { label: t('home_link'), href: `/${lang}` },
    { label: t('about_link'), href: `/${lang}/about` },
    { label: t('counter_link'), href: `/${lang}/counter` },
    { label: t('portfolio_link'), href: `/${lang}/portfolio` },
  ];

  const authItems = [
    { label: t('sign_in_link'), href: `/${lang}/auth/signin` },
    { label: t('sign_up_link'), href: `/${lang}/auth/signup` },
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

        {/* Desktop Auth Links */}
        <div className="hidden items-center gap-4 md:flex">
          {authItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white transition-colors hover:text-yellow-500"
            >
              {item.label}
            </Link>
          ))}
          {/* <LanguageSwitcher /> */}
        </div>

        {/* Mobile Menu - This will need to be a separate client component */}
        <MobileMenu items={items} authItems={authItems} />
      </div>
    </nav>
  );
};

export default Navbar;
