"use client";

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import React, { useEffect, useState } from 'react';
import CourseCard from '../_components/CourseCard';
import { Button } from '@/components/ui/button';

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    try {
      setLoading(true);
      const result = await db.select().from(CourseList)
        .limit(9)
        .offset(pageIndex * 9);
      
      console.log(result);
      setCourseList(result);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    setPageIndex(prev => prev - 1);
  };

  const handleNextPage = () => {
    setPageIndex(prev => prev + 1);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className='font-bold text-3xl mb-2'>Explore More Projects!</h2>
      <p className="text-gray-600 mb-6">Explore more projects built with AI by other users</p>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      ) : courseList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course, index) => (
            <div key={course.id || index} className="transition-all duration-300">
              <CourseCard course={course} displayUser={true}/>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No projects found. Check back later!</p>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8">
        {pageIndex > 0 && (
          <Button onClick={handlePreviousPage}>Previous Page</Button>
        )}
        <Button onClick={handleNextPage}>Next Page</Button>
      </div>
    </div>
  );
}

export default Explore;