import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Footer } from '@/components/footer'
import { CustomCursor } from '@/components/features/CustomCursor'
import { ParticleBackground } from '@/components/features/ParticleBackground'
import { VoiceNavigation } from '@/components/features/VoiceNavigation'
import { ThemeCustomizer } from '@/components/features/ThemeCustomizer'
import { AIChatbot } from '@/components/features/AIChatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nabu 🚀 - Web Developer Portfolio',
  description: 'A showcase of my work, skills, and experience as a web developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CustomCursor />
          <ParticleBackground />
          <VoiceNavigation />
          <ThemeCustomizer />
          <AIChatbot />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
