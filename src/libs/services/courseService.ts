// lib/services/courseService.ts

import { CourseResponse } from "@/types/course";



class CourseService {
  private readonly baseUrl = process.env.API_BASE_URL || 'http://127.0.0.1:8000';

  async getCourseData(slug: string, lang: string): Promise<CourseResponse> {
      try {
          const response = await fetch(`${this.baseUrl}/api/courses/${slug}/?lang=${lang}`, {
              cache: 'no-store',
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
          return this.validateAndTransformData(data);
      } catch (error) {
          console.error('Failed to fetch course data:', error);
          return this.getFallbackData();
      }
  }

  private validateAndTransformData(data: any): CourseResponse {
      return {
          title: data.name || 'XCourse Title',
          overview: data.overview || 'Course Overview',
          syllabus: Array.isArray(data.syllabus) ? data.syllabus : [],
          instructor: data.instructor || {
              name: 'Instructor Name',
              description: 'Instructor Description',
              image: '',
          },
          projects: Array.isArray(data.projects) ? data.projects : [],
          faqs: Array.isArray(data.faqs) ? data.faqs : [],
          include_softwares: Array.isArray(data.include_softwares) ? data.include_softwares : [],
          video: data.video || '',
          thumbnaill: data.thumbnaill || '',
          price: data.price || '0.00',
          discount: data.discount || '0.00',
          rating: data.rating || '0.00',
          students_rated: data.students_rated || 0,
          total_students: data.total_students || 0,
      };
  }

  private getFallbackData(): CourseResponse {
      return {
          title: 'Default Course Title',
          overview: 'Default course overview description.',
          syllabus: [],
          instructor: {
              id: 1,
              name: 'Default Instructor',
              description: 'Default instructor description.',
              image: '',
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