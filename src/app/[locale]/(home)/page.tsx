import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { CourseResponse as HomeResponse } from '@/types/home';
import type { CourseResponse } from '@/types/course';
import { homeService } from '@/libs/services/homeService';
import HeroHome from '@/components/home/HeroHome';
import AboutUs from '@/components/home/AboutUs';
import CoursesList from '@/components/home/CoursesList';
import { StudentsComments } from '@/components/home/StudentsComments';
import CreationsShowcase from '@/components/home/ShowCase';
import BlogPosts from '@/components/home/BlogPosts';
import { courseService } from '@/libs/services/courseService';

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
  const homeData: HomeResponse = await homeService.getHomePageData(lang);
  const coursesData: CourseResponse[] = await courseService.getAllCourse(lang);


  return (
    <main className=''>
      <HeroHome content={homeData.hero} />

      <AboutUs
        content={homeData.about}
      />

      <CoursesList content={{
        courses: coursesData,
        title: "the best courses for you",
        description: "grand notion is the best",
      }}
      />

      <StudentsComments
        content={homeData.comments.map(comment => ({
          quote: comment.comment,
          course: comment.course_name,
          ref: "https://google.com",
        }))}
      />



      <CreationsShowcase
        courses_section={{ courses: coursesData, title: "the best courses for you", description: "grand notion is the best" }}
      />

      <BlogPosts
        featured_blogs={homeData.featured_blogs}
      />
    </main>
  );
}