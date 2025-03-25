"use client";

import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { UserCourseListContext } from "../_context/UserCourseListContext";

function DashboardLayout({ children }) {
  const [userCourseList, setUserCourseList] = useState([]);

  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
      <div className="flex min-h-screen bg-gray-50">
        
        {/* Sidebar - fixed with proper width */}
        <aside className="fixed top-0 left-0 h-full w-64 z-30 bg-gray-900">
          <SideBar />
        </aside>

        {/* Main content area with padding for sidebar */}
        <div className="flex-1 flex flex-col w-full md:pl-64">
          
          {/* Header - sticky with shadow */}
          <header className="sticky bg- top-0 z-40 w-full bg-white shadow-md ml-8 mr-5 rounded-lg">
            <Header />
          </header>

          {/* Main content with padding */}
          <main className="p-5 ml-7 md:p-8 pt-6 bg-gray-50 min-h-screen">
            {children}
          </main>
        </div>

      </div>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout;
