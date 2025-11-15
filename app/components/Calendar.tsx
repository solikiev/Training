'use client';

import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, addMonths, subMonths } from 'date-fns';
import { TrainingSession, TrainingTargets } from '../types';
import { getDailyTrainings } from '../lib/storage';

interface CalendarProps {
  sessions: TrainingSession[];
  targets: TrainingTargets;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
}

export default function Calendar({ sessions, targets, selectedDate, onDateSelect, onMonthChange }: CalendarProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  
  // Get all days in the month
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Add padding days for the start of the month
  const startDayOfWeek = monthStart.getDay();
  const paddingDays = Array(startDayOfWeek).fill(null);
  
  // Get daily trainings
  const dailyTrainings = getDailyTrainings(sessions);
  
  const getDayColor = (date: Date): string => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const daily = dailyTrainings.get(dateStr);
    
    // Rest day - no color
    if (!daily || daily.sessions.length === 0) {
      return 'bg-white hover:bg-gray-100';
    }
    
    // Evaluate each session individually
    let hasRed = false;
    let hasYellow = false;
    
    daily.sessions.forEach(session => {
      const minTargetValue = session.minTarget ?? targets.minDuration;
      const maxTargetValue = session.maxTarget ?? targets.maxDuration;
      
      if (session.duration < minTargetValue) {
        hasYellow = true;
      } else if (session.duration > maxTargetValue) {
        hasRed = true;
      }
    });
    
    // Return worst status
    if (hasRed) {
      return 'bg-red-200 hover:bg-red-300';
    } else if (hasYellow) {
      return 'bg-yellow-200 hover:bg-yellow-300';
    } else {
      return 'bg-green-200 hover:bg-green-300';
    }
  };
  
  const handlePrevMonth = () => {
    onMonthChange(subMonths(selectedDate, 1));
  };
  
  const handleNextMonth = () => {
    onMonthChange(addMonths(selectedDate, 1));
  };
  
  return (
    <div className="w-full">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          &lt; Prev
        </button>
        <h2 className="text-xl font-bold">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Next &gt;
        </button>
      </div>
      
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-sm py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {paddingDays.map((_, index) => (
          <div key={`padding-${index}`} className="aspect-square" />
        ))}
        {daysInMonth.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const daily = dailyTrainings.get(dateStr);
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={`
                aspect-square border rounded-lg flex flex-col items-center justify-center
                transition-all cursor-pointer
                ${getDayColor(day)}
                ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                ${isToday ? 'font-bold border-blue-500 border-2' : 'border-gray-300'}
              `}
            >
              <span className="text-sm">{format(day, 'd')}</span>
              {daily && (
                <span className="text-xs font-semibold mt-1">
                  {daily.totalDuration}m
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-200 rounded border border-gray-300"></div>
          <span>On Target ({targets.minDuration}-{targets.maxDuration}m)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-200 rounded border border-gray-300"></div>
          <span>Below Target (&lt;{targets.minDuration}m)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-200 rounded border border-gray-300"></div>
          <span>Above Target (&gt;{targets.maxDuration}m)</span>
        </div>
      </div>
    </div>
  );
}
