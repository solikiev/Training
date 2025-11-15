'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from './components/Calendar';
import TrainingForm from './components/TrainingForm';
import TrainingHistory from './components/TrainingHistory';
import { TrainingSession, TrainingTargets } from './types';
import {
  getTrainingSessions,
  getTrainingTargets,
  addTrainingSession,
  updateTrainingSession,
  deleteTrainingSession,
} from './lib/storage';

export default function Home() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [targets, setTargets] = useState<TrainingTargets>({ minDuration: 70, maxDuration: 90 });
  const [editingSession, setEditingSession] = useState<TrainingSession | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Load data from localStorage
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessions(getTrainingSessions());
    setTargets(getTrainingTargets());
  }, []);
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowForm(true);
    setEditingSession(null);
  };
  
  const handleSaveSession = (session: TrainingSession) => {
    if (editingSession) {
      updateTrainingSession(session);
    } else {
      addTrainingSession(session);
    }
    
    // Refresh sessions
    setSessions(getTrainingSessions());
    setEditingSession(null);
    setShowForm(false);
  };
  
  const handleEditSession = (session: TrainingSession) => {
    setEditingSession(session);
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDeleteSession = (id: string) => {
    deleteTrainingSession(id);
    setSessions(getTrainingSessions());
  };
  
  const handleCancelEdit = () => {
    setEditingSession(null);
    setShowForm(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Training Tracker</h1>
          <button
            onClick={() => router.push('/settings')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ⚙️ Settings
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Calendar</h2>
          <Calendar
            sessions={sessions}
            targets={targets}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onMonthChange={setSelectedDate}
          />
        </div>
        
        {/* Add Training Button */}
        {!showForm && (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold text-lg shadow-lg"
            >
              + Add Training Session
            </button>
          </div>
        )}
        
        {/* Training Form */}
        {showForm && (
          <TrainingForm
            selectedDate={selectedDate}
            editingSession={editingSession}
            onSave={handleSaveSession}
            onCancel={handleCancelEdit}
          />
        )}
        
        {/* Training History */}
        <TrainingHistory
          sessions={sessions}
          onEdit={handleEditSession}
          onDelete={handleDeleteSession}
        />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>Training Tracker - Track your fitness journey</p>
        </div>
      </footer>
    </div>
  );
}
