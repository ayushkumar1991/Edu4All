import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/configs/firebaseConfig';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/configs/db';
import { FiUpload, FiAward, FiCheck, FiDownload } from "react-icons/fi"; // Added FiDownload
import { BsArrowRight, BsTrophy } from "react-icons/bs";
import { HiOutlineAcademicCap } from "react-icons/hi";
import confetti from 'canvas-confetti';
import Link from 'next/link';


function CourseBasicInfo({ course, refreshData,edit=true }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showCertificate, setShowCertificate] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (course) {
            setSelectedFile(course?.courseBanner);
            setIsCompleted(course?.completed || false);
        }
    }, [course]);

    useEffect(() => {
        if (isUploading) {
            const timer = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
            
            return () => clearInterval(timer);
        }
    }, [isUploading]);

    // Select File and upload to Firebase Storage:
    const onFileSelected = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        setIsUploading(true);
        setUploadProgress(0);
        setSelectedFile(URL.createObjectURL(file));

        const fileName = Date.now() + ".jpg";
        const storageRef = ref(storage, "/" + fileName);
        
        try {
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            
            await db.update(CourseList)
                .set({ courseBanner: downloadURL })
                .where(eq(CourseList.id, course?.id));
                
            refreshData();
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUploading(false);
            setUploadProgress(100);
            
            // Reset progress after showing 100%
            setTimeout(() => setUploadProgress(0), 1000);
        }
    };

    const handleCompleteCourse = async () => {
        try {
            console.log("Marking course as completed...");
    
            // Log the course ID to ensure it's valid
            console.log("Course ID:", course?.id);
    
            // Update course completion status in the database
            const result = await db.update(CourseList)
                .set({ completed: true })
                .where(eq(CourseList.id, course?.id));
            
            console.log("Database update result:", result);
    
            // Update local state
            setIsCompleted(true);
            
            // Trigger confetti effect
            console.log("Triggering confetti...");
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
            
            // Show certificate modal
            console.log("Showing certificate modal...");
            setTimeout(() => {
                setShowCertificate(true);
            }, 500);
            
            // Refresh data
            console.log("Refreshing data...");
            refreshData();
        } catch (error) {
            console.error("Error completing course:", error);
        }
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <>
            <motion.div
                className="p-10 border border-gray-100 rounded-2xl shadow-lg bg-white/95 backdrop-blur-md mt-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left Section: Course Details */}
                    <div className="space-y-8">
                        <motion.div variants={itemVariants} className="flex items-center justify-between">
                            <h2 className="font-bold text-3xl text-gray-800 tracking-tight">
                                {course?.courseOutput?.CourseName || "Course Name"}
                            </h2>
                            <EditCourseBasicInfo course={course} />
                        </motion.div>

                        <motion.p 
                            variants={itemVariants}
                            className="text-gray-600 text-lg leading-relaxed"
                        >
                            {course?.courseOutput?.Description || "Course description will appear here..."}
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-blue-50 px-5 py-3 rounded-xl border border-blue-100">
                                <IoExtensionPuzzleSharp className="text-2xl text-blue-500" />
                                <span className="text-lg font-medium text-gray-800">
                                    {course?.category || "Category"}
                                </span>
                            </div>
                            
                            <div className={`flex items-center gap-3 ${isCompleted ? 'bg-gradient-to-r from-emerald-50 to-green-50 border border-green-100' : 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100'} px-5 py-3 rounded-xl`}>
                                {isCompleted ? (
                                    <FiCheck className="text-2xl text-emerald-500" />
                                ) : (
                                    <HiOutlineAcademicCap className="text-2xl text-amber-500" />
                                )}
                                <span className="text-lg font-medium text-gray-800">
                                    {isCompleted ? "Completed" : "In Progress"}
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="pt-4 space-y-4"
                        >
                            {!isCompleted ? (
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                    <Link href={'/course/'+course?.courseId+"/start"}>
                                    <Button className="group w-full py-6 bg-gradient-to-r from-blue-600 to-violet-500 text-white hover:from-blue-700 hover:to-violet-600 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-lg font-medium">
                                        Start Course
                                        <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </Button>
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    onClick={() => setShowCertificate(true)}
                                >
                                    <Button className="group w-full py-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-lg font-medium">
                                        View Certificate
                                        <FiAward className="ml-2 text-xl text-white group-hover:rotate-12 transition-transform duration-300" />
                                    </Button>
                                </motion.div>
                            )}
                            
                            {!isCompleted && (
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    onClick={handleCompleteCourse}
                                >
                                    <Button 
                                        variant="outline"
                                        className="group w-full py-5 border-2 border-amber-400 text-amber-600 hover:bg-amber-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 font-medium flex items-center justify-center"
                                    >
                                        <BsTrophy className="mr-2 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                                        Mark as Completed
                                    </Button>
                                </motion.div>
                            )}
                        </motion.div>
                        
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-2 mt-4"
                        >
                            <FiAward className="text-amber-500" />
                            <span className="text-sm text-gray-500">
                                Certificate of achievement upon completion
                            </span>
                        </motion.div>
                    </div>

                    {/* Right Section: Course Banner */}
                    <motion.div
                        variants={itemVariants}
                        className="relative"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <label htmlFor="upload-image" className="block cursor-pointer">
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="relative w-full h-[320px] rounded-2xl overflow-hidden shadow-lg group"
                            >
                                <Image
                                    src='/Book.jpg'
                                    alt="Course cover"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                {isCompleted && (
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 z-10">
                                        <FiCheck className="text-white" />
                                        <span className="font-medium text-sm">Completed</span>
                                    </div>
                                )}
                                
                                <AnimatePresence>
                                    {isHovering && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col items-center justify-center"
                                        >
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                                className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
                                            >
                                                <FiUpload className="text-blue-600" />
                                                <span className="text-gray-800 font-medium">
                                                    Change Banner
                                                </span>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </label>
                        
                        <input
                            type="file"
                            id="upload-image"
                            className="hidden"
                            accept="image/*"
                            onChange={onFileSelected}
                        />
                        
                        {/* Upload Progress Bar */}
                        <AnimatePresence>
                            {uploadProgress > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-700">Uploading image...</span>
                                        <span className="text-sm font-medium text-blue-600">{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <motion.div 
                                            className="bg-gradient-to-r from-blue-500 to-violet-600 h-full"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${uploadProgress}%` }}
                                            transition={{ ease: "easeOut" }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Certificate Modal */}
            <AnimatePresence>
                {showCertificate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setShowCertificate(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                        >
                            {/* Certificate Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white">Certificate of Completion</h2>
                                <button
                                    onClick={() => setShowCertificate(false)}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Certificate Content */}
                            <div className="p-8">
                                <div className="text-center">
                                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                                        {course?.courseOutput?.CourseName || "Course Name"}
                                    </h3>
                                    <p className="text-gray-600 text-lg mb-6">
                                        This certificate is proudly presented to
                                    </p>
                                    <div className="bg-gradient-to-r from-blue-50 to-violet-50 p-6 rounded-xl border border-blue-100">
                                        <h4 className="text-2xl font-bold text-gray-800">
                                            {course?.userName || "Your Name"}
                                        </h4>
                                        <p className="text-gray-600 mt-2">
                                            For successfully completing the course on{" "}
                                            <span className="font-medium text-blue-600">
                                                {new Date().toLocaleDateString()}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Certificate Footer */}
                                <div className="mt-8 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center">
                                            <FiAward className="text-2xl text-white" />
                                        </div>
                                        <span className="text-gray-700 font-medium">
                                            Issued by: <span className="text-blue-600">EduMitra</span>
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            // Logic to download the certificate
                                            console.log("Download Certificate");
                                        }}
                                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:from-blue-700 hover:to-violet-700 transition-all duration-300"
                                    >
                                        <FiDownload className="text-lg" />
                                        <span>Download</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default CourseBasicInfo;