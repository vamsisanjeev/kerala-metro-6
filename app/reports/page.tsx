"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockTrains, mockJobCards } from '@/lib/mock-data';
import type { Train, JobCard } from '@/lib/types';
import { FilterSection } from '@/components/reports/filter-section';
import { JobCardTimeline } from '@/components/reports/job-card-timeline';
import { ReportsCharts } from '@/components/reports/reports-charts';
import { exportToCSV, exportToPDF } from '@/lib/export-utils';
import { FestivalToggle } from '@/components/dashboard/festival-toggle';
import { useFestival } from '@/lib/festival-context';

export default function ReportsPage() {
  const { festivalMode } = useFestival();
  const [trains] = useState<Train[]>(mockTrains);
  const [jobCards] = useState<JobCard[]>(mockJobCards);

  const [selectedTrain, setSelectedTrain] = useState<string>('all');
  const [selectedTaskType, setSelectedTaskType] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const [isExportingCSV, setIsExportingCSV] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const filteredJobCards = jobCards.filter(jobCard => {
    if (selectedTrain !== 'all' && jobCard.trainId !== selectedTrain) return false;
    if (selectedTaskType !== 'all' && jobCard.taskType !== selectedTaskType) return false;
    if (selectedPriority !== 'all' && jobCard.priority !== selectedPriority) return false;
    return true;
  });

  const handleClearFilters = () => {
    setSelectedTrain('all');
    setSelectedTaskType('all');
    setSelectedPriority('all');
  };

  const handleExportCSV = () => {
    setIsExportingCSV(true);
    setTimeout(() => {
      exportToCSV(filteredJobCards, trains);
      setIsExportingCSV(false);
    }, 500);
  };

  const handleExportPDF = () => {
    setIsExportingPDF(true);
    setTimeout(() => {
      exportToPDF(filteredJobCards, trains);
      setIsExportingPDF(false);
    }, 500);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-all duration-700"
      style={{
        background: festivalMode
          ? 'linear-gradient(135deg, #1a0f0a 0%, #2d1810 25%, #1f1108 50%, #2a1a0f 75%, #1a0f0a 100%)'
          : 'linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #0D1B2A 100%)',
      }}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIyMCIgeT0iMzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MCIgcng9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIG9wYWNpdHk9IjAuMDMiLz48Y2lyY2xlIGN4PSIzNSIgY3k9IjUwIiByPSI0IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjAzIi8+PGNpcmNsZSBjeD0iNjUiIGN5PSI1MCIgcj0iNCIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-5"></div>

      {festivalMode && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5" />
        </motion.div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <FestivalToggle />

              {festivalMode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className="px-4 py-2 rounded-lg bg-orange-500/20 border border-orange-400/40 backdrop-blur-sm"
                >
                  <p className="text-orange-200 text-sm font-semibold">
                    Festival Analytics: Enhanced demand projections active
                  </p>
                </motion.div>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-10 w-10 text-blue-400" />
                <h1 className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-5xl font-bold text-transparent">
                  Reports & Analytics
                </h1>
              </div>
              <p className="text-gray-300 text-lg">Comprehensive fleet performance and job card insights</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleExportCSV}
                  disabled={isExportingCSV || filteredJobCards.length === 0}
                  className="bg-gradient-to-r from-[#4D96FF] to-[#1B65FF] hover:from-[#5FA5FF] hover:to-[#2C75FF] text-white border-0 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isExportingCSV ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                      </motion.div>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export CSV
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleExportPDF}
                  disabled={isExportingPDF || filteredJobCards.length === 0}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isExportingPDF ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                      </motion.div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Export PDF
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
          </div>
        </motion.div>

        <FilterSection
          trains={trains}
          selectedTrain={selectedTrain}
          selectedTaskType={selectedTaskType}
          selectedPriority={selectedPriority}
          onTrainChange={setSelectedTrain}
          onTaskTypeChange={setSelectedTaskType}
          onPriorityChange={setSelectedPriority}
          onClearFilters={handleClearFilters}
        />

        <div className="flex items-center justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white"
          >
            <p className="text-sm text-gray-400">
              Showing <span className="font-bold text-cyan-400">{filteredJobCards.length}</span> of{' '}
              <span className="font-bold text-white">{jobCards.length}</span> job cards
            </p>
          </motion.div>
        </div>

        <JobCardTimeline jobCards={filteredJobCards} />

        <ReportsCharts trains={trains} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <ChevronDown className="h-4 w-4" />
            <p>End of Report</p>
            <ChevronDown className="h-4 w-4" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
