import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { headers } from 'next/headers';
import MobileMenu from './shared/MobileNavbar';
import console from 'console';

const Navbar = async () => {
  const t = useTranslations('RootLayout');
  
  // Get the current pathname from headers
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || headersList.get('x-url') || '';
  console.log(pathname);
  
  const lang = pathname.split('/')[1] || 'en';
  
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
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={`/${lang}`} className="text-yellow-500 text-lg font-bold">
          Great Button
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-yellow-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden md:flex items-center gap-4">
          {authItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-yellow-500 transition-colors"
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