export interface Train {
  id: string;
  trainId: string;
  status: 'Run' | 'Standby' | 'Maintenance';
  mileage: number;
  brandingHours: number;
  fitnessStatus: string;
  cleaningStatus: string;
  brandingStatus: string;
  reasonNotes: string;
}

export interface JobCard {
  id: string;
  jobCardId: string;
  trainId: string;
  taskType: 'Maintenance' | 'Cleaning' | 'Branding';
  priority: 'High' | 'Medium' | 'Low';
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  description: string;
}

export interface AIAllocation {
  trainId: string;
  currentStatus: string;
  suggestedStatus: 'Run' | 'Standby' | 'Maintenance';
  confidence: number;
}
