import React from 'react';
import { IoBarChartSharp } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoBook } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
import { motion } from 'framer-motion';

function CourseDetail({ course }) {
    return (
        <div className='border border-gray-200 p-7 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm mt-3'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                {/* Skill Level */}
                <motion.div 
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className='flex gap-4 items-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300'
                >
                    <div className='p-3 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100'>
                        <IoBarChartSharp className='text-3xl text-blue-600' />
                    </div>
                    <div>
                        <h2 className='text-xs text-gray-600'>Skill Level</h2>
                        <h2 className='font-semibold text-lg text-gray-800'>{course?.level}</h2>
                    </div>
                </motion.div>

                {/* Duration */}
                <motion.div 
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className='flex gap-4 items-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300'
                >
                    <div className='p-3 rounded-full bg-gradient-to-br from-purple-100 to-pink-100'>
                        <FaClockRotateLeft className='text-3xl text-purple-600' />
                    </div>
                    <div>
                        <h2 className='text-xs text-gray-600'>Duration</h2>
                        <h2 className='font-semibold text-lg text-gray-800'>{course?.courseOutput?.Duration}</h2>
                    </div>
                </motion.div>

                {/* No Of Chapters */}
                <motion.div 
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className='flex gap-4 items-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 transition-all duration-300'
                >
                    <div className='p-3 rounded-full bg-gradient-to-br from-green-100 to-teal-100'>
                        <IoBook className='text-3xl text-green-600' />
                    </div>
                    <div>
                        <h2 className='text-xs text-gray-600'>No Of Chapters</h2>
                        <h2 className='font-semibold text-lg text-gray-800'>{course?.courseOutput?.NoOfChapters}</h2>
                    </div>
                </motion.div>

                {/* Video Included */}
                <motion.div 
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className='flex gap-4 items-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-300'
                >
                    <div className='p-3 rounded-full bg-gradient-to-br from-orange-100 to-red-100'>
                        <FaRegPlayCircle className='text-3xl text-orange-600' />
                    </div>
                    <div>
                        <h2 className='text-xs text-gray-600'>Video Included</h2>
                        <h2 className='font-semibold text-lg text-gray-800'>{course?.includeVideo}</h2>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default CourseDetail;