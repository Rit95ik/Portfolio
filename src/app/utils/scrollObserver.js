// Utility to handle all scroll-based animations and effects

export const setupScrollObserver = () => {
  // IntersectionObserver for general reveal animations
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else if (entry.target.dataset.once !== 'true') {
          // Only remove active class if not set to animate once
          entry.target.classList.remove('active');
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the item is visible
    }
  );

  // Special observer for timeline progress
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When timeline container becomes visible
          entry.target.classList.add('active');
          
          // Find and activate timeline items with delay
          const timelineItems = entry.target.querySelectorAll('.timeline-item');
          timelineItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('active');
            }, 300 + (index * 200)); // Staggered activation
          });
        } else if (entry.target.dataset.once !== 'true') {
          entry.target.classList.remove('active');
          
          // Reset timeline items
          const timelineItems = entry.target.querySelectorAll('.timeline-item');
          timelineItems.forEach((item) => {
            item.classList.remove('active');
          });
        }
      });
    },
    {
      root: null,
      rootMargin: '-50px',
      threshold: 0.1,
    }
  );

  // Observer for experience cards
  const experienceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Activate child elements with staggered delay
          const children = entry.target.querySelectorAll('.stagger-children');
          children.forEach((child) => {
            child.classList.add('active');
          });
        } else if (entry.target.dataset.once !== 'true') {
          entry.target.classList.remove('active');
          
          // Reset child elements
          const children = entry.target.querySelectorAll('.stagger-children');
          children.forEach((child) => {
            child.classList.remove('active');
          });
        }
      });
    },
    {
      root: null,
      rootMargin: '-100px',
      threshold: 0.15,
    }
  );

  // Skill progress animation observer
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.animate-progress');
          progressBars.forEach((bar) => {
            bar.classList.add('active');
          });
        } else if (entry.target.dataset.once !== 'true') {
          const progressBars = entry.target.querySelectorAll('.animate-progress');
          progressBars.forEach((bar) => {
            bar.classList.remove('active');
          });
        }
      });
    },
    {
      root: null,
      rootMargin: '-50px',
      threshold: 0.2,
    }
  );

  // Parallax effect handler
  const parallaxItems = document.querySelectorAll('.img-parallax');
  
  const handleParallax = () => {
    parallaxItems.forEach((item) => {
      const scrollPosition = window.pageYOffset;
      const itemTop = item.getBoundingClientRect().top + scrollPosition;
      const viewportHeight = window.innerHeight;
      
      // Only apply parallax when element is in viewport
      if (
        scrollPosition + viewportHeight > itemTop &&
        scrollPosition < itemTop + item.offsetHeight
      ) {
        const distance = (scrollPosition + viewportHeight - itemTop) * 0.1;
        const parallaxFactor = item.dataset.parallaxSpeed || 0.1;
        item.style.transform = `translateY(${distance * parallaxFactor}px)`;
      }
    });
  };

  // Initialize all observers
  const initialize = () => {
    // Apply to all elements with reveal-on-scroll class
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .fade-in-left, .fade-in-right, .fade-in-up, .fade-in-down, .zoom-in, .zoom-out, .text-reveal-container');
    revealElements.forEach((el) => revealObserver.observe(el));

    // Apply to timeline tracks
    const timelineTracks = document.querySelectorAll('.timeline-track');
    timelineTracks.forEach((el) => timelineObserver.observe(el));

    // Apply to experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((el) => experienceObserver.observe(el));

    // Apply to skill sections
    const skillSections = document.querySelectorAll('.skills-section');
    skillSections.forEach((el) => skillObserver.observe(el));

    // Add parallax scroll listener if we have parallax items
    if (parallaxItems.length > 0) {
      window.addEventListener('scroll', handleParallax, { passive: true });
      // Initialize positions
      handleParallax();
    }
  };

  // Safely initialize when DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initialize, 1);
  } else {
    document.addEventListener('DOMContentLoaded', initialize);
  }

  // Cleanup function to remove event listeners
  return () => {
    if (parallaxItems.length > 0) {
      window.removeEventListener('scroll', handleParallax);
    }
  };
};

// Call this function in your _app.js or layout.js to initialize all scroll effects
export default setupScrollObserver; 