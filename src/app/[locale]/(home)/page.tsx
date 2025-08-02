import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { CourseResponse } from '@/types/home';
import { homeService } from '@/libs/services/homeService';
import HeroHome from '@/components/home/HeroHome';
import AboutUs from '@/components/home/AboutUs';
import CoursesList from '@/components/home/CoursesList';
import { StudentsComments } from '@/components/home/StudentsComments';
import CreationsShowcase from '@/components/home/ShowCase';
import BlogPosts from '@/components/home/BlogPosts';

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
  const homeData: CourseResponse = await homeService.getHomePageData(lang);

  // const testimonials: TestimonialData[] = homeData.courses_section.courses.flatMap(course => 
  //   course.opinions.map(opinion => ({
  //     id: opinion.id,
  //     name: opinion.name,
  //     image: opinion.image,
  //     course_id: opinion.course,
  //   }))
  // );

  // const showcaseItems: ShowcaseItemData[] = homeData.courses_section.courses.flatMap(course => 
  //   course.projects.flatMap(project => 
  //     project.items.map(item => ({
  //       id: item.id,
  //       title: item.title,
  //       student_name: item.student_name,
  //       type: item.type,
  //       thumb: item.thumb,
  //       file: item.file,
  //       description: locale === 'ar' ? item.description_ar : item.description_en,
  //     }))
  //   )
  // );

  return (
    <main className=''>
       <HeroHome content={homeData.hero} />

      <AboutUs
        content={homeData.about}
      /> 
     
      <CoursesList content={homeData.courses_section} 
      />
     
      <StudentsComments 
      />
      
       
  
      <CreationsShowcase 
      />
      <BlogPosts 
      /> 
    </main>
  );
}