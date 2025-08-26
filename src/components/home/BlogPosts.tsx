'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import QuoteHeader from '../Title';
import { FloatingStars } from '../ui/FloatingStars';

// Interface for blog post data from API
export interface FeaturedBlog {
  id: number;
  title: string;
  excerpt: string;
  image_alt: string;
  meta_description: string;
  meta_keywords: string;
  category: {
    id: number;
    name: string;
    description: string;
    slug: string;
    created_at: string;
    updated_at: string;
  };
  tags: Array<{
    id: number;
    name: string;
    slug: string;
    created_at: string;
  }>;
  tags_count: number;
  slug: string;
  featured_image: string;
  status: string;
  read_time: number;
  views_count: number;
  is_featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  author: number;
}

// Props interface for the component
type BlogPostsProps = {
  featured_blogs?: FeaturedBlog[];
  showFilters?: boolean;
  postsPerPage?: number;
};

const BlogPosts: React.FC<BlogPostsProps> = ({
  featured_blogs = [],
  showFilters = true,
  postsPerPage = 6,
}) => {
  // Transform featured_blogs to match the component's expected format
  const posts = React.useMemo(() => {
    return (featured_blogs || []).map(blog => ({
      id: blog.id.toString(),
      title: blog.title,
      excerpt: blog.excerpt,
      author: { name: `Author ${blog.author}`, avatar: '' },
      publishedAt: blog.published_at,
      readTime: blog.read_time,
      category: blog.category?.name || 'Uncategorized',
      tags: blog.tags?.map((tag: any) => tag.name) || [],
      featuredImage: blog.featured_image,
      slug: blog.slug,
    }));
  }, [featured_blogs]);

  // Default posts data (fallback if no featured_blogs provided)
  const defaultPosts = [
    {
      id: '2',
      title: 'Building Scalable APIs with Node.js',
      excerpt: 'Explore best practices for creating robust and scalable REST APIs using Node.js, Express, and modern development patterns.',
      author: { name: 'Jane Smith', avatar: '/assets/avatar2.jpg' },
      publishedAt: '2024-01-12',
      readTime: 12,
      category: 'Backend',
      tags: ['Node.js', 'API', 'Backend'],
      featuredImage: '/assets/blog2.jpg',
      slug: 'scalable-apis-nodejs',
    },
    {
      id: '3',
      title: 'UI/UX Design Trends for 2024',
      excerpt: 'Discover the latest design trends that are shaping user experiences in 2024, from micro-interactions to accessibility-first design.',
      author: { name: 'Mike Johnson', avatar: '/assets/avatar3.jpg' },
      publishedAt: '2024-01-10',
      readTime: 6,
      category: 'Design',
      tags: ['UI/UX', 'Design', 'Trends'],
      featuredImage: '/assets/blog3.jpg',
      slug: 'ui-ux-trends-2024',
    },
    {
      id: '4',
      title: 'DevOps Best Practices for Small Teams',
      excerpt: 'Learn how small development teams can implement DevOps practices effectively without overwhelming complexity or resources.',
      author: { name: 'Sarah Wilson', avatar: '/assets/avatar4.jpg' },
      publishedAt: '2024-01-08',
      readTime: 10,
      category: 'DevOps',
      tags: ['DevOps', 'CI/CD', 'Deployment'],
      featuredImage: '/assets/blog4.jpg',
      slug: 'devops-best-practices-small-teams',
    },
    {
      id: '5',
      title: 'Introduction to Machine Learning with Python',
      excerpt: 'Start your machine learning journey with Python. Learn the basics of ML algorithms and how to implement them in real projects.',
      author: { name: 'David Chen', avatar: '/assets/avatar5.jpg' },
      publishedAt: '2024-01-05',
      readTime: 15,
      category: 'AI/ML',
      tags: ['Machine Learning', 'Python', 'AI'],
      featuredImage: '/assets/blog5.jpg',
      slug: 'machine-learning-python-intro',
    },
    {
      id: '6',
      title: 'Web Performance Optimization Strategies',
      excerpt: 'Boost your website\'s performance with proven optimization techniques that improve user experience and search rankings.',
      author: { name: 'Lisa Brown', avatar: '/assets/avatar6.jpg' },
      publishedAt: '2024-01-03',
      readTime: 9,
      category: 'Performance',
      tags: ['Performance', 'Web', 'Optimization'],
      featuredImage: '/assets/blog6.jpg',
      slug: 'web-performance-optimization',
    },
  ];

  // Use transformed posts or default posts
  const displayedPosts = posts.length > 0 ? posts : defaultPosts;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredPosts, setHoveredPosts] = useState<Record<string, boolean>>({});

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(displayedPosts.map((post: any) => post.category)))];

  // Filter posts by category
  const filteredPosts = selectedCategory === 'All'
    ? displayedPosts
    : displayedPosts.filter((post: any) => post.category === selectedCategory);

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Handle hover state for individual posts
  const handlePostHover = (postId: string, isHovered: boolean) => {
    setHoveredPosts(prev => ({
      ...prev,
      [postId]: isHovered
    }));
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle author initials
  const getAuthorInitials = (name: string) => {
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section className="px-6 py-16 relative">
      {/* Right Side Lighting Effect */}
     
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <QuoteHeader 
            title="Latest Blog Posts" 
            description="Discover insights, tutorials, and industry trends from our expert team. Stay updated with the latest in technology and development." 
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`group/filter rounded-full px-6 py-3 font-medium transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-yellow-500/30 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#FEB101] to-[#FFD984] text-white shadow-lg shadow-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/50'
                    : 'border border-gray-200 bg-white text-gray-700 hover:border-[#FEB101] hover:text-[#FEB101] hover:bg-yellow-50/50'
                }`}
              >
                <span className="transition-all duration-300 group-hover/filter:scale-105">{category}</span>
              </button>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map((post) => {
            
            return (
              <div 
                key={post.id} 
                className="group hover-lift relative"
                onMouseEnter={() => handlePostHover(post.id, true)}
                onMouseLeave={() => handlePostHover(post.id, false)}
              >
                {/* Floating Stars Animation */}
                <FloatingStars isHovered={hoveredPosts[post.id] || false} />
                
                {/* Enhanced gradient overlay with floating particles */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-yellow-600/20 opacity-0 transition-all duration-700 group-hover:opacity-100" />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none">
                  <div className="absolute top-4 left-4 h-2 w-2 animate-ping rounded-full bg-purple-400 opacity-75"></div>
                  <div className="absolute top-8 right-8 h-1 w-1 animate-ping rounded-full bg-pink-400 opacity-75" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-8 left-8 h-1.5 w-1.5 animate-ping rounded-full bg-yellow-400 opacity-75" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-1/4 h-1 w-1 animate-ping rounded-full bg-cyan-400 opacity-60" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute top-1/3 right-1/3 h-1.5 w-1.5 animate-ping rounded-full bg-green-400 opacity-70" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative h-64 overflow-hidden rounded-2xl transition-all duration-700 group-hover:scale-105">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Enhanced overlay with shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />
                  
                  {/* Subtle grid pattern overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                </div>

                <div className="mt-4 p-4 transition-all duration-500 group-hover:scale-105">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-400 transition-all duration-300 group-hover:text-gray-300">
                      <span className="transition-all duration-300 group-hover:text-yellow-400">{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                  
                  <h3 className="mb-2 text-xl font-bold text-white transition-all duration-300 group-hover:text-yellow-200 group-hover:scale-105">{post.title}</h3>
                  <p className="mb-4 text-gray-300 line-clamp-2 transition-all duration-300 group-hover:text-gray-200">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center transition-all duration-300 group-hover:scale-105">
                      <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-700 flex items-center justify-center transition-all duration-300 group-hover:bg-yellow-600/20 group-hover:ring-2 group-hover:ring-yellow-500/30">
                        {post.author.avatar ? (
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <span className="text-white font-medium transition-all duration-300 group-hover:text-yellow-200">
                            {getAuthorInitials(post.author.name)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white transition-all duration-300 group-hover:text-yellow-200">{post.author.name}</p>
                        <p className="text-xs text-gray-400 transition-all duration-300 group-hover:text-gray-300">{formatDate(post.publishedAt)}</p>
                      </div>
                    </div>
                    
                    <button 
                      className="group/btn flex items-center space-x-1 text-sm font-medium text-[#FEB101] transition-all duration-500 hover:text-[#FFD984] hover:scale-110"
                      onClick={() => {}}
                    >
                      <span className="transition-all duration-300 group-hover/btn:translate-x-1">Read More</span>
                      <svg className="h-4 w-4 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="group/prev rounded-lg border border-gray-200 px-4 py-2 transition-all duration-300 hover:border-[#FEB101] hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg"
            >
              <span className="flex items-center gap-2 transition-all duration-300 group-hover/prev:gap-3">
                <svg className="h-4 w-4 transition-transform duration-300 group-hover/prev:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`group/page rounded-lg px-4 py-2 transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  currentPage === page
                    ? 'bg-[#FEB101] text-white shadow-lg shadow-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/50'
                    : 'border border-gray-200 hover:border-[#FEB101] hover:bg-yellow-50/50 hover:shadow-yellow-500/20'
                }`}
              >
                <span className="transition-all duration-300 group-hover/page:scale-105">{page}</span>
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="group/next rounded-lg border border-gray-200 px-4 py-2 transition-all duration-300 hover:border-[#FEB101] hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg"
            >
              <span className="flex items-center gap-2 transition-all duration-300 group-hover/next:gap-3">
                Next
                <svg className="h-4 w-4 transition-transform duration-300 group-hover/next:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPosts;
