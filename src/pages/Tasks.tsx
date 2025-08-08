import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BookOpen, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import TaskCard from '../components/task/TaskCard';
import TaskFilters from '../components/task/TaskFilters';
import TaskProgress from '../components/task/TaskProgress';
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
    let filtered = mockTasks.filter(task => {
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

  const handleContinueTask = (taskId: string) => {
    navigate(`/task/${taskId}/continue`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedStatus('');
    setSelectedLevel('');
    setSelectedDifficulty('');
    setSortBy('-createdAt');
  };

  const getTaskStats = () => {
    const available = mockTasks.filter(t => t.status === 'available').length;
    const inProgress = mockTasks.filter(t => t.status === 'in-progress').length;
    const completed = mockTasks.filter(t => t.status === 'completed').length;
    const total = mockTasks.length;

    return { available, inProgress, completed, total };
  };

  const stats = getTaskStats();

  const tabs = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: <BookOpen className="w-4 h-4" />,
      content: (
        <div>
          <TaskFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={clearFilters}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onStart={handleStartTask}
                onContinue={handleContinueTask}
              />
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search query to find tasks.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'progress',
      label: 'My Progress',
      icon: <TrendingUp className="w-4 h-4" />,
      content: (
        <TaskProgress userProgress={mockUserProgress} />
      )
    }
  ];

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

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </Card>
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.available}</div>
              <div className="text-sm text-gray-600">Available</div>
            </Card>
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </Card>
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          defaultTab="all"
          variant="underline"
        />
      </div>
    </div>
  );
};

export default Tasks;