import React, { useContext, useState } from 'react';
import Image from 'next/image';
import CategoryList from '@/app/_shared/CategoryList';
import { UserInputContext } from '@/app/_context/UserInputContext';
import { motion, AnimatePresence } from 'framer-motion';

// Background with Enhanced Blue Dotted Circle
const DottedBackground = () => {
  const dots = Array.from({ length: 500 }, (_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 5 + 3, // 3-8px size (larger dots)
    opacity: Math.random() * 0.5 + 0.2, // More visible (20%-70% opacity)
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3 // Varying animation speeds
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-white">
      {/* Large Blue Dotted Circle - More Visible */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] rounded-full border-[1px] border-dashed border-blue-300/60 opacity-40"></div>
      
      {/* Scattered Dots - Bigger and More Visible */}
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          className="absolute bg-blue-500 rounded-full"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            top: dot.top,
            left: dot.left,
            opacity: dot.opacity
          }}
          animate={{
            opacity: [dot.opacity * 0.7, dot.opacity, dot.opacity * 0.7],
            scale: [0.9, 1.1, 0.9] // Added subtle scaling
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: dot.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setUserCourseInput(prev => ({
      ...prev,
      category: category,
    }));
  };

  // Filter categories into featured and regular
  const featuredCategories = CategoryList.filter(item => item.featured).slice(0, 4);
  const regularCategories = CategoryList.filter(item => !item.featured);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <DottedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16">
        {/* Progress bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Step 1 of 4</span>
            <span className="text-sm font-medium text-blue-600">25% Complete</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "25%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            />
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-3">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium"
            >
              Category Selection
            </motion.span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-4">
            Select Your Course Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the perfect category that matches your learning goals and take the first step toward creating your ideal course
          </p>
        </motion.div>

        {/* Featured Categories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-blue-600">Popular Categories</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
            >
              View all
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
            {featuredCategories.map((item, index) => {
              const isSelected = userCourseInput?.category === item.name;
              const isHovered = hoveredCategory === item.name;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.04, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredCategory(item.name)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  className={`w-full max-w-[250px] flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-sm
                    ${isSelected 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-600 shadow-xl shadow-blue-100/50'
                      : 'bg-white border-2 border-gray-200 hover:border-blue-400 shadow-lg'
                    }`}
                  onClick={() => handleCategoryChange(item.name)}
                >
                  <div className="absolute top-3 right-3">
                    {item.featured && !isSelected && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className={`relative mb-6 p-4 rounded-full bg-gradient-to-br 
                    ${isSelected ? 'from-blue-200 to-blue-300' : 'from-blue-50 to-blue-100'}`}>
                    <motion.div
                      animate={{ 
                        rotate: isHovered && !isSelected ? 10 : 0,
                        scale: isSelected ? 1.1 : 1
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Image 
                        src={item.icon} 
                        alt={item.name} 
                        width={64} 
                        height={64}
                        className="transition-all duration-500"
                      />
                    </motion.div>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    )}
                  </div>

                  <p className={`font-bold text-xl transition-colors duration-300
                    ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                    {item.name}
                  </p>

                  <p className={`text-sm mt-2 text-center transition-colors duration-300 max-w-xs
                    ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                    {item.description || 'Explore our collection of specialized courses'}
                  </p>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mt-3 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/20 text-white text-sm"
                    >
                      <span className="mr-1">Selected</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* All Categories */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-8">All Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 place-items-center">
            {regularCategories.map((item, index) => {
              const isSelected = userCourseInput?.category === item.name;
              const isHovered = hoveredCategory === item.name;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.04, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredCategory(item.name)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  className={`w-full max-w-[250px] flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-sm
                    ${isSelected 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-600 shadow-xl shadow-blue-100/50'
                      : 'bg-white border-2 border-gray-200 hover:border-blue-400 shadow-lg'
                    }`}
                  onClick={() => handleCategoryChange(item.name)}
                >
                  <div className={`relative mb-6 p-3 rounded-full bg-gradient-to-br 
                    ${isSelected ? 'from-blue-200 to-blue-300' : 'from-blue-50 to-blue-100'}`}>
                    <motion.div
                      animate={{ 
                        rotate: isHovered && !isSelected ? 10 : 0,
                        scale: isSelected ? 1.1 : 1
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Image 
                        src={item.icon} 
                        alt={item.name} 
                        width={48} 
                        height={48}
                        className="transition-all duration-500"
                      />
                    </motion.div>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    )}
                  </div>

                  <p className={`font-bold text-lg transition-colors duration-300
                    ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                    {item.name}
                  </p>

                  <p className={`text-sm mt-2 text-center transition-colors duration-300 max-w-xs
                    ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                    {item.description || 'Explore our collection of specialized courses'}
                  </p>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mt-3 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/20 text-white text-sm"
                    >
                      <span className="mr-1">Selected</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectCategory;