import React from 'react';
import ProfileCard from '../shared/profile-card/ProfileCard';

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
    <div className="px-4 sm:px-6 lg:px-8 py-16 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Profile Card */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <ProfileCard 
              name={instructor.name}
              title={instructor.main_stream_title}
              handle="instructor"
              status="Available"
              contactText="Contact Me"
              avatarUrl={instructor.image}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 lg:max-w-2xl space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                {instructor.name}
              </h2>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-xl lg:text-2xl font-semibold text-purple-200">
                  {instructor.main_stream_title}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg lg:text-xl text-gray-200 leading-relaxed">
                  {instructor.description}
                </p>
              </div>
            </div>

            {/* Social Links & Additional Info */}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;                                              
