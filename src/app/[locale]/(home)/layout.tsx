import {  setRequestLocale } from 'next-intl/server';
import { DemoBanner } from '@/components/DemoBanner';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'RootLayout',
  // });

  return (
    <>
      <BaseTemplate

      >
        <div className="">{props.children}</div>
      </BaseTemplate>
    </>
  );
}
