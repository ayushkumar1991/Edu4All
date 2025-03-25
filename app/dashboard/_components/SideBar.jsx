'use client';

import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { FaHome } from "react-icons/fa";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { motion } from 'framer-motion';

function SideBar() {
  const { userCourseList } = useContext(UserCourseListContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const Menu = [
    { id: 1, name: "Home", icon: <FaHome />, path: "/dashboard", color: "#7F00FF" },   // Purple
    { id: 2, name: "Explore", icon: <HiSquare3Stack3D />, path: "/dashboard/explore", color: "#00D4FF" },  // Cyan
    { id: 3, name: "Upgrade", icon: <IoShieldCheckmark />, path: "/dashboard/upgrade", color: "#FF00FF" },  // Magenta
    { id: 4, name: "Logout", icon: <IoIosLogOut />, path: "/dashboard/logout", color: "#FF4500" }  // Orange
  ];

  const path = usePathname();
  const completionPercentage = (userCourseList?.length / 50) * 100;

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 h-full ${isCollapsed ? 'w-20' : 'md:w-72'} 
                  bg-gradient-to-b from-[#1e1e2f] to-[#0c0c22] rounded-r-3xl shadow-lg 
                  transition-all duration-300 ease-in-out z-30`}
    >
      {/* Header */}
      <div className="p-4 pt-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`flex items-center gap-3 ${isCollapsed ? 'scale-0 w-0' : 'scale-100'} transition-all duration-300`}
        >
          <Image src={'/Edumitra.png'} width={50} height={50} alt="Logo" className="rounded-xl shadow-lg" />
          {!isCollapsed && (
            <h1 className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">
              Edumitra
            </h1>
          )}
        </motion.div>

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all"
        >
          {isCollapsed ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg> : 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          }
        </button>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-4">
        <ul className="space-y-3">
          {Menu.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link href={item.path}>
                <div className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 
                              bg-opacity-70 shadow-md 
                              ${item.path === path 
                                ? 'bg-gradient-to-r from-[#7F00FF] to-[#00D4FF] scale-105' 
                                : 'hover:scale-105 hover:shadow-lg'}
                            `}
                     style={{ borderLeft: `4px solid ${item.color}` }}
                >
                  <div className="text-3xl p-2 rounded-lg glow-effect" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <div className="flex flex-col">
                      <h2 className="font-bold text-white">{item.name}</h2>
                      {item.path === path && (
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '70%' }}
                          transition={{ duration: 0.5 }}
                          className="h-1 rounded-full mt-1"
                          style={{ backgroundColor: item.color }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Progress Section */}
      {!isCollapsed && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-10 w-[85%] mx-auto left-0 right-0 p-4"
        >
          <div className="bg-[#1a1a40] bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-md transition-transform hover:scale-105">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-white">Course Progress</h2>
              <span className="text-xs font-bold text-cyan-400">{completionPercentage.toFixed(0)}%</span>
            </div>

            <Progress 
              value={completionPercentage} 
              className="h-3 bg-gray-800"
            />

            <div className="mt-4 space-y-2">
              <h2 className="text-sm font-bold text-gray-300">
                {userCourseList?.length} out of 50 Courses Completed
              </h2>
              <div className="flex items-center gap-2">
                <IoShieldCheckmark className="text-pink-500 text-lg" />
                <h2 className="text-xs text-gray-400">
                  Upgrade for unlimited courses
                </h2>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SideBar;
