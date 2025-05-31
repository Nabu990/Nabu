"use client"

import { motion } from "framer-motion"

const techStackItems = [
  { name: "React", left: 20, top: 30 },
  { name: "TypeScript", left: 70, top: 20 },
  { name: "Next.js", left: 40, top: 60 },
  { name: "Node.js", left: 80, top: 45 },
  { name: "Tailwind CSS", left: 25, top: 75 },
  { name: "GraphQL", left: 60, top: 85 },
]

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800" />

      {/* Tech stack floating badges */}
      <div className="absolute inset-0">
        {techStackItems.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="absolute"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 0.5,
            }}
            style={{
              left: `${tech.left}%`,
              top: `${tech.top}%`,
            }}
          >
            <div className="px-3 py-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full text-sm">
              {tech.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            I build scalable,{" "}
            <span className="text-blue-600 dark:text-blue-400">stunning</span>{" "}
            web apps
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Full-stack developer specializing in React, TypeScript, and modern web technologies.
            Let's turn your vision into reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View My Work
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
