import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BookOpen, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';

import { Task, CompetencyLevel } from '../types';
import { mockTasks, mockUserProgress } from '../ExampleData/Data';

const Tasks: React.FC = () => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<CompetencyLevel | ''>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt');

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = mockTasks?.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || task.type === selectedType;
      const matchesStatus = !selectedStatus || task.status === selectedStatus;
      const matchesLevel = !selectedLevel || task.level === selectedLevel;
      const matchesDifficulty = !selectedDifficulty || task.difficulty === selectedDifficulty;

      return matchesSearch && matchesType && matchesStatus && matchesLevel && matchesDifficulty;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      const isDescending = sortBy.startsWith('-');
      const field = isDescending ? sortBy.slice(1) : sortBy;

      let aValue = a[field as keyof Task];
      let bValue = b[field as keyof Task];

      // Provide default values if undefined
      if (typeof aValue === 'undefined') aValue = '';
      if (typeof bValue === 'undefined') bValue = '';

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return isDescending ? 1 : -1;
      if (aValue > bValue) return isDescending ? -1 : 1;
      return 0;
    });

    return filtered;
  }, [mockTasks, searchQuery, selectedType, selectedStatus, selectedLevel, selectedDifficulty, sortBy]);

  const handleStartTask = (taskId: string) => {
    const task = mockTasks.find(t => t.id === taskId);
    if (task?.type === 'assessment' && task.step) {
      navigate(`/assessment/step-${task.step}`);
    } else {
      navigate(`/task/${taskId}`);
    }
  };


;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tasks & Assessments</h1>
              <p className="text-gray-600 mt-2">
                Complete tasks to improve your digital competency and earn certifications.
              </p>
            </div>
            <Button
              onClick={() => navigate('/assessment/step-1')}
              icon={<Plus size={20} />}
              className="hidden sm:flex"
            >
              Start Assessment
            </Button>
          </div>
      
        </div>
=
      </div>
    </div>
  );
};

export default Tasks;