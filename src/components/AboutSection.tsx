"use client";

import { useInView } from "react-intersection-observer";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Refs for timeline scrolling animation
  const educationTimelineRef = useRef<HTMLDivElement>(null);
  const experienceTimelineRef = useRef<HTMLDivElement>(null);
  
  // For tracking scroll progress on timelines
  const [educationProgress, setEducationProgress] = useState(0);
  const [experienceProgress, setExperienceProgress] = useState(0);

  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Timeline scroll animation handler
  useEffect(() => {
    const handleTimelineScroll = () => {
      if (!educationTimelineRef.current || !experienceTimelineRef.current) return;
      
      const educationTimeline = educationTimelineRef.current;
      const experienceTimeline = experienceTimelineRef.current;
      
      // Calculate viewport position
      const viewportHeight = window.innerHeight;
      const educationRect = educationTimeline.getBoundingClientRect();
      const experienceRect = experienceTimeline.getBoundingClientRect();
      
      // Calculate progress (0 to 1) based on timeline position in viewport
      // For education: reverse the direction (start at bottom, move to top)
      const educationStart = viewportHeight;
      const educationEnd = -educationRect.height;
      const educationCurrent = Math.min(Math.max(educationRect.top, educationEnd), educationStart);
      // Reverse the progress calculation for education (1 becomes 0, 0 becomes 1)
      const newEducationProgress = (educationCurrent - educationEnd) / (educationStart - educationEnd);
      
      const experienceStart = viewportHeight;
      const experienceEnd = -experienceRect.height;
      const experienceCurrent = Math.min(Math.max(experienceRect.top, experienceEnd), experienceStart);
      const newExperienceProgress = 1 - (experienceCurrent - experienceEnd) / (experienceStart - experienceEnd);
      
      setEducationProgress(newEducationProgress);
      setExperienceProgress(newExperienceProgress);
    };
    
    window.addEventListener('scroll', handleTimelineScroll);
    // Initial check
    handleTimelineScroll();
    
    return () => window.removeEventListener('scroll', handleTimelineScroll);
  }, []);

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
        
        // Animate timeline and skills with delay
        if (timelineRef.current) {
          setTimeout(() => {
            timelineRef.current?.classList.add('active');
          }, 300);
        }
        
        if (skillsRef.current) {
          setTimeout(() => {
            skillsRef.current?.classList.add('active');
          }, 600);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.5 }
    }
  };

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden bg-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900 to-transparent" />
        <div className="absolute top-40 left-0 w-72 h-72 rounded-full bg-blue-600 blur-3xl animate-pulse-slow opacity-20" />
        <div className="absolute bottom-20 right-0 w-96 h-96 rounded-full bg-purple-700 blur-3xl animate-float opacity-20" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMyMDRhODAiIHN0cm9rZS13aWR0aD0iLjUiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjkuNSIvPjxwYXRoIGQ9Ik0yOS41IDE1aDFNNDUgMjkuNXYxTTI5LjUgNDVoMU0xNSAyOS41djFNMzkuNSAxOS4xbC43MDcuNzA3TTQwLjkgMzkuNWwuNzA3LjcwN00yMC4xIDQwLjlsLS43MDcuNzA3TTE5LjEgMjAuMWwtLjcwNy43MDciLz48L2c+PC9zdmc+')] opacity-10"></div>
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
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.span 
              className="inline-block px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm font-medium mb-6 font-accent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              About Me
            </motion.span>
            <motion.h2 
              className="section-heading text-4xl md:text-5xl leading-tight text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Crafting <span className="hero-animation-gradient">Digital Experiences</span>
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "6rem", opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            ></motion.div>
          </motion.div>

          {/* Brief Introduction */}
          <motion.div variants={itemVariants} className="mb-32">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-10 rounded-2xl border border-gray-800 shadow-xl backdrop-blur-sm">
              <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto leading-relaxed font-accent font-light text-gray-300">
                I'm a <span className="font-medium text-blue-400">passionate developer</span> focused on crafting clean, user-friendly solutions. With attention to detail and a love for <span className="font-medium text-purple-400">elegant code</span>, I aim to create digital experiences that leave a lasting impression.
              </p>
              <div className="flex flex-wrap justify-center gap-5 mt-10">
                <span className="px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium">Full Stack Developer</span>
                <span className="px-4 py-2 bg-purple-900/50 text-purple-300 rounded-full text-sm font-medium">UI/UX Enthusiast</span>
                <span className="px-4 py-2 bg-indigo-900/50 text-indigo-300 rounded-full text-sm font-medium">Problem Solver</span>
              </div>
            </div>
          </motion.div>

          {/* Education & Experience */}
          <motion.div 
            variants={itemVariants} 
            className="mb-32"
            ref={timelineRef}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Education Section */}
              <motion.div 
                className="bg-[#121a2d] p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 relative"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 0 20px 5px rgba(59, 130, 246, 0.1)" 
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mr-4 shadow-lg shadow-blue-600/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Education</h3>
                </div>
                
                {/* Timeline Path with Animated Scrolling Dot */}
                <div className="relative" ref={educationTimelineRef}>
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 w-0.5 h-full bg-blue-500/80"></div>
                  
                  {/* Animated Dot that follows scroll - moves down the line */}
                  <motion.div 
                    className="absolute left-4 w-6 h-6 rounded-full bg-transparent border-2 border-blue-500/70 shadow-[0_0_10px_3px_rgba(59,130,246,0.3)] z-10 -translate-x-1/2"
                    style={{ 
                      top: `${educationProgress * 100}%`,
                      opacity: educationProgress > 0.05 ? 1 : 0, 
                    }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"></div>
                  </motion.div>
                
                  <div className="space-y-6 ml-8">
                    {/* Education Item 1 */}
                    <motion.div 
                      className="relative bg-gray-900/50 p-4 rounded-lg border-l-2 border-blue-400"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    >
                      <div>
                        <h4 className="font-medium text-white text-lg">Parul Institute Of Engineering And Technology</h4>
                        <p className="text-sm text-blue-300 font-medium mt-2">B.Tech In Information And Technology</p>
                        <div className="flex justify-between mt-2">
                          <p className="text-sm text-gray-400">2020-2024</p>
                          <p className="text-sm text-gray-400">CGPA: 6.77</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Education Item 2 */}
                    <motion.div 
                      className="relative bg-gray-900/50 p-4 rounded-lg border-l-2 border-blue-400"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    >
                      <div>
                        <h4 className="font-medium text-white text-lg">Kendriya Vidhyalaya Ahmedabad Cantt</h4>
                        <p className="text-sm text-blue-300 font-medium mt-2">Higher Secondary (12th grade)</p>
                        <div className="flex justify-between mt-2">
                          <p className="text-sm text-gray-400">2019-2020</p>
                          <p className="text-sm text-gray-400">Percentage: 73.5%</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Education Item 3 */}
                    <motion.div 
                      className="relative bg-gray-900/50 p-4 rounded-lg border-l-2 border-blue-400"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    >
                      <div>
                        <h4 className="font-medium text-white text-lg">Kendriya Vidhyalaya Ahmedabad Cantt</h4>
                        <p className="text-sm text-blue-300 font-medium mt-2">Secondary (10th Grade)</p>
                        <div className="flex justify-between mt-2">
                          <p className="text-sm text-gray-400">2018-2019</p>
                          <p className="text-sm text-gray-400">Percentage: 74.4%</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Experience Section */}
              <motion.div 
                className="bg-[#121a2d] p-8 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 relative"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 0 20px 5px rgba(124, 58, 237, 0.1)" 
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center mr-4 shadow-lg shadow-purple-600/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Experience</h3>
                </div>
                
                {/* Timeline Path with Animated Scrolling Dot */}
                <div className="relative" ref={experienceTimelineRef}>
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 w-0.5 h-full bg-purple-500/80"></div>
                  
                  {/* Animated Dot that follows scroll - moves down the line */}
                  <motion.div 
                    className="absolute left-4 w-6 h-6 rounded-full bg-transparent border-2 border-purple-500/70 shadow-[0_0_10px_3px_rgba(124,58,237,0.3)] z-10 -translate-x-1/2"
                    style={{ 
                      top: `${experienceProgress * 100}%`,
                      opacity: experienceProgress > 0.05 ? 1 : 0, 
                    }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"></div>
                  </motion.div>
                
                  <div className="ml-8">
                    <div className="mb-8">
                      <h4 className="font-medium text-white text-xl">Web Developer Intern</h4>
                      <div className="flex items-center text-sm text-purple-300 font-medium mt-2">
                        <span>Taxtip Advisory LLP</span>
                        <span className="mx-2">•</span>
                        <span>Dec 2023 - June 2024</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Experience Item 1 */}
                      <motion.div 
                        className="relative bg-gray-900/50 p-4 rounded-lg border-l-2 border-purple-400"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ x: 5, backgroundColor: "rgba(76, 29, 149, 0.2)" }}
                      >
                        <p className="text-sm text-gray-300">Developed and maintained dynamic web applications using <span className="text-purple-300 font-medium">HTML, CSS, and JavaScript</span> for responsive UI/UX.</p>
                      </motion.div>
                      
                      {/* Experience Item 2 */}
                      <motion.div 
                        className="relative bg-gray-900/50 p-4 rounded-lg border-l-2 border-purple-400"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ x: 5, backgroundColor: "rgba(76, 29, 149, 0.2)" }}
                      >
                        <p className="text-sm text-gray-300">Built interactive frontend components with <span className="text-purple-300 font-medium">React.js</span>, ensuring smooth user experience.</p>
                      </motion.div>
                      
                      {/* Experience Item 3 */}
                      <motion.div 
                        className="relative bg-gray-900/50 p-4 rounded-lg border-l-2 border-purple-400"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ x: 5, backgroundColor: "rgba(76, 29, 149, 0.2)" }}
                      >
                        <p className="text-sm text-gray-300">Designed and implemented RESTful APIs using <span className="text-purple-300 font-medium">Node.js and Express.js</span> to handle backend functionality.</p>
                      </motion.div>
                      
                      {/* Experience Item 4 */}
                      <motion.div 
                        className="relative bg-gray-900/50 p-4 rounded-lg border-l-2 border-purple-400"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ x: 5, backgroundColor: "rgba(76, 29, 149, 0.2)" }}
                      >
                        <p className="text-sm text-gray-300">Collaborated with cross-functional teams to enhance application performance and troubleshoot issues.</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills & Expertise */}
          <motion.div variants={itemVariants} className="mb-32" ref={skillsRef}>
            <div className="text-center mb-16">
              <h3 className="text-3xl text-white font-bold mb-4">Skills & Expertise</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
              {/* Skill Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-700">
                {/* Frontend */}
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center mr-4 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white">Frontend</h4>
                  </div>
                  
                  <div className="space-y-5">
                    {[
                      { name: "HTML/CSS", level: 90 },
                      { name: "JavaScript", level: 85 },
                      { name: "React.js", level: 80 },
                      { name: "Next.js", level: 75 },
                      { name: "Tailwind CSS", level: 85 },
                      { name: "Bootstrap", level: 75 },
                    ].map((skill, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between mb-2">
                          <span className="text-base font-medium text-blue-300 group-hover:text-blue-200 transition-colors">{skill.name}</span>
                          <span className="text-sm text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                          <motion.div 
                            className="bg-gradient-to-r from-blue-500 to-blue-300 h-3 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Backend */}
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center mr-4 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white">Backend</h4>
                  </div>
                  
                  <div className="space-y-5">
                    {[
                      { name: "Node.js", level: 80 },
                      { name: "Express.js", level: 80 },
                      { name: "RESTful APIs", level: 85 },
                      { name: "MongoDB", level: 75 },
                    ].map((skill, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between mb-2">
                          <span className="text-base font-medium text-purple-300 group-hover:text-purple-200 transition-colors">{skill.name}</span>
                          <span className="text-sm text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                          <motion.div 
                            className="bg-gradient-to-r from-purple-500 to-purple-300 h-3 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tools & Others */}
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center mr-4 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white">Tools & Others</h4>
                  </div>
                  
                  <div className="space-y-5">
                    {[
                      { name: "Git & GitHub", level: 85 },
                      { name: "Responsive Design", level: 90 },
                      { name: "Problem Solving", level: 80 },
                    ].map((skill, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between mb-2">
                          <span className="text-base font-medium text-indigo-300 group-hover:text-indigo-200 transition-colors">{skill.name}</span>
                          <span className="text-sm text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                          <motion.div 
                            className="bg-gradient-to-r from-indigo-500 to-indigo-300 h-3 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Technical Icons */}
              <div className="p-8 bg-gray-900/30">
                <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                  {[
                    { name: "HTML", icon: "🎨" },
                    { name: "CSS", icon: "🎭" },
                    { name: "JavaScript", icon: "💻" },
                    { name: "React", icon: "⚛️" },
                    { name: "Node.js", icon: "🚀" },
                    { name: "Express", icon: "🔌" },
                    { name: "MongoDB", icon: "🍃" },
                    { name: "GitHub", icon: "🔄" },
                  ].map((tech, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 rounded-md bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 transition-all"
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      <span className="text-3xl mb-2">{tech.icon}</span>
                      <span className="text-sm text-gray-300 font-medium">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="mt-16 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-4 font-medium rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-500 hover:to-purple-500"
            >
              <span className="mr-2">Let's Work Together</span>
              <svg className="w-5 h-5 animate-bounce-slow" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 