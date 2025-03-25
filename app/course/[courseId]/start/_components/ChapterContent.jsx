import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Coffee, Lightbulb, ArrowDown, ArrowUp, Dumbbell } from 'lucide-react';

const opts = {
  height: '480',
  width: '100%',
  playerVars: {
    autoplay: 0,
    modestbranding: 1,
    rel: 0,
  },
};

function ChapterContent({ chapter, content }) {
  console.log(chapter);
  
  // State to track expanded items
  const [expandedItems, setExpandedItems] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  
  // Toggle function for read more/less
  const toggleReadMore = (type, index) => {
    const key = `${type}-${index}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Animation entry effect
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [chapter?.ChapterName]);

  // Function to get icon based on content type
  const getContentIcon = (type) => {
    switch(type) {
      case 'section': return <BookOpen size={20} className="text-blue-600" />;
      case 'concept': return <Lightbulb size={20} className="text-green-600" />;
      case 'practice': return <Dumbbell size={20} className="text-purple-600" />;
      default: return <Coffee size={20} className="text-gray-600" />;
    }
  };

  // Get background gradient by content type
  const getBackgroundStyle = (type) => {
    switch(type) {
      case 'section': 
        return 'bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 shadow-blue-100';
      case 'concept': 
        return 'bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 shadow-green-100';
      case 'practice': 
        return 'bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500 shadow-purple-100';
      default: 
        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-l-4 border-gray-500 shadow-gray-100';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-10 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg max-w-4xl mx-auto"
    >
      {/* Chapter Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-8 border-b pb-6"
      >
        <h1 className="font-bold text-3xl text-gray-800 mb-3 flex items-center">
          <BookOpen size={28} className="mr-3 text-primary" />
          {chapter?.ChapterName || chapter?.["Chapter Name"]}
        </h1>
        <p className="text-gray-600 text-lg italic">{chapter?.About}</p>
      </motion.div>
      
      {/* Video Section - Appear with a scale effect */}
      {content?.videoId && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10 rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="aspect-w-16 aspect-h-9 w-full">
            <YouTube
              videoId={content?.videoId}
              opts={opts}
              className="w-full"
            />
          </div>
        </motion.div>
      )}
      
      {/* Content Sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {/* Handle sections if available */}
        {content?.content?.sections && content.content.sections.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-4">
              <BookOpen size={20} className="mr-2 text-blue-600" />
              Key Sections
            </h2>
            
            {content.content.sections.map((item, index) => {
              const key = `section-${index}`;
              const isExpanded = expandedItems[key];
              
              return (
                <motion.div 
                  key={key}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`mb-5 rounded-xl shadow-md overflow-hidden ${getBackgroundStyle('section')}`}
                >
                  <div className="p-5 md:p-6">
                    {/* Title with Icon */}
                    {item?.title && (
                      <div className="flex items-center mb-3">
                        {getContentIcon('section')}
                        <h3 className="font-semibold text-lg ml-2 text-gray-800">{item.title}</h3>
                      </div>
                    )}
                    
                    {/* Description */}
                    {item?.description && (
                      <div className="mt-3 prose max-w-none">
                        <ReactMarkdown>{item.description}</ReactMarkdown>
                      </div>
                    )}
                    
                    {/* Expandable Explanation */}
                    {item?.explanation && (
                      <>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-blue-200 prose max-w-none"
                            >
                              <ReactMarkdown>{item.explanation}</ReactMarkdown>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <button 
                          onClick={() => toggleReadMore('section', index)}
                          className="flex items-center mt-4 px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium transition-all duration-200 text-sm"
                        >
                          {isExpanded ? (
                            <>
                              <ArrowUp size={16} className="mr-1" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ArrowDown size={16} className="mr-1" />
                              Read More
                            </>
                          )}
                        </button>
                      </>
                    )}
                    
                    {/* Code Block */}
                    {item?.code && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="mt-4 relative"
                      >
                        <div className="absolute top-0 left-0 right-0 h-10 bg-gray-900 rounded-t-lg flex items-center px-4">
                          <Code size={16} className="text-gray-400 mr-2" />
                          <span className="text-gray-300 text-sm font-mono">code</span>
                        </div>
                        <div className="p-5 pt-12 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre>
                            <code>{item.code}</code>
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Handle concepts if available */}
        {content?.content?.concepts && content.content.concepts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-4">
              <Lightbulb size={20} className="mr-2 text-green-600" />
              Key Concepts
            </h2>
            
            {content.content.concepts.map((item, index) => {
              const key = `concept-${index}`;
              const isExpanded = expandedItems[key];
              
              return (
                <motion.div 
                  key={key}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`mb-5 rounded-xl shadow-md overflow-hidden ${getBackgroundStyle('concept')}`}
                >
                  <div className="p-5 md:p-6">
                    {/* Title with Icon */}
                    {item?.title && (
                      <div className="flex items-center mb-3">
                        {getContentIcon('concept')}
                        <h3 className="font-semibold text-lg ml-2 text-gray-800">{item.title}</h3>
                      </div>
                    )}
                    
                    {/* Description */}
                    {item?.description && (
                      <div className="mt-3 prose max-w-none">
                        <ReactMarkdown>{item.description}</ReactMarkdown>
                      </div>
                    )}
                    
                    {/* Expandable Explanation */}
                    {item?.explanation && (
                      <>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-green-200 prose max-w-none"
                            >
                              <ReactMarkdown>{item.explanation}</ReactMarkdown>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <button 
                          onClick={() => toggleReadMore('concept', index)}
                          className="flex items-center mt-4 px-4 py-2 rounded-full bg-green-100 hover:bg-green-200 text-green-700 font-medium transition-all duration-200 text-sm"
                        >
                          {isExpanded ? (
                            <>
                              <ArrowUp size={16} className="mr-1" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ArrowDown size={16} className="mr-1" />
                              Read More
                            </>
                          )}
                        </button>
                      </>
                    )}
                    
                    {/* Code Block */}
                    {item?.code && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="mt-4 relative"
                      >
                        <div className="absolute top-0 left-0 right-0 h-10 bg-gray-900 rounded-t-lg flex items-center px-4">
                          <Code size={16} className="text-gray-400 mr-2" />
                          <span className="text-gray-300 text-sm font-mono">code</span>
                        </div>
                        <div className="p-5 pt-12 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre>
                            <code>{item.code}</code>
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Handle practices if available */}
        {content?.content?.practices && content.content.practices.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-4">
              <Dumbbell size={20} className="mr-2 text-purple-600" />
              Practice Exercises
            </h2>
            
            {content.content.practices.map((item, index) => {
              const key = `practice-${index}`;
              const isExpanded = expandedItems[key];
              
              return (
                <motion.div 
                  key={key}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`mb-5 rounded-xl shadow-md overflow-hidden ${getBackgroundStyle('practice')}`}
                >
                  <div className="p-5 md:p-6">
                    {/* Title with Icon */}
                    {item?.title && (
                      <div className="flex items-center mb-3">
                        {getContentIcon('practice')}
                        <h3 className="font-semibold text-lg ml-2 text-gray-800">{item.title}</h3>
                      </div>
                    )}
                    
                    {/* Description */}
                    {item?.description && (
                      <div className="mt-3 prose max-w-none">
                        <ReactMarkdown>{item.description}</ReactMarkdown>
                      </div>
                    )}
                    
                    {/* Expandable Explanation */}
                    {item?.explanation && (
                      <>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-purple-200 prose max-w-none"
                            >
                              <ReactMarkdown>{item.explanation}</ReactMarkdown>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <button 
                          onClick={() => toggleReadMore('practice', index)}
                          className="flex items-center mt-4 px-4 py-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium transition-all duration-200 text-sm"
                        >
                          {isExpanded ? (
                            <>
                              <ArrowUp size={16} className="mr-1" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ArrowDown size={16} className="mr-1" />
                              Read More
                            </>
                          )}
                        </button>
                      </>
                    )}
                    
                    {/* Code Block */}
                    {item?.code && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="mt-4 relative"
                      >
                        <div className="absolute top-0 left-0 right-0 h-10 bg-gray-900 rounded-t-lg flex items-center px-4">
                          <Code size={16} className="text-gray-400 mr-2" />
                          <span className="text-gray-300 text-sm font-mono">code</span>
                        </div>
                        <div className="p-5 pt-12 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre>
                            <code>{item.code}</code>
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Show a message if no content is available */}
        {(!content?.content?.sections || content.content.sections.length === 0) &&
         (!content?.content?.concepts || content.content.concepts.length === 0) &&
         (!content?.content?.practices || content.content.practices.length === 0) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-xl border border-gray-200 shadow-inner"
          >
            <Coffee size={48} className="text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No content available yet</h3>
            <p className="text-gray-500 text-center max-w-md">The content for this chapter is currently being prepared. Please check back later.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ChapterContent;