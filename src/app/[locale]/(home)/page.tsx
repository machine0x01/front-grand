import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic';
import type { CourseResponse as HomeResponse, Course } from '@/types/home';
import { homeService } from '@/libs/services/homeService';
import HeroHome from '@/components/home/HeroHome';
import AboutUs from '@/components/home/AboutUs';
import CoursesList from '@/components/home/CoursesList';
import { StudentsComments } from '@/components/home/StudentsComments';
import CreationsShowcase from '@/components/home/ShowCase';
import BlogPosts from '@/components/home/BlogPosts';
import { courseService } from '@/libs/services/courseService';
import SplashCursor from '@/components/shared/SplashCursor';
import Lanyard from '@/components/shared/lanyard/Lanyard';

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
    keywords: 'animation courses, motion graphics, 3D animation, visual effects, online learning',
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

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const lang = locale || "ar";

  try {
    const homeData: HomeResponse = await homeService.getHomePageData(lang);
    const coursesResponseData = await courseService.getAllCourse(lang);

    // Transform CourseResponse[] to Course[] to match the expected type
    const coursesData: Course[] = coursesResponseData.map(course => ({
      id: course.id,
      name: course.name,
      overview: course.overview,
      category: course.category,
      seo_title: course.seo_title,
      seo_description: course.seo_description,
      seo_keywords: course.seo_keywords,
      details: course.details,
      syllabus: [course.syllabus], // Transform single Syllabus to Syllabus[]
      opinions: course.opinions,
      instructor: course.instructor,
      projects: course.projects,
      price: course.price,
      discount: course.discount,
      rating: course.rating,
      students_rated: course.students_rated,
      total_students: course.total_students,
      slug: course.slug,
      thumbnaill: course.thumbnaill,
      video: course.video,
      includes: course.includes,
      include_softwares: course.include_softwares,
    }));

    // Sample course data from the API response
    const sampleCourses: Course[] = [
      {
        id: 1,
        name: "مستر جرافيك",
        overview: "الكورس ده معمول مخصوص لأي حد حابب يدخل مجال التصميم الجرافيكي من أوسع أبوابه. هنتعلم فيه الأساسيات اللي أي مصمم لازم يعرفها، زي الألوان، التايبوغرافي، والتكوين. وكمان هنتدرب عملي على استخدام برامج زي Photoshop، Illustrator، وInDesign.\r\n\r\nخلال الكورس، هتشتغل على مشاريع حقيقية تطبق فيها اللي اتعلمته، وهتطلع بـ portfolio قوي تقدر تقدمه في شغل أو freelance. الكورس مناسب للمبتدئين، ومش محتاج أي خبرة سابقة.",
        seo_title: "التصميم الجرافيكي",
        seo_description: "الكورس ده معمول مخصوص لأي حد حابب يدخل مجال التصميم الجرافيكي من أوسع أبوابه. هنتعلم فيه الأساسيات اللي أي مصمم لازم يعرفها، زي الألوان، التايبوغرافي، والتكوين. وكمان هنتدرب عملي على استخدام برامج زي Photoshop، Illustrator، وInDesign.\r\n\r\nخلال الكورس، هتشتغل على مشاريع حقيقية تطبق فيها اللي اتعلمته، وهتطلع بـ portfolio قوي تقدر تقدمه في شغل أو freelance. الكورس مناسب للمبتدئين، ومش محتاج أي خبرة سابقة.",
        seo_keywords: "كلمات, مفتاحية, عربية",
        details: [{
          id: 14,
          title: "waiting",
          description: "waiting",
          steps: [],
          course: 1
        }],
        syllabus: [{
          id: 8,
          title: "waiting",
          items: [{
            id: 19,
            title: "Ipsam aut aspernatur eum et non vel laborum Molestias molestiae",
            description: "Blanditiis et tempor",
            color: "#0d542b",
            icon: "https://api.grandnotionacademy.com/media/course_syllabus/unnamed.png",
            syllabus: 8
          }],
          course: 1
        }],
        opinions: [{
          id: 14,
          name: "طالب 1",
          image: "https://api.grandnotionacademy.com/media/student_opinions/1_XYimmgL.jpg",
          course: 1
        }],
        instructor: {
          id: 8,
          name: "المدرب أحمد",
          main_stream_title: "gamed gamed",
          description: "gamed gamedgamed gamedgamed gamedgamed gamedgamed gamedgamed gamedgamed gamedgamed gamedgamed gamed",
          image: "https://api.grandnotionacademy.com/media/instructors/04e2c6533a3ee13d6511e9543f5ebac0927180fa.png",
          social_link: "https://google.come",
          course: 1
        },
        projects: [{
          id: 8,
          title: "اعمال الطلاب",
          description: "اعمال الطلاب",
          items: [{
            id: 14,
            title: "banger man",
            student_name: "banger",
            type: "video",
            ref: "http://facebook.com",
            file: "https://api.grandnotionacademy.com/media/student_projects/graphic.png",
            thumb: "https://api.grandnotionacademy.com/media/thumb/fotor-ai-2025080413646.jpg",
            description_ar: "tester man",
            description_en: "tester shit",
            project: 8
          }],
          course: 1
        }],
        category: {
          name: "جرافيك",
          color: "#0d542b",
          background: "https://api.grandnotionacademy.com/media/categories/backgrounds/graphic.png",
          icon: "https://api.grandnotionacademy.com/media/categories/icons/icon.png",
          slug: "graphic"
        },
        includes: [{
          id: 22,
          name: "تعلم الفوتوشوب",
          order: 0,
          course: 1
        }, {
          id: 23,
          name: "تعليم الاليستراتو",
          order: 0,
          course: 1
        }],
        include_softwares: [{
          id: 16,
          image: "https://api.grandnotionacademy.com/media/course_softwares/images_WOgqZeL.jpeg",
          alt_text: "photoshop",
          order: 1
        }, {
          id: 15,
          image: "https://api.grandnotionacademy.com/media/course_softwares/images.jpeg",
          alt_text: "indesing",
          order: 2
        }],
        video: "https://api.grandnotionacademy.com/media/course_videos/gn_bOiVzbB.mp4",
        thumbnaill: "https://api.grandnotionacademy.com/media/course_images/fotor-ai-2025080413635.jpg",
        price: "5000.00",
        discount: "2500.00",
        rating: "4.50",
        students_rated: 3000,
        total_students: 4500,
        slug: "graphic-master"
      }
    ];

    // Provide fallback data for missing properties
    const coursesSection = homeData.courses_section || {
      title: lang === "ar" ? "أفضل الدورات لك" : "The Best Courses for You",
      description: lang === "ar" ? "جراند نوتيون هي أفضل منصة لتعلم الرسوم المتحركة والموشن جرافيك" : "Grand Notion is the best platform for learning animation and motion graphics",
      courses: sampleCourses
    };

    const comments = homeData.comments || [];
    const featuredBlogs = homeData.featured_blogs || [];
    return (
      <main className='min-h-screen relative'>
        {/* Left Side Lighting Effect */}
    
        
        {/* <SplashCursor /> */}

        <HeroHome content={homeData.hero} />

        {/* {homeData.about && <AboutUs content={homeData.about} />} */}

        {/* {coursesData.length > 0 && ( */}
          {/* <CoursesList content={{
            courses: coursesData,
            title: coursesSection.title,
            description: coursesSection.description,
          }}
          /> */}
        {/* )} */}

        {/* {comments.length > 0 && ( */}
          {/* <StudentsComments
            content={comments.map(comment => ({
              quote: comment.comment,
              course: comment.course_name,
              ref: "https://grandnotion.com",
            }))}
          />
        )}
        {coursesData.length > 0 && (
          <CreationsShowcase
            courses_section={{
              courses: coursesData,
              title: coursesSection.title,
              description: coursesSection.description
            }}
          />
        )}

        {featuredBlogs.length > 0 && (
          <BlogPosts
            featured_blogs={featuredBlogs}
          />
        )} */}

      {/* <div className='w-full  h-[80vh]'>
      <Lanyard />
      </div> */}
      </main>
    );
  } catch (error) {
    console.error('Error loading home page data:', error);
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