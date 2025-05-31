"use client"

import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/about/about-section"
import { ProjectsSection } from "@/components/projects/projects-section"
import { SkillsSection } from "@/components/skills/skills-section"
import { ContactSection } from "@/components/contact/contact-section"
import { BlogSection } from "@/components/blog/blog-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
          >
            <span className="text-3xl">🚀</span>
            Nabu
          </motion.h1>
          <div className="flex items-center gap-6">
            <motion.nav 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:flex items-center gap-6"
            >
              <a href="#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">About</a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Projects</a>
              <a href="#skills" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Skills</a>
              <a href="#blog" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Blog</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Contact</a>
            </motion.nav>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <BlogSection />
      <ContactSection />
    </main>
  )
}
