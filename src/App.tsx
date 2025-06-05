import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cat, Moon, Sun, Github, Mail, ExternalLink } from 'lucide-react'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [progress, setProgress] = useState(30)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 10 : prev)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100 light:bg-white light:text-slate-900">
      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 rounded-full bg-white/10 p-3 backdrop-blur-md transition-all hover:bg-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-amber-400" />
        ) : (
          <Moon className="h-5 w-5 text-slate-600" />
        )}
      </motion.button>

      {/* Main Container */}
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="relative mx-auto w-24 h-24 mb-6">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)"
                }}
                animate={{ 
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Cat className="h-12 w-12 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Excuse the Chaos
            </span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl">
              I'm Making Things Purrfect! 🐾
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 space-y-4 text-lg text-slate-300"
          >
            <p>
              I'm currently building a brand new site with modern tech and sleek design.
            </p>
            <p>
              Don't worry - I'm paws-itively working around the clock to get everything ready for you!
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <div className="mb-2 flex justify-between text-sm text-slate-400">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: '30%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="https://github.com/LeonByte/PurrfectSpaceUnderConstruction"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md transition-all hover:bg-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="h-4 w-4" />
              <span>View Source</span>
              <ExternalLink className="h-3 w-3" />
            </motion.a>
            
            <motion.a
              href="mailto:contact@leonbyte.com"
              className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md transition-all hover:bg-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="h-4 w-4" />
              <span>Get in Touch</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 p-6 text-center text-sm text-slate-400"
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span>© 2025</span>
          <a 
            href="https://erobert.se" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            LeonByte Design
          </a>
          <span>•</span>
          <span>Built with React, TypeScript & Tailwind CSS v4.1</span>
        </div>
      </motion.footer>
    </div>
  )
}

export default App