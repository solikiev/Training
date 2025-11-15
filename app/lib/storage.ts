import { TrainingSession, TrainingTargets, DailyTraining } from '../types';

const STORAGE_KEYS = {
  TRAINING_SESSIONS: 'training-sessions',
  TRAINING_TARGETS: 'training-targets',
};

// Default targets
const DEFAULT_TARGETS: TrainingTargets = {
  minDuration: 70,
  maxDuration: 90,
};

// Training Sessions
export const getTrainingSessions = (): TrainingSession[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEYS.TRAINING_SESSIONS);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveTrainingSessions = (sessions: TrainingSession[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.TRAINING_SESSIONS, JSON.stringify(sessions));
};

export const addTrainingSession = (session: TrainingSession): void => {
  const sessions = getTrainingSessions();
  sessions.push(session);
  saveTrainingSessions(sessions);
};

export const updateTrainingSession = (updatedSession: TrainingSession): void => {
  const sessions = getTrainingSessions();
  const index = sessions.findIndex(s => s.id === updatedSession.id);
  if (index !== -1) {
    sessions[index] = updatedSession;
    saveTrainingSessions(sessions);
  }
};

export const deleteTrainingSession = (id: string): void => {
  const sessions = getTrainingSessions();
  const filtered = sessions.filter(s => s.id !== id);
  saveTrainingSessions(filtered);
};

// Training Targets
export const getTrainingTargets = (): TrainingTargets => {
  if (typeof window === 'undefined') return DEFAULT_TARGETS;
  
  const stored = localStorage.getItem(STORAGE_KEYS.TRAINING_TARGETS);
  if (!stored) return DEFAULT_TARGETS;
  
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_TARGETS;
  }
};

export const saveTrainingTargets = (targets: TrainingTargets): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.TRAINING_TARGETS, JSON.stringify(targets));
};

// Helper functions
export const getDailyTrainings = (sessions: TrainingSession[]): Map<string, DailyTraining> => {
  const dailyMap = new Map<string, DailyTraining>();
  
  sessions.forEach(session => {
    const date = session.date.split('T')[0]; // Extract YYYY-MM-DD
    
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        date,
        sessions: [],
        totalDuration: 0,
      });
    }
    
    const daily = dailyMap.get(date)!;
    daily.sessions.push(session);
    daily.totalDuration += session.duration;
  });
  
  return dailyMap;
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
