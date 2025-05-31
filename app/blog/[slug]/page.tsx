"use client"

import { MDXRemote } from "next-mdx-remote/rsc"
import { getPostBySlug } from "@/lib/mdx"
import { notFound } from "next/navigation"

interface Props {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: Props) {
  try {
    const { frontmatter, content } = getPostBySlug(params.slug)

    return (
      <article className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {frontmatter.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {frontmatter.tags && (
                <div className="flex gap-2">
                  {frontmatter.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none">
            <div className="mt-8" dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            {frontmatter.tags && (
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </footer>
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
}
