"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface FestivalContextType {
  festivalMode: boolean
  toggleFestivalMode: () => void
}

const FestivalContext = createContext<FestivalContextType | undefined>(undefined)

export function FestivalProvider({ children }: { children: ReactNode }) {
  const [festivalMode, setFestivalMode] = useState(false)

  const toggleFestivalMode = () => {
    setFestivalMode(prev => !prev)
  }

  return (
    <FestivalContext.Provider value={{ festivalMode, toggleFestivalMode }}>
      {children}
    </FestivalContext.Provider>
  )
}

export function useFestival() {
  const context = useContext(FestivalContext)
  if (context === undefined) {
    throw new Error('useFestival must be used within a FestivalProvider')
  }
  return context
}
