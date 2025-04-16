"use client";

import { useInView } from "react-intersection-observer";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const skillsData = [
  {
    category: "Frontend",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    skills: [
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React.js", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Bootstrap", level: 80 },
    ],
  },
  {
    category: "Backend",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
      </svg>
    ),
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "RESTful API Design", level: 80 },
      { name: "MongoDB", level: 80 },
      { name: "Authentication", level: 75 },
      { name: "Real-time Messaging", level: 70 },
    ],
  },
  {
    category: "Tools & Others",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Responsive Design", level: 90 },
      { name: "Cross-functional Collaboration", level: 80 },
      { name: "Problem Solving", level: 85 },
      { name: "User Authentication", level: 75 },
    ],
  },
];

export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<null | string>(null);
  const [highlightedCategory, setHighlightedCategory] = useState<number | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const controls = useAnimation();

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
        staggerChildren: 0.1,
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

  const barVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    }),
  };

  const floatingIconVariants = {
    initial: { y: 0, opacity: 0.5 },
    animate: { 
      y: [-10, 10, -10], 
      opacity: [0.5, 1, 0.5],
      transition: { 
        y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        opacity: { repeat: Infinity, duration: 4, ease: "easeInOut" }
      }
    }
  };

  const cardHoverVariants = {
    rest: { scale: 1, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" },
    hover: { 
      scale: 1.02, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMzMDRhODAiIHN0cm9rZS13aWR0aD0iLjUiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjkuNSIvPjxwYXRoIGQ9Ik0yOS41IDE1aDFNNDUgMjkuNXYxTTI5LjUgNDVoMU0xNSAyOS41djFNMzkuNSAxOS4xbC43MDcuNzA3TTQwLjkgMzkuNWwuNzA3LjcwN00yMC4xIDQwLjlsLS43MDcuNzA3TTE5LjEgMjAuMWwtLjcwNy43MDciLz48L2c+PC9zdmc+')] opacity-20"></div>
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
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.span 
              className="inline-block px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm font-medium mb-4 font-accent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Skills
            </motion.span>
            <motion.h2 
              className="section-heading text-4xl md:text-5xl leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Skills & <span className="hero-animation-gradient">Expertise</span>
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
              I've worked with a variety of technologies in full-stack web development.
              Here's a breakdown of my technical skills and proficiency levels.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {skillsData.map((skillCategory, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={{
                  rest: { 
                    scale: 1,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    y: 0
                  },
                  hover: { 
                    scale: 1.03, 
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(59, 130, 246, 0.2)",
                    y: -5
                  }
                }}
                initial="rest"
                whileHover="hover"
                animate={highlightedCategory === categoryIndex ? "hover" : "rest"}
                onMouseEnter={() => setHighlightedCategory(categoryIndex)}
                onMouseLeave={() => setHighlightedCategory(null)}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 relative overflow-hidden">
                  <motion.div
                    variants={floatingIconVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute right-6 top-4 text-white/30"
                  >
                    {skillCategory.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white">
                    {skillCategory.category}
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * skillIndex, duration: 0.5 }}
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      onMouseLeave={() => setActiveSkill(null)}
                      className="group"
                    >
                      <div className="flex justify-between mb-2">
                        <span className={`font-medium transition-colors duration-300 ${activeSkill === skill.name ? 'text-blue-300' : 'text-white'}`}>
                          {skill.name}
                        </span>
                        <span className={`text-sm transition-colors duration-300 ${activeSkill === skill.name ? 'text-blue-300' : 'text-blue-300/70'}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          custom={skill.level}
                          variants={barVariants}
                          className={`h-2 rounded-full group-hover:bg-gradient-to-r from-blue-400 to-indigo-500 ${
                            skill.level > 80
                              ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                              : skill.level > 65
                              ? "bg-gradient-to-r from-blue-400 to-indigo-400"
                              : "bg-gradient-to-r from-blue-300 to-indigo-300"
                          }`}
                          style={{
                            width: inView ? `${skill.level}%` : "0%",
                            transition: "width 1s ease-in-out"
                          }}
                          whileHover={{
                            boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)"
                          }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants} 
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div 
              className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700"
              whileHover={{ 
                boxShadow: "0 0 30px rgba(37, 99, 235, 0.2)",
                borderColor: "rgba(37, 99, 235, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <h3 className="text-xl font-bold mb-6 text-white text-center">Project Experience</h3>
              <p className="text-gray-300 mb-6 text-center">
                I've applied my skills in several real-world projects, demonstrating my ability to deliver complete solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {[
                  "Co-foundify (React, Node.js, MongoDB)",
                  "Sociopedia (MERN Stack)",
                  "Blog Website",
                  "Dynamic Web Applications",
                  "User Authentication Systems",
                  "Real-time Messaging"
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(37, 99, 235, 0.3)",
                      transition: { duration: 0.2 }
                    }}
                    className="px-4 py-2 bg-gray-700 text-blue-300 rounded-lg text-sm transition-all cursor-pointer hover:shadow-glow"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 