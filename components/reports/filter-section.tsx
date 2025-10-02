"use client"

import { motion } from 'framer-motion';
import { Filter, X, Brain as TrainIcon, Tag, TriangleAlert as AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { Train } from '@/lib/types';

interface FilterSectionProps {
  trains: Train[];
  selectedTrain: string;
  selectedTaskType: string;
  selectedPriority: string;
  onTrainChange: (value: string) => void;
  onTaskTypeChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onClearFilters: () => void;
}

export function FilterSection({
  trains,
  selectedTrain,
  selectedTaskType,
  selectedPriority,
  onTrainChange,
  onTaskTypeChange,
  onPriorityChange,
  onClearFilters,
}: FilterSectionProps) {
  const hasFilters = selectedTrain !== 'all' || selectedTaskType !== 'all' || selectedPriority !== 'all';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border border-white/10 bg-gradient-to-br from-[#131F30]/95 to-[#1B263B]/95 backdrop-blur-xl p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#4D96FF] to-[#1B65FF] shadow-md">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Filter Options</h3>
          </div>
          {hasFilters && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={onClearFilters}
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300 font-medium flex items-center gap-2">
              <TrainIcon className="h-4 w-4 text-blue-400" />
              Train
            </Label>
            <Select value={selectedTrain} onValueChange={onTrainChange}>
              <SelectTrigger className="w-full bg-[#1B263B] border-white/20 text-white hover:bg-[#1B263B]/80 transition-all">
                <SelectValue placeholder="All Trains" />
              </SelectTrigger>
              <SelectContent className="bg-[#1B263B] border-white/20">
                <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">
                  All Trains
                </SelectItem>
                {trains.map((train) => (
                  <SelectItem
                    key={train.trainId}
                    value={train.trainId}
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                  >
                    {train.trainId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 font-medium flex items-center gap-2">
              <Tag className="h-4 w-4 text-purple-400" />
              Task Type
            </Label>
            <Select value={selectedTaskType} onValueChange={onTaskTypeChange}>
              <SelectTrigger className="w-full bg-[#1B263B] border-white/20 text-white hover:bg-[#1B263B]/80 transition-all">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-[#1B263B] border-white/20">
                <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">
                  All Types
                </SelectItem>
                <SelectItem value="Maintenance" className="text-white hover:bg-white/10 focus:bg-white/10">
                  Maintenance
                </SelectItem>
                <SelectItem value="Cleaning" className="text-white hover:bg-white/10 focus:bg-white/10">
                  Cleaning
                </SelectItem>
                <SelectItem value="Branding" className="text-white hover:bg-white/10 focus:bg-white/10">
                  Branding
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              Priority
            </Label>
            <Select value={selectedPriority} onValueChange={onPriorityChange}>
              <SelectTrigger className="w-full bg-[#1B263B] border-white/20 text-white hover:bg-[#1B263B]/80 transition-all">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent className="bg-[#1B263B] border-white/20">
                <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">
                  All Priorities
                </SelectItem>
                <SelectItem value="High" className="text-white hover:bg-white/10 focus:bg-white/10">
                  High
                </SelectItem>
                <SelectItem value="Medium" className="text-white hover:bg-white/10 focus:bg-white/10">
                  Medium
                </SelectItem>
                <SelectItem value="Low" className="text-white hover:bg-white/10 focus:bg-white/10">
                  Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
