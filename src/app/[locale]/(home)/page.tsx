import AboutUs from '@/components/home/AboutUs';
import BlogPosts from '@/components/home/BlogPosts';
import CoursesList from '@/components/home/CoursesList';
import HeroHome from '@/components/home/HeroHome';
import CreationsShowcase from '@/components/home/ShowCase';
import { StudentsComments } from '@/components/home/StudentsComments';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'Index',
  // });

  return (
    <>
    <HeroHome />
    <AboutUs />
    <CoursesList />
    <StudentsComments />
    <CreationsShowcase />
    <BlogPosts />
    </>
  );
};
