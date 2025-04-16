import type { Metadata } from "next";
import { Inter, Poppins, Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins"
});
const montserrat = Montserrat({
  weight: ["700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat"
});
const raleway = Raleway({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-raleway"
});

export const metadata: Metadata = {
  title: "Ritik Kumar | Full Stack Developer",
  description: "A beautifully crafted portfolio showcasing my web development skills and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.variable} ${poppins.variable} ${montserrat.variable} ${raleway.variable} font-sans bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 antialiased`}>
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <Script id="scroll-animations" strategy="afterInteractive">
          {`
            // IntersectionObserver for scroll animations
            function initScrollObserver() {
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                  }
                });
              }, { 
                threshold: 0.15,
                rootMargin: '0px 0px -10% 0px'
              });
              
              // Observe all elements with animation classes
              document.querySelectorAll('.reveal-on-scroll, .fade-in-left, .fade-in-right, .section-divider').forEach(el => {
                observer.observe(el);
              });
            }
            
            // Run once the DOM is fully loaded
            if (document.readyState === 'complete') {
              initScrollObserver();
            } else {
              document.addEventListener('DOMContentLoaded', initScrollObserver);
              // Fallback for Next.js - use setTimeout to ensure elements are in the DOM
              setTimeout(initScrollObserver, 200);
            }
          `}
        </Script>
      </body>
    </html>
  );
}
