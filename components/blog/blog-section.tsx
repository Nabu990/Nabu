"use client"

import { motion } from "framer-motion"

// This would typically come from your MDX files
const blogPosts = [
  {
    title: "Building Modern Web Applications with Next.js 13",
    excerpt: "Explore the latest features in Next.js 13 and how they revolutionize web development",
    date: "2024-05-20",
    readTime: "5 min read",
    slug: "building-modern-web-apps",
    tags: ["Next.js", "React", "Web Development"]
  },
  {
    title: "Mastering TypeScript: Best Practices and Tips",
    excerpt: "Learn how to write better TypeScript code with these professional tips and patterns",
    date: "2024-05-15",
    readTime: "7 min read",
    slug: "mastering-typescript",
    tags: ["TypeScript", "JavaScript", "Programming"]
  },
  {
    title: "The Power of Tailwind CSS in Modern Web Design",
    excerpt: "Why Tailwind CSS is becoming the go-to choice for modern web development",
    date: "2024-05-10",
    readTime: "4 min read",
    slug: "power-of-tailwind",
    tags: ["CSS", "Tailwind", "Web Design"]
  }
]

export function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Latest Blog Posts
          </h2>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    <a
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </a>
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/blog"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Posts
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
