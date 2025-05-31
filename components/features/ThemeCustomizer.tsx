"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ColorScheme = {
  primary: string
  secondary: string
  accent: string
}

type Theme = {
  name: string
  colors: ColorScheme
  mood: 'professional' | 'playful' | 'minimal'
}

const predefinedThemes: Theme[] = [
  {
    name: 'Classic Blue',
    colors: {
      primary: '#2563eb',
      secondary: '#1d4ed8',
      accent: '#3b82f6'
    },
    mood: 'professional'
  },
  {
    name: 'Vibrant Purple',
    colors: {
      primary: '#7c3aed',
      secondary: '#6d28d9',
      accent: '#8b5cf6'
    },
    mood: 'playful'
  },
  {
    name: 'Minimal Gray',
    colors: {
      primary: '#4b5563',
      secondary: '#374151',
      accent: '#6b7280'
    },
    mood: 'minimal'
  }
]

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<Theme>(predefinedThemes[0])
  const [fontSize, setFontSize] = useState(16)
  const [spacing, setSpacing] = useState(1)

  const applyTheme = (theme: Theme) => {
    setSelectedTheme(theme)
    document.documentElement.style.setProperty('--primary-color', theme.colors.primary)
    document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary)
    document.documentElement.style.setProperty('--accent-color', theme.colors.accent)
    
    // Apply mood-specific styles
    document.body.className = `theme-${theme.mood}`
  }

  const updateFontSize = (size: number) => {
    setFontSize(size)
    document.documentElement.style.fontSize = `${size}px`
  }

  const updateSpacing = (value: number) => {
    setSpacing(value)
    document.documentElement.style.setProperty('--spacing-multiplier', value.toString())
  }

  return (
    <div className="fixed right-4 top-20 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
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
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-0 mt-4 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Customize Theme
            </h3>

            <div className="space-y-6">
              {/* Color Schemes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color Scheme
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {predefinedThemes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => applyTheme(theme)}
                      className={`p-2 rounded-lg text-sm ${
                        selectedTheme.name === theme.name
                          ? 'bg-blue-100 dark:bg-blue-900'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font Size
                </label>
                <input
                  type="range"
                  min="14"
                  max="20"
                  value={fontSize}
                  onChange={(e) => updateFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Spacing */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Spacing
                </label>
                <input
                  type="range"
                  min="0.8"
                  max="1.2"
                  step="0.1"
                  value={spacing}
                  onChange={(e) => updateSpacing(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
