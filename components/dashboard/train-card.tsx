"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { Brain as TrainIcon, ChevronDown, ChevronUp, Gauge, Clock, Paintbrush, Activity, Sparkles, ClipboardCheck, CircleCheck as CheckCircle, Pause, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Train } from '@/lib/types';

interface TrainCardProps {
  train: Train;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function TrainCard({ train, index, isExpanded, onToggle }: TrainCardProps) {
  const statusConfig = {
    Run: {
      color: 'bg-[#38B000]',
      textColor: 'text-[#38B000]',
      bgColor: 'bg-[#38B000]/20',
      borderColor: 'border-[#38B000]/40',
      icon: CheckCircle,
    },
    Standby: {
      color: 'bg-[#FFD60A]',
      textColor: 'text-[#FFD60A]',
      bgColor: 'bg-[#FFD60A]/20',
      borderColor: 'border-[#FFD60A]/40',
      icon: Pause,
    },
    Maintenance: {
      color: 'bg-[#FF4747]',
      textColor: 'text-[#FF4747]',
      bgColor: 'bg-[#FF4747]/20',
      borderColor: 'border-[#FF4747]/40',
      icon: Wrench,
    },
  };

  const config = statusConfig[train.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        className={`relative overflow-hidden border ${config.borderColor} ${config.bgColor} backdrop-blur-xl cursor-pointer transition-all duration-300 hover:shadow-xl rounded-xl hover:scale-105 hover:brightness-110`}
        onClick={onToggle}
      >
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className={`p-2 rounded-lg ${config.color} shadow-md`}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <TrainIcon className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white">{train.trainId}</h3>
                <Badge className={`${config.color} text-white border-0 mt-1 flex items-center gap-1.5`}>
                  <config.icon className="h-3.5 w-3.5" />
                  {train.status}
                </Badge>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-gray-300" />
            </motion.div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-300">
                <Gauge className="h-4 w-4" />
                Mileage
              </span>
              <span className="font-semibold text-white">{train.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4" />
                Branding Hours
              </span>
              <span className="font-semibold text-white">{train.brandingHours}h</span>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-white/20"
              >
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Detailed Status
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-300">
                      <Sparkles className="h-3 w-3" />
                      Fitness
                    </span>
                    <span className={`font-medium ${train.fitnessStatus.includes('Excellent') || train.fitnessStatus.includes('Good') ? 'text-[#38B000]' : 'text-[#FFD60A]'}`}>
                      {train.fitnessStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-300">
                      <ClipboardCheck className="h-3 w-3" />
                      Cleaning
                    </span>
                    <span className={`font-medium ${train.cleaningStatus === 'Clean' ? 'text-[#38B000]' : 'text-[#FFD60A]'}`}>
                      {train.cleaningStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-300">
                      <Paintbrush className="h-3 w-3" />
                      Branding
                    </span>
                    <span className={`font-medium ${train.brandingStatus === 'Complete' ? 'text-[#38B000]' : 'text-[#FFD60A]'}`}>
                      {train.brandingStatus}
                    </span>
                  </div>
                  {train.reasonNotes && (
                    <div className="mt-3 p-3 bg-black/30 rounded-lg border border-white/10">
                      <p className="text-xs text-gray-200">{train.reasonNotes}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-1 ${config.color}`}></div>
      </Card>
    </motion.div>
  );
}
