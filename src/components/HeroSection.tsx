"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

// Canvas particle types
type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
};

export default function HeroSection() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesArray = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  
  // Define keywords array for the skills badges
  const keywords = [
    'JavaScript', 
    'TypeScript', 
    'React', 
    'Next.js', 
    'Node.js', 
    'Tailwind CSS'
  ];
  
  // Handle mouse movement for interactive effects
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Initialize and animate canvas particles
  useEffect(() => {
    setIsMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Create particles
    const createParticles = () => {
      particlesArray.current = [];
      const numberOfParticles = Math.min(window.innerWidth / 8, 150);
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 3 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = Math.random() * 0.3 - 0.15;
        const speedY = Math.random() * 0.3 - 0.15;
        
        const hue = 210 + Math.random() * 60;
        const saturation = 70 + Math.random() * 30;
        const lightness = 50 + Math.random() * 20;
        const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.7 + 0.2})`;
        
        particlesArray.current.push({
          x, y, size, speedX, speedY, color
        });
      }
    };
    
    createParticles();
    
    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particlesArray.current.length; i++) {
        const p = particlesArray.current[i];
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Enhanced mouse interaction - stronger attraction to cursor
        if (mousePosition.x && mousePosition.y) {
          const dx = mousePosition.x - p.x;
          const dy = mousePosition.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Increase interaction radius and force
          if (distance < 120) {
            const angle = Math.atan2(dy, dx);
            const force = 0.08;
            p.x += Math.cos(angle) * force;
            p.y += Math.sin(angle) * force;
            
            // Glow effect when particles are near cursor
            ctx.shadowBlur = 15;
            ctx.shadowColor = p.color;
          } else {
            ctx.shadowBlur = 0;
          }
        }
        
        // Draw particle with improved rendering
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Connect particles with lines if they're close - improved connection system
        for (let j = i; j < particlesArray.current.length; j++) {
          const p2 = particlesArray.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Increase connection distance and improve line aesthetics
          if (distance < 150) {
            ctx.beginPath();
            // Gradient line color based on particles
            const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            gradient.addColorStop(0, p.color.replace(/[^,]+(?=\))/, '0.2'));
            gradient.addColorStop(1, p2.color.replace(/[^,]+(?=\))/, '0.2'));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5 * (1 - distance / 150); // Thicker lines when closer
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Add cursor tracking event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  // Create stars with enhanced effects
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    
    // Create more dynamic stars
    for (let i = 0; i < 180; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 3; // Larger stars
      
      // More varied star colors from blue to white
      const hue = 180 + Math.random() * 60; // Blue to cyan range
      const saturation = Math.random() * 50;
      const lightness = 80 + Math.random() * 20;
      const baseOpacity = (Math.random() * 0.7 + 0.3).toFixed(2);
      
      star.classList.add("absolute", "rounded-full", "transition-all", "duration-1000");
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.opacity = baseOpacity;
      star.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      star.style.boxShadow = `0 0 ${size * 2}px 0 hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`;
      
      // More dynamic twinkling animation
      star.style.animation = `twinkle ${3 + Math.random() * 8}s ease-in-out infinite ${Math.random() * 5}s`;
      
      canvas.appendChild(star);
    }
    
    return () => {
      if (canvas) {
        while (canvas.firstChild) {
          canvas.removeChild(canvas.firstChild);
        }
      }
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive canvas background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-gray-900">
        {/* Stars background */}
        <div ref={particlesRef} className="absolute inset-0"></div>
        
        {/* Enhanced animated nebula background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0)_0%,rgba(15,23,42,1)_70%)]"></div>
        
        {/* Dynamic aurora effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-blue-800/20 via-indigo-700/20 to-transparent"
        />
        
        {/* Additional animated gradient layer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute inset-0 bg-gradient-radial from-indigo-900/10 via-purple-900/5 to-transparent"
        />
      </div>

      {/* Subtle cursor-following glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-screen"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 182, 255, 0.8) 0%, rgba(56, 182, 255, 0.4) 20%, rgba(56, 182, 255, 0) 60%)`,
          width: "100%",
          height: "100%"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="block text-white opacity-90">Hi, I'm </span>
              <motion.div 
                className="relative inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 25px rgba(60, 130, 246, 0.5)",
                    "0 0 35px rgba(80, 70, 200, 0.6)",
                    "0 0 25px rgba(60, 130, 246, 0.5)"
                  ] 
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  textShadow: isMounted ? `0 0 30px rgba(${
                    60 + Math.abs((mousePosition.x / window.innerWidth - 0.5) * 40)
                  }, ${
                    130 + Math.abs((mousePosition.y / window.innerHeight - 0.5) * 40)
                  }, ${
                    246 + Math.abs((mousePosition.x / window.innerWidth - 0.5) * 40)
                  }, 0.5)` : "none"
                }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 font-heading">
                  Ritik Kumar
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="h-[40px] sm:h-[50px]" // Fixed height prevents layout shift
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'React & Next.js Expert',
                2000,
                'UI/UX Enthusiast',
                2000,
              ]}
              wrapper="h2"
              speed={50}
              repeat={Infinity}
              className="text-xl sm:text-2xl md:text-3xl text-blue-200 font-accent inline-block"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-xl mx-auto"
          >
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              I build responsive and dynamic web applications using modern technologies like 
              {keywords.map((tech, index) => (
                <motion.span
                  key={tech}
                  className={`inline-block mx-1 ${
                    index === 0 ? "text-blue-300" : 
                    index === 1 ? "text-indigo-300" : 
                    index === 2 ? "text-purple-300" :
                    index === 3 ? "text-cyan-300" :
                    "text-green-300"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                  whileHover={{ 
                    y: -2, 
                    x: 1, 
                    scale: 1.05,
                    color: index === 0 ? "#93c5fd" : 
                           index === 1 ? "#a5b4fc" : 
                           index === 2 ? "#d8b4fe" :
                           index === 3 ? "#67e8f9" :
                           "#86efac"
                  }}
                >
                  {tech}
                  {index < keywords.length - 1 ? "," : "."}
                </motion.span>
              ))}
              Based in Ahmedabad, Gujarat, I'm passionate about creating seamless user experiences with clean, efficient code.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#projects"
                className="px-8 py-3 block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg shadow-blue-900/30 transition-all duration-300 hover:shadow-blue-700/40 hover:from-blue-500 hover:to-indigo-500"
              >
                View Projects
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#contact"
                className="px-8 py-3 block rounded-full border border-indigo-500/30 hover:border-indigo-500/50 text-white bg-indigo-950/30 hover:bg-indigo-900/40 font-medium transition-all duration-300 backdrop-blur-sm"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              y: [0, 10, 0] 
            }}
            transition={{ 
              duration: 2, 
              delay: 1, 
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-8 h-12 rounded-full border-2 border-blue-300/50 flex justify-center pt-2">
              <motion.div
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [0.5, 1, 0.5],
                  backgroundColor: [
                    "rgba(147, 197, 253, 0.7)",
                    "rgba(165, 180, 252, 0.9)",
                    "rgba(147, 197, 253, 0.7)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="w-1 h-2 bg-blue-300 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 