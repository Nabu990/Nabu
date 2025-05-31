import matter from 'gray-matter'
import { join } from 'path'
import { readFileSync, readdirSync } from 'fs'

const postsDirectory = join(process.cwd(), 'content/blog')

interface PostFrontmatter {
  title: string
  date: string
  description: string
  tags?: string[]
  [key: string]: any
}

interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
}

export function getPostSlugs(): string[] {
  return readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const frontmatter: PostFrontmatter = {
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    ...data
  }

  return {
    slug: realSlug,
    frontmatter,
    content,
  }
}

export function getAllPosts(): Omit<Post, 'content'>[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
    )

  return posts.map((post) => ({
    slug: post.slug,
    frontmatter: post.frontmatter,
    content: '', // Don't send content on list view
  }))
}
