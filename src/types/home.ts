// types/home.ts

export interface Hero {
  left_title: string;
  left_subtitle: string;
  right_title: string;
  right_subtitle: string;
  video_ref: string;
}

export interface AboutItem {
  title: string;
  description: string;
}

export interface About {
  title: string;
  description: string;
  items: AboutItem[];
}

export interface CourseDetailStep {
  id: number;
  title: string;
  description: string;
  banner: string;
  detail: number;
}

export interface CourseDetail {
  id: number;
  title: string;
  description: string;
  steps: CourseDetailStep[];
  course: number;
}

export interface SyllabusItem {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  syllabus: number;
}

export interface Opinion {
  id: number;
  name: string;
  image: string;
  course: number;
}

export interface Instructor {
  id: number;
  name: string;
  main_stream_title: string;
  description: string;
  image: string;
  social_link: string;
  course: number;
}

export interface ProjectItem {
  id: number;
  title: string;
  student_name: string;
  type: string;
  ref: string | null;
  file: string;
  thumb: string;
  description_ar: string;
  description_en: string;
  project: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  items: ProjectItem[];
  course: number;
}

export interface Course {
  id: number;
  name: string;
  overview: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  details: CourseDetail[];
  syllabus: SyllabusItem[];
  opinions: Opinion[];
  instructor: Instructor;
  projects: Project[];
  price: string;
  discount: string;
  rating: string;
  students_rated: number;
  total_students: number;
  slug: string;
}

export interface FAQItem {
  id: number;
  title: string;
  answer: string;
}

export interface FAQ {
  id: number;
  title: string;
  items: FAQItem[];
}

export interface Category {
  name: string;
  color: string;
  background: string;
  icon: string;
  slug: string;
}

export interface Softwares {
  id: number;
  image: string;
  alt_text: string;
  order: number;
}

export interface CourseResponse {
  hero: Hero;
  about: About;
  courses_section: {
      title: string;
      description: string;
      courses: Course[];
  };
  faqs: FAQ[];
  category: Category;
  include_softwares: Softwares[];
}

// Transformed types for components
export interface TestimonialData {
  id: number;
  name: string;
  image: string;
  course_id: number;
}

export interface ShowcaseItemData {
  id: number;
  title: string;
  student_name: string;
  type: string;
  thumb: string;
  file: string;
  description: string;
}