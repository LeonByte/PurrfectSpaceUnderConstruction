import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cat, Moon, Sun, Github, ExternalLink, Send, Linkedin, MessageSquare } from 'lucide-react'

/**
 * Animated floating particles background effect
 */
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

/**
 * Dark mode theme toggle icon with cat emoji
 */
const MoonCat = () => (
  <div className="relative">
    <Moon className="h-5 w-5 text-amber-400" />
    <div className="absolute -top-1 -right-1 text-xs">🐱</div>
  </div>
)

/**
 * Light mode theme toggle icon with cat emoji
 */
const SunCat = () => (
  <div className="relative">
    <Sun className="h-5 w-5 text-purple-600" />
    <div className="absolute -top-1 -right-1 text-xs">😸</div>
  </div>
)

/**
 * Desktop social navigation component - displays all social links inline
 */
const SocialNav = ({ theme }: { theme: 'dark' | 'light' }) => {
  const socialLinks = [
    { href: "https://github.com/LeonByte", icon: Github, label: "GitHub Profile", hoverColor: "hover:text-gray-400" },
    { href: "https://t.me/LE0Nbyte", icon: Send, label: "Telegram", hoverColor: "hover:text-blue-400" },
    { href: "https://signal.me/#eu/MhNhKmpFitQ7EgMlhZjj4Fsa5iUDsjuBC1cVQEq0houuu7EGb8FC0qp5v0768BW-", icon: MessageSquare, label: "Signal", hoverColor: "hover:text-blue-500" },
    { href: "https://linkedin.com/in/", icon: Linkedin, label: "LinkedIn", hoverColor: "hover:text-blue-600" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex items-center gap-2"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-lg transition-all ${
            theme === 'dark' 
              ? 'text-slate-400 hover:bg-white/10' 
              : 'text-slate-600 hover:bg-black/10'
          } ${social.hoverColor}`}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          title={social.label}
        >
          <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.a>
      ))}
    </motion.div>
  )
}

/**
 * Mobile collapsible social menu - shows contact button that expands to reveal social links
 * Prevents layout overlap on smaller screens
 */
const MobileSocialMenu = ({ theme, onToggle }: { theme: 'dark' | 'light', onToggle: (isOpen: boolean) => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onToggle(newState)
  }
  
  const socialLinks = [
    { href: "https://github.com/LeonByte", icon: Github, label: "GitHub Profile", hoverColor: "hover:text-gray-400" },
    { href: "https://t.me/LE0Nbyte", icon: Send, label: "Telegram", hoverColor: "hover:text-blue-400" },
    { href: "https://signal.me/#eu/MhNhKmpFitQ7EgMlhZjj4Fsa5iUDsjuBC1cVQEq0houuu7EGb8FC0qp5v0768BW-", icon: MessageSquare, label: "Signal", hoverColor: "hover:text-blue-500" },
    { href: "https://linkedin.com/in/leonbyte", icon: Linkedin, label: "LinkedIn", hoverColor: "hover:text-blue-600" }
  ]

  return (
    <div className="relative">
      {/* Contact toggle button */}
      <motion.button
        onClick={handleToggle}
        className={`rounded-full p-3 backdrop-blur-md transition-all border ${
          theme === 'dark' 
            ? 'bg-white/10 hover:bg-white/20 border-white/20' 
            : 'bg-black/10 hover:bg-black/20 border-black/20'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <span className="text-lg">✕</span>
          ) : (
            <span className="text-lg">🐾</span>
          )}
        </motion.div>
      </motion.button>

      {/* Expanded social links menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-16 right-0 flex flex-col gap-2 z-50"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full backdrop-blur-md transition-all border ${
                  theme === 'dark' 
                    ? 'bg-white/10 hover:bg-white/20 border-white/20 text-slate-400' 
                    : 'bg-black/10 hover:bg-black/20 border-black/20 text-slate-600'
                } ${social.hoverColor}`}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                title={social.label}
                onClick={() => setIsOpen(false)}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [progress, setProgress] = useState(30)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Initialize theme and background on mount
  useEffect(() => {
    setMounted(true)
    document.documentElement.setAttribute('data-theme', theme)
    // Prevent horizontal scroll
    document.body.style.overflowX = 'hidden'
    if (theme === 'light') {
      document.body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    } else {
      document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
    }
  }, [theme])

  // Animated progress bar logic
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 10 : prev)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Prevent hydration mismatch
  if (!mounted) return null

  return (
    <div className={`min-h-screen overflow-x-hidden transition-all duration-700 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-slate-100' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'
    }`}>
      <FloatingParticles />
      
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute -top-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-60 ${
            theme === 'dark' ? 'bg-purple-600' : 'bg-purple-400'
          }`}
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute -bottom-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-60 ${
            theme === 'dark' ? 'bg-blue-600' : 'bg-blue-400'
          }`}
          animate={{ x: [0, -30, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Top navigation bar */}
      <div className="fixed top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-50">
        {/* Desktop layout: social links left, theme toggle right */}
        <div className="hidden sm:flex justify-between items-center">
          <SocialNav theme={theme} />
          
          <motion.button
            onClick={toggleTheme}
            className={`rounded-full p-3 backdrop-blur-md transition-all border ${
              theme === 'dark' 
                ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                : 'bg-black/10 hover:bg-black/20 border-black/20'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <MoonCat />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <SunCat />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile layout: theme toggle left, collapsible social menu right */}
        <div className="sm:hidden flex justify-between items-start">
          <motion.button
            onClick={toggleTheme}
            className={`rounded-full p-3 backdrop-blur-md transition-all border ${
              theme === 'dark' 
                ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                : 'bg-black/10 hover:bg-black/20 border-black/20'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <MoonCat />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <SunCat />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          <MobileSocialMenu theme={theme} onToggle={setIsMobileMenuOpen} />
        </div>
      </div>

      {/* Fixed floating "View Source Code" button */}
      <motion.a
        href="https://github.com/LeonByte/PurrfectSpaceUnderConstruction"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 group flex items-center gap-3 rounded-full p-4 font-semibold backdrop-blur-md transition-all border shadow-lg ${
          theme === 'dark' 
            ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-black/20' 
            : 'bg-black/10 hover:bg-black/20 border-black/20 text-black shadow-black/10'
        }`}
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        title="View Source Code"
      >
        <Github className="h-5 w-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">View Source Code</span>
        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </motion.a>

      {/* Main content area */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-40 sm:pt-36 lg:pt-32 overflow-x-hidden">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left column: Animated cat logo */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
                  {/* Pulsing background ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 opacity-20"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.2, 0.1, 0.2],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Main cat icon with gradient background */}
                  <motion.div
                    className={`relative flex w-full h-full items-center justify-center rounded-full shadow-2xl ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600'
                        : 'bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500'
                    }`}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: theme === 'dark' 
                        ? "0 0 50px rgba(147, 51, 234, 0.6)" 
                        : "0 0 50px rgba(147, 51, 234, 0.4)"
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ 
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      hover: { duration: 0.3 }
                    }}
                  >
                    <Cat className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-white drop-shadow-lg" />
                    
                    {/* Rotating decorative elements */}
                    <motion.div
                      className="absolute -top-2 -right-2 text-lg sm:text-xl lg:text-2xl"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      ✨
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-2 -left-2 text-base sm:text-lg lg:text-xl"
                      animate={{ rotate: [360, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                      🌟
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right column: Main content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6 lg:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  <motion.span 
                    className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent font-extrabold block"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Excuse the Chaos
                  </motion.span>
                </h1>
                
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold ${
                  theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  I'm Making Things Purrfect!{' '}
                  <motion.span
                    className="inline-block sm:hidden"
                    initial={{ opacity: 0, scale: 0.3, x: '18vw', y: '-12vh' }}
                    animate={isMobileMenuOpen ? {
                      x: [0, 0, 0],
                      y: [0, 0, 0],
                      scale: [0.4, 0.7, 1],
                      opacity: [0, 0.6, 1]
                    } : {
                      x: '18vw',
                      y: '-12vh',
                      scale: 0.3,
                      opacity: 0
                    }}
                    transition={{ 
                      duration: isMobileMenuOpen ? 1.0 : 0.5,
                      ease: "easeInOut"
                    }}
                    style={{ 
                      position: 'relative',
                      zIndex: 10
                    }}
                  >
                    🐾
                  </motion.span>
                  <span className="hidden sm:inline">🐾</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={`space-y-4 text-base sm:text-lg lg:text-xl ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                <p>
                  I'm currently building a brand new site, and things are a little <em className="text-purple-400 font-semibold">wild</em> around here!
                </p>
                <p>
                  But don't worry - I'm paws-itively working around the clock to get everything ready for you.
                </p>
                <p>
                  Check back soon - it's going to be <strong className="text-emerald-400 font-bold">pawsome</strong>!
                </p>
              </motion.div>
            </div>
          </div>

          {/* Progress bar section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 lg:mt-16"
          >
            <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
              <div className={`mb-4 flex justify-between text-sm sm:text-base font-semibold ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <span>Building Progress</span>
                <motion.span
                  key={progress}
                  initial={{ scale: 1.2, color: '#10B981' }}
                  animate={{ scale: 1, color: 'inherit' }}
                  transition={{ duration: 0.3 }}
                >
                  {progress}%
                </motion.span>
              </div>
              {/* Progress bar with animated fill */}
              <div className={`h-3 sm:h-4 w-full overflow-hidden rounded-full shadow-inner ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'
              }`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 shadow-lg"
                  initial={{ width: '30%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  {/* Shimmer effect on progress bar */}
                  <motion.div
                    className="h-full w-full bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative p-4 sm:p-6 text-center pb-20 sm:pb-8"
      >
        <div className={`text-xs sm:text-sm font-medium ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {/* Main footer line with better mobile layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-2">
            <div className="flex items-center gap-1">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex-shrink-0"
              >
                🐾
              </motion.span>
              <span className="whitespace-nowrap">Crafted with passion & pixels by</span>
            </div>
            <div className="flex items-center gap-1">
              <motion.a 
                href="https://erobert.se" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`font-bold transition-colors whitespace-nowrap ${
                  theme === 'dark' 
                    ? 'text-purple-400 hover:text-purple-300' 
                    : 'text-purple-600 hover:text-purple-500'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                LeonByte Design
              </motion.a>
              <motion.span
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="flex-shrink-0"
              >
                ⚡
              </motion.span>
            </div>
          </div>
          <div className="text-xs opacity-75 px-4">
            Where creativity meets code · Building digital experiences that matter
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App