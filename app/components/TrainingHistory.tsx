'use client';

import { format } from 'date-fns';
import { TrainingSession } from '../types';

interface TrainingHistoryProps {
  sessions: TrainingSession[];
  onEdit: (session: TrainingSession) => void;
  onDelete: (id: string) => void;
}

export default function TrainingHistory({ sessions, onEdit, onDelete }: TrainingHistoryProps) {
  // Sort sessions by date and time (most recent first)
  const sortedSessions = [...sessions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Group sessions by date
  const groupedSessions = sortedSessions.reduce((acc, session) => {
    const date = session.date.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {} as Record<string, TrainingSession[]>);
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this training session?')) {
      onDelete(id);
    }
  };
  
  if (sessions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Training History</h3>
        <p className="text-gray-500 text-center py-8">
          No training sessions yet. Start by adding your first session!
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Training History</h3>
      
      <div className="space-y-4">
        {Object.entries(groupedSessions).map(([date, daySessions]) => {
          const totalDuration = daySessions.reduce((sum, s) => sum + s.duration, 0);
          const dateObj = new Date(date + 'T00:00:00');
          
          return (
            <div key={date} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 font-semibold flex justify-between items-center">
                <span>{format(dateObj, 'EEEE, MMMM d, yyyy')}</span>
                <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded">
                  Total: {totalDuration} min
                </span>
              </div>
              
              <div className="divide-y divide-gray-200">
                {daySessions.map((session) => (
                  <div key={session.id} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-blue-600">{session.time}</span>
                          <span className="text-gray-400">•</span>
                          <span className="font-semibold">{session.duration} min</span>
                        </div>
                        <p className="text-gray-700">{session.description}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(session)}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(session.id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
