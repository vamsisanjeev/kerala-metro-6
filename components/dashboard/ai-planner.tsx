"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CirclePlay as PlayCircle, Brain, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Train, AIAllocation } from '@/lib/types';
import { useFestival } from '@/lib/festival-context';

interface AIPlannerProps {
  trains: Train[];
  autoRun?: boolean;
}

export function AIPlanner({ trains, autoRun = false }: AIPlannerProps) {
  const { festivalMode } = useFestival();
  const [isRunning, setIsRunning] = useState(false);
  const [allocations, setAllocations] = useState<AIAllocation[]>([]);

  const runAIPlanner = () => {
    setIsRunning(true);

    setTimeout(() => {
      const newAllocations: AIAllocation[] = trains.map(train => {
        let suggestedStatus: 'Run' | 'Standby' | 'Maintenance';
        let confidence: number;

        if (festivalMode) {
          if (train.mileage > 70000 || train.fitnessStatus.includes('Critical')) {
            suggestedStatus = 'Maintenance';
            confidence = 96;
          } else if (train.fitnessStatus.includes('Poor') && train.mileage > 65000) {
            suggestedStatus = 'Maintenance';
            confidence = 85;
          } else if (train.cleaningStatus.includes('Needs') && train.mileage < 55000) {
            suggestedStatus = 'Run';
            confidence = 88;
          } else if (train.status === 'Standby' && train.mileage < 60000) {
            suggestedStatus = 'Run';
            confidence = 92;
          } else if (train.mileage < 50000 && train.fitnessStatus.includes('Excellent')) {
            suggestedStatus = 'Run';
            confidence = 95;
          } else if (train.status === 'Run') {
            suggestedStatus = 'Run';
            confidence = 90;
          } else {
            suggestedStatus = 'Run';
            confidence = 85;
          }
        } else {
          if (train.mileage > 60000) {
            suggestedStatus = 'Maintenance';
            confidence = 95;
          } else if (train.fitnessStatus.includes('Poor') || train.fitnessStatus.includes('Requires')) {
            suggestedStatus = 'Maintenance';
            confidence = 88;
          } else if (train.cleaningStatus.includes('Needs') || train.brandingStatus !== 'Complete') {
            suggestedStatus = 'Standby';
            confidence = 82;
          } else if (train.mileage < 50000 && train.fitnessStatus.includes('Excellent')) {
            suggestedStatus = 'Run';
            confidence = 92;
          } else if (train.status === 'Run') {
            suggestedStatus = 'Run';
            confidence = 85;
          } else {
            suggestedStatus = 'Standby';
            confidence = 75;
          }
        }

        return {
          trainId: train.trainId,
          currentStatus: train.status,
          suggestedStatus,
          confidence,
        };
      });

      setAllocations(newAllocations);
      setIsRunning(false);
    }, 2000);
  };

  useEffect(() => {
    if (autoRun) {
      runAIPlanner();
    }
  }, [trains, autoRun]);

  useEffect(() => {
    if (allocations.length > 0) {
      runAIPlanner();
    }
  }, [festivalMode]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Run':
        return 'bg-[#38B000]/30 text-white border-[#38B000]/50';
      case 'Standby':
        return 'bg-[#FFD60A]/30 text-white border-[#FFD60A]/50';
      case 'Maintenance':
        return 'bg-[#FF4747]/30 text-white border-[#FF4747]/50';
      default:
        return 'bg-slate-500/30 text-slate-300 border-slate-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Run':
        return <CheckCircle className="h-3.5 w-3.5" />;
      case 'Standby':
        return <AlertCircle className="h-3.5 w-3.5" />;
      case 'Maintenance':
        return <Wrench className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border border-white/10 bg-gradient-to-br from-[#131F30]/95 to-[#1B263B]/95 backdrop-blur-xl overflow-hidden rounded-xl shadow-lg">
        <div className="p-6 border-b border-white/10 bg-[#1B263B]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#4D96FF] to-[#1B65FF] shadow-md">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Allocation Planner</h2>
                <p className="text-sm text-gray-300">Intelligent train status recommendations</p>
              </div>
            </div>
            <Button
              onClick={runAIPlanner}
              disabled={isRunning}
              className="bg-gradient-to-r from-[#4D96FF] to-[#1B65FF] hover:from-[#5FA5FF] hover:to-[#2C75FF] text-white border-0 relative overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              {isRunning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                  </motion.div>
                  Analyzing...
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Run AI Planner
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="p-6 bg-[#131F30]/50">
          {allocations.length === 0 ? (
            <div className="text-center py-12">
              <Brain className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Click "Run AI Planner" to generate intelligent recommendations</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent bg-[#1B263B]">
                    <TableHead className="text-white font-semibold">Train ID</TableHead>
                    <TableHead className="text-white font-semibold">Current Status</TableHead>
                    <TableHead className="text-white font-semibold">Suggested Status</TableHead>
                    <TableHead className="text-white font-semibold">Confidence</TableHead>
                    <TableHead className="text-white font-semibold">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {allocations.map((allocation, index) => (
                      <motion.tr
                        key={allocation.trainId}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-white/10 hover:bg-white/5 transition-colors ${index % 2 === 0 ? 'bg-[#1B263B]/80' : 'bg-[#131F30]/80'}`}
                      >
                        <TableCell className="font-semibold text-cyan-400">
                          {allocation.trainId}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(allocation.currentStatus)} border flex items-center gap-1.5 w-fit`}>
                            {getStatusIcon(allocation.currentStatus)}
                            {allocation.currentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <motion.div
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          >
                            <Badge className={`${getStatusColor(allocation.suggestedStatus)} border shadow-lg flex items-center gap-1.5 w-fit`}>
                              {getStatusIcon(allocation.suggestedStatus)}
                              {allocation.suggestedStatus}
                            </Badge>
                          </motion.div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${allocation.confidence}%` }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                                className="h-full bg-gradient-to-r from-[#4D96FF] to-[#1B65FF]"
                              />
                            </div>
                            <span className="text-white font-medium">{allocation.confidence}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {allocation.currentStatus !== allocation.suggestedStatus ? (
                            <Badge className="bg-orange-500/30 text-white border-orange-500/50 border font-medium">
                              Recommended
                            </Badge>
                          ) : (
                            <Badge className="bg-[#38B000]/30 text-white border-[#38B000]/50 border font-medium">
                              No Change
                            </Badge>
                          )}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
