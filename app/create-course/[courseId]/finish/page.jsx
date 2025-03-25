"use client";

import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { useRouter } from "next/navigation";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "sonner"; // For toast notifications
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share"; // Import react-share components

function FinishScreen({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("Params:", params);
    if (params && user?.primaryEmailAddress?.emailAddress) {
      GetCourse();
    } else {
      console.log("Params or user email is missing");
      setLoading(false);
    }
  }, [params, user]);

  const GetCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      if (result && result.length > 0) {
        setCourse(result[0]);
        console.log("Course loaded:", result[0]);
      } else {
        console.log("No course found with the given criteria");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`;
      await navigator.clipboard.writeText(url);
      toast.success("Course URL copied successfully! 🎉");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy URL.");
    }
  };

  if (loading) {
    return <div>Loading course details...</div>;
  }

  if (!course) {
    return <div>No course found.</div>;
  }

  const courseUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`;

  return (
    <div className="px-10 md:px-20 lg:px-44 my-8">
      <h2 className="text-center font-bold text-2xl my-3">
        Congrats! Your course is ready
      </h2>

      {/* Course Basic Info */}
      <CourseBasicInfo course={course} refreshData={GetCourse} />

      {/* Course URL and Share Options */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Course URL:</h2>
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md border border-gray-200">
          <p className="text-gray-700 truncate">{courseUrl}</p>
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-gray-200 rounded-md transition-colors"
            aria-label="Copy course URL"
          >
            <IoCopyOutline className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Share Buttons */}
        <div className="mt-4 flex gap-3">
          <FacebookShareButton url={courseUrl}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={courseUrl}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url={courseUrl}>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <EmailShareButton url={courseUrl}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
}

export default FinishScreen;