"use client";


import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top wave decoration */}
      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path 
            fill="#111827" 
            fillOpacity="1" 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,56C1248,48,1344,32,1392,24L1440,16L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z">
          </path>
        </svg>
      </div>

      <div className="max-w-screen-xl px-4 pt-8 pb-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              EduTech4All
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Empowering education through innovative AI solutions. Making learning accessible, personalized, and effective for everyone.
            </p>
            
            <div className="flex justify-center mt-6 space-x-6 sm:justify-start">
              {/* Social Media Icons */}
              <a href="#" className="text-blue-400 hover:text-blue-300 transform hover:scale-110 transition-all duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transform hover:scale-110 transition-all duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transform hover:scale-110 transition-all duration-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transform hover:scale-110 transition-all duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-white">Quick Links</p>

            <nav className="mt-4">
              <ul className="space-y-2">
                <li>
                  <a className="text-gray-300 transition hover:text-blue-400" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 transition hover:text-blue-400" href="#">
                    Our Products
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 transition hover:text-blue-400" href="#">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 transition hover:text-blue-400" href="#">
                    For Educators
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 transition hover:text-blue-400" href="#">
                    For Students
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Resources */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-white">Resources</p>

            <nav className="mt-4">
              <ul className="space-y-2">
                <li>
                  <a className="text-gray-300 transition hover:text-blue-400" href="#">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 transition hover:text-blue-400" href="#">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 transition hover:text-blue-400" href="#">
                    Documentation
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 transition hover:text-blue-400" href="#">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 transition hover:text-blue-400" href="#">
                    Video Tutorials
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-white">Stay Updated</p>

            <div className="mt-4">
              <p className="text-sm text-gray-300 mb-3">
                Subscribe to our newsletter for the latest updates on AI in education.
              </p>
              
              <form className="mt-2">
                <div className="relative max-w-md">
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input
                    className="w-full p-3 text-sm text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    id="email"
                    type="email"
                    placeholder="Your email address"
                  />
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 mt-8 border-t border-gray-800 md:flex md:items-center md:justify-between">
          <div className="text-sm text-gray-400 text-center md:text-left">
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <a className="transition hover:text-blue-400" href="#">
                Privacy Policy
              </a>
              <a className="transition hover:text-blue-400" href="#">
                Terms of Service
              </a>
              <a className="transition hover:text-blue-400" href="#">
                Cookie Policy
              </a>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-400 text-center md:text-right">
              &copy; {currentYear} EduTech4All. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Animated stars at the bottom */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>
      </div>

      {/* Star animation styles */}
      <style jsx>{`
        @keyframes twinkle-small {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes twinkle-medium {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes twinkle-large {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        .stars-small, .stars-medium, .stars-large {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }
        
        .stars-small {
          background-image: radial-gradient(1px 1px at 10px 10px, #6ea8fe 100%, transparent),
                           radial-gradient(1px 1px at 150px 15px, #a5c8ff 100%, transparent),
                           radial-gradient(1px 1px at 70px 25px, #83b4fe 100%, transparent),
                           radial-gradient(1px 1px at 110px 5px, #b8d7ff 100%, transparent),
                           radial-gradient(1px 1px at 180px 28px, #6ea8fe 100%, transparent);
          background-repeat: repeat;
          background-size: 200px 30px;
          animation: twinkle-small 3s infinite;
        }
        
        .stars-medium {
          background-image: radial-gradient(1.5px 1.5px at 25px 8px, #83b4fe 100%, transparent),
                           radial-gradient(1.5px 1.5px at 100px 20px, #a5c8ff 100%, transparent),
                           radial-gradient(1.5px 1.5px at 160px 12px, #6ea8fe 100%, transparent),
                           radial-gradient(1.5px 1.5px at 50px 25px, #b8d7ff 100%, transparent),
                           radial-gradient(1.5px 1.5px at 135px 5px, #83b4fe 100%, transparent);
          background-repeat: repeat;
          background-size: 200px 30px;
          animation: twinkle-medium 4s infinite;
        }
        
        .stars-large {
          background-image: radial-gradient(2px 2px at 65px 15px, #a5c8ff 100%, transparent),
                           radial-gradient(2px 2px at 120px 25px, #83b4fe 100%, transparent),
                           radial-gradient(2px 2px at 35px 5px, #6ea8fe 100%, transparent),
                           radial-gradient(2px 2px at 170px 18px, #b8d7ff 100%, transparent);
          background-repeat: repeat;
          background-size: 200px 30px;
          animation: twinkle-large 5s infinite;
        }
      `}</style>
    </footer>
  );
}

export default Footer;