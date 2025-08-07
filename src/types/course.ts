// types/course.ts

export interface CourseResponse {
  id: number;
  name: string;
  overview: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  details: CourseDetail[];
  syllabus: Syllabus;
  opinions: Opinion[];
  instructor: Instructor;
  projects: Project[];
  category: Category;
  faqs: FAQ;
  includes: Include[];
  include_softwares: Software[];
  offers: Offer[];
  included_in_offers: Offer[];
  course_id: string;
  video: string;
  thumbnaill: string;
  price: string;
  discount: string;
  rating: string;
  students_rated: number;
  total_students: number;
  slug: string;
  duration: string;
  level: string;
}

export interface CourseDetail {
  id: number;
  title: string;
  description: string;
  steps: any[]; // You might want to define a specific type for steps
  course: number;
}

export interface Syllabus {
  id: number;
  title: string;
  items: SyllabusItem[];
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

export interface Project {
  id: number;
  title: string;
  description: string;
  items: ProjectItem[];
  course: number;
}

export interface ProjectItem {
  id: number;
  title: string;
  student_name: string;
  type: 'image' | 'video' | string;
  ref: string;
  file: string;
  thumb: string;
  description_ar: string;
  description_en: string;
  project: number;
}

export interface Category {
  name: string;
  color: string;
  background: string;
  icon: string;
  slug: string;
}

export interface FAQItem {
  id: number;
  title: string;
  answer: string;
  faq: number;
}

export interface FAQ {
  id: number;
  title: string;
  items: FAQItem[];
  course: number;
}

export interface Include {
  id: number;
  name: string;
  order: number;
  course: number;
}

export interface Software {
  id: number;
  image: string;
  alt_text: string;
  order: number;
}

export interface IncludedCourse {
  course_id: string;
  name: string;
  slug: string;
  price: string;
  discount: string;
}

export interface Offer {
  id: number;
  title: string;
  included_courses: IncludedCourse[];
  active: boolean;
  courses: number[];
}