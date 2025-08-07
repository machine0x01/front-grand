import CourseRequirements from '@/components/course-details/CourseRequirements';
import CourseFAQ from '@/components/course-details/CoursesFaq';
import HeroCourses from '@/components/course-details/HeroCourses';
import InstructorProfile from '@/components/course-details/InstructorPorifle';
import StudentProjectsSwiper from '@/components/course-details/StudentWorks';
import SplashCursor from '@/components/shared/SplashCursor';
import CircularGallery from '@/components/shared/StudentsGallary';
import { courseService } from '@/libs/services/courseService';
import { CourseResponse } from '@/types/course';
import { main } from 'knip';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IIndexProps = {
  params: Promise<{ locale: string, slug: string }>;
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
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const lang = locale || "ar"
  const courseData: CourseResponse = await courseService.getCourseData(slug, lang);

  const heroContent = {
    title: courseData.title,
    overview: courseData.overview,
    video: courseData.video,
    rating: courseData.rating,
    students_rated: courseData.students_rated,
    total_students: courseData.total_students,
    price: courseData.price,
    discount: courseData.discount,
    instructor: courseData.instructor.name,
    slug: slug,
  }
  console.log(courseData.syllabus)

  return (
    <main className=''>
      <SplashCursor />
      <HeroCourses content={heroContent} />
      <CourseRequirements content={courseData.syllabus[0]} />
      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery
          items={courseData.opinions.map((i: any) => ({
            text: i.name,
            image: i.image,
          }))}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
        />
      </div>
      <StudentProjectsSwiper data={courseData.projects[0]} />
      <InstructorProfile />
      <CourseFAQ />
    </main>
  );
}