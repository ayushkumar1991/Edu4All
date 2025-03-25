import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 300 }
    },
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 min-h-screen">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-300 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-2">
              Step 2 of 4
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Topic & Description
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Define the topic and provide a detailed description of your course to create the perfect learning experience
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white p-8 md:p-12">
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              {/* Topic Input */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <span className="text-lg">💡</span>
                  </div>
                  <label className="font-medium text-gray-700">
                    Write the topic for which you want to generate a course
                  </label>
                </div>
                <Input
                  placeholder="Topic (e.g., Python Course, Yoga, and other Creative activities)"
                  className="h-14 text-lg border-2 border-gray-200 hover:border-indigo-400"
                  defaultValue={userCourseInput?.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Enter the main topic or subject of your course.
                </p>
              </motion.div>

              {/* Description Textarea */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <span className="text-lg">✒️</span>
                  </div>
                  <label className="font-medium text-gray-700">
                    Tell us more about your course (Optional)
                  </label>
                </div>
                <Textarea
                  placeholder="About Your Course"
                  className="h-32 text-lg border-2 border-gray-200 hover:border-indigo-400"
                  defaultValue={userCourseInput?.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Provide a detailed description of what your course will cover.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TopicDescription;