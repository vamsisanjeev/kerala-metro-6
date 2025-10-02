"use client"

import { motion } from 'framer-motion';
import { Plus, Trash2, Wrench, Sparkles, Paintbrush, ClipboardList, Megaphone, CircleCheck as CheckCircle, Clock, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react';
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
import type { JobCard, Train } from '@/lib/types';

interface JobCardTableProps {
  jobCards: JobCard[];
  trains: Train[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export function JobCardTable({ jobCards, trains, onAdd, onDelete }: JobCardTableProps) {
  const getTaskIcon = (taskType: string) => {
    switch (taskType) {
      case 'Maintenance':
        return <Wrench className="h-4 w-4 text-orange-400" />;
      case 'Cleaning':
        return <Sparkles className="h-4 w-4 text-cyan-400" />;
      case 'Branding':
        return <Megaphone className="h-4 w-4 text-purple-400" />;
      default:
        return <ClipboardList className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getPriorityIcon = (priority: string) => {
    return <AlertCircle className="h-3.5 w-3.5" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#38B000]/30 text-[#38B000] border-[#38B000]/50';
      case 'In Progress':
        return 'bg-[#FFD60A]/30 text-[#FFD60A] border-[#FFD60A]/50';
      case 'Pending':
        return 'bg-slate-500/30 text-slate-300 border-slate-500/50';
      default:
        return 'bg-slate-500/30 text-slate-300 border-slate-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-3.5 w-3.5" />;
      case 'In Progress':
        return <Clock className="h-3.5 w-3.5" />;
      case 'Pending':
        return <XCircle className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="border border-white/10 bg-[#1B263B]/90 backdrop-blur-xl overflow-hidden rounded-xl shadow-lg">
        <div className="p-6 border-b border-white/10 bg-[#1B263B]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Job Card Management</h2>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onAdd}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Job Card
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent bg-[#1B263B]">
                <TableHead className="text-white font-semibold">Job Card ID</TableHead>
                <TableHead className="text-white font-semibold">Train ID</TableHead>
                <TableHead className="text-white font-semibold">Task Type</TableHead>
                <TableHead className="text-white font-semibold">Priority</TableHead>
                <TableHead className="text-white font-semibold">Deadline</TableHead>
                <TableHead className="text-white font-semibold">Status</TableHead>
                <TableHead className="text-white font-semibold">Description</TableHead>
                <TableHead className="text-white font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobCards.map((jobCard, index) => (
                <motion.tr
                  key={jobCard.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-white/10 hover:bg-white/5 transition-colors ${index % 2 === 0 ? 'bg-[#243447]/60' : 'bg-[#2C3E50]/60'}`}
                >
                  <TableCell className="font-medium text-white">{jobCard.jobCardId}</TableCell>
                  <TableCell className="text-cyan-400 font-semibold">{jobCard.trainId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-gray-200">
                      {getTaskIcon(jobCard.taskType)}
                      <span>{jobCard.taskType}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getPriorityColor(jobCard.priority)} border flex items-center gap-1.5 w-fit`}>
                      {getPriorityIcon(jobCard.priority)}
                      {jobCard.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-200">
                    {new Date(jobCard.deadline).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(jobCard.status)} border flex items-center gap-1.5 w-fit`}>
                      {getStatusIcon(jobCard.status)}
                      {jobCard.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-200 max-w-xs truncate">
                    {jobCard.description}
                  </TableCell>
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(jobCard.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </motion.div>
  );
}
