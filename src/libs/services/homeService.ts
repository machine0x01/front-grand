// lib/services/homeService.ts

import type {
  CourseResponse,
 
} from '@/types/home';

class HomeService {
  private readonly baseUrl = process.env.API_BASE_URL || 'http://127.0.0.1:8000';

  async getHomePageData(lang: string): Promise<CourseResponse> {
      try {
          const response = await fetch(`${this.baseUrl}/api/home/?lang=${lang}`, {
              next: { 
                  revalidate: 300 // Revalidate every 5 minutes
              },
              headers: {
                  'Content-Type': 'application/json',
                  // Add authorization header if needed
                  // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
              },
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: CourseResponse = await response.json();
          return data;
      } catch (error) {
          console.error('Failed to fetch home page data:', error);
          return this.getFallbackData();
      }
  }

 

  private getFallbackData(): CourseResponse {
      return {
          hero: {
              left_title: 'Welcome to Our Platform',
              left_subtitle: 'Start your learning journey today',
              right_title: 'Professional Courses',
              right_subtitle: 'Learn from industry experts',
              video_ref: '',
          },
          about: {
              title: 'About Us',
              description: 'We are passionate about providing quality education and professional development opportunities.',
              items: [],
          },
          courses_section: {
              title: 'Our Courses',
              description: 'Explore our comprehensive course offerings designed to help you achieve your goals.',
              courses: [],
          },
          faqs: [],
          category: {
              name: 'General',
              color: '#000000',
              background: '#ffffff',
              icon: '',
              slug: 'general',
          },
          include_softwares: [],
          featured_blogs: [],
          comments: [],
      };
  }

 
}

export const homeService = new HomeService();
export type { CourseResponse };