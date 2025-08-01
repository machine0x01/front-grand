'use client';
import Image from 'next/image';
import React, { useState } from 'react';

// Interface for blog post data
type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: number; // in minutes
  category: string;
  tags: string[];
  featuredImage: string;
  slug: string;
};

// Props interface for the component
type BlogPostsProps = {
  posts?: BlogPost[];
  showFilters?: boolean;
  postsPerPage?: number;
};

const BlogPosts: React.FC<BlogPostsProps> = ({
  posts,
  showFilters = true,
  postsPerPage = 6,
}) => {
  // Default posts data
  const defaultPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Getting Started with Modern React Development',
      excerpt: 'Learn the fundamentals of React development with hooks, context, and modern patterns that will make you a more efficient developer.',
      author: { name: 'John Doe', avatar: '/assets/avatar1.jpg' },
      publishedAt: '2024-01-15',
      readTime: 8,
      category: 'Development',
      tags: ['React', 'JavaScript', 'Frontend'],
      featuredImage: '/assets/blog1.jpg',
      slug: 'getting-started-react-development',
    },
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

  const blogPosts = posts || defaultPosts;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Filter posts by category
  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="px-6 py-16 ">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {/* <QuoteHeader title={title} description={subtitle} /> */}
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
                className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#FEB101] to-[#FFD984] text-white shadow-lg'
                    : 'border border-gray-200 bg-white text-gray-700 hover:border-[#FEB101] hover:text-[#FEB101]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map(post => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-[#FEB101] px-3 py-1 text-sm font-medium text-white">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="mb-3 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    {post.author.avatar && (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                    <span>{post.author.name}</span>
                  </div>
                  <span>
                    {post.readTime}
                    {' '}
                    min read
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#FEB101]">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 line-clamp-3 text-gray-600">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Date and Read More */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </span>
                  <button className="flex items-center space-x-1 text-sm font-medium text-[#FEB101] transition-colors hover:text-[#FFD984]">
                    <span>Read More</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-200 px-4 py-2 transition-colors hover:border-[#FEB101] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg px-4 py-2 transition-colors ${
                  currentPage === page
                    ? 'bg-[#FEB101] text-white'
                    : 'border border-gray-200 hover:border-[#FEB101]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-200 px-4 py-2 transition-colors hover:border-[#FEB101] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPosts;
