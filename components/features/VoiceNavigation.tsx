"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SpeechRecognitionEvent extends Event {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string
      }
    }
  }
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  start(): void
  stop(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

declare global {
  interface Window {
    webkitSpeechRecognition: {
      new(): SpeechRecognition
    }
  }
}

export function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    let recognition: SpeechRecognition | null = null

    const initializeRecognition = () => {
      if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const command = event.results[0][0].transcript.toLowerCase()
          setTranscript(command)
          handleCommand(command)
        }

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }
      }
    }

    initializeRecognition()

    const handleCommand = (command: string) => {
      if (command.includes('scroll')) {
        if (command.includes('top')) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setFeedback('Scrolling to top')
        } else if (command.includes('bottom')) {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
          setFeedback('Scrolling to bottom')
        }
      } else if (command.includes('projects')) {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        setFeedback('Going to projects')
      } else if (command.includes('contact')) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        setFeedback('Going to contact section')
      } else if (command.includes('about')) {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        setFeedback('Going to about section')
      } else if (command.includes('theme')) {
        if (command.includes('dark')) {
          document.documentElement.classList.add('dark')
          setFeedback('Switching to dark theme')
        } else if (command.includes('light')) {
          document.documentElement.classList.remove('dark')
          setFeedback('Switching to light theme')
        }
      }
    }

    const startListening = () => {
      if (!recognition) {
        initializeRecognition()
      }
      if (recognition) {
        recognition.start()
        setIsListening(true)
        setFeedback('Listening...')
      } else {
        setFeedback('Speech recognition not supported')
      }
    }

    const stopListening = () => {
      if (recognition) {
        recognition.stop()
        setIsListening(false)
      }
    }

    // Cleanup
    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [])

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsListening(!isListening)}
        className={`p-4 rounded-full shadow-lg ${
          isListening
            ? 'bg-red-500 text-white'
            : 'bg-blue-600 text-white'
        }`}
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
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 left-0 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
