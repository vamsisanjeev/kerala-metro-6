"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Station {
  id: string
  name: string
  position: number
  exiting: number
  boarding: number
}

const STATIONS: Station[] = [
  { id: 'aluva', name: 'Aluva', position: 0, exiting: 0, boarding: 0 },
  { id: 'pulinchodu', name: 'Pulinchodu', position: 1, exiting: 0, boarding: 0 },
  { id: 'companypady', name: 'Companypady', position: 2, exiting: 0, boarding: 0 },
  { id: 'ambattukavu', name: 'Ambattukavu', position: 3, exiting: 0, boarding: 0 },
  { id: 'muttom', name: 'Muttom', position: 4, exiting: 0, boarding: 0 },
  { id: 'kalamassery', name: 'Kalamassery', position: 5, exiting: 0, boarding: 0 },
]

const generatePassengerCount = () => Math.floor(Math.random() * 100) + 10

const getStationColor = (total: number) => {
  if (total > 70) return 'bg-red-500'
  if (total >= 40) return 'bg-orange-500'
  return 'bg-green-500'
}

export function TrainLineSimulation() {
  const [currentStation, setCurrentStation] = useState(0)
  const [stations, setStations] = useState(STATIONS)
  const [isMoving, setIsMoving] = useState(false)
  const [trainProgress, setTrainProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMoving) {
        setIsMoving(true)

        const nextStation = (currentStation + 1) % stations.length

        const duration = 2000
        const steps = 60
        const stepDuration = duration / steps
        let step = 0

        const progressInterval = setInterval(() => {
          step++
          setTrainProgress(step / steps)

          if (step >= steps) {
            clearInterval(progressInterval)
            setCurrentStation(nextStation)
            setTrainProgress(0)

            setStations(prev =>
              prev.map((station, idx) =>
                idx === nextStation
                  ? {
                      ...station,
                      exiting: generatePassengerCount(),
                      boarding: generatePassengerCount(),
                    }
                  : station
              )
            )

            setTimeout(() => {
              setIsMoving(false)
            }, 2000)
          }
        }, stepDuration)
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [currentStation, isMoving, stations.length])

  return (
    <Card className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-blue-400/30 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" className="drop-shadow-lg">
            <defs>
              <linearGradient id="headerTrain" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <rect x="2" y="8" width="28" height="16" rx="3" fill="url(#headerTrain)" />
            <rect x="6" y="11" width="6" height="7" rx="1" fill="white" opacity="0.9" />
            <rect x="14" y="11" width="6" height="7" rx="1" fill="white" opacity="0.9" />
            <rect x="22" y="11" width="6" height="7" rx="1" fill="white" opacity="0.9" />
            <circle cx="9" cy="26" r="2" fill="#1e293b" />
            <circle cx="23" cy="26" r="2" fill="#1e293b" />
          </svg>
          Live Train Simulation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative w-full overflow-x-auto pb-8">
          <div className="min-w-[800px] px-4">
            <div className="relative h-48 flex items-center">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-full shadow-lg shadow-blue-500/50" />

              {stations.map((station, index) => {
                const totalPassengers = station.exiting + station.boarding
                const isActive = currentStation === index && !isMoving

                return (
                  <div
                    key={station.id}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `${(index / (stations.length - 1)) * 100}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <AnimatePresence>
                      {isActive && totalPassengers > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute -top-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-xl"
                        >
                          <div className="flex flex-col gap-1 text-xs">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: "spring" }}
                              className="flex items-center gap-2 text-red-300"
                            >
                              <ArrowDown className="h-4 w-4" />
                              <span className="font-semibold">{station.exiting}</span>
                            </motion.div>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.4, type: "spring" }}
                              className="flex items-center gap-2 text-green-300"
                            >
                              <ArrowUp className="h-4 w-4" />
                              <span className="font-semibold">{station.boarding}</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      animate={{
                        scale: isActive ? 1.3 : 1,
                        boxShadow: isActive
                          ? '0 0 20px rgba(59, 130, 246, 0.8)'
                          : '0 0 10px rgba(59, 130, 246, 0.3)',
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-6 h-6 rounded-full border-4 border-white shadow-lg ${
                        totalPassengers > 0 ? getStationColor(totalPassengers) : 'bg-green-500'
                      } z-10`}
                    />

                    <div className="mt-3 text-center">
                      <motion.p
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          color: isActive ? '#ffffff' : '#cbd5e1',
                        }}
                        className="text-xs font-semibold whitespace-nowrap"
                      >
                        {station.name}
                      </motion.p>
                    </div>
                  </div>
                )
              })}

              <motion.div
                className="absolute top-1/2"
                initial={false}
                animate={{
                  left: `${
                    ((currentStation + trainProgress) / (stations.length - 1)) * 100
                  }%`,
                }}
                transition={{
                  duration: 0.05,
                  ease: "linear",
                }}
                style={{
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <motion.svg
                  width="80"
                  height="50"
                  viewBox="0 0 80 50"
                  className="drop-shadow-2xl"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <defs>
                    <linearGradient id="trainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <rect
                    x="5"
                    y="12"
                    width="70"
                    height="26"
                    rx="4"
                    fill="url(#trainGradient)"
                    filter="url(#glow)"
                  />
                  <rect x="12" y="18" width="12" height="12" rx="1.5" fill="white" opacity="0.95" />
                  <rect x="28" y="18" width="12" height="12" rx="1.5" fill="white" opacity="0.95" />
                  <rect x="44" y="18" width="12" height="12" rx="1.5" fill="white" opacity="0.95" />
                  <rect x="60" y="18" width="10" height="12" rx="1.5" fill="white" opacity="0.95" />
                  <circle cx="18" cy="42" r="3.5" fill="#0f172a" />
                  <circle cx="32" cy="42" r="3.5" fill="#0f172a" />
                  <circle cx="48" cy="42" r="3.5" fill="#0f172a" />
                  <circle cx="62" cy="42" r="3.5" fill="#0f172a" />
                  <path d="M5 12 L0 7 L10 7 Z" fill="url(#trainGradient)" />
                  <rect x="35" y="32" width="10" height="4" rx="1" fill="#fbbf24" opacity="0.9" />
                </motion.svg>
              </motion.div>
            </div>

            <div className="mt-8 flex justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg" />
                <span className="text-sm text-slate-300">Low (&lt;40)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500 shadow-lg" />
                <span className="text-sm text-slate-300">Medium (40-70)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg" />
                <span className="text-sm text-slate-300">High (&gt;70)</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-slate-400">
                {isMoving
                  ? 'Train in transit...'
                  : `Train stopped at ${stations[currentStation].name}`}
              </p>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
