"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Calendar, CircleAlert as AlertCircle, Wrench, Sparkles, Megaphone, CircleCheck as CheckCircle, Clock, Circle as XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { JobCard } from '@/lib/types';

interface JobCardTimelineProps {
  jobCards: JobCard[];
}

export function JobCardTimeline({ jobCards }: JobCardTimelineProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#38B000]/30 text-white border-[#38B000]/50';
      case 'In Progress':
        return 'bg-[#FFD60A]/30 text-white border-[#FFD60A]/50';
      case 'Pending':
        return 'bg-[#FF4747]/30 text-white border-[#FF4747]/50';
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-[#FF4747]/30 text-white border-[#FF4747]/50';
      case 'Medium':
        return 'bg-[#FFD60A]/30 text-white border-[#FFD60A]/50';
      case 'Low':
        return 'bg-[#38B000]/30 text-white border-[#38B000]/50';
      default:
        return 'bg-slate-500/30 text-slate-300 border-slate-500/50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return <AlertCircle className="h-3.5 w-3.5" />;
      case 'Medium':
        return <AlertCircle className="h-3.5 w-3.5" />;
      case 'Low':
        return <AlertCircle className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  const getTaskTypeIcon = (taskType: string) => {
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

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="border border-white/10 bg-gradient-to-br from-[#131F30]/95 to-[#1B263B]/95 backdrop-blur-xl overflow-hidden rounded-xl shadow-lg">
        <div className="p-6 border-b border-white/10 bg-[#1B263B]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#4D96FF] to-[#1B65FF] shadow-md">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Job Card Timeline</h2>
              <p className="text-sm text-gray-300">Track all maintenance and service tasks</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#131F30]/50">
          {jobCards.length === 0 ? (
            <div className="text-center py-12">
              <ClipboardList className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">No job cards found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : (
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {jobCards.map((jobCard, index) => {
                      const daysUntil = getDaysUntilDeadline(jobCard.deadline);
                      const isUrgent = daysUntil <= 2 && jobCard.status !== 'Completed';

                      return (
                        <motion.tr
                          key={jobCard.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className={`border-white/10 hover:bg-white/5 transition-colors ${
                            index % 2 === 0 ? 'bg-[#1B263B]/80' : 'bg-[#131F30]/80'
                          }`}
                        >
                          <TableCell className="font-semibold text-cyan-400">
                            {jobCard.jobCardId}
                          </TableCell>
                          <TableCell className="font-medium text-white">
                            {jobCard.trainId}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 15 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {getTaskTypeIcon(jobCard.taskType)}
                              </motion.div>
                              <span className="text-white font-medium">{jobCard.taskType}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getPriorityColor(jobCard.priority)} border flex items-center gap-1.5 w-fit`}>
                              {getPriorityIcon(jobCard.priority)}
                              {jobCard.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {isUrgent && (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  <AlertCircle className="h-4 w-4 text-[#FF4747]" />
                                </motion.div>
                              )}
                              <div>
                                <div className="text-white font-medium flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(jobCard.deadline).toLocaleDateString()}
                                </div>
                                <div className={`text-xs ${
                                  isUrgent ? 'text-[#FF4747]' : daysUntil <= 5 ? 'text-[#FFD60A]' : 'text-gray-400'
                                }`}>
                                  {daysUntil > 0 ? `${daysUntil} days left` : daysUntil === 0 ? 'Due today' : `${Math.abs(daysUntil)} days overdue`}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.05 + 0.1 }}
                            >
                              <Badge className={`${getStatusColor(jobCard.status)} border shadow-lg flex items-center gap-1.5 w-fit`}>
                                {getStatusIcon(jobCard.status)}
                                {jobCard.status}
                              </Badge>
                            </motion.div>
                          </TableCell>
                          <TableCell className="text-gray-300 text-sm max-w-xs truncate">
                            {jobCard.description}
                          </TableCell>
                        </motion.tr>
                      );
                    })}
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
