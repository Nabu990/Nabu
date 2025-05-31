"use client"

import { motion } from "framer-motion"

const timelineItems = [
  {
    year: "2021",
    title: "Started Web Development Journey",
    description: "Discovered my passion for web development and started learning React"
  },
  {
    year: "2022",
    title: "First Professional Project",
    description: "Built and launched my first production web application"
  },
  {
    year: "2023",
    title: "Full Stack Development",
    description: "Mastered Next.js, TypeScript, and modern backend technologies"
  },
  {
    year: "2024",
    title: "Advanced Projects",
    description: "Created complex applications with modern tech stacks"
  }
]

const funFacts = [
  {
    icon: "💡",
    fact: "I love solving complex problems with elegant solutions"
  },
  {
    icon: "🌱",
    fact: "Always learning and exploring new technologies"
  },
  {
    icon: "🎮",
    fact: "Gaming enthusiast who builds web apps for fun"
  }
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            About Me
          </h2>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between mb-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="w-5/12" />
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400" />
                <div className="w-5/12">
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fun Facts */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Fun Facts About Me
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={fact.fact}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center"
                >
                  <span className="text-4xl mb-4 block">{fact.icon}</span>
                  <p className="text-gray-600 dark:text-gray-300">{fact.fact}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
