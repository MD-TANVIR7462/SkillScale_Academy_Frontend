import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TimerProps {
  initialTime: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({
  initialTime,
  onTimeUp,
  isActive,
  className
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getColorClass = () => {
    const percentage = (timeLeft / initialTime) * 100;
    if (percentage <= 10) return 'text-red-600 bg-red-50 border-red-200';
    if (percentage <= 25) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-gray-700 bg-gray-50 border-gray-200';
  };

  return (
    <div className={cn(
      'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors',
      getColorClass(),
      className
    )}>
      <Clock size={18} />
      <span className="font-mono font-semibold">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default Timer;