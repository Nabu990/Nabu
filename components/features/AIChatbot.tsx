"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const getResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase().trim()
    
    // Define response patterns with keywords and responses
    const responsePatterns = [
      {
        keywords: ['project', 'work', 'portfolio'],
        response: "I've worked on several exciting projects! The main ones include an E-commerce Platform using Next.js and TypeScript, a Task Management App with React and Node.js, and a Best Tracker application. Which one would you like to know more about?"
      },
      {
        keywords: ['skill', 'tech', 'stack', 'language', 'framework'],
        response: "I'm proficient in modern web technologies including React, Next.js, TypeScript, Node.js, and Python. I also have experience with databases like MongoDB and PostgreSQL. What specific technology would you like to know more about?"
      },
      {
        keywords: ['experience', 'background', 'history', 'worked'],
        response: "I started my web development journey in 2021, built my first professional project in 2022, and have been creating complex applications since then. I specialize in full-stack development with a focus on React and Node.js ecosystems."
      },
      {
        keywords: ['contact', 'email', 'reach', 'message', 'connect'],
        response: "You can reach me at williekelvin511@gmail.com or use the contact form on this page. I'm always open to discussing new opportunities and interesting projects!"
      },
      {
        keywords: ['learn', 'study', 'education', 'school', 'university'],
        response: "I'm self-taught and constantly learning through building projects and staying updated with the latest web technologies. I believe in practical, hands-on learning and continuous improvement."
      },
      {
        keywords: ['e-commerce', 'shop', 'store', 'shopping'],
        response: "The E-commerce Platform is built with Next.js and TypeScript, featuring real-time inventory management, secure payments with Stripe, and a responsive design. It handles thousands of products efficiently using MongoDB."
      },
      {
        keywords: ['task', 'management', 'organize', 'todo'],
        response: "The Task Management App uses React for the frontend and Node.js for the backend. It features real-time updates using Socket.IO, drag-and-drop task organization, and team collaboration features."
      },
      {
        keywords: ['tracker', 'tracking', 'monitor'],
        response: "The Best Tracker is a full-stack application that helps users track their daily activities and goals. It uses React for the UI, Express.js for the backend, and includes features like data visualization and progress tracking."
      },
      {
        keywords: ['hello', 'hi', 'hey', 'greetings'],
        response: "Hello! I'm your AI assistant. I can help you learn more about my projects, skills, and experience. What would you like to know?"
      }
    ]

    // Check if question is empty or too short
    if (lowerQuestion.length < 2) {
      return "I didn't quite catch that. Could you please rephrase your question?"
    }

    // Find matching pattern
    for (const pattern of responsePatterns) {
      if (pattern.keywords.some(keyword => lowerQuestion.includes(keyword))) {
        return pattern.response
      }
    }

    // If no pattern matches, provide a helpful default response
    return "I understand you're asking about " + question + ". To better assist you, could you please be more specific? I can tell you about my projects, skills, experience, or how to get in touch."
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      // Simulate AI response with contextual answers
      setTimeout(() => {
        try {
          const response = getResponse(input)
          const assistantMessage = {
            role: 'assistant' as const,
            content: response
          }
          setMessages(prev => [...prev, assistantMessage])
        } catch (innerError) {
          console.error('Response generation error:', innerError)
          const errorMessage = {
            role: 'assistant' as const,
            content: "I apologize, but I encountered an error processing your request. Could you please try rephrasing your question?"
          }
          setMessages(prev => [...prev, errorMessage])
        }
        setIsTyping(false)
      }, 800)
    } catch (error) {
      console.error('Error:', error)
      setIsTyping(false)
      const errorMessage = {
        role: 'assistant' as const,
        content: "I'm sorry, but something went wrong. Please try again."
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 ${isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-full p-4 shadow-lg transition-colors z-50`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col z-50"
          >
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold">AI Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>

            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
