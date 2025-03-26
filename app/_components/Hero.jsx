"use client";

import React, { useEffect, useRef } from "react";

function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stars = [];
    const starCount = 20000; // Reduced number of stars for better performance

    // Resize canvas function
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize canvas and add resize listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars with optimized properties
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 2.5,
        speed: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 360}, 70%, ${Math.random() * 50 + 50}%)`
      });
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with a semi-transparent background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 20, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(star => {
        // Move star forward
        star.z -= star.speed;

        // Reset star when it passes the viewer
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        // Create perspective effect
        const scale = 1000 / star.z;
        const x = (star.x - canvas.width / 2) * scale + canvas.width / 2;
        const y = (star.y - canvas.height / 2) * scale + canvas.height / 2;

        // Adjust star size based on depth
        const size = star.size * (1 - star.z / 1000);

        // Draw star
        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 1 - star.z / 1000; // Fade stars in the distance
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Continue animation
      requestAnimationFrame(animate);
    };

    // Start animation
    const animationFrameId = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Star animation background */}
      <div className="absolute inset-0 bg-gray-950"></div>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Content section */}
      <section className="relative min-h-screen flex items-center">
        <div className="mx-auto max-w-screen-xl px-6 py-20 lg:flex lg:items-center">
          <div className="mx-auto max-w-4xl text-center">
            
            <h1 className="animate-float font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight whitespace-normal">
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 bg-clip-text text-transparent pb-2 transform transition-transform hover:scale-105 duration-500">
                EduTech4All – AI-Driven Solutions for Education
              </span>
              <span className="block bg-gradient-to-r from-pink-500 via-indigo-400 to-teal-300 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 transform hover:rotate-1 transition-all duration-700">
                Skill Development, Innovation & Future-Ready Learning
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-gray-200 leading-relaxed backdrop-blur-sm bg-black/30 p-6 rounded-lg shadow-lg">
              Revolutionize education with cutting-edge AI tools designed to make
              learning accessible, personalized, and effective for everyone.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <a
                className="relative overflow-hidden group block rounded-full border-2 border-blue-400 bg-blue-600 px-12 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-auto"
                href="#"
              >
                <span className="relative z-10">Explore Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-80 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              </a>

              <a
                className="relative overflow-hidden block rounded-full border-2 border-purple-400 px-12 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-purple-600/30 focus:outline-none focus:ring-2 focus:ring-purple-400 sm:w-auto"
                href="#"
              >
                <span className="relative z-10">Learn More</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Floating Elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 animate-float-slow">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-300 blur-sm opacity-70"></div>
      </div>

      <div className="absolute bottom-1/4 right-16 w-20 h-20 animate-float-slower">
        <div className="w-full h-full rounded-full bg-gradient-to-bl from-indigo-500 to-cyan-500 blur-sm opacity-60"></div>
      </div>

      <div className="absolute top-1/2 right-1/4 w-12 h-12 animate-pulse">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-400 to-indigo-400 blur-sm opacity-50"></div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) translateX(5px);
          }
          50% {
            transform: translateY(-15px) translateX(-5px);
          }
        }

        @keyframes float-slower {
          0%, 100% {
            transform: translateY(0) translateX(-8px);
          }
          50% {
            transform: translateY(15px) translateX(8px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Hero;
