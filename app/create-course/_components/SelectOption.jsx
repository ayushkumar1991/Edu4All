import React, { useContext, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { motion } from "framer-motion";

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Convert duration to minutes for consistency
  const convertDurationToMinutes = (duration) => {
    if (duration?.includes("1 Hour")) return 60;
    if (duration?.includes("2 Hours")) return 120;
    if (duration?.includes("More than 3 Hours")) return 180;
    return 60; // Default to 1 hour
  };

  // Automatically recalculate chapter durations
  useEffect(() => {
    const totalMinutes = convertDurationToMinutes(userCourseInput?.duration || "1 Hour");
    const numChapters = parseInt(userCourseInput?.noOfChapter || "1", 10);

    if (numChapters > 0) {
      const chapterDuration = (totalMinutes / numChapters).toFixed(2);
      setUserCourseInput((prev) => ({
        ...prev,
        chapterDuration: `${chapterDuration} minutes per chapter`,
      }));
    }
  }, [userCourseInput?.duration, userCourseInput?.noOfChapter, setUserCourseInput]);

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
            Course Options
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Define the structure and features of your course to create the perfect learning experience
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
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10"
            >
              {/* Difficulty Level */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <span className="text-lg">🎓</span>
                  </div>
                  <label className="font-medium text-gray-700">Difficulty Level</label>
                </div>
                <Select
                  onValueChange={(value) => handleInputChange("level", value)}
                  defaultValue={userCourseInput?.level}
                >
                  <SelectTrigger className="h-14 text-lg border-2 border-gray-200 hover:border-indigo-400">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-indigo-100">
                    <SelectItem value="Beginner" className="text-base py-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <span>1</span>
                        </div>
                        Beginner
                      </div>
                    </SelectItem>
                    <SelectItem value="Intermediate" className="text-base py-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                          <span>2</span>
                        </div>
                        Intermediate
                      </div>
                    </SelectItem>
                    <SelectItem value="Advanced" className="text-base py-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                          <span>3</span>
                        </div>
                        Advanced
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-2 text-sm text-gray-500">Set the complexity and depth of your course content</p>
              </motion.div>

              {/* Course Duration */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <span className="text-lg">⌛</span>
                  </div>
                  <label className="font-medium text-gray-700">Course Duration</label>
                </div>
                <Select
                  defaultValue={userCourseInput?.duration}
                  onValueChange={(value) => handleInputChange("duration", value)}
                >
                  <SelectTrigger className="h-14 text-lg border-2 border-gray-200 hover:border-indigo-400">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-indigo-100">
                    <SelectItem value="1 Hour" className="text-base py-2">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        1 Hour
                      </div>
                    </SelectItem>
                    <SelectItem value="2 Hours" className="text-base py-2">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        2 Hours
                      </div>
                    </SelectItem>
                    <SelectItem value="More than 3 Hours" className="text-base py-2">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        More than 3 Hours
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-2 text-sm text-gray-500">Choose the total length of your learning content</p>
              </motion.div>

              {/* Add Video Option */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <span className="text-lg">🎥</span>
                  </div>
                  <label className="font-medium text-gray-700">Include Video Content</label>
                </div>
                <Select
                  defaultValue={userCourseInput?.displayVideo}
                  onValueChange={(value) => handleInputChange("displayVideo", value)}
                >
                  <SelectTrigger className="h-14 text-lg border-2 border-gray-200 hover:border-indigo-400">
                    <SelectValue placeholder="Include video content?" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-indigo-100">
                    <SelectItem value="Yes" className="text-base py-2">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Yes
                      </div>
                    </SelectItem>
                    <SelectItem value="No" className="text-base py-2">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        No
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-2 text-sm text-gray-500">Decide if your course will include video lessons</p>
              </motion.div>

              {/* Number of Chapters */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <span className="text-lg">📚</span>
                  </div>
                  <label className="font-medium text-gray-700">Number of Chapters</label>
                </div>
                <Input
                  type="number"
                  placeholder="Enter number of chapters"
                  value={userCourseInput?.noOfChapter || ''}
                  onChange={(e) => handleInputChange("noOfChapter", e.target.value)}
                  className="h-14 text-lg border-2 border-gray-200 hover:border-indigo-400"
                  min="1"
                />
                <p className="mt-2 text-sm text-gray-500">Set the total number of chapters for your course</p>
                {/* Display Calculated Duration per Chapter */}
                {userCourseInput?.chapterDuration && (
                  <p className="mt-2 text-sm text-indigo-600">
                    ⏳ {userCourseInput.chapterDuration}
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SelectOption;