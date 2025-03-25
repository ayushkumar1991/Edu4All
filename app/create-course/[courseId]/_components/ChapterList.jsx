"use client";

import React from 'react';
import { FcClock } from "react-icons/fc";
import { FaRegCheckCircle, FaChevronRight, FaBookOpen } from "react-icons/fa";
import EditChapters from './EditChapters';
import { motion } from 'framer-motion';

function ChapterList({ course }) {
    // Add a null check before accessing Chapters
    if (!course?.courseOutput?.Chapters || !Array.isArray(course?.courseOutput?.Chapters)) {
        return (
            <motion.div 
                className='mt-8 text-center p-12 border border-dashed border-gray-300 rounded-xl bg-gray-50'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <FaBookOpen className="mx-auto text-4xl text-gray-400 mb-3" />
                <p className='text-gray-600 font-medium'>No chapters available yet.</p>
                <p className='text-sm text-gray-500 mt-2'>Start creating content for your course.</p>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className='mt-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className='font-bold text-2xl text-gray-800'>Course Chapters</h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {course.courseOutput.Chapters.length} {course.courseOutput.Chapters.length === 1 ? 'Chapter' : 'Chapters'}
                </div>
            </div>
            
            <div className='space-y-4'>
                {course.courseOutput.Chapters.map((chapter, index) => {
                    const chapterName = chapter?.ChapterName || chapter?.["Chapter Name"] || `Chapter ${index + 1}`;
                    const chapterDescription = chapter?.About || chapter?.about || "No description available.";
                    const duration = chapter?.Duration || "Not specified";
                    
                    return (
                        <motion.div
                            key={index}
                            className='border border-gray-200 bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group relative'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.01 }}
                        >
                            <div className="flex gap-5 items-center">
                                {/* Chapter Number */}
                                <motion.div
                                    className="flex-none h-14 w-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-md"
                                    whileHover={{ rotate: 5, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {index + 1}
                                </motion.div>
                                
                                {/* Chapter Details */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className='font-semibold text-xl text-gray-800 flex items-center gap-2'>
                                            {chapterName}
                                        </h2>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <EditChapters course={course} index={index} />
                                        </div>
                                    </div>
                                    
                                    <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
                                        {chapterDescription}
                                    </p>
                                    
                                    <div className="flex items-center mt-3 justify-between">
                                        <p className='flex gap-2 items-center text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm'>
                                            <FcClock className="text-lg" />
                                            <span>{duration}</span>
                                        </p>
                                        
                                        <div className="text-xs text-gray-500 italic">
                                            Last updated: {new Date().toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Completion Status */}
                                <div className="flex flex-col items-center gap-1">
                                    <motion.div
                                        className="flex-none"
                                        whileHover={{ scale: 1.15, rotate: 10 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <FaRegCheckCircle className='text-3xl text-green-500' />
                                    </motion.div>
                                    <span className="text-xs text-green-600 font-medium">Completed</span>
                                </div>
                                
                                {/* View arrow */}
                                <motion.div 
                                    className="text-gray-400 group-hover:text-indigo-500 transition-colors duration-300"
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <FaChevronRight />
                                </motion.div>
                            </div>
                            
                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 h-1 rounded-full mt-4 overflow-hidden">
                                <motion.div 
                                    className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

export default ChapterList;