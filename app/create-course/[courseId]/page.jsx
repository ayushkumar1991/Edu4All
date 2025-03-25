"use client"

import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import ChapterList from './_components/ChapterList'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { GenerateChapterContent_AI } from '@/configs/AiModel'
import LoadingDialog from '../_components/LoadingDialog'
import service from '@/configs/service.jsx'
import { useRouter } from 'next/navigation'


function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  
  useEffect(() => {
    console.log("Params:", params)
    if (params && user?.primaryEmailAddress?.emailAddress) {
      GetCourse();
    }
  }, [params, user])
  
  const GetCourse = async () => {
    try {
      const result = await db.select().from(CourseList)
        .where(and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        ))
      
      if (result && result.length > 0) {
        setCourse(result[0]);
        console.log("Course loaded:", result[0]);
      } else {
        console.log("No course found with the given criteria");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }
  
  const GenerateChapterContent = async () => {
    setLoading(true);
    console.log("Course data:", course);
    setIsGenerating(true);
    
    if (!course || !course.courseOutput) {
      console.log("No course output found");
      toast.error("Course data is incomplete");
      setIsGenerating(false);
      setLoading(false);
      return;
    }
    
    // Check which properties we have
    console.log("CourseOutput keys:", Object.keys(course.courseOutput));
    
    // Try to find chapters data from different possible properties
    let chapters = [];
    
    if (course.courseOutput.chapters) {
      chapters = course.courseOutput.chapters;
    } else if (course.courseOutput.Chapters) {
      chapters = course.courseOutput.Chapters;
    } else if (course.courseOutput.outline) {
      chapters = course.courseOutput.outline;
    } else if (course.courseOutput.Outline) {
      chapters = course.courseOutput.Outline;
    } else if (Array.isArray(course.courseOutput.Content)) {
      chapters = course.courseOutput.Content;
    }
    
    if (!chapters || chapters.length === 0) {
      console.log("Couldn't find chapters in:", course.courseOutput);
      toast.error("Please create some chapters first");
      setIsGenerating(false);
      setLoading(false);
      return;
    }
    
    console.log(`Found ${chapters.length} chapters to process:`, chapters);
    
    const courseName = course.courseOutput?.CourseName || course.name || "Unnamed Course";
    
    // Process each chapter sequentially to avoid overwhelming the AI service
    for (let index = 0; index < chapters.length; index++) {
      const chapter = chapters[index];
      // Try to get chapter name from different possible properties
      const chapterName = chapter.ChapterName || chapter.Title || chapter.title || chapter.name || chapter.Name || `Chapter ${index + 1}`;
      
      const PROMPT = "Explain the concept in Detail on Topic:" + courseName + 
                     ", Chapter:" + chapterName +
                     ", in JSON Format with list of array with field as title, description and explanation in detail, Code Example(Code field in <precode> format) if applicable";
      
      console.log(`Chapter ${index + 1} PROMPT:`, PROMPT);

      try {
        let videoId="";

        // Generate video URL
        service.getVideos(course.courseOutput?.CourseName+':'+chapterName).then(resp=>{
          console.log(resp);
          videoId=resp[0]?.id?.videoId
        })

        // Generate Chapter data  
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        console.log(`Chapter ${index + 1} response:`, result.response?.text());
        const content=JSON.parse(result.response?.text())

        
        // Save Chapter content + video URL
        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course.courseId,
          content: content,
          videoId: videoId
        });
        // Add your save logic here
        
        // Show progress to user
        toast.success(`Chapter ${index + 1} (${chapterName}) generated`, {
          description: `${chapters.length - index - 1} chapters remaining`
        });
        
      } catch (e) {
        setLoading(false);
        console.error(`Error generating content for Chapter ${index + 1}:`, e);
      }
      
       await db.update(CourseList).set({
        publish:true
       })
       
      router.replace('/create-course/'+course?.courseId+'/finish')
    }
    
    toast.success(`All ${chapters.length} chapters processed!`, {
      description: "Content generation complete"
    });
    
    setIsGenerating(false);
    setLoading(false);
  }
  
  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

      <LoadingDialog loading={loading}/>
      
      {/* basic info */}
      {course && <CourseBasicInfo course={course} refreshData={GetCourse} />}
      
      {/* course detail */}
      {course && <CourseDetail course={course} />}
      
      {/* list of lesson  */}
      {course && <ChapterList course={course} refreshData={GetCourse}/>}
      
      <Button 
        onClick={GenerateChapterContent} 
        className="my-10" 
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Course Content"}
      </Button>
    </div>
  )
}

export default CourseLayout