import React, { useState } from 'react';
import { Clock, ChevronRight, BookOpen } from 'lucide-react';

function ChapterListCard({ chapter, index, isSelected }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle hover states
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  return (
    <div 
      className={`relative overflow-hidden rounded-xl mb-4 transition-all duration-300 ${
        isSelected ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200' : 
        'bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center p-4 group cursor-pointer">
        {/* Chapter Number */}
        <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-all duration-300 ${
          isSelected ? 'bg-white text-indigo-600' : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200'
        }`}>
          <span className="font-bold text-lg">{index + 1}</span>
        </div>
        
        {/* Chapter Content */}
        <div className="flex-1">
          <h3 className={`font-bold text-lg mb-1 transition-colors duration-300 ${
            isSelected ? 'text-white' : 'text-gray-800'
          }`}>
            {chapter?.ChapterName || chapter?.["Chapter Name"]}
          </h3>
          
          {/* Chapter metadata */}
          <div className="flex items-center mb-2">
            <Clock className={`w-4 h-4 mr-1 ${isSelected ? 'text-indigo-100' : 'text-indigo-400'}`} />
            <span className={`text-sm mr-4 ${isSelected ? 'text-indigo-100' : 'text-gray-500'}`}>
              {chapter?.Duration || "15 mins"}
            </span>
            <BookOpen className={`w-4 h-4 mr-1 ${isSelected ? 'text-indigo-100' : 'text-indigo-400'}`} />
            <span className={`text-sm ${isSelected ? 'text-indigo-100' : 'text-gray-500'}`}>
              {chapter?.Pages || "10 pages"}
            </span>
          </div>
          
          {/* Description with fade-in effect */}
          {chapter?.About && (
            <div className={`text-sm overflow-hidden transition-all duration-300 ${
              isHovered || isSelected ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
            } ${isSelected ? 'text-white' : 'text-gray-600'}`}>
              {chapter.About}
            </div>
          )}
        </div>
        
        {/* Right arrow indicator */}
        <div className={`transition-all duration-300 ${
          isSelected ? 'text-white' : 'text-indigo-400'
        } ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}>
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
      
      {/* Progress bar at bottom */}
      <div className="h-1 w-full bg-gray-100">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ 
            width: `${chapter?.Progress || 0}%`,
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.5)'
          }}
        />
      </div>
    </div>
  );
}

export default ChapterListCard;