'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTrainingTargets, saveTrainingTargets } from '../lib/storage';
import { TrainingTargets } from '../types';

export default function SettingsPage() {
  const router = useRouter();
  const [minDuration, setMinDuration] = useState('70');
  const [maxDuration, setMaxDuration] = useState('90');
  const [saved, setSaved] = useState(false);
  
  useEffect(() => {
    const targets = getTrainingTargets();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDuration(targets.minDuration.toString());
    setMaxDuration(targets.maxDuration.toString());
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const minNum = parseInt(minDuration);
    const maxNum = parseInt(maxDuration);
    
    if (isNaN(minNum) || isNaN(maxNum) || minNum <= 0 || maxNum <= 0) {
      alert('Please enter valid numbers');
      return;
    }
    
    if (minNum > maxNum) {
      alert('Minimum duration cannot be greater than maximum duration');
      return;
    }
    
    const targets: TrainingTargets = {
      minDuration: minNum,
      maxDuration: maxNum,
    };
    
    saveTrainingTargets(targets);
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← Back to Home
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-2xl font-bold mb-6">Training Target Settings</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="minDuration" className="block text-sm font-medium mb-2">
                Minimum Training Duration (minutes)
              </label>
              <input
                type="number"
                id="minDuration"
                value={minDuration}
                onChange={(e) => setMinDuration(e.target.value)}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Days with total duration below this will be marked in yellow
              </p>
            </div>
            
            <div>
              <label htmlFor="maxDuration" className="block text-sm font-medium mb-2">
                Maximum Training Duration (minutes)
              </label>
              <input
                type="number"
                id="maxDuration"
                value={maxDuration}
                onChange={(e) => setMaxDuration(e.target.value)}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Days with total duration above this will be marked in red
              </p>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                Save Settings
              </button>
              
              {saved && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center font-semibold">
                  Settings saved successfully!
                </div>
              )}
            </div>
          </form>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Color Coding Guide:</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <span className="inline-block w-4 h-4 bg-green-200 border border-gray-300 rounded mr-2"></span>
                <strong>Green:</strong> Training duration within target range
              </li>
              <li>
                <span className="inline-block w-4 h-4 bg-yellow-200 border border-gray-300 rounded mr-2"></span>
                <strong>Yellow:</strong> Training duration below minimum target
              </li>
              <li>
                <span className="inline-block w-4 h-4 bg-red-200 border border-gray-300 rounded mr-2"></span>
                <strong>Red:</strong> Training duration above maximum target
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
