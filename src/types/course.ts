// types/course.ts

export interface CourseResponse {
  title: string;
  overview: string;
  syllabus: {
    title:string,
    items:SyllabusItem[];
  },
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
  description: string;
  image: string;
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
}

export interface FAQ {
  id: number;
  title: string;
  answer: string;
}

export interface Software {
  id: number;
  image: string;
  alt_text: string;
  order: number;
}