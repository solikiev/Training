export interface TrainingSession {
  id: string;
  date: string; // ISO date string
  time: string; // HH:mm format
  description: string;
  duration: number; // in minutes
  minTarget?: number; // Optional custom min target for this session
  maxTarget?: number; // Optional custom max target for this session
}

export interface TrainingTargets {
  minDuration: number; // default: 70
  maxDuration: number; // default: 90
}

export interface DailyTraining {
  date: string; // YYYY-MM-DD
  sessions: TrainingSession[];
  totalDuration: number;
}
