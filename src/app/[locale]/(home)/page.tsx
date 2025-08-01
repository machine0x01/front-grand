import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
// import AboutUs from '@/components/home/AboutUs';
// import BlogPosts from '@/components/home/BlogPosts';
// import CoursesList from '@/components/home/CoursesList';
// import HeroHome from '@/components/home/HeroHome';
// import CreationsShowcase from '@/components/home/ShowCase';
// import { StudentsComments } from '@/components/home/StudentsComments';
import type { CourseResponse } from '@/types/home';
import { homeService } from '@/libs/services/homeService';
import HeroHome from '@/components/home/HeroHome';

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
  console.log(homeData.hero)

  return (
    <>
      <HeroHome   content={homeData.hero}    />
      
      {/* <AboutUs 
        about={homeData.about}
      />
      
      <CoursesList 
        coursesSection={homeData.courses_section}
        category={homeData.category}
      />
      
      <StudentsComments 
        testimonials={testimonials}
      />
      
      <CreationsShowcase 
        items={showcaseItems}
      />
      
      <BlogPosts 
        faqs={homeData.faqs} */}
      {/* /> */}
    </>
  );
}