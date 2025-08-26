'use client';

import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import QuoteHeader from '../Title';

// TypeScript Interfaces
type Category = {
  name: string;
  count: number;
  color: string;
  slug: string;
};

type ProjectItem = {
  id: number;
  title: string;
  student_name: string;
  type: string;
  ref: string;
  file: string;
  thumb: string;
  description_ar: string;
  description_en: string;
};

type Project = {
  id: number;
  title: string;
  description: string;
  items: ProjectItem[];
};

type Course = {
  id: number;
  name: string;
  overview: string;
  price: string;
  discount: string;
  rating: string;
  students_rated: number;
  total_students: number;
  thumbnaill: string;
  video: string;
  projects: Project[];
  category: {
    name: string;
    color: string;
    slug: string;
  };
};

type CoursesSection = {
  title: string;
  description: string;
  courses: Course[];
};

type CreationsShowcaseProps = {
  courses_section?: CoursesSection;
};

// Mock Data
const mockCoursesSection: CoursesSection = {
  title: 'Student Creations Showcase',
  description: 'Discover amazing projects created by our talented students across various courses and categories.',
  courses: [
    {
      id: 1,
      name: 'Web Development Bootcamp',
      overview: 'Full-stack web development course',
      price: '$299',
      discount: '20%',
      rating: '4.8',
      students_rated: 150,
      total_students: 200,
      thumbnaill: '/placeholder.svg?height=300&width=400',
      video: 'https://example.com/video1',
      category: {
        name: 'Web Development',
        color: 'from-blue-500 to-cyan-500',
        slug: 'web-development',
      },
      projects: [
        {
          id: 1,
          title: 'E-commerce Platform',
          description: 'Full-featured online store',
          items: [
            {
              id: 1,
              title: 'Modern E-commerce Store',
              student_name: 'Sarah Johnson',
              type: 'website',
              ref: 'https://example.com/project1',
              file: 'project1.zip',
              thumb: '/placeholder.svg?height=400&width=600',
              description_ar: 'متجر إلكتروني حديث',
              description_en:
                'A fully responsive e-commerce platform built with React and Node.js, featuring user authentication, payment integration, and admin dashboard.',
            },
            {
              id: 2,
              title: 'Portfolio Website',
              student_name: 'Mike Chen',
              type: 'website',
              ref: 'https://example.com/project2',
              file: 'project2.zip',
              thumb: '/placeholder.svg?height=400&width=600',
              description_ar: 'موقع محفظة أعمال',
              description_en:
                'A creative portfolio website showcasing design skills with smooth animations and interactive elements.',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'UI/UX Design Masterclass',
      overview: 'Complete UI/UX design course',
      price: '$199',
      discount: '15%',
      rating: '4.9',
      students_rated: 120,
      total_students: 140,
      thumbnaill: '/placeholder.svg?height=300&width=400',
      video: 'https://example.com/video2',
      category: {
        name: 'Design',
        color: 'from-pink-500 to-rose-500',
        slug: 'design',
      },
      projects: [
        {
          id: 2,
          title: 'Mobile App Design',
          description: 'Complete mobile app UI/UX',
          items: [
            {
              id: 3,
              title: 'Fitness Tracking App',
              student_name: 'Emma Davis',
              type: 'design',
              ref: 'https://example.com/project3',
              file: 'project3.fig',
              thumb: '/placeholder.svg?height=400&width=600',
              description_ar: 'تطبيق تتبع اللياقة البدنية',
              description_en:
                'Complete UI/UX design for a fitness tracking mobile app with intuitive navigation and engaging user experience.',
            },
            {
              id: 4,
              title: 'Food Delivery App',
              student_name: 'Alex Rodriguez',
              type: 'design',
              ref: 'https://example.com/project4',
              file: 'project4.fig',
              thumb: '/placeholder.svg?height=400&width=600',
              description_ar: 'تطبيق توصيل الطعام',
              description_en:
                'Modern food delivery app design with seamless ordering flow and beautiful visual hierarchy.',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Video Production Course',
      overview: 'Professional video editing and production',
      price: '$249',
      discount: '25%',
      rating: '4.7',
      students_rated: 80,
      total_students: 100,
      thumbnaill: '/placeholder.svg?height=300&width=400',
      video: 'https://example.com/video3',
      category: {
        name: 'Video Production',
        color: 'from-green-500 to-emerald-500',
        slug: 'video-production',
      },
      projects: [
        {
          id: 3,
          title: 'Short Film Projects',
          description: 'Creative short films and documentaries',
          items: [
            {
              id: 5,
              title: 'Urban Stories Documentary',
              student_name: 'David Kim',
              type: 'video',
              ref: 'https://example.com/project5',
              file: 'project5.mp4',
              thumb: '/placeholder.svg?height=400&width=600',
              description_ar: 'فيلم وثائقي عن القصص الحضرية',
              description_en:
                'A compelling documentary exploring urban life and community stories with professional cinematography and editing.',
            },
            {
              id: 6,
              title: 'Brand Commercial',
              student_name: 'Lisa Wang',
              type: 'video',
              ref: 'https://example.com/project6',
              file: 'project6.mp4',
              thumb: '/placeholder.svg?height=400&width=600',
              description_ar: 'إعلان تجاري للعلامة التجارية',
              description_en:
                'Professional brand commercial with creative storytelling and high-quality production values.',
            },
          ],
        },
      ],
    },
  ],
};


const CreationsShowcase: React.FC<CreationsShowcaseProps> = ({ courses_section = mockCoursesSection }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Process categories from courses data
  const categories: Category[] = React.useMemo(() => {
    const categoryMap = new Map<string, { name: string; color: string; slug: string; count: number }>();

    // Add "All" category
    categoryMap.set('all', {
      name: 'All Projects',
      color: 'from-purple-500 to-pink-500',
      slug: 'all',
      count: 0,
    })
    ;(courses_section?.courses || []).forEach((course: Course) => {
      ;(course.projects || []).forEach((project: Project) => {
        ;(project.items || []).forEach(() => {
          const categoryKey = course.category?.slug || 'unknown';
          if (categoryMap.has(categoryKey)) {
            categoryMap.get(categoryKey)!.count++;
          } else {
            categoryMap.set(categoryKey, {
              name: course.category?.name || 'Unknown',
              color: course.category?.color || 'from-gray-500 to-gray-600',
              slug: course.category?.slug || 'unknown',
              count: 1,
            });
          }
          // Update "All" count
          categoryMap.get('all')!.count++;
        });
      });
    });

    return Array.from(categoryMap.values());
  }, [courses_section]);

  // Flatten all project items for display
  const allProjectItems = React.useMemo(() => {
    const items: (ProjectItem & { courseName: string; categorySlug: string; courseRating: string })[] = []
    ;(courses_section?.courses || []).forEach((course: Course) => {
      ;(course.projects || []).forEach((project: Project) => {
        ;(project.items || []).forEach((item: ProjectItem) => {
          items.push({
            ...item,
            courseName: course.name || 'Unknown Course',
            categorySlug: course.category?.slug || 'unknown',
            courseRating: course.rating || '0',
          });
        });
      });
    });

    return items;
  }, [courses_section]);

  // Filter projects by category
  const filteredProjects = React.useMemo(() => {
    if (activeCategory === 'all') {
      return allProjectItems;
    }
    return allProjectItems.filter(item => item.categorySlug === activeCategory);
  }, [allProjectItems, activeCategory]);

  const totalPages: number = filteredProjects.length;
  const currentProject = filteredProjects[currentPage - 1];

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages && !isAnimating) {
      setCurrentPage(newPage);
    }
  };

  const handleCategoryChange = (categorySlug: string): void => {
    if (categorySlug !== activeCategory && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveCategory(categorySlug);
        setCurrentPage(1);
        setIsAnimating(false);
      }, 300);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hoveredProject && totalPages > 0) {
        handlePageChange(currentPage < totalPages ? currentPage + 1 : 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage, totalPages, hoveredProject]);

  if (!currentProject) {
    return (
      <section className="flex min-h-screen items-center justify-center p-4 text-white sm:p-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">No Projects Available</h2>
          <p className="text-slate-300">There are no projects to display for the selected category.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-4 text-white sm:p-8">
      {/* Header Section */}
      <header className="mb-12 text-center">
        <div className="mx-auto w-full max-w-4xl">
          <QuoteHeader title={courses_section.title} description={courses_section.description} />
        </div>
      </header>

      <div className="container mx-auto flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Sidebar - Sticky */}
        <aside className="space-y-6 lg:w-1/3 lg:sticky lg:top-24 lg:self-start">
          {/* Categories Section */}
          <div className="group hover-lift rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-lg transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/20">
            <h2 className="mb-4 text-xl font-semibold text-white transition-all duration-300 group-hover:text-purple-200">Categories</h2>
            <nav className="space-y-3">
              {categories.map(category => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryChange(category.slug)}
                  onMouseEnter={() => setHoveredProject(category.slug === 'all' ? -1 : parseInt(category.slug))}
                  onMouseLeave={() => setHoveredProject(null)}
                  aria-label={`Show ${category.name} projects`}
                  className={`group/category focus:ring-opacity-50 w-full transform rounded-lg p-3 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                    activeCategory === category.slug
                      ? `bg-gradient-to-r ${category.color} font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50`
                      : 'bg-white/5 text-purple-300 hover:bg-white/15 hover:text-white hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="transition-all duration-300 group-hover/category:scale-105">{category.name}</span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium transition-all duration-300 ${
                        activeCategory === category.slug 
                          ? 'bg-white/20 shadow-lg' 
                          : 'bg-purple-500/20 text-purple-300 group-hover/category:bg-purple-500/30 group-hover/category:scale-110'
                      }`}
                    >
                      {category.count}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Navigation Controls */}
          <div className="group hover-lift rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-lg transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isAnimating}
                className="group/btn focus:ring-opacity-50 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-3 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/40 focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-[-2px]" />
              </button>

              <div className="text-center">
                <p className="text-sm font-medium text-slate-300 transition-all duration-300 group-hover:text-white">
                  Page
                  {' '}
                  {currentPage}
                  {' '}
                  of
                  {' '}
                  {totalPages}
                </p>
                <div className="mt-2 flex space-x-1">
                  {Array.from({ length: Math.min(totalPages, 10) }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-all duration-500 hover:scale-150 cursor-pointer ${
                        index + 1 === currentPage
                          ? 'scale-125 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
                          : 'bg-white/30 hover:bg-white/50 hover:shadow-lg hover:shadow-purple-500/30'
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                      title={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isAnimating}
                className="group/btn focus:ring-opacity-50 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-3 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/40 focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg"
                aria-label="Next project"
              >
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-[2px]" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-2/3">
          <article
            onMouseEnter={() => setHoveredProject(currentProject.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className={`group hover-lift rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg transition-all duration-700 hover:border-white/40 hover:bg-white/15 hover:shadow-3xl hover:shadow-purple-500/30 ${
              isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
            }`}
          >
            {/* Project Content */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Project Image/Video */}
              <div className="group/image relative overflow-hidden rounded-xl">
                <div className="relative overflow-hidden rounded-xl transition-all duration-700 group-hover/image:scale-105">
                  <Image
                    src={currentProject.thumb || '/placeholder.svg'}
                    alt={currentProject.title}
                    width={600}
                    height={400}
                    className="h-auto w-full rounded-xl object-cover transition-all duration-700 group-hover/image:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover/image:opacity-100" />
                  
                  {/* Animated overlay with floating particles effect */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/image:opacity-100">
                    <div className="absolute top-4 left-4 h-2 w-2 animate-ping rounded-full bg-purple-400 opacity-75"></div>
                    <div className="absolute top-8 right-8 h-1 w-1 animate-ping rounded-full bg-pink-400 opacity-75" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-8 left-8 h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400 opacity-75" style={{ animationDelay: '1s' }}></div>
                    
                    {/* Additional floating elements for enhanced effect */}
                    <div className="absolute top-1/2 left-1/4 h-1 w-1 animate-ping rounded-full bg-yellow-400 opacity-60" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute top-1/3 right-1/3 h-1.5 w-1.5 animate-ping rounded-full bg-green-400 opacity-70" style={{ animationDelay: '2s' }}></div>
                    
                    {/* Subtle grid pattern overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-1000"></div>
                  </div>
                </div>

                {currentProject.type === 'video' && (
                  <>
                    <button
                      aria-label="Play video"
                      className="group/play focus:ring-opacity-50 absolute top-4 right-4 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-black/70 hover:shadow-lg hover:shadow-purple-500/30 focus:ring-2 focus:ring-white focus:outline-none"
                      onClick={() => window.open(currentProject.ref, '_blank')}
                    >
                      <Play className="h-5 w-5 transition-transform duration-300 group-hover/play:scale-110" />
                    </button>

                    {/* Floating Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover/image:opacity-100">
                      <button
                        aria-label="Play video"
                        className="group/playBtn animate-pulse rounded-full bg-white/20 p-4 text-white backdrop-blur-md transition-all duration-500 hover:scale-125 hover:bg-white/30 hover:shadow-2xl hover:shadow-white/30"
                        onClick={() => window.open(currentProject.ref, '_blank')}
                      >
                        <Play className="h-8 w-8 transition-transform duration-300 group-hover/playBtn:scale-110" />
                      </button>
                    </div>
                  </>
                )}

                {/* Project Type Badge */}
                <div className="group/badge absolute top-4 left-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-semibold text-white capitalize transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30">
                  {currentProject.type}
                </div>
              </div>

              {/* Project Details */}
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="transition-all duration-500 group-hover:scale-105">
                    <h4 className="mb-2 text-3xl leading-tight font-bold text-white transition-all duration-300 group-hover:text-purple-200">{currentProject.title}</h4>
                    <p className="mb-4 text-xl font-medium text-purple-300 transition-all duration-300 group-hover:text-purple-200">
                      By
                      {' '}
                      <span className="transition-all duration-300 group-hover:text-white">{currentProject.student_name}</span>
                    </p>
                  </div>

                  <p className="text-base leading-relaxed text-slate-300 transition-all duration-300 group-hover:text-slate-200">
                    {currentProject.description_en || currentProject.description_ar}
                  </p>

                  {/* Course Badge */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="group/badge rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-purple-200 transition-all duration-300 hover:border-white/40 hover:bg-white/20 hover:text-white hover:shadow-lg hover:shadow-purple-500/20">
                      #
                      {currentProject.courseName}
                    </span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                                      <button
                      className="group/btn btn-hover-effect focus:ring-opacity-50 w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition-all duration-500 hover:scale-105 hover:from-purple-700 hover:to-pink-700 hover:shadow-2xl hover:shadow-purple-500/40 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      onClick={() => window.open(currentProject.ref, '_blank')}
                    >
                    <span className="flex items-center justify-center gap-2 transition-all duration-300 group-hover/btn:gap-3">
                      View Full Project
                      <div className="h-0 w-0 overflow-hidden transition-all duration-300 group-hover/btn:h-4 group-hover/btn:w-4">
                        →
                      </div>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    </section>
  );
};

export default CreationsShowcase;
