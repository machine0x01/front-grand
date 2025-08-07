import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SplashCursor from '@/components/shared/SplashCursor';
import { ChevronLeft, ChevronRight, Play, CheckCircle, Download, Settings, Monitor, Package, Zap, Shield, Rocket } from 'lucide-react';

type IInstallationProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IInstallationProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Installation',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: 'installation guide, setup, development environment, animation software, design tools',
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      type: 'website',
      locale: locale,
      siteName: 'Grand Notion',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta_title'),
      description: t('meta_description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Static installation data following the mock structure
const installationSteps = [
  {
    title: "System Requirements Check",
    content: "Before installing any software, ensure your system meets the minimum requirements. You'll need at least 8GB RAM, 4GB free disk space, and a modern web browser. Check your system specifications and ensure you have the latest graphics drivers installed.",
    video_ref: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Download Required Software",
    content: "Download the latest versions of Adobe Creative Suite, Blender, and other essential tools. We recommend using the official websites to ensure you get legitimate copies. Make sure to download the correct versions for your operating system.",
    video_ref: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Install Adobe Creative Suite",
    content: "Install Photoshop, Illustrator, and After Effects from Adobe Creative Suite. Follow the installation wizard and ensure you have a valid Adobe account for activation. The installation process may take 30-60 minutes depending on your system.",
    video_ref: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Install Blender",
    content: "Download and install Blender from the official website. Blender is free and open-source, making it perfect for learning 3D animation and modeling. The installation is straightforward and should take about 10-15 minutes.",
    video_ref: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Configure Development Environment",
    content: "Set up your workspace with proper folder structures, project templates, and asset libraries. This will help you stay organized throughout your learning journey. Create dedicated folders for different types of projects.",
    video_ref: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Install Additional Plugins",
    content: "Install recommended plugins and extensions for enhanced functionality. These tools will help you work more efficiently and access advanced features. Some plugins may require additional setup or configuration.",
    video_ref: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Verify Installation",
    content: "Test all installed software to ensure everything is working correctly. Create a simple test project to verify that all tools are properly configured. This step is crucial to avoid issues during your learning process.",
    video_ref: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Get Started",
    content: "You're all set! Start with our beginner courses and gradually progress to more advanced topics. Remember to save your work regularly and backup your projects. Welcome to your creative journey!",
    video_ref: null
  }
];

const stepIcons = [
  Monitor, Download, Package, Zap, Settings, Shield, CheckCircle, Rocket
];

export default async function InstallationPage(props: IInstallationProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  
  const t = await getTranslations({
    locale,
    namespace: 'Installation',
  });

  return (
    <main className="min-h-screen bg-primary">
      <SplashCursor />
      
      {/* Header Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2">
              {installationSteps.map((_, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full bg-purple-500/30 border border-purple-400/50"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="px-4 sm:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {installationSteps.map((step, index) => {
              const IconComponent = stepIcons[index];
              const isLastStep = index === installationSteps.length - 1;
              
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  {/* Step Number */}
                
                  {/* Step Content */}
                  <div className="ml-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group-hover:border-purple-400/50">
                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                        {IconComponent && <IconComponent className="w-8 h-8 text-purple-400" />}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                          {step.content}
                        </p>
                        
                        {/* Video Section */}
                        {step.video_ref && (
                          <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                              <Play className="w-5 h-5 text-purple-400" />
                              <span className="text-purple-400 font-medium">
                                {t('video_guide')}
                              </span>
                            </div>
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/20 border border-white/10">
                              <iframe
                                src={step.video_ref}
                                title={`${step.title} Video Guide`}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                       
                      </div>
                    </div>
                  </div>
                  
                  {/* Connection Line */}
                  {!isLastStep && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-purple-500 to-pink-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="px-4 sm:px-8 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Now that you have everything set up, explore our comprehensive courses and start your creative journey!
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-medium text-lg transition-all duration-300">
              Browse Courses
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
