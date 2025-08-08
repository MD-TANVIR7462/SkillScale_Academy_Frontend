import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle,
  Play,
  Download,
  Calendar
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { User, Assessment } from '../types';

// Mock user data
const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'student',
  isVerified: true,
  currentLevel: 'A2',
  completedSteps: [1],
  certificates: [],
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
};

const mockAssessments: Assessment[] = [
  {
    id: '1',
    userId: '1',
    step: 1,
    questions: [],
    answers: [],
    startTime: '2024-01-15T10:00:00Z',
    endTime: '2024-01-15T11:30:00Z',
    timeRemaining: 0,
    score: 38,
    percentage: 76,
    status: 'completed',
    levelAchieved: 'A2',
    canProceedToNext: true,
    totalTimeAllowed: 90, // in minutes
    timeSpent: 90, // in minutes
    flaggedQuestions: [],
    reviewMode: false
  }
];

const Dashboard: React.FC = () => {
  const [user] = useState<User>(mockUser);
  const [assessments] = useState<Assessment[]>(mockAssessments);
  const navigate = useNavigate();

  const getNextStep = () => {
    const completedSteps = user.completedSteps || [];
    if (completedSteps.includes(1) && !completedSteps.includes(2)) return 2;
    if (completedSteps.includes(2) && !completedSteps.includes(3)) return 3;
    return null;
  };

  const canTakeAssessment = () => {
    const lastAssessment = assessments[assessments.length - 1];
    return !lastAssessment || lastAssessment.status === 'completed';
  };

  const nextStep = getNextStep();

  const stats = [
    {
      title: 'Current Level',
      value: user.currentLevel || 'Not Started',
      icon: <Award className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Steps Completed',
      value: `${user.completedSteps?.length || 0}/3`,
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'Certificates',
      value: user.certificates?.length || 0,
      icon: <Award className="w-5 h-5 text-purple-600" />,
      color: 'bg-purple-50'
    },
    {
      title: 'Last Assessment',
      value: assessments.length > 0 ? `${assessments[assessments.length - 1].percentage}%` : 'N/A',
      icon: <TrendingUp className="w-5 h-5 text-orange-600" />,
      color: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Track your progress and continue your digital competency journey.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center" hover>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Next Assessment */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Next Assessment</h2>
                {nextStep && (
                  <Badge variant="info">
                    Step {nextStep} Available
                  </Badge>
                )}
              </div>

              {nextStep ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">{nextStep}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Step {nextStep} Assessment
                        </h3>
                        <p className="text-gray-600">
                          {nextStep === 2 ? 'B1 & B2 Levels' : 'C1 & C2 Levels'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">44</div>
                        <div className="text-sm text-gray-600">Questions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">44</div>
                        <div className="text-sm text-gray-600">Minutes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">75%</div>
                        <div className="text-sm text-gray-600">To Proceed</div>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate(`/assessment/step-${nextStep}`)}
                      icon={<Play size={18} />}
                      disabled={!canTakeAssessment()}
                      fullWidth
                    >
                      {canTakeAssessment() ? 'Start Assessment' : 'Assessment in Progress'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  {user.completedSteps?.length === 3 ? (
                    <div>
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Congratulations!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You've completed all assessment steps. Download your certificates below.
                      </p>
                      <Button onClick={() => navigate('/certificates')}>
                        View Certificates
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Assessment Unavailable
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Complete your current assessment to unlock the next step.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Assessment History */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Assessment History</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>

              {assessments.length > 0 ? (
                <div className="space-y-4">
                  {assessments.map((assessment) => (
                    <div key={assessment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">{assessment.step}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Step {assessment.step} Assessment
                            </h4>
                            <p className="text-sm text-gray-600">
                              Completed on {new Date(assessment.endTime!).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {assessment.percentage}%
                          </div>
                          <Badge 
                            variant={assessment.percentage >= 75 ? 'success' : assessment.percentage >= 25 ? 'warning' : 'danger'}
                            size="sm"
                          >
                            {assessment.levelAchieved}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 rounded-full h-2 mb-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${assessment.percentage}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{assessment.score} correct answers</span>
                        <span>Duration: 1h 30m</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Assessments Yet
                  </h3>
                  <p className="text-gray-600">
                    Start your first assessment to begin tracking your progress.
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((step) => {
                  const isCompleted = user.completedSteps?.includes(step);
                  const isCurrent = step === nextStep;
                  
                  return (
                    <div key={step} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-green-100 text-green-600' 
                          : isCurrent 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle size={16} />
                        ) : (
                          <span className="text-sm font-medium">{step}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${
                          isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          Step {step}
                        </div>
                        <div className="text-xs text-gray-500">
                          {step === 1 ? 'A1 & A2' : step === 2 ? 'B1 & B2' : 'C1 & C2'}
                        </div>
                      </div>
                      {isCompleted && (
                        <Badge variant="success" size="sm">
                          Complete
                        </Badge>
                      )}
                      {isCurrent && (
                        <Badge variant="info" size="sm">
                          Available
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Download size={16} />}
                  onClick={() => navigate('/certificates')}
                >
                  Download Certificates
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Calendar size={16} />}
                  onClick={() => navigate('/schedule')}
                >
                  Schedule Assessment
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={<BookOpen size={16} />}
                  onClick={() => navigate('/practice')}
                >
                  Practice Questions
                </Button>
              </div>
            </Card>

            {/* Tips Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                💡 Assessment Tips
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Read each question carefully before answering</p>
                <p>• Manage your time - 1 minute per question</p>
                <p>• Use the secure browser for best experience</p>
                <p>• Ensure stable internet connection</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;