"use client"

import { motion } from 'framer-motion';
import { Brain as Train, Activity, Clock, Wrench, ClipboardList, Play, Pause } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useFestival } from '@/lib/festival-context';

interface SummaryCardsProps {
  stats: {
    totalTrains: number;
    activeTrains: number;
    standbyTrains: number;
    maintenanceTrains: number;
    pendingJobCards: number;
  };
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  const { festivalMode } = useFestival();
  const cards = [
    {
      title: 'Total Trains',
      value: stats.totalTrains,
      icon: Train,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-[#1E3A5F]/90',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    },
    {
      title: 'Active Trains',
      value: stats.activeTrains,
      icon: Play,
      gradient: 'from-[#38B000] to-[#2D8C00]',
      bgColor: 'bg-[#38B000]/20',
      iconBg: 'bg-[#38B000]',
    },
    {
      title: 'Standby Trains',
      value: stats.standbyTrains,
      icon: Pause,
      gradient: 'from-[#FFD60A] to-[#E6C200]',
      bgColor: 'bg-[#FFD60A]/20',
      iconBg: 'bg-[#FFD60A]',
    },
    {
      title: 'Maintenance',
      value: stats.maintenanceTrains,
      icon: Wrench,
      gradient: 'from-[#FF4747] to-[#E63939]',
      bgColor: 'bg-[#FF4747]/20',
      iconBg: 'bg-[#FF4747]',
    },
    {
      title: 'Pending Job Cards',
      value: stats.pendingJobCards,
      icon: ClipboardList,
      gradient: 'from-slate-600 to-slate-700',
      bgColor: 'bg-slate-700/40',
      iconBg: 'bg-gradient-to-br from-slate-600 to-slate-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Card
            className={`relative overflow-hidden backdrop-blur-xl p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:brightness-110 ${card.bgColor}`}
            style={{
              border: festivalMode
                ? '2px solid rgba(251, 146, 60, 0.4)'
                : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: festivalMode
                ? '0 0 20px rgba(251, 146, 60, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3)'
                : undefined,
            }}
          >
            {festivalMode && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 0%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            )}
            <div className="relative z-10">
              <motion.div
                className={`inline-flex p-3 rounded-xl ${card.iconBg} mb-4 shadow-md`}
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <card.icon className="h-6 w-6 text-white" />
              </motion.div>
              <h3 className="text-sm font-medium text-gray-200 mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
            <div className={`absolute top-0 right-0 w-32 h-32 ${card.iconBg} opacity-10 rounded-full -mr-16 -mt-16`}></div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
