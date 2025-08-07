import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SplashCursor from '@/components/shared/SplashCursor';
import QuoteHeader from '@/components/Title';

type ITermsProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ITermsProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Terms',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: 'terms and conditions, privacy policy, legal, grand notion',
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      type: 'website',
      locale: locale,
      siteName: 'Grand Notion',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta_title'),
      description: t('meta_description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function TermsPage(props: ITermsProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const lang = locale || "ar";
  
  const t = await getTranslations({
    locale,
    namespace: 'Terms',
  });

  const termsData = {
    title: t('title'),
    description: t('description'),
    sections: [
      {
        title: t('acceptance_title'),
        content: t('acceptance_content')
      },
      {
        title: t('use_title'),
        content: t('use_content')
      },
      {
        title: t('property_title'),
        content: t('property_content')
      },
      {
        title: t('privacy_title'),
        content: t('privacy_content')
      },
      {
        title: t('payment_title'),
        content: t('payment_content')
      },
      {
        title: t('liability_title'),
        content: t('liability_content')
      },
      {
        title: t('modification_title'),
        content: t('modification_content')
      },
      {
        title: t('contact_title'),
        content: t('contact_content')
      }
    ]
  };

  return (
    <div className="relative bg-[#0b000f] overflow-hidden">
      <SplashCursor />
      <div className="max-w-[1920px] z-10 space-y-16">
        
        {/* Header Section */}
        <section className="min-h-screen text-white p-4 sm:p-8">
          <header className="text-center mb-12">
            <div className="max-w-4xl mx-auto w-full">
              <QuoteHeader title={termsData.title} description={termsData.description} />
            </div>
          </header>

          {/* Terms Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl">
              <div className="space-y-8">
                {termsData.sections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white border-b border-white/20 pb-2">
                      {section.title}
                    </h3>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Last Updated */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-slate-400 text-sm text-center">
                  {t('last_updated')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
