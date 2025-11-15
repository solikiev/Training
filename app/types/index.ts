export interface TrainingSession {
  id: string;
  date: string; // ISO date string
  time: string; // HH:mm format
  description: string;
  duration: number; // in minutes
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
