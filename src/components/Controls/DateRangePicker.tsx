import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

interface DateRangePickerProps {
  selected: Date;
  onSelect: (date: Date) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selected,
  onSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateSelect = (date: Date) => {
    onSelect(date);
  };

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl z-date-picker p-6 w-80 pointer-events-auto">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <h3 className="font-semibold text-white text-lg">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => (
          <div key={day} className="text-center text-white/50 p-2 font-medium text-sm">
            {day}
          </div>
        ))}
        {days.map(day => {
          const isSelected = isSameDay(day, selected);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          
          return (
            <button
              key={day.toString()}
              onClick={() => handleDateSelect(day)}
              className={`
                p-2 text-center rounded-xl transition-colors text-sm font-medium
                ${isSelected
                  ? 'bg-orange-500 text-white'
                  : isCurrentMonth
                    ? 'text-white hover:bg-white/10'
                    : 'text-white/30'
                }
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};