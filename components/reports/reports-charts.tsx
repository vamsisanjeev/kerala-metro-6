"use client"

import { motion } from 'framer-motion';
import { ChartBar as BarChartIcon, ChartPie as PieChartIcon, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { useFestival } from '@/lib/festival-context';

interface ReportsChartsProps {
  trains: Train[];
}

export function ReportsCharts({ trains }: ReportsChartsProps) {
  const { festivalMode } = useFestival();
  const mileageData = trains.map(train => ({
    name: train.trainId,
    mileage: train.mileage,
  })).sort((a, b) => b.mileage - a.mileage);

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

  const aiComparisonData = trains.map(train => {
    let aiSuggested: 'Run' | 'Standby' | 'Maintenance';

    if (train.mileage > 60000 || train.fitnessStatus.includes('Poor') || train.fitnessStatus.includes('Requires')) {
      aiSuggested = 'Maintenance';
    } else if (train.cleaningStatus.includes('Needs') || train.brandingStatus !== 'Complete') {
      aiSuggested = 'Standby';
    } else if (train.mileage < 50000 && train.fitnessStatus.includes('Excellent')) {
      aiSuggested = 'Run';
    } else {
      aiSuggested = train.status;
    }

    const statusToNumber = (status: string) => {
      switch (status) {
        case 'Run': return 3;
        case 'Standby': return 2;
        case 'Maintenance': return 1;
        default: return 0;
      }
    };

    return {
      name: train.trainId,
      actual: statusToNumber(train.status),
      aiSuggested: statusToNumber(aiSuggested),
    };
  }).slice(0, 8);

  const chartKey = JSON.stringify(trains.map(t => ({ id: t.trainId, status: t.status })));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-white/10 bg-[#1B263B]/90 backdrop-blur-xl p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
              <BarChartIcon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Train Mileage Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mileageData} key={`mileage-${chartKey}`}>
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
                animationDuration={1000}
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
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
              <PieChartIcon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Status Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart key={`status-${chartKey}`}>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
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
      </div>

      <Card
        className="border backdrop-blur-xl p-6 rounded-xl shadow-lg bg-[#1B263B]/90"
        style={{
          border: festivalMode
            ? '2px solid rgba(251, 146, 60, 0.4)'
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: festivalMode
            ? '0 0 20px rgba(251, 146, 60, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3)'
            : undefined,
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">AI Suggested vs Actual Status</h3>
            {festivalMode && (
              <p className="text-sm text-orange-300 mt-1">
                Festival demand: More trains allocated to RUN status
              </p>
            )}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={aiComparisonData} key={`comparison-${chartKey}`}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis
              dataKey="name"
              stroke="#F0F0F0"
              style={{ fontSize: '12px', fill: '#F0F0F0' }}
            />
            <YAxis
              stroke="#F0F0F0"
              style={{ fontSize: '12px', fill: '#F0F0F0' }}
              ticks={[1, 2, 3]}
              tickFormatter={(value) => {
                switch (value) {
                  case 1: return 'Maintenance';
                  case 2: return 'Standby';
                  case 3: return 'Run';
                  default: return '';
                }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1B263B',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number) => {
                const statusMap: { [key: number]: string } = {
                  1: 'Maintenance',
                  2: 'Standby',
                  3: 'Run',
                };
                return [statusMap[value] || 'Unknown', ''];
              }}
              labelStyle={{ color: '#F0F0F0' }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                color: '#F0F0F0',
              }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#4D96FF"
              strokeWidth={3}
              dot={{ fill: '#4D96FF', r: 5 }}
              activeDot={{ r: 7 }}
              name="Actual Status"
              animationDuration={1000}
              animationBegin={0}
            />
            <Line
              type="monotone"
              dataKey="aiSuggested"
              stroke="#FFD60A"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#FFD60A', r: 5 }}
              activeDot={{ r: 7 }}
              name="AI Suggested"
              animationDuration={1000}
              animationBegin={100}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
}
