import React from 'react';

interface InstructorData {
  id: number;
  name: string;
  main_stream_title: string;
  description: string;
  image: string;
  social_link: string;
  course: number;
}

interface InstructorProfileProps {
  instructor: InstructorData;
}

const InstructorProfile = ({ instructor }: InstructorProfileProps) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-[80vw] mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-24">
          {/* Profile Image */}
          <div className="flex-shrink-0 w-[280px] h-[280px]">
            <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden shadow-lg">
              <img 
                src={instructor.image}
                alt={instructor.name}
                className="w-full h-full object-cover"
               
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 text-white w-2/3">
            <h2 className="text-3xl font-semibold mb-2">{instructor.name}</h2>
            
            <p className="text-lg text-purple-200 mb-6">{instructor.main_stream_title}</p>
            
            <div className="text-gray-200 leading-relaxed space-y-4">
              <p>{instructor.description}</p>
              
              {/* Social Link (if provided) */}
              {instructor.social_link && (
                <div className="pt-4">
                  <a 
                    href={instructor.social_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-colors duration-200"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.582-2.043 4.729-1.147 1.147-2.871 1.874-4.729 2.043-1.847.164-7.377.164-9.224 0-1.858-.169-3.582-.896-4.729-2.043C-1.304 11.742-1.031 10.018-.862 8.16c.164-1.847.164-7.377 0-9.224C-.031-2.922.696-4.646 1.843-5.793 2.99-6.94 4.714-7.667 6.572-7.832c1.847-.164 7.377-.164 9.224 0 1.858.169 3.582.896 4.729 2.043 1.147 1.147 1.874 2.871 2.043 4.729.164 1.847.164 7.377 0 9.224z"/>
                    </svg>
                    Connect with me
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;                                              
