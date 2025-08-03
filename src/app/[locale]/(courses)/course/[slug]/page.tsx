import CourseRequirements from '@/components/course-details/CourseRequirements';
import CourseFAQ from '@/components/course-details/CoursesFaq';
import HeroCourses from '@/components/course-details/HeroCourses';
import InstructorProfile from '@/components/course-details/InstructorPorifle';
import StudentProjectsSwiper from '@/components/course-details/StudentWorks';
import { courseService } from '@/libs/services/courseService';
import { CourseResponse } from '@/types/course';
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
  }
  console.log(courseData.syllabus)

  return (
    <main className=''>
      <HeroCourses content={heroContent} />
      <CourseRequirements content={courseData.syllabus[0]} />
      <StudentProjectsSwiper data={courseData.projects[0]} />
      <InstructorProfile />
      <CourseFAQ />
    </main>
  );
}