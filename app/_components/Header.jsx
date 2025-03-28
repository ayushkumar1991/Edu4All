"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <>
      <motion.header
        className={`fixed w-full top-0 z-50 px-4 sm:px-6 md:px-12 py-3 sm:py-4 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0e2a]/95 backdrop-blur-md shadow-lg shadow-[#3a3d8a]/10 border-b border-[#1e2247]"
            : "bg-[#0a0e2a]/90"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c4dff] to-[#a67af4] tracking-wide">
                EduMitra
              </span>

              {/* Glow Effect */}
              <span className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c4dff] to-[#a67af4] filter blur-[10px] opacity-60 animate-pulse">
                EduMitra
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#c7d2fe] hover:text-white font-medium relative group transition-colors"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#a67af4] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            <SignedIn>
              <Link
                href="/dashboard"
                className="text-[#c7d2fe] hover:text-white font-medium relative group transition-colors"
              >
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#a67af4] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </SignedIn>
          </nav>

          {/* Authentication and Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <SignedOut>
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }} 
                className="hidden sm:block"
              >
                <SignInButton mode="modal">
                  <Button className="bg-gradient-to-r from-[#6d5dfc] to-[#8a2be2] hover:from-[#7b6bfc] hover:to-[#9b4af9] text-white font-medium px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(109,93,252,0.4)] transition-all">
                    Get Started
                  </Button>
                </SignInButton>
              </motion.div>
            </SignedOut>

            <SignedIn>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 sm:w-10 h-8 sm:h-10 border-2 border-[#3a3d8a] shadow-[0_0_8px_rgba(138,158,255,0.3)]",
                      userButtonPopoverCard: "bg-[#0a0e2a] border border-[#1e2247] shadow-xl"
                    }
                  }}
                />
              </motion.div>
            </SignedIn>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-[#c7d2fe] hover:text-white p-1 rounded-full hover:bg-[#1e2147]/50 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-[60px] sm:top-[72px] z-40 bg-[#0a0e2a]/95 backdrop-blur-md p-4 sm:p-6 md:hidden border-t border-[#1e2247]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base sm:text-lg font-medium text-[#c7d2fe] hover:text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-[#1e2147]/50 transition-colors border-b border-[#1e2147]/30"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <SignedIn>
                <Link
                  href="/dashboard"
                  className="text-base sm:text-lg font-medium text-white bg-gradient-to-r from-[#6d5dfc]/20 to-[#8a2be2]/20 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#3a3d8a] hover:border-[#8a9eff] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="w-full bg-gradient-to-r from-[#6d5dfc] to-[#8a2be2] hover:from-[#7b6bfc] hover:to-[#9b4af9] text-white font-medium px-4 py-3 rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(109,93,252,0.4)] transition-all">
                    Get Started
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for header height */}
      <div className={`w-full ${mobileMenuOpen ? "h-0" : ""}`} />
    </>
  )
}

export default Header;