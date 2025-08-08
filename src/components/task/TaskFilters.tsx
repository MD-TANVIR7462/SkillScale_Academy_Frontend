import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { CompetencyLevel } from '../../types';

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedLevel: CompetencyLevel | '';
  onLevelChange: (level: CompetencyLevel | '') => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  selectedLevel,
  onLevelChange,
  selectedDifficulty,
  onDifficultyChange,
  sortBy,
  onSortChange,
  onClearFilters
}) => {
  const taskTypes = [
    { value: '', label: 'All Types' },
    { value: 'assessment', label: 'Assessment' },
    { value: 'practice', label: 'Practice' },
    { value: 'review', label: 'Review' }
  ];

  const taskStatuses = [
    { value: '', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'locked', label: 'Locked' },
    { value: 'failed', label: 'Failed' }
  ];

  const competencyLevels: { value: CompetencyLevel | ''; label: string }[] = [
    { value: '', label: 'All Levels' },
    { value: 'A1', label: 'A1 - Beginner' },
    { value: 'A2', label: 'A2 - Elementary' },
    { value: 'B1', label: 'B1 - Intermediate' },
    { value: 'B2', label: 'B2 - Upper Intermediate' },
    { value: 'C1', label: 'C1 - Advanced' },
    { value: 'C2', label: 'C2 - Proficient' }
  ];

  const difficulties = [
    { value: '', label: 'All Difficulties' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const sortOptions = [
    { value: 'title', label: 'Title A-Z' },
    { value: '-title', label: 'Title Z-A' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'estimatedTime', label: 'Duration' },
    { value: '-createdAt', label: 'Newest First' },
    { value: 'createdAt', label: 'Oldest First' }
  ];

  const hasActiveFilters = selectedType || selectedStatus || selectedLevel || selectedDifficulty || searchQuery;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filter Tasks
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="xl:col-span-2">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>

        {/* Type Filter */}
        <div>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {taskTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {taskStatuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Level Filter */}
        <div>
          <select
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value as CompetencyLevel | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {competencyLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty.value} value={difficulty.value}>
                {difficulty.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sort and Active Filters */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <SortAsc className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            <div className="flex flex-wrap gap-1">
              {selectedType && (
                <Badge variant="info" size="sm">
                  Type: {taskTypes.find(t => t.value === selectedType)?.label}
                </Badge>
              )}
              {selectedStatus && (
                <Badge variant="info" size="sm">
                  Status: {taskStatuses.find(s => s.value === selectedStatus)?.label}
                </Badge>
              )}
              {selectedLevel && (
                <Badge variant="info" size="sm">
                  Level: {selectedLevel}
                </Badge>
              )}
              {selectedDifficulty && (
                <Badge variant="info" size="sm">
                  Difficulty: {selectedDifficulty}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;