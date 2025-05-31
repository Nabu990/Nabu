"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with Next.js, TypeScript, and Stripe",
    image: "/images/projects/best-layer.jpg",
    tech: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    demoUrl: "https://best-layer.onrender.com",
    githubUrl: "https://github.com/Nabu990/best-layer"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    image: "/images/projects/task-management.jpg",
    tech: ["React", "Node.js", "Socket.IO", "MongoDB"],
    demoUrl: "https://project-helpnode.onrender.com/",
    githubUrl: "https://github.com/Nabu990/project-helpnode"
  },
  {
    title: "Best Tracker",
    description: "A comprehensive tracking application for managing and monitoring various tasks and activities",
    image: "/images/projects/best-tracker.jpg",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    demoUrl: "https://best-tracker.onrender.com",
    githubUrl: "https://github.com/Nabu990/best-tracker"
  }
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition-colors"
                    >
                      Live Demo
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-center rounded hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                    >
                      GitHub
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
