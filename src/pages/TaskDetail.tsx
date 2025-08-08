import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  Award, 
  Play, 
  CheckCircle, 
  Users,
  Target,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import Modal from '../components/ui/Modal';
import { Task } from '../types';

// Mock task data
const mockTask: Task = {
  id: '1',
  title: 'Digital Literacy Assessment - Step 1',
  description: 'Complete the foundational digital literacy assessment covering A1 and A2 competency levels. This comprehensive assessment evaluates your basic digital skills including computer operations, internet usage, digital communication, and basic software proficiency.',
  type: 'assessment',
  step: 1,
  level: 'A1',
  status: 'available',
  estimatedTime: 44,
  difficulty: 'easy',
  prerequisites: [],
  rewards: [
    { type: 'points', value: 100, description: '100 points for completion' },
    { type: 'certificate', value: 'A1-A2', description: 'Digital Literacy Certificate' },
    { type: 'badge', value: 'Digital Pioneer', description: 'First assessment completion badge' }
  ],
  progress: 0,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
};

const TaskDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [showStartModal, setShowStartModal] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  // In real app, fetch task by ID
  const task = mockTask;

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Task Not Found</h2>
          <p className="text-gray-600 mb-4">The requested task could not be found.</p>
          <Button onClick={() => navigate('/tasks')}>
            Back to Tasks
          </Button>
        </div>
      </div>
    );
  }

  const handleStartTask = async () => {
    setIsStarting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (task.type === 'assessment' && task.step) {
      navigate(`/assessment/step-${task.step}`);
    } else {
      navigate(`/task/${task.id}/start`);
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'in-progress':
        return <Play className="w-6 h-6 text-blue-600" />;
      case 'locked':
        return <AlertCircle className="w-6 h-6 text-gray-400" />;
      default:
        return <Star className="w-6 h-6 text-yellow-600" />;
    }
  };

  const getTypeIcon = () => {
    switch (task.type) {
      case 'assessment':
        return <Award className="w-5 h-5" />;
      case 'practice':
        return <Users className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
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

  const isDisabled = task.status === 'locked';
  const canStart = task.status === 'available' || task.status === 'in-progress';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/tasks')}
            icon={<ArrowLeft size={18} />}
            className="mb-4"
          >
            Back to Tasks
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  {getTypeIcon()}
                  <span className="font-medium capitalize">{task.type}</span>
                </div>
                {task.level && (
                  <Badge variant="info">{task.level}</Badge>
                )}
                {task.step && (
                  <Badge variant="default">Step {task.step}</Badge>
                )}
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor()}`}>
                  {task.difficulty}
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {task.title}
              </h1>
            </div>
            
            <div className="ml-6">
              {getStatusIcon()}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {task.description}
              </p>
            </Card>

            {/* Progress (if in progress) */}
            {task.status === 'in-progress' && task.progress > 0 && (
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
                <ProgressBar
                  value={task.progress}
                  variant="default"
                  size="lg"
                  showLabel
                  label={`${task.progress}% Complete`}
                />
                <div className="mt-4 flex justify-between text-sm text-gray-600">
                  <span>Started {new Date(task.updatedAt).toLocaleDateString()}</span>
                  <span>Last activity: {new Date(task.updatedAt).toLocaleDateString()}</span>
                </div>
              </Card>
            )}

            {/* Prerequisites */}
            {task.prerequisites.length > 0 && (
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Prerequisites</h2>
                <div className="space-y-3">
                  {task.prerequisites.map((prereqId, index) => (
                    <div key={prereqId} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Complete Task #{prereqId}
                        </div>
                        <div className="text-sm text-gray-600">
                          Required before starting this task
                        </div>
                      </div>
                      <Badge variant="success" size="sm">
                        Completed
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Assessment Details (if assessment) */}
            {task.type === 'assessment' && (
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Assessment Details</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">44</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{task.estimatedTime}</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">75%</div>
                    <div className="text-sm text-gray-600">Pass Rate</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800 mb-1">
                        Important Assessment Information
                      </h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• You have {task.estimatedTime} minutes to complete the assessment</li>
                        <li>• The assessment will auto-submit when time expires</li>
                        <li>• You can flag questions for review</li>
                        <li>• Ensure stable internet connection before starting</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Info */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{task.estimatedTime} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
                    {task.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{task.type}</span>
                </div>
                {task.step && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Step:</span>
                    <span className="font-medium">{task.step}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge 
                    variant={
                      task.status === 'completed' ? 'success' :
                      task.status === 'in-progress' ? 'info' :
                      task.status === 'locked' ? 'default' : 'warning'
                    }
                    size="sm"
                  >
                    {task.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Rewards */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rewards</h3>
              <div className="space-y-3">
                {task.rewards.map((reward, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      {reward.type === 'points' && <Star className="w-4 h-4 text-purple-600" />}
                      {reward.type === 'certificate' && <Award className="w-4 h-4 text-purple-600" />}
                      {reward.type === 'badge' && <Target className="w-4 h-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {reward.type === 'points' ? `+${reward.value} Points` : reward.value}
                      </div>
                      <div className="text-sm text-gray-600">{reward.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Button */}
            <Card>
              {canStart ? (
                <Button
                  onClick={() => setShowStartModal(true)}
                  fullWidth
                  size="lg"
                  icon={<Play size={20} />}
                  disabled={isDisabled}
                >
                  {task.status === 'in-progress' ? 'Continue Task' : 'Start Task'}
                </Button>
              ) : task.status === 'completed' ? (
                <Button
                  onClick={() => navigate(`/task/${task.id}/review`)}
                  variant="outline"
                  fullWidth
                  size="lg"
                  icon={<CheckCircle size={20} />}
                >
                  Review Results
                </Button>
              ) : (
                <Button
                  disabled
                  fullWidth
                  size="lg"
                >
                  Task Locked
                </Button>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Start Confirmation Modal */}
      <Modal
        isOpen={showStartModal}
        onClose={() => setShowStartModal(false)}
        title={`Start ${task.title}`}
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-1">
                  Ready to start?
                </h4>
                <p className="text-sm text-blue-700">
                  Make sure you have {task.estimatedTime} minutes available and a stable internet connection.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{task.estimatedTime}</div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {task.type === 'assessment' ? '44' : '15'}
              </div>
              <div className="text-sm text-gray-600">
                {task.type === 'assessment' ? 'Questions' : 'Activities'}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowStartModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              onClick={handleStartTask}
              loading={isStarting}
              fullWidth
            >
              Start Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskDetail;