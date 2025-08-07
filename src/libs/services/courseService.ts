// lib/services/courseService.ts

import { CourseResponse } from "@/types/course";



class CourseService {
  private readonly baseUrl = process.env.API_BASE_URL || 'http://127.0.0.1:8000';

  async getCourseData(slug: string, lang: string): Promise<CourseResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/courses/${slug}/?lang=${lang}`, {
        next: {
          revalidate: 300 // Revalidate every 5 minutes
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CourseResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch course data:', error);
      return this.getFallbackData();
    }
  }
  async getAllCourse(lang: string): Promise<CourseResponse[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/courses?lang=${lang}`, {
        next: {
          revalidate: 300 // Revalidate every 5 minutes
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CourseResponse[] = await response.json();
      return data
    } catch (error) {
      console.error('Failed to fetch course data:', error);
      return [];
    }
  }

  


  private getFallbackData(): CourseResponse {
    return {
      title: 'Default Course Title',
      overview: 'Default course overview description.',
      syllabus: [],
      instructor: {
        id: 1,
        name: 'Default Instructor',
        main_stream_title: 'Default Title',
        description: 'Default instructor description.',
        image: '',
        social_link: '',
        course: 1,
      },
      projects: [],
      faqs: [],
      include_softwares: [],
      video: '',
      thumbnaill: '',
      price: '0.00',
      discount: '0.00',
      rating: '0.00',
      students_rated: 0,
      total_students: 0,
    };
  }
}

export const courseService = new CourseService();
export type { CourseResponse };