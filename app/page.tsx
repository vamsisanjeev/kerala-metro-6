"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Lock, Eye, EyeOff, Loader as Loader2, CircleAlert as AlertCircle, CircleCheck as CheckCircle, ArrowRight, CircleHelp as HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ type: 'error' | 'success'; message: string } | null>(null)

  const showToast = (type: 'error' | 'success', message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  const validateFields = () => {
    let isValid = true

    if (!email.trim()) {
      setEmailError('Email or username is required')
      isValid = false
    } else {
      setEmailError('')
    }

    if (!password.trim()) {
      setPasswordError('Password is required')
      isValid = false
    } else {
      setPasswordError('')
    }

    return isValid
  }

  const handleLogin = async () => {
    if (!validateFields()) {
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      if (email === 'supervisor' && password === '12345') {
        showToast('success', 'Login successful! Redirecting...')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        setIsLoading(false)
        showToast('error', 'Invalid credentials. Please try again.')
      }
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-violet-900">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -100, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -100, x: '-50%' }}
            className="fixed left-1/2 top-0 z-50 flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 px-6 py-4 shadow-2xl backdrop-blur-xl"
          >
            {toast.type === 'error' ? (
              <AlertCircle className="h-5 w-5 text-red-400" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-400" />
            )}
            <p className={`font-medium ${toast.type === 'error' ? 'text-red-200' : 'text-green-200'}`}>
              {toast.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.svg
          className="absolute left-[10%] top-[20%]"
          width="240"
          height="100"
          viewBox="0 0 240 100"
          animate={{
            x: [-30, 30, -30],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <defs>
            <linearGradient id="bg-train-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#c4b5fd" />
            </linearGradient>
          </defs>
          <rect x="15" y="25" width="210" height="50" rx="10" fill="url(#bg-train-1)" opacity="0.7" />
          <rect x="30" y="35" width="35" height="30" rx="3" fill="white" opacity="0.8" />
          <rect x="75" y="35" width="35" height="30" rx="3" fill="white" opacity="0.8" />
          <rect x="120" y="35" width="35" height="30" rx="3" fill="white" opacity="0.8" />
          <rect x="165" y="35" width="35" height="30" rx="3" fill="white" opacity="0.8" />
          <circle cx="40" cy="82" r="7" fill="#1e293b" />
          <circle cx="70" cy="82" r="7" fill="#1e293b" />
          <circle cx="170" cy="82" r="7" fill="#1e293b" />
          <circle cx="200" cy="82" r="7" fill="#1e293b" />
          <path d="M15 25 L5 15 L25 15 Z" fill="url(#bg-train-1)" opacity="0.7" />
        </motion.svg>

        <motion.svg
          className="absolute right-[15%] top-[60%]"
          width="240"
          height="100"
          viewBox="0 0 240 100"
          animate={{
            x: [30, -30, 30],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <defs>
            <linearGradient id="bg-train-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
          </defs>
          <rect x="15" y="25" width="210" height="50" rx="10" fill="url(#bg-train-2)" opacity="0.5" />
          <rect x="30" y="35" width="35" height="30" rx="3" fill="white" opacity="0.7" />
          <rect x="75" y="35" width="35" height="30" rx="3" fill="white" opacity="0.7" />
          <rect x="120" y="35" width="35" height="30" rx="3" fill="white" opacity="0.7" />
          <rect x="165" y="35" width="35" height="30" rx="3" fill="white" opacity="0.7" />
          <circle cx="40" cy="82" r="7" fill="#1e293b" />
          <circle cx="70" cy="82" r="7" fill="#1e293b" />
          <circle cx="170" cy="82" r="7" fill="#1e293b" />
          <circle cx="200" cy="82" r="7" fill="#1e293b" />
        </motion.svg>

        <motion.svg
          className="absolute left-[60%] top-[35%]"
          width="200"
          height="90"
          viewBox="0 0 200 90"
          animate={{
            x: [-25, 25, -25],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          <rect x="10" y="20" width="180" height="45" rx="8" fill="white" opacity="0.3" />
          <rect x="25" y="30" width="30" height="25" rx="2" fill="#3b82f6" opacity="0.6" />
          <rect x="65" y="30" width="30" height="25" rx="2" fill="#3b82f6" opacity="0.6" />
          <rect x="105" y="30" width="30" height="25" rx="2" fill="#3b82f6" opacity="0.6" />
          <rect x="145" y="30" width="30" height="25" rx="2" fill="#3b82f6" opacity="0.6" />
          <circle cx="30" cy="72" r="6" fill="#334155" />
          <circle cx="55" cy="72" r="6" fill="#334155" />
          <circle cx="145" cy="72" r="6" fill="#334155" />
          <circle cx="170" cy="72" r="6" fill="#334155" />
        </motion.svg>
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            bounce: 0.4,
            duration: 1.2
          }}
          className="w-full max-w-md"
        >
          <motion.div
            className="relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10"
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              className="mb-6 flex justify-center"
            >
              <div className="relative">
                <svg width="140" height="90" viewBox="0 0 140 90" className="drop-shadow-2xl">
                  <defs>
                    <linearGradient id="cardTrainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                  <rect x="8" y="20" width="124" height="45" rx="8" fill="url(#cardTrainGradient)" />
                  <rect x="20" y="28" width="22" height="20" rx="2" fill="white" opacity="0.95" />
                  <rect x="48" y="28" width="22" height="20" rx="2" fill="white" opacity="0.95" />
                  <rect x="76" y="28" width="22" height="20" rx="2" fill="white" opacity="0.95" />
                  <rect x="104" y="28" width="20" height="20" rx="2" fill="white" opacity="0.95" />
                  <circle cx="25" cy="72" r="7" fill="#0f172a" />
                  <circle cx="48" cy="72" r="7" fill="#0f172a" />
                  <circle cx="92" cy="72" r="7" fill="#0f172a" />
                  <circle cx="115" cy="72" r="7" fill="#0f172a" />
                  <path d="M8 20 L0 12 L16 12 Z" fill="url(#cardTrainGradient)" />
                  <rect x="60" y="52" width="20" height="8" rx="2" fill="#fbbf24" opacity="0.9" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 text-center"
            >
              <h1 className="mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-violet-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                Kochi Metro
              </h1>
              <p className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-lg font-semibold text-transparent">
                Smart Induction Planner
              </p>
              <p className="mt-2 text-sm text-white/70">
                Sign in to continue
              </p>
            </motion.div>

            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
              >
                <div className="relative group">
                  <User className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${
                    emailError ? 'text-red-400' : 'text-white/60 group-focus-within:text-blue-300'
                  }`} />
                  <Input
                    type="text"
                    placeholder="Email or Username"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailError('')
                    }}
                    onKeyPress={handleKeyPress}
                    className={`h-12 border-white/20 bg-white/10 pl-11 text-white placeholder:text-white/50 transition-all duration-300 ${
                      emailError
                        ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/30'
                        : 'focus:border-blue-400/50 focus:bg-white/15 focus:shadow-lg focus:shadow-blue-500/20 focus:ring-2 focus:ring-blue-400/30'
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {emailError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 text-sm text-red-300"
                    >
                      {emailError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85, type: "spring", stiffness: 100 }}
              >
                <div className="relative group">
                  <Lock className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${
                    passwordError ? 'text-red-400' : 'text-white/60 group-focus-within:text-purple-300'
                  }`} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError('')
                    }}
                    onKeyPress={handleKeyPress}
                    className={`h-12 border-white/20 bg-white/10 pl-11 pr-11 text-white placeholder:text-white/50 transition-all duration-300 ${
                      passwordError
                        ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/30'
                        : 'focus:border-purple-400/50 focus:bg-white/15 focus:shadow-lg focus:shadow-purple-500/20 focus:ring-2 focus:ring-purple-400/30'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition-all hover:scale-110 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 text-sm text-red-300"
                    >
                      {passwordError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-end"
              >
                <a
                  href="#"
                  className="text-sm text-white/70 transition-all hover:text-white hover:underline hover:underline-offset-4 flex items-center gap-1 group"
                >
                  <HelpCircle className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                  Forgot Password?
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <motion.div
                  whileHover={!isLoading ? { scale: 1.03, boxShadow: "0 20px 40px -12px rgba(139, 92, 246, 0.6)" } : {}}
                  whileTap={!isLoading ? { scale: 0.97 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="h-13 w-full bg-gradient-to-r from-blue-500 via-purple-600 to-violet-600 text-lg font-semibold text-white shadow-xl shadow-purple-500/30 transition-all hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Logging in...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{
                            opacity: [1, 0.8, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          Login
                        </motion.span>
                        <motion.div
                          animate={{
                            x: [0, 5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </span>
                    )}
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.25 }}
                className="text-center"
              >
                <p className="text-sm text-white/60">
                  Don't have an account?{' '}
                  <a
                    href="#"
                    className="font-medium text-blue-300 transition-all hover:text-blue-200 hover:underline hover:underline-offset-4"
                  >
                    Sign Up
                  </a>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="rounded-lg border border-blue-400/30 bg-blue-500/10 p-3 text-center"
              >
                <p className="text-xs text-blue-200">
                  Demo Credentials: supervisor / 12345
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 text-center text-sm text-white/50"
          >
            <p className="font-medium">
              Smart India Hackathon 2025 | Team Garuda
            </p>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  )
}
