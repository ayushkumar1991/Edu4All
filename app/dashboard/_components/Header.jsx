'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Search } from 'lucide-react'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [particles, setParticles] = useState([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])

  useEffect(() => {
    if (!isClient) return

    const generateParticles = () => {
      const newParticles = []
      const count = 35

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 2,
          duration: Math.random() * 15 + 10,
          delay: Math.random() * 5
        })
      }
      setParticles(newParticles)
    }
    generateParticles()
  }, [isClient])

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`sticky top-0 z-50 flex justify-between items-center px-5 py-4 
                ${scrolled 
                  ? 'bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] shadow-2xl' 
                  : 'bg-transparent'} 
                transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-md`}
    >

      {/* Space Particles */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-r from-blue-500/40 to-purple-500/40 blur-xl"
              initial={{
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                opacity: 0.2,
                scale: 0.5,
              }}
              animate={{
                x: [`${particle.x}%`, `${(particle.x + 35) % 100}%`],
                y: [`${particle.y}%`, `${(particle.y + 25) % 100}%`],
                opacity: [0.3, 0.7, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear"
              }}
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Logo & Branding */}
      <div className="flex items-center gap-4 z-10">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="hidden md:block"
        >
          <Link href="/">
            <Image
              src="/Favicon.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full cursor-pointer hover:shadow-lg transition-all"
              priority
            />
          </Link>
        </motion.div>

        <Link href="/">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block text-3xl font-bold cursor-pointer"
            style={{
              backgroundSize: '400% 400%',
              backgroundImage: 'linear-gradient(90deg, #60a5fa, #9333ea, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
            >
              EduMitra
            </motion.span>
          </motion.h1>
        </Link>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`relative hidden md:flex items-center rounded-full px-5 py-2 
                  ${searchFocused 
                    ? 'ring-2 ring-blue-400 bg-white/10 shadow-lg' 
                    : 'bg-gray-800/60 hover:bg-gray-700'} 
                  transition-all duration-300 max-w-md w-full mx-4`}
      >
        <Search className={`h-6 w-6 mr-3 transition-colors ${searchFocused ? 'text-blue-300' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent outline-none border-none w-full text-gray-200"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </motion.div>

      {/* User Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-6 z-10"
      >
        {/* Bell Icon */}
        <motion.div
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex relative cursor-pointer"
        >
          <Bell className="h-6 w-6 text-gray-300 hover:text-blue-400 transition-colors" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, delay: 1 }}
            className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
          >
            3
          </motion.span>
        </motion.div>

        {/* User Profile */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center relative"
        >
          {isClient ? (
            <motion.div
              animate={{
                boxShadow: ['0 0 0 0px rgba(59, 130, 246, 0.4)', '0 0 12px rgba(59, 130, 246, 0.6)', '0 0 0 0px rgba(59, 130, 246, 0.4)']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="rounded-lg"
            >
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-10 w-10 mr-4 border-2 border-indigo-400 rounded-full transition-all"
                  }
                }}
              />
            </motion.div>
          ) : (
            <div className="h-10 w-10 rounded-full border-2 border-indigo-400 bg-gray-700"></div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Header
