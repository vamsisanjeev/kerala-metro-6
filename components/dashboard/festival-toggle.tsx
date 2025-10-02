"use client"

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useFestival } from '@/lib/festival-context'

export function FestivalToggle() {
  const { festivalMode, toggleFestivalMode } = useFestival()

  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl border shadow-lg transition-all duration-300"
      style={{
        background: festivalMode
          ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(234, 88, 12, 0.2) 100%)'
          : 'rgba(255, 255, 255, 0.05)',
        borderColor: festivalMode ? 'rgba(251, 146, 60, 0.4)' : 'rgba(255, 255, 255, 0.1)',
        boxShadow: festivalMode
          ? '0 8px 32px rgba(251, 146, 60, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      animate={{
        scale: festivalMode ? [1, 1.02, 1] : 1,
      }}
      transition={{
        duration: 2,
        repeat: festivalMode ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={{
          rotate: festivalMode ? [0, 10, -10, 0] : 0,
          scale: festivalMode ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 3,
          repeat: festivalMode ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <Sparkles
          className={`h-5 w-5 transition-colors duration-300 ${
            festivalMode ? 'text-orange-400' : 'text-gray-400'
          }`}
        />
      </motion.div>

      <div className="flex flex-col">
        <span
          className={`text-sm font-semibold transition-colors duration-300 ${
            festivalMode ? 'text-orange-200' : 'text-gray-300'
          }`}
        >
          Festival Mode
        </span>
        {festivalMode && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-orange-300"
          >
            Special scheduling active
          </motion.span>
        )}
      </div>

      <Switch
        checked={festivalMode}
        onCheckedChange={toggleFestivalMode}
        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-red-500"
      />
    </motion.div>
  )
}
