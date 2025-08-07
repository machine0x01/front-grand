// types/course.ts

export interface CourseResponse {
  title: string;
  overview: string;
  syllabus: SyllabusItem[];
  instructor: Instructor;
  projects: Project[];
  faqs: FAQ[];
  include_softwares: Software[];
  video: string;
  thumbnaill: string;
  price: string;
  discount: string;
  rating: string;
  students_rated: number;
  total_students: number;
  opinions?: any[];
}

export interface SyllabusItem {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
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
}

export interface ProjectItem {
  id: number;
  title: string;
  student_name: string;
  type: 'image' | 'video'; // or any other type you might have
  ref: string | null;
  file: string;
  thumb: string;
  description_ar: string;
  description_en: string;
  project: number;
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

export interface Software {
  id: number;
  image: string;
  alt_text: string;
  order: number;
}