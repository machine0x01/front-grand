"use client";

import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions
interface ProjectItem {
  id: number;
  student_name: string;
  type: "video" | "image";
  ref: string;
  file: string;
  title: string;
  project: number;
}

interface data {
  id: number;
  items: ProjectItem[];
  title: string;
  description: string;
  course: number;
}

interface StudentProjectsSwiperProps {
  data: data;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ProjectItem | null;
}

// Gradient colors for visual variety
const gradientColors = [
  "from-purple-900 via-blue-800 to-teal-600",
  "from-emerald-600 via-cyan-500 to-blue-500",
  "from-orange-500 via-red-500 to-pink-600",
  "from-pink-400 via-purple-400 to-blue-400",
  "from-cyan-400 via-blue-500 to-purple-600",
  "from-green-400 via-teal-500 to-blue-600",
  "from-red-400 via-pink-500 to-purple-600",
  "from-indigo-500 via-purple-600 to-pink-500",
  "from-yellow-400 via-orange-500 to-red-500",
];

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item }) => {
  if (!item) return null;

  const getVideoEmbedUrl = (url: string): string => {
    // Convert YouTube watch URL to embed URL
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-[80vw] h-[80vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/80 hover:text-white text-2xl z-10"
            >
              ✕
            </button>

            {/* Content Area */}
            <div className="flex-1 flex items-center justify-center bg-black">
              {item.type === "video" ? (
                <iframe
                  src={getVideoEmbedUrl(item.ref)}
                  title={item.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={item.file}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>

            {/* Footer ALWAYS visible */}
            <div className="p-4 bg-gray-900 border-t border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold">{item.title}</h2>
              <p className="text-white/60 text-sm">Student Project</p>
              <p className="text-white/40 text-xs capitalize mt-1">
                By {item.student_name}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StudentProjectsSwiper: React.FC<StudentProjectsSwiperProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (item: ProjectItem): void => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    const handleResize = (): void => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(1);
      } else if (width < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(data.items.length / itemsPerPage);

  const nextPage = (): void => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = (): void => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex: number): void => {
    setCurrentPage(pageIndex);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  return (
    <div className="min-h-screen bg-inherit text-white relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
     

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64  rounded-full blur-3xl -top-32 -left-32 animate-pulse" />
        <div
          className="absolute w-96 h-96 bg-purple-500/40 rounded-full blur-3xl top-1/2 -right-48 "
          style={{ animationDelay: "2s" }}
        />
        
         <div
          className="absolute w-96 h-96 bg-purple-500/40 rounded-full blur-3xl top-1/4 -left-48 "
          style={{ animationDelay: "2s" }}
        />
        {/* <div
          className="absolute w-48 h-48 bg-teal-500/40 rounded-full blur-2xl bottom-0 left-1/3 animate-pulse"
          style={{ animationDelay: "4s" }}
        /> */}
      </div>

      <div className="max-w-[80vw] mx-auto relative z-10">
        <div className="mb-8 sm:mb-12 text-center sm:text-left">
          <p className="text-gray-400 text-xs sm:text-sm mb-2 tracking-wide uppercase">
            {data.title}
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            {data.description}
          </h1>
        </div>

        {data.items.length > 0 && (
          <div className="student-projects-swiper relative">
            <div className="relative h-80 sm:h-96 md:h-[450px] lg:h-[500px] overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="w-full flex-shrink-0 flex gap-3 sm:gap-4 lg:gap-6 justify-center items-center px-2 sm:px-4"
                  >
                    {data.items
                      .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                      .map((item, index) => (
                        <div
                          key={item.id}
                          className={`flex-1 ${
                            itemsPerPage === 1
                              ? "max-w-sm mx-auto"
                              : itemsPerPage === 2
                              ? "max-w-xs sm:max-w-sm"
                              : "max-w-sm"
                          }`}
                        >
                          <div
                            className={`w-full h-72 sm:h-80 md:h-96 bg-gradient-to-br ${
                              gradientColors[index % gradientColors.length]
                            } rounded-2xl sm:rounded-3xl relative group cursor-pointer overflow-hidden transform transition-all duration-300 hover:scale-105 shadow-2xl`}
                            onClick={() => openModal(item)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="absolute inset-0 overflow-hidden">
                              <div className="absolute w-20 sm:w-32 h-20 sm:h-32 bg-white/10 rounded-full blur-xl -top-4 sm:-top-8 -right-4 sm:-right-8 animate-pulse" />
                              <div
                                className="absolute w-16 sm:w-24 h-16 sm:h-24 bg-white/5 rounded-full blur-lg bottom-8 sm:bottom-16 left-4 sm:left-8 animate-pulse"
                                style={{ animationDelay: "1s" }}
                              />
                              <div
                                className="absolute w-12 sm:w-16 h-12 sm:h-16 bg-white/10 rounded-full blur-md top-1/2 right-8 sm:right-16 animate-pulse"
                                style={{ animationDelay: "2s" }}
                              />
                            </div>

                            <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-between">
                              <div className="text-right">
                                <p className="text-white/80 text-xs sm:text-sm capitalize">
                                  By {item.student_name}
                                </p>
                              </div>

                              <div className="text-center">
                                {item.type === "video" && (
                                  <div className="flex justify-center mb-4 sm:mb-6">
                                    <button className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110">
                                      <Play
                                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ml-0.5 sm:ml-1"
                                        fill="white"
                                      />
                                    </button>
                                  </div>
                                )}
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 leading-tight">
                                  {item.title}
                                </h2>
                                <p className="text-white/90 text-sm sm:text-base lg:text-lg capitalize">
                                  {item.type === "video" ? "Video Project" : "Image Project"}
                                </p>
                              </div>
                              <div />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevPage}
              disabled={totalPages <= 1}
              className="absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextPage}
              disabled={totalPages <= 1}
              className="absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {totalPages > 1 && (
              <div className="flex justify-center mt-6 sm:mt-8 gap-1 sm:gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      index === currentPage
                        ? "bg-white w-6 sm:w-8"
                        : "bg-white/30 hover:bg-white/50 w-1.5 sm:w-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {data.items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects available</p>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <p className="text-gray-400 text-sm">
            Swipe or use arrows to explore more projects
          </p>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
    </div>
  );
};

export default StudentProjectsSwiper;