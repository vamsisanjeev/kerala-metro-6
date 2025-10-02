"use client"

import { motion } from 'framer-motion';
import { ChartBar as BarChart3, ChartPie as PieChart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import type { Train } from '@/lib/types';

interface ChartsSectionProps {
  trains: Train[];
}

export function ChartsSection({ trains }: ChartsSectionProps) {
  const mileageData = trains.map(train => ({
    name: train.trainId,
    mileage: train.mileage,
  }));

  const statusData = [
    {
      name: 'Run',
      value: trains.filter(t => t.status === 'Run').length,
      color: '#38B000',
    },
    {
      name: 'Standby',
      value: trains.filter(t => t.status === 'Standby').length,
      color: '#FFD60A',
    },
    {
      name: 'Maintenance',
      value: trains.filter(t => t.status === 'Maintenance').length,
      color: '#FF4747',
    },
  ];

  const chartKey = JSON.stringify(trains.map(t => ({ id: t.trainId, status: t.status, mileage: t.mileage, fitness: t.fitnessStatus, cleaning: t.cleaningStatus })));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <Card className="border border-white/10 bg-[#1B263B]/90 backdrop-blur-xl p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Train Mileage Distribution</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mileageData} key={`bar-${chartKey}`}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis
              dataKey="name"
              stroke="#F0F0F0"
              style={{ fontSize: '12px', fill: '#F0F0F0' }}
            />
            <YAxis
              stroke="#F0F0F0"
              style={{ fontSize: '12px', fill: '#F0F0F0' }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1B263B',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number) => [`${value.toLocaleString()} km`, 'Mileage']}
              labelStyle={{ color: '#F0F0F0' }}
            />
            <Bar
              dataKey="mileage"
              fill="url(#colorGradient)"
              radius={[8, 8, 0, 0]}
              animationDuration={800}
              animationBegin={0}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4D96FF" stopOpacity={1} />
                <stop offset="100%" stopColor="#1B65FF" stopOpacity={0.9} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="border border-white/10 bg-[#1B263B]/90 backdrop-blur-xl p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 shadow-md">
            <PieChart className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Status Distribution</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart key={`pie-${chartKey}`}>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              animationDuration={800}
              animationBegin={0}
              style={{ fontSize: '14px', fontWeight: '600' }}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1B263B',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
              }}
              labelStyle={{ color: '#F0F0F0' }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                color: '#F0F0F0',
              }}
              iconType="circle"
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
}
