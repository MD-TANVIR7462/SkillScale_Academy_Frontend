import React from 'react';
import { Clock, Star, Lock, CheckCircle, Play, Users, Award } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import Tooltip from '../ui/Tooltip';
import { Task, CompetencyLevel } from '../../types';
import { cn } from '../../utils/cn';

interface TaskCardProps {
  task: Task;
  onStart: (taskId: string) => void;
  onContinue?: (taskId: string) => void;
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onStart,
  onContinue,
  className
}) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Play className="w-5 h-5 text-blue-600" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return <Star className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = () => {
    switch (task.status) {
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="info" size="sm">In Progress</Badge>;
      case 'locked':
        return <Badge variant="default" size="sm">Locked</Badge>;
      case 'failed':
        return <Badge variant="danger" size="sm">Failed</Badge>;
      default:
        return <Badge variant="warning" size="sm">Available</Badge>;
    }
  };

  const getDifficultyColor = () => {
    switch (task.difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = () => {
    switch (task.type) {
      case 'assessment':
        return <Award className="w-4 h-4" />;
      case 'practice':
        return <Users className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const isDisabled = task.status === 'locked' || task.status === 'failed';
  const canContinue = task.status === 'in-progress' && task.progress > 0;

  return (
    <Card 
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        !isDisabled && 'hover:shadow-lg hover:-translate-y-1',
        isDisabled && 'opacity-60',
        className
      )}
      hover={!isDisabled}
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        {getStatusIcon()}
      </div>

      {/* Task type and level */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="flex items-center space-x-1 text-gray-600">
          {getTypeIcon()}
          <span className="text-sm font-medium capitalize">{task.type}</span>
        </div>
        {task.level && (
          <Badge variant="info" size="sm">{task.level}</Badge>
        )}
        {task.step && (
          <Badge variant="default" size="sm">Step {task.step}</Badge>
        )}
      </div>

      {/* Title and description */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {task.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {task.description}
      </p>

      {/* Progress bar for in-progress tasks */}
      {task.status === 'in-progress' && task.progress > 0 && (
        <div className="mb-4">
          <ProgressBar
            value={task.progress}
            variant="default"
            size="sm"
            showLabel
            label="Progress"
          />
        </div>
      )}

      {/* Task metadata */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <Tooltip content="Estimated time">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{task.estimatedTime}m</span>
            </div>
          </Tooltip>
          
          <div className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            getDifficultyColor()
          )}>
            {task.difficulty}
          </div>
        </div>

        {getStatusBadge()}
      </div>

      {/* Rewards preview */}
      {task.rewards.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">Rewards:</div>
          <div className="flex flex-wrap gap-1">
            {task.rewards.slice(0, 3).map((reward, index) => (
              <Tooltip key={index} content={reward.description}>
                <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                  {reward.type === 'points' ? `+${reward.value} pts` : reward.type}
                </div>
              </Tooltip>
            ))}
            {task.rewards.length > 3 && (
              <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{task.rewards.length - 3} more
              </div>
            )}
          </div>
        </div>
      )}

      {/* Prerequisites */}
      {task.prerequisites.length > 0 && task.status === 'locked' && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-xs text-yellow-700 font-medium mb-1">
            Prerequisites required:
          </div>
          <div className="text-xs text-yellow-600">
            Complete {task.prerequisites.length} task(s) to unlock
          </div>
        </div>
      )}

      {/* Action button */}
      <div className="pt-4 border-t border-gray-100">
        {canContinue ? (
          <Button
            onClick={() => onContinue?.(task.id)}
            variant="primary"
            size="sm"
            fullWidth
            icon={<Play size={16} />}
          >
            Continue ({task.progress}%)
          </Button>
        ) : (
          <Button
            onClick={() => onStart(task.id)}
            variant={task.status === 'completed' ? 'outline' : 'primary'}
            size="sm"
            fullWidth
            disabled={isDisabled}
            icon={task.status === 'completed' ? <CheckCircle size={16} /> : <Play size={16} />}
          >
            {task.status === 'completed' ? 'Review' : 'Start Task'}
          </Button>
        )}
      </div>

      {/* Due date indicator */}
      {task.dueDate && (
        <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg">
          Due {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </Card>
  );
};

export default TaskCard;