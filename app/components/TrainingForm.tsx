'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { TrainingSession } from '../types';
import { generateId } from '../lib/storage';

interface TrainingFormProps {
  selectedDate: Date;
  editingSession: TrainingSession | null;
  onSave: (session: TrainingSession) => void;
  onCancel: () => void;
}

export default function TrainingForm({ selectedDate, editingSession, onSave, onCancel }: TrainingFormProps) {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  
  useEffect(() => {
    if (editingSession) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDescription(editingSession.description);
      setDuration(editingSession.duration.toString());
      setTime(editingSession.time);
      setDate(editingSession.date.split('T')[0]);
    } else {
      setDescription('');
      setDuration('');
      setTime(format(new Date(), 'HH:mm'));
      setDate(format(selectedDate, 'yyyy-MM-dd'));
    }
  }, [editingSession, selectedDate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !duration || !time || !date) {
      alert('Please fill in all fields');
      return;
    }
    
    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      alert('Please enter a valid duration');
      return;
    }
    
    const session: TrainingSession = {
      id: editingSession?.id || generateId(),
      date: `${date}T${time}`,
      time,
      description,
      duration: durationNum,
    };
    
    onSave(session);
    
    // Reset form
    setDescription('');
    setDuration('');
    setTime(format(new Date(), 'HH:mm'));
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold mb-4">
        {editingSession ? 'Edit Training Session' : 'Add Training Session'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium mb-1">
            Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., chest(main)+delts and biceps"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium mb-1">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 90"
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            {editingSession ? 'Update' : 'Save'} Training
          </button>
          {editingSession && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
