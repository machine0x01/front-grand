import CourseRequirements from '@/components/course-details/CourseRequirements';
import CourseFAQ from '@/components/course-details/CoursesFaq';
import HeroCourses from '@/components/course-details/HeroCourses';
import InstructorProfile from '@/components/course-details/InstructorPorifle';
import StudentProjectsSwiper from '@/components/course-details/StudentWorks';
import InfiniteMenu from '@/components/shared/InfiniteMenu';
import SplashCursor from '@/components/shared/SplashCursor';
import CircularGallery from '@/components/shared/StudentsGallary';
import { courseService } from '@/libs/services/courseService';
import { CourseResponse } from '@/types/course';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic';

type IIndexProps = {
  params: Promise<{ locale: string, slug: string }>;
};

export async function generateMetadata(props: IIndexProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const lang = locale || "ar";

  try {
    const courseData: CourseResponse = await courseService.getCourseData(slug, lang);
    const t = await getTranslations({
      locale,
      namespace: 'Course',
    });

    return {
      title: t('meta_title', { title: courseData.name }),
      description: t('meta_description', { title: courseData.name }),
      keywords: 'animation courses, motion graphics, 3D animation, visual effects, online learning',
      openGraph: {
        title: t('meta_title', { title: courseData.name }),
        description: t('meta_description', { title: courseData.name }),
        type: 'website',
        locale: locale,
        siteName: 'Grand Notion',
      },
      twitter: {
        card: 'summary_large_image',
        title: t('meta_title', { title: courseData.name }),
        description: t('meta_description', { title: courseData.name }),
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
  } catch (error) {
    console.error('Error loading course metadata:', error);

    return {
      title: 'Course',
      description: 'Course description',
    };
  }
}

export default async function Index(props: IIndexProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const lang = locale || "ar";


  const items = [
    {
      image: 'http://127.0.0.1:8000/media/student_opinions/1_XYimmgL.jpg',
      link: 'https://google.com/',
      title: 'Item 1',
      description: 'This is pretty cool, right?'
    },
    {
      image: 'http://127.0.0.1:8000/media/student_opinions/1_XYimmgL.jpg',
      link: 'https://google.com/',
      title: 'Item 2',
      description: 'This is pretty cool, right?'
    },
    {
      image: 'http://127.0.0.1:8000/media/student_opinions/1_XYimmgL.jpg',
      link: 'https://google.com/',
      title: 'Item 3',
      description: 'This is pretty cool, right?'
    },
    {
      image: 'http://127.0.0.1:8000/media/student_opinions/1_XYimmgL.jpg',
      link: 'https://google.com/',
      title: 'Item 4',
      description: 'This is pretty cool, right?'
    }
  ];


  try {
    const courseData: CourseResponse = await courseService.getCourseData(slug, lang);
    // const t = await getTranslations({
    //   locale,
    //   namespace: 'Course',
    // });

    const heroContent = {
      title: courseData.name,
      overview: courseData.overview,
      video: courseData.video,
      rating: courseData.rating,
      students_rated: courseData.students_rated,
      total_students: courseData.total_students,
      price: courseData.price,
      discount: courseData.discount,
      instructor: courseData.instructor.name,
      slug: slug,
    };
    console.log(courseData);

    return (
      <main className='min-h-screen'>
        {/* <SplashCursor /> */}
        <HeroCourses content={heroContent} />
        <CourseRequirements content={{ title: courseData.syllabus.title, items: courseData.syllabus.items }} />


        <div style={{ height: '800px', position: 'relative' }} className=''>
          <InfiniteMenu  items={items} />
        </div>

        {/* {courseData.projects && courseData.projects.length > 0 && courseData.projects[0] && (
          <StudentProjectsSwiper 
            data={{ 
              ...courseData.projects[0], 
              course: 1,
              items: courseData.projects[0].items.map(item => ({
                ...item,
                ref: item.ref || '', // Handle null ref by providing empty string
                type: item.type as 'image' | 'video'
              }))
            }} 
          />
        )} */}

        <InstructorProfile instructor={courseData.instructor} />

        {courseData.opinions && courseData.opinions.length > 0 && (
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
        )}
        <CourseFAQ faq={courseData.faqs} />
      </main>
    );
  } catch (error) {
    console.error('Error loading course data:', error);
    return (
      <main className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-white mb-4'>Something went wrong</h1>
          <p className='text-gray-400'>Please try again later</p>
        </div>
      </main>
    );
  }
}