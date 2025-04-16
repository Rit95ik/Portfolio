"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { 
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-blue-900/30">
      <motion.div 
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Glowing background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          <motion.div className="col-span-1" variants={itemVariants}>
            <Link href="#hero" className="text-xl font-bold block mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Ritik Kumar
              </span>
            </Link>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Full Stack Web Developer specializing in creating modern, responsive web applications with cutting-edge technologies.
            </p>
            <div className="flex space-x-5 mt-8">
              <motion.a 
                href="https://linkedin.com/in/ritik-kumar-392810254" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/20 to-blue-800/20 text-blue-400 hover:text-blue-300 backdrop-blur-sm transition-colors border border-blue-500/20"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
              <motion.a 
                href="https://github.com/Rit95ik" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/20 to-purple-800/20 text-purple-400 hover:text-purple-300 backdrop-blur-sm transition-colors border border-purple-500/20"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
              <motion.a 
                href="mailto:ritik92295@gmail.com" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 text-indigo-400 hover:text-indigo-300 backdrop-blur-sm transition-colors border border-indigo-500/20"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 text-white pb-2 border-b border-blue-900/30">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: "#hero", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#projects", label: "Projects" },
                { href: "#skills", label: "Skills" },
                { href: "#contact", label: "Contact" }
              ].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center"
                  >
                    <svg className="w-3 h-3 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 text-white pb-2 border-b border-blue-900/30">Expertise</h3>
            <ul className="space-y-3">
              {[
                "React.js & Next.js",
                "TypeScript & JavaScript",
                "Node.js & Express.js",
                "MongoDB & Databases",
                "Tailwind CSS & UI/UX"
              ].map((skill, index) => (
                <motion.li 
                  key={index} 
                  className="text-gray-400 flex items-center"
                  whileHover={{ color: "#60A5FA" }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 text-white pb-2 border-b border-blue-900/30">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400 group">
                <svg className="w-5 h-5 mr-3 text-blue-500 mt-1 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="group-hover:text-gray-300 transition-colors">Ahmedabad, Gujarat, India</span>
              </li>
              <li className="flex items-start text-gray-400 group">
                <svg className="w-5 h-5 mr-3 text-blue-500 mt-1 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="group-hover:text-gray-300 transition-colors">+91 9574990657</span>
              </li>
              <li className="flex items-start text-gray-400 group">
                <svg className="w-5 h-5 mr-3 text-blue-500 mt-1 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="group-hover:text-gray-300 transition-colors">ritik92295@gmail.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 pt-8 border-t border-blue-900/20 text-center"
          variants={itemVariants}
        >
          <p className="text-gray-500">
            &copy; {currentYear} <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Ritik Kumar</span> | All Rights Reserved
          </p>
          
          <div className="flex justify-center items-center mt-6">
            <motion.button 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 rounded-full bg-blue-900/20 text-blue-400 hover:text-blue-300 transition-colors border border-blue-800/30 focus:outline-none"
              aria-label="Scroll to top"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
} 