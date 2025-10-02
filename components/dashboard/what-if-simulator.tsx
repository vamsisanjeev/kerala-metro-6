"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, RotateCcw, Sparkles, TriangleAlert as AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { Train } from '@/lib/types';

interface WhatIfSimulatorProps {
  trains: Train[];
  onSimulationChange: (trainId: string, overrides: Partial<Train>) => void;
  onReset: () => void;
}

interface SimulationState {
  fitnessFailure: boolean;
  cleaningNotDone: boolean;
  jobCardPending: boolean;
}

export function WhatIfSimulator({ trains, onSimulationChange, onReset }: WhatIfSimulatorProps) {
  const [selectedTrainId, setSelectedTrainId] = useState<string>('');
  const [simulation, setSimulation] = useState<SimulationState>({
    fitnessFailure: false,
    cleaningNotDone: false,
    jobCardPending: false,
  });
  const [isSimulating, setIsSimulating] = useState(false);

  const selectedTrain = trains.find(t => t.trainId === selectedTrainId);

  const handleTrainSelect = (trainId: string) => {
    setSelectedTrainId(trainId);
    setSimulation({
      fitnessFailure: false,
      cleaningNotDone: false,
      jobCardPending: false,
    });
  };

  const handleToggle = (key: keyof SimulationState) => {
    setSimulation(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const applySimulation = () => {
    if (!selectedTrainId) return;

    setIsSimulating(true);

    setTimeout(() => {
      const overrides: Partial<Train> = {};

      if (simulation.fitnessFailure) {
        overrides.fitnessStatus = 'Poor';
      }

      if (simulation.cleaningNotDone) {
        overrides.cleaningStatus = 'Needs Cleaning';
      }

      if (simulation.jobCardPending) {
        overrides.brandingStatus = 'Pending';
      }

      onSimulationChange(selectedTrainId, overrides);
      setIsSimulating(false);
    }, 1000);
  };

  const handleReset = () => {
    setSimulation({
      fitnessFailure: false,
      cleaningNotDone: false,
      jobCardPending: false,
    });
    setSelectedTrainId('');
    onReset();
  };

  const hasSimulationActive = simulation.fitnessFailure || simulation.cleaningNotDone || simulation.jobCardPending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="border border-white/10 bg-gradient-to-br from-[#131F30]/95 to-[#1B263B]/95 backdrop-blur-xl overflow-hidden rounded-xl shadow-lg">
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#1B263B] to-[#162030]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#FFD60A] to-[#FFA500] shadow-md">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">What-if Simulator</h2>
                <p className="text-sm text-gray-300">Test different train conditions and see AI recommendations</p>
              </div>
            </div>
            {hasSimulationActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Badge className="bg-[#FFD60A]/30 text-white border-[#FFD60A]/50 border">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Simulation Active
                </Badge>
              </motion.div>
            )}
          </div>
        </div>

        <div className="p-6 bg-[#131F30]/50 space-y-6">
          <div className="space-y-3">
            <Label className="text-white font-semibold text-lg">Select Train</Label>
            <Select value={selectedTrainId} onValueChange={handleTrainSelect}>
              <SelectTrigger className="w-full bg-[#1B263B] border-white/20 text-white hover:bg-[#1B263B]/80 transition-all">
                <SelectValue placeholder="Choose a train to simulate..." />
              </SelectTrigger>
              <SelectContent className="bg-[#1B263B] border-white/20">
                {trains.map((train) => (
                  <SelectItem
                    key={train.trainId}
                    value={train.trainId}
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold">{train.trainId}</span>
                      <Badge className={`
                        ${train.status === 'Run' ? 'bg-[#38B000]/30 text-white border-[#38B000]/50' : ''}
                        ${train.status === 'Standby' ? 'bg-[#FFD60A]/30 text-white border-[#FFD60A]/50' : ''}
                        ${train.status === 'Maintenance' ? 'bg-[#FF4747]/30 text-white border-[#FF4747]/50' : ''}
                        border text-xs
                      `}>
                        {train.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <AnimatePresence>
            {selectedTrain && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <div className="p-4 rounded-lg bg-[#1B263B]/60 border border-white/10">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    Current Train Status
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Fitness:</span>
                      <span className="text-white ml-2 font-medium">{selectedTrain.fitnessStatus}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Cleaning:</span>
                      <span className="text-white ml-2 font-medium">{selectedTrain.cleaningStatus}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Branding:</span>
                      <span className="text-white ml-2 font-medium">{selectedTrain.brandingStatus}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Mileage:</span>
                      <span className="text-white ml-2 font-medium">{selectedTrain.mileage.toLocaleString()} km</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg">Simulation Options</h3>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#1B263B] border border-white/10 hover:border-[#FF4747]/50 transition-all cursor-pointer"
                    onClick={() => handleToggle('fitnessFailure')}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        simulation.fitnessFailure ? 'bg-[#FF4747]/20' : 'bg-white/5'
                      }`}>
                        <AlertTriangle className={`h-5 w-5 ${
                          simulation.fitnessFailure ? 'text-[#FF4747]' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <Label className="text-white font-medium cursor-pointer">Fitness Failure</Label>
                        <p className="text-xs text-gray-400 mt-0.5">Set train fitness status to Poor</p>
                      </div>
                    </div>
                    <Switch
                      checked={simulation.fitnessFailure}
                      onCheckedChange={() => handleToggle('fitnessFailure')}
                      className="data-[state=checked]:bg-[#FF4747]"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#1B263B] border border-white/10 hover:border-[#FFD60A]/50 transition-all cursor-pointer"
                    onClick={() => handleToggle('cleaningNotDone')}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        simulation.cleaningNotDone ? 'bg-[#FFD60A]/20' : 'bg-white/5'
                      }`}>
                        <AlertTriangle className={`h-5 w-5 ${
                          simulation.cleaningNotDone ? 'text-[#FFD60A]' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <Label className="text-white font-medium cursor-pointer">Cleaning Not Done</Label>
                        <p className="text-xs text-gray-400 mt-0.5">Mark train as needing cleaning</p>
                      </div>
                    </div>
                    <Switch
                      checked={simulation.cleaningNotDone}
                      onCheckedChange={() => handleToggle('cleaningNotDone')}
                      className="data-[state=checked]:bg-[#FFD60A]"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#1B263B] border border-white/10 hover:border-[#4D96FF]/50 transition-all cursor-pointer"
                    onClick={() => handleToggle('jobCardPending')}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        simulation.jobCardPending ? 'bg-[#4D96FF]/20' : 'bg-white/5'
                      }`}>
                        <AlertTriangle className={`h-5 w-5 ${
                          simulation.jobCardPending ? 'text-[#4D96FF]' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <Label className="text-white font-medium cursor-pointer">Job Card Pending</Label>
                        <p className="text-xs text-gray-400 mt-0.5">Set branding status to Pending</p>
                      </div>
                    </div>
                    <Switch
                      checked={simulation.jobCardPending}
                      onCheckedChange={() => handleToggle('jobCardPending')}
                      className="data-[state=checked]:bg-[#4D96FF]"
                    />
                  </motion.div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={applySimulation}
                      disabled={!hasSimulationActive || isSimulating}
                      className="w-full bg-gradient-to-r from-[#4D96FF] to-[#1B65FF] hover:from-[#5FA5FF] hover:to-[#2C75FF] text-white border-0 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                    >
                      {isSimulating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                          </motion.div>
                          Applying...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Apply Simulation
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedTrainId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Zap className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Select a train to start simulating</p>
              <p className="text-gray-500 text-sm mt-2">Choose different conditions to see how AI recommendations change</p>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
