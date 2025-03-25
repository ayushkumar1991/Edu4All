"use client";
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { eq, and } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';
import { BookOpen, Menu, X, CheckCircle } from 'lucide-react';

function CourseStart({ params }) {
    const [course, setCourse] = useState();
    const [selectedChapter, setSelectedChapter] = useState();
    const [chapterContent, setChapterContent] = useState();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    useEffect(() => {
        GetCourse();
    }, []);
    
    const GetCourse = async () => {
        const result = await db.select()
            .from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId));
        
        setCourse(result[0]);
        // Set the first chapter as selected by default
        if (result[0]?.courseOutput?.Chapters?.length > 0) {
            setSelectedChapter(result[0].courseOutput.Chapters[0]);
        }
        GetSelectedChapterContent(0);
    }
    
    const GetSelectedChapterContent = async (chapterId) => {
        if (!course?.courseId) return;
        
        const result = await db.select()
            .from(Chapters)
            .where(and(
                eq(Chapters.chapterId, chapterId),
                eq(Chapters.courseId, course?.courseId)));
        
        setChapterContent(result[0]);
        console.log(result);
    };
    
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Mobile menu button */}
            <button 
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-full bg-primary text-white shadow-lg"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* ChapterList sidebar - desktop always visible, mobile conditional */}
            <div className={`md:w-80 ${sidebarOpen ? 'fixed inset-0 z-30 block' : 'hidden'} md:block md:relative md:h-screen bg-white border-r border-gray-200 shadow-md overflow-y-auto transition-all duration-300`}>
                <div className="sticky top-0 z-10 bg-primary text-white">
                    <div className="flex items-center p-4 border-b border-primary-dark">
                        <BookOpen className="mr-2" size={20} />
                        <h2 className="font-semibold text-lg truncate">
                            {course?.courseOutput?.CourseName || 'Course Content'}
                        </h2>
                    </div>
                    <div className="p-3 bg-primary-dark text-xs font-medium">
                        CHAPTERS
                    </div>
                </div>

                <div className="py-2">
                    {course?.courseOutput?.Chapters?.length > 0 ? (
                        course.courseOutput.Chapters.map((chapter, index) => (
                            <div
                                key={index}
                                className={`mx-2 my-1 rounded-lg cursor-pointer transition-all duration-200
                                ${selectedChapter?.ChapterName === chapter?.ChapterName ? 
                                  'bg-blue-50 border-l-4 border-primary shadow-sm' : 
                                  'hover:bg-gray-100'}`}
                                onClick={() => {
                                    setSelectedChapter(chapter);
                                    GetSelectedChapterContent(index);
                                    if (sidebarOpen) setSidebarOpen(false);
                                }}
                            >
                                <div className="flex items-center p-3">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs mr-3">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-800 line-clamp-2">
                                            {chapter?.ChapterName || chapter?.["Chapter Name"]}
                                        </h3>
                                    </div>
                                    {selectedChapter?.ChapterName === chapter?.ChapterName && (
                                        <CheckCircle size={18} className="text-primary ml-2" />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center h-32">
                            <p className="text-gray-500">No chapters available.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Content div */}
            <div className="flex-1 md:overflow-y-auto bg-white">
                <div className="max-w-4xl mx-auto">
                    {selectedChapter ? (
                        <ChapterContent
                            chapter={selectedChapter}
                            content={chapterContent}
                        />
                    ) : (
                        <div className="flex justify-center items-center h-64 text-gray-500">
                            Select a chapter to begin learning
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseStart;