// lib/services/homeService.ts

import type {
  CourseResponse,
 
} from '@/types/home';

class HomeService {
  private readonly baseUrl = process.env.API_BASE_URL || 'http://127.0.0.1:8000';

  async getHomePageData(lang: string): Promise<CourseResponse> {
      try {
          const response = await fetch(`${this.baseUrl}/api/home/?lang=${lang}`, {
              cache: 'no-store', // Use 'force-cache' for static data
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
          return this.validateAndTransformData(data);
      } catch (error) {
          console.error('Failed to fetch home page data:', error);
          return this.getFallbackData();
      }
  }

  private validateAndTransformData(data: any): CourseResponse {
      // Validate and provide defaults for required fields
      return {
          hero: {
              left_title: data.hero?.left_title || 'Welcome',
              left_subtitle: data.hero?.left_subtitle || 'Start your journey',
              right_title: data.hero?.right_title || 'Learn with us',
              right_subtitle: data.hero?.right_subtitle || 'Professional courses',
              video_ref: data.hero?.video_ref || '',
          },
          about: {
              title: data.about?.title || 'About Us',
              description: data.about?.description || 'We are passionate about education',
              items: Array.isArray(data.about?.items) ? data.about.items : [],
          },
          courses_section: {
              title: data.courses_section?.title || 'Our Courses',
              description: data.courses_section?.description || 'Explore our course offerings',
              courses: Array.isArray(data.courses_section?.courses) ? data.courses_section.courses : [],
          },
          faqs: Array.isArray(data.faqs) ? data.faqs : [],
          category: data.category || {
              name: 'General',
              color: '#000000',
              background: '#ffffff',
              icon: '',
              slug: 'general',
          },
          include_softwares: Array.isArray(data.include_softwares) ? data.include_softwares : [],
      };
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
      };
  }

 
}

export const homeService = new HomeService();
export type { CourseResponse };