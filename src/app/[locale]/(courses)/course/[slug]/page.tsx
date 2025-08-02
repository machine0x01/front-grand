import CourseRequirements from '@/components/course-details/CourseRequirements';
import CourseFAQ from '@/components/course-details/CoursesFaq';
import HeroCourses from '@/components/course-details/HeroCourses';
import InstructorProfile from '@/components/course-details/InstructorPorifle';
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
  const lang = locale || "ar"



  return (
    <main className=''>
<HeroCourses />
<CourseRequirements />
<InstructorProfile />
<CourseFAQ />
    </main>
  );
}