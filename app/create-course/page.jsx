"use client"
import React, { useContext, useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { HiClipboardDocumentCheck, HiMiniSquares2X2 } from "react-icons/hi2";
import { FcIdea } from "react-icons/fc";
import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { ArrowRight, ArrowLeft, Sparkles, Flag } from 'lucide-react';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Space Background Component
function SpaceBackgroundCreateCourse({ children }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 30000;
    const posArray = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 500; // Spread stars across a large volume
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Star material
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8
    });

    // Create star field
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Camera positioning
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate star field slowly
      starField.rotation.x += 0.0005;
      starField.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    // Responsive handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.remove(starField);
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Space Background */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{ 
          background: 'linear-gradient(to bottom, #000033, #000066)',
          position: 'fixed'
        }}
      />
      
      {/* Nebula Overlay */}
      <div 
        className="absolute inset-0 z-1 opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(128,0,128,0.2), rgba(0,0,0,0) 70%)',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 className="text-xl" />,
      description: "Choose the perfect category for your course"
    },
    {
      id: 2,
      name: "Topic & Description",
      icon: <FcIdea className="text-xl" />,
      description: "Define what your course is about"
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck className="text-xl" />,
      description: "Set course parameters and structure"
    },
  ];

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (activeIndex == 0 && (userCourseInput?.category?.length == 0 || userCourseInput?.category == undefined)) {
      return true;
    }
    if (activeIndex == 1 && (userCourseInput?.topic?.length == 0 || userCourseInput?.topic == undefined)) {
      return true;
    }
    else if (activeIndex == 2 && (userCourseInput?.level == undefined || userCourseInput?.duration == undefined || userCourseInput?.displayVideo == undefined || userCourseInput?.noOfChapter == undefined)) {
      return true;
    }
    return false;
  }

  const GenerateCourseLayout = async () => {
    setLoading(true)
    const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail With field as Course Name , Description, Along with Chapter Name, about, Duration:'
    const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + ', Topic: ' + userCourseInput?.topic + ', Level: ' + userCourseInput?.level + ', Duration: ' + userCourseInput?.duration + ' , NoOf Chapters: ' + userCourseInput?.noOfChapter + ', in JSON format'
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);
    try {
      const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
      console.log(result.response.text());
      console.log(JSON.parse(result.response.text()));
      SaveCourseLayoutInDb(JSON.parse(result.response.text()));
    } catch (error) {
      console.error("Error generating course:", error);
      setLoading(false);
    }
  }

  const SaveCourseLayoutInDb = async (courseLayout) => {
    var id = uuid4();
    try {
      await db.insert(CourseList).values({
        courseId: id,
        name: userCourseInput?.topic,
        level: userCourseInput?.level,
        category: userCourseInput?.category,
        courseOutput: courseLayout,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        userProfileImage: user?.imageUrl
      });
      console.log("FINISHED");
      router.replace('/create-course/'+id);
    } catch (error) {
      console.error("Error saving course:", error);
    } finally {
      setLoading(false);
    }
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const [slideDirection, setSlideDirection] = useState(0);

  const nextStep = () => {
    setSlideDirection(1);
    setActiveIndex(activeIndex + 1);
  };

  const prevStep = () => {
    setSlideDirection(-1);
    setActiveIndex(activeIndex - 1);
  };

  return (
    <SpaceBackgroundCreateCourse>
      <div className="min-h-screen relative overflow-hidden">
        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-medium mb-6">
              <Sparkles size={19} className="mr-2" />
              Course Creation Wizard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse [text-shadow:_0_0_8px_rgba(177, 25, 170, 0.5)] hover:[text-shadow:_0_0_12px_rgba(10, 32, 33, 0.8)] transition-all duration-1500">
  Create Your Course
</h1>
<p className="mt-4 text-lg bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 bg-clip-text text-transparent max-w-2xl mx-auto [text-shadow:_0_0_6px_rgba(228, 76, 180, 0.4)] hover:[text-shadow:_0_0_10px_rgba(85, 37, 137, 0.6)] transition-all duration-1500">
  Transform your expertise into engaging educational content in just a few steps
</p>
          </motion.div>

          {/* Stepper */}
          <div className="mb-16">
            <div className="relative">
              <div className="overflow-hidden w-full">
                <div className="flex justify-between">
                  {StepperOptions.map((item, index) => (
                    <div key={item.id} className="relative z-10 flex flex-col items-center flex-1">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1,
                        }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        className="relative"
                      >
                        <div 
                          className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-500 ${
                            activeIndex >= index 
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-700 shadow-lg shadow-indigo-200' 
                              : 'bg-white/20 border-white/30'
                          }`}
                          onClick={() => index <= Math.max(0, activeIndex) && setActiveIndex(index)}
                        >
                          <div className={`transition-colors duration-300 ${activeIndex >= index ? 'text-white' : 'text-gray-300'}`}>
                            {item.icon}
                          </div>
                        </div>
                        {activeIndex >= index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -right-1 -top-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>
                      <div className="text-center mt-3">
                        <h3 className={`font-medium ${activeIndex === index ? 'text-white' : 'text-gray-300'}`}>
                          {item.name}
                        </h3>
                        <p className="hidden sm:block text-xs text-gray-400 mt-1 max-w-[120px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute top-7 left-0 right-0 flex">
                  <div className={`h-1 flex-1 mx-8 rounded-full transition-all duration-500 ${activeIndex >= 1 ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-white/20'}`}></div>
                  <div className={`h-1 flex-1 mx-8 rounded-full transition-all duration-500 ${activeIndex >= 2 ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-white/20'}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl shadow-indigo-500/20 border border-white/20 overflow-hidden mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2">
              <AnimatePresence custom={slideDirection} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="min-h-[400px]"
                >
                  {activeIndex === 0 ? (
                    <SelectCategory />
                  ) : activeIndex === 1 ? (
                    <TopicDescription />
                  ) : (
                    <SelectOption />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 px-6">
            <Button 
              disabled={activeIndex === 0} 
              onClick={prevStep}
              className={`px-6 py-2 flex items-center ${
                activeIndex === 0 
                  ? 'bg-gray-100/10 text-gray-400' 
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/30 shadow-md'
              }`}
              variant="outline"
            >
              <ArrowLeft size={16} className="mr-2" />
              Previous Step
            </Button>
            
            {activeIndex < 2 ? (
              <Button 
                disabled={checkStatus()} 
                onClick={nextStep}
                className={`px-6 py-2 flex items-center ${
                  checkStatus() 
                    ? 'bg-gray-100/10 text-gray-400' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50'
                }`}
              >
                Next Step
                <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button 
                disabled={checkStatus()} 
                onClick={GenerateCourseLayout}
                className={`px-6 py-2 flex items-center ${
                  checkStatus() 
                    ? 'bg-gray-100/10 text-gray-400' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50'
                }`}
              >
                <Sparkles size={16} className="mr-2" />
                Generate Course
              </Button>
            )}
          </div>
        </div>
        <LoadingDialog loading={loading} />
      </div>
    </SpaceBackgroundCreateCourse>
  );
}

export default CreateCourse;