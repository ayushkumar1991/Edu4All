import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Clock, BookOpen, MoreVertical, Trash, Star } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

function CourseCard({ course, onDeleteCourse, displayUser = false }) {
  const [isHovered, setIsHovered] = useState(false);


  // Get course level for styling with more professional color scheme
  const getLevelColor = (level) => {
    const levels = {
      'Beginner': 'bg-emerald-100 text-emerald-800',
      'Intermediate': 'bg-indigo-100 text-indigo-800',
      'Advanced': 'bg-violet-100 text-violet-800',
      'Expert': 'bg-rose-100 text-rose-800'
    };
    return levels[level] || 'bg-slate-100 text-slate-800';
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDeleteCourse && course?.id) {
      onDeleteCourse(course.id);
    }
  };

  // Course URL
  const courseUrl = `/course/${course?.courseId}`;

  return (
    <Link href={courseUrl}>
      <div
        className={`relative border-0 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer bg-white dark:bg-slate-800 ${
          isHovered ? 'shadow-2xl transform -translate-y-2' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card glow effect on hover */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-20' : ''}`} />
        
        {/* Course Banner with overlay gradient */}
        <div className="relative">
          <div className="relative h-56 overflow-hidden">
            <Image
              src="/Book.jpg"
              alt={course?.courseOutput?.["Course Name"] || "Course Banner"}
              width={400}
              height={200}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 filter brightness-110' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          {/* Three-dot menu for actions */}
          <div className="absolute top-4 right-4 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 border-0 shadow-lg bg-white/90 backdrop-blur-md dark:bg-slate-800/90" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 cursor-pointer flex items-center"
                  onClick={handleDelete}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete Course
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Level Badge */}
          <div className={`absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur-sm ${getLevelColor(course?.level)}`}>
            {course?.level || 'All Levels'}
          </div>

          {/* Course Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="font-bold text-2xl leading-tight tracking-tight">
              {course?.courseOutput?.CourseName || "Course Title"}
            </h2>
          </div>
        </div>

        {/* Course Details */}
        <div className="p-6">
          {/* Course Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-slate-600 dark:text-slate-300">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                {course?.courseOutput?.NoOfChapters || 0} Chapters
              </span>
            </div>

            <div className="flex items-center text-slate-600 dark:text-slate-300">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                {course?.courseOutput?.Duration || "2 hrs"}
              </span>
            </div>
            
            {/* Added rating indicator */}
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span className="text-sm font-medium">
                {course?.rating || "4.8"}
              </span>
            </div>
          </div>

          {/* Course Description */}
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-5 line-clamp-2 font-medium">
            {course?.courseOutput?.Description || "Learn exciting new skills with this comprehensive course."}
          </p>

          {/* Start Learning Button with improved styling */}
          <div className={`
            w-full py-3 px-4 rounded-xl font-semibold text-center 
            transition-all duration-300 transform 
            ${isHovered 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' 
              : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-white'
            }
            ${isHovered ? 'scale-105' : 'scale-100'}
          `}>
            Start Learning
          </div>
        </div>
        
        {/* User Profile Section with improved styling */}
        {displayUser && (
          <div className="px-6 pb-6 pt-2 flex items-center">
            <div className="relative">
              <Image 
                src={course?.userProfileImage || '/default-avatar.png'} 
                width={36} 
                height={36}
                className="rounded-full border-2 border-white shadow-md"
                alt="Course Creator"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {course?.userName || "Course Instructor"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {course?.userRole || ""}
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default CourseCard