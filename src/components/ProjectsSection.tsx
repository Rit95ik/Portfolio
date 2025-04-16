"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";

// Define a type for projects
type Project = {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  category: string;
  date?: string;
  teamSize?: string;
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
  image?: string;
  images?: string[];
};

// Projects data from resume
const projects: Project[] = [
  {
    id: 1,
    title: "Co-foundify",
    description: "A platform connecting entrepreneurs with potential co-founders. Features include user authentication, real-time messaging, profile matching, and discussion forums for seamless collaboration.",
    longDescription: "Co-foundify is a comprehensive platform designed to help entrepreneurs find the perfect co-founder match. The platform offers a robust set of features including user authentication, detailed profile creation, skills matching algorithm, real-time messaging, discussion forums, and meeting scheduling capabilities. The interface is designed to be intuitive and user-friendly, focusing on meaningful connections in the startup ecosystem.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Tailwind CSS"],
    images: [
      "/images/projects/co-foundify/cofoundify-1.png",
      "/images/projects/co-foundify/cofoundify-2.png",
      "/images/projects/co-foundify/cofoundify-3.png",
      "/images/projects/co-foundify/cofoundify-4.png"
    ],
    category: "Full Stack",
    date: "June 2023 - November 2023",
    teamSize: "4",
    liveUrl: "#",
    githubUrl: "https://github.com/Rit95ik/cofoundify",
    features: [
      "User authentication and profile management",
      "Co-founder matching algorithm based on skills and interests",
      "Real-time messaging system",
      "Discussion forums for startup topics",
      "Meeting scheduling and calendar integration",
      "Responsive design for all device types"
    ],
  },
  {
    id: 2,
    title: "Sociopedia",
    description: "A social media web app where users can create posts, view other profiles, add friends, like, and comment. Built with authentication and real-time interactions.",
    longDescription: "Sociopedia is a feature-rich social media platform that enables users to connect with friends, share updates, and engage with content. The application includes comprehensive user authentication, profile customization, a news feed with post creation and interaction capabilities, friend management features, and real-time notifications.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Material UI", "Redux"],
    images: [
      "/images/projects/sociopedia/sociopedia-1.png",
      "/images/projects/sociopedia/sociopedia-2.png",
      "/images/projects/sociopedia/sociopedia-3.png",
      "/images/projects/sociopedia/sociopedia-4.png"
    ],
    category: "Full Stack",
    date: "January 2024 - February 2024",
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "User authentication with JWT",
      "Profile creation and customization",
      "Post creation with image uploads",
      "Like and comment functionality",
      "Friend request system",
      "Dark/light mode toggle"
    ]
  },
  {
    id: 3,
    title: "Paste",
    description: "A application design to manage and store the coding problems or daily tasks. It allows users to create and manage daily and custom pastes lists.",
    longDescription: "A application design to manage and store the coding problems or daily tasks. It allows users to create and manage daily and custom pastes lists.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    images: [
      "/images/projects/paste/paste-1.png",
      "/images/projects/paste/paste-2.png",
      "/images/projects/paste/paste-3.png",
      "/images/projects/paste/paste-4.png"
    ],
    category: "Web Development",
    date: "March 2024 - April 2024",
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Store coding problems or daily tasks",
      "Create new paste",
      "Delete the paste",
      "Edit existing paste",
      "Share your pastes with friends",
      "Responsive design for mobile and desktop"
    ]
  }
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const controls = useAnimation();

  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll animation handler
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      // Check if section is in view
      const sectionTop = section.getBoundingClientRect().top;
      const isVisible = sectionTop < window.innerHeight * 0.75;
      
      if (isVisible) {
        section.classList.add('active');
        
        // Animate projects sequentially
        projectRefs.current.forEach((project, index) => {
          if (project) {
            setTimeout(() => {
              project.classList.add('active');
            }, 200 * index);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const handleNextImage = () => {
    const activeProjectData = projects.find(p => p.id === activeProject);
    if (activeProjectData?.images && activeProjectData.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % activeProjectData.images!.length);
    }
  };

  const handlePrevImage = () => {
    const activeProjectData = projects.find(p => p.id === activeProject);
    if (activeProjectData?.images && activeProjectData.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? activeProjectData.images!.length - 1 : prev - 1
      );
    }
  };

  const closeProjectDetails = () => {
    setActiveProject(null);
    setCurrentImageIndex(0);
    setImageError(false);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMzMDRhODAiIHN0cm9rZS13aWR0aD0iLjUiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjkuNSIvPjxwYXRoIGQ9Ik0yOS41IDE1aDFNNDUgMjkuNXYxTTI5LjUgNDVoMU0xNSAyOS41djFNMzkuNSAxOS4xbC43MDcuNzA3TTQwLjkgMzkuNWwuNzA3LjcwN00yMC4xIDQwLjlsLS43MDcuNzA3TDE5LjEgMjAuMWwtLjcwNy43MDciLz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-500 opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span 
              className="inline-block px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm font-medium mb-4 font-accent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Portfolio
            </motion.span>
            <motion.h2 
              className="section-heading text-4xl md:text-5xl leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Featured <span className="hero-animation-gradient">Projects</span>
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 mb-8"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "6rem", opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            ></motion.div>
            <motion.p 
              className="max-w-2xl mx-auto text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Here are some of the projects I've worked on, showcasing my skills in full-stack web development.
              Each project represents unique challenges and solutions.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants} 
            className="flex flex-wrap justify-center gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
                initial="rest"
                whileHover="hover"
                animate={hoveredProject === project.id ? "hover" : "rest"}
                variants={cardVariants}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`bg-gray-800 rounded-xl overflow-hidden shadow-xl transition-all border border-gray-700 hover:border-blue-900/50 w-full md:w-[calc(50%-1rem)] ${
                  index % 2 === 0 ? 'fade-in-left' : 'fade-in-right'
                }`}
              >
                <div className="relative h-64 overflow-hidden rounded-t-xl bg-gradient-to-br from-blue-900 to-gray-900">
                  {project.images && project.images.length > 0 ? (
                    <div className="relative w-full h-full group">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-800 to-indigo-900">
                      <span className="text-white text-opacity-70 text-xl font-medium">No Preview</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 text-xs font-semibold bg-blue-900/80 text-blue-200 rounded-full backdrop-blur-sm">
                        {project.category}
                      </span>
                      {project.date && (
                        <span className="px-3 py-1 text-xs font-semibold bg-gray-800/80 text-gray-200 rounded-full backdrop-blur-sm">
                          {project.date.split(" - ")[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-300 mb-8 h-24 overflow-hidden">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech.slice(0, 5).map((tech) => (
                      <span
                        key={`${project.id}-${tech}`}
                        className="px-3 py-1.5 text-xs bg-gray-700 text-gray-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="px-3 py-1.5 text-xs bg-gray-700 text-gray-300 rounded-full">
                        +{project.tech.length - 5} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center items-center">
                    <motion.button
                      onClick={() => {
                        setActiveProject(project.id);
                        setImageError(false);
                      }}
                      whileHover="hover"
                      variants={buttonHoverVariants}
                      className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-md shadow-blue-900/30 transition-all duration-300 hover:shadow-blue-700/40 text-center"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-16">
            {/* Removed "View More on GitHub" button */}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-gray-900 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl"
          >
            {(() => {
              const currentProject = projects.find(p => p.id === activeProject);
              if (!currentProject) return null;
              
              return (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {currentProject.title}
                    </h3>
                    <button 
                      onClick={closeProjectDetails}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {currentProject.images && currentProject.images.length > 0 ? (
                    <div className="relative h-[50vh] sm:h-[60vh] w-full bg-gray-800 rounded-lg overflow-hidden">
                      {imageError ? (
                        <div className="flex flex-col items-center justify-center h-full bg-gray-800 rounded-lg p-4">
                          <p className="text-red-400 font-medium mb-2">Unable to load image</p>
                          <p className="text-gray-400 text-sm break-all">{currentProject.images[currentImageIndex]}</p>
                          <button 
                            onClick={() => setImageError(false)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Retry
                          </button>
                        </div>
                      ) : (
                        <div className="relative w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
                          <Image 
                            src={currentProject.images[currentImageIndex]} 
                            alt={`${currentProject.title} screenshot ${currentImageIndex + 1}`}
                            fill
                            className="object-contain" 
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            onError={() => setImageError(true)}
                            quality={90}
                          />
                        </div>
                      )}
                      
                      {currentProject.images.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                            aria-label="Previous image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                            aria-label="Next image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          
                          {/* Image indicators */}
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {currentProject.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`w-2 h-2 rounded-full ${
                                  idx === currentImageIndex ? "bg-blue-500" : "bg-gray-400"
                                }`}
                                aria-label={`Go to image ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[50vh] bg-gradient-to-r from-blue-800 to-indigo-900 rounded-lg">
                      <p className="text-white text-xl font-medium">No images available for {currentProject.title}</p>
                    </div>
                  )}

                  <div className="prose prose-lg prose-invert max-w-none mb-8 space-y-6 mt-6">
                    <h4 className="text-xl font-semibold text-blue-400 mb-4">Project Overview</h4>
                    <p className="text-gray-300 mb-6">
                      {currentProject.longDescription || currentProject.description}
                    </p>
                    
                    {currentProject.features && (
                      <>
                        <h4 className="text-xl font-semibold text-blue-400 mt-8 mb-4">Key Features</h4>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                          {currentProject.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    <h4 className="text-xl font-semibold text-blue-400 mt-8 mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {currentProject.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-1.5 text-sm bg-blue-900/50 text-blue-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {currentProject.date && (
                      <div className="mt-8">
                        <h4 className="text-xl font-semibold text-blue-400 mb-4">Timeline</h4>
                        <p className="text-gray-300">{currentProject.date}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </div>
      )}
    </section>
  );
} 