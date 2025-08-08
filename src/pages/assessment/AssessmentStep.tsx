import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, Flag, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Timer from '../../components/ui/Timer';
import Modal from '../../components/ui/Modal';
import { Question, UserAnswer } from '../../types';

// Mock questions data
const mockQuestions: Question[] = [
  {
    id: '1',
    competencyId: 'digital-literacy',
    level: 'A1',
    question: 'What is the primary function of a computer operating system?',
    options: [
      { id: 'a', text: 'To connect to the internet', isCorrect: false },
      { id: 'b', text: 'To manage computer hardware and software resources', isCorrect: true },
      { id: 'c', text: 'To create documents', isCorrect: false },
      { id: 'd', text: 'To play multimedia files', isCorrect: false }
    ],
    correctAnswer: 'b',
    explanation: 'An operating system manages all computer hardware and software resources.',
    difficulty: 'easy',
    timeAllowed: 60
  },
  {
    id: '2',
    competencyId: 'digital-security',
    level: 'A1',
    question: 'Which of the following is considered a strong password?',
    options: [
      { id: 'a', text: 'password123', isCorrect: false },
      { id: 'b', text: 'MyP@ssw0rd!2024', isCorrect: true },
      { id: 'c', text: '123456789', isCorrect: false },
      { id: 'd', text: 'qwertyuiop', isCorrect: false }
    ],
    correctAnswer: 'b',
    explanation: 'Strong passwords contain uppercase, lowercase, numbers, and special characters.',
    difficulty: 'medium',
    timeAllowed: 60
  }
];

const AssessmentStep: React.FC = () => {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(44 * 60); // 44 minutes
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = mockQuestions; // In real app, fetch based on step
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  useEffect(() => {
    // Initialize answers array
    const initialAnswers = questions.map(q => ({
      questionId: q.id,
      selectedAnswer: '',
      isCorrect: false,
      timeSpent: 0
    }));
    setAnswers(initialAnswers as any);
  }, [questions]);

  const handleAnswerSelect = (optionId: string) => {
    setAnswers(prev => prev.map(answer => 
      answer.questionId === currentQuestion.id 
        ? { ...answer, selectedAnswer: optionId }
        : answer
    ));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionJump = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex);
      } else {
        newSet.add(currentQuestionIndex);
      }
      return newSet;
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate results (mock)
    const correctAnswers = answers.filter(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      return question && answer.selectedAnswer === question.correctAnswer;
    }).length;

    const percentage = Math.round((correctAnswers / questions.length) * 100);
    
    // Navigate to results
    navigate('/assessment/results', {
      state: {
        step,
        score: correctAnswers,
        total: questions.length,
        percentage,
        answers
      }
    });
  };

  const handleTimeUp = () => {
    setShowSubmitModal(true);
    setTimeout(() => {
      handleSubmit();
    }, 3000);
  };

  const getAnsweredCount = () => {
    return answers.filter(a => a.selectedAnswer).length;
  };

  const getProgressPercentage = () => {
    return (getAnsweredCount() / questions.length) * 100;
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Assessment Not Found</h2>
          <p className="text-gray-600 mb-4">The requested assessment step could not be loaded.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Step {step} Assessment
              </h1>
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Timer
                initialTime={timeRemaining}
                onTimeUp={handleTimeUp}
                isActive={true}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSubmitModal(true)}
              >
                Submit Assessment
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{getAnsweredCount()}/{questions.length} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {questions.map((_, index) => {
                  const isAnswered = answers[index]?.selectedAnswer;
                  const isCurrent = index === currentQuestionIndex;
                  const isFlagged = flaggedQuestions.has(index);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionJump(index)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all relative ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : isAnswered
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                      {isFlagged && (
                        <Flag 
                          size={10} 
                          className="absolute -top-1 -right-1 text-orange-500 fill-current"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 space-y-2 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span>Not answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Flag size={14} className="text-orange-500" />
                  <span>Flagged</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {currentQuestion.level}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {currentQuestion.difficulty}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFlag}
                  icon={<Flag size={16} className={flaggedQuestions.has(currentQuestionIndex) ? 'text-orange-500 fill-current' : ''} />}
                >
                  {flaggedQuestions.has(currentQuestionIndex) ? 'Unflag' : 'Flag'}
                </Button>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      currentAnswer?.selectedAnswer === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option.id}
                      checked={currentAnswer?.selectedAnswer === option.id}
                      onChange={() => handleAnswerSelect(option.id)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      currentAnswer?.selectedAnswer === option.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {currentAnswer?.selectedAnswer === option.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-900 flex-1">{option.text}</span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                icon={<ArrowLeft size={16} />}
              >
                Previous
              </Button>

              <div className="text-sm text-gray-500">
                {currentQuestionIndex + 1} / {questions.length}
              </div>

              {currentQuestionIndex === questions.length - 1 ? (
                <Button
                  onClick={() => setShowSubmitModal(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Review & Submit
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  icon={<ArrowRight size={16} />}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Assessment"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">
                  Are you sure you want to submit?
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Once submitted, you cannot make changes to your answers.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{getAnsweredCount()}</div>
              <div className="text-sm text-gray-600">Answered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{questions.length - getAnsweredCount()}</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowSubmitModal(false)}
              fullWidth
            >
              Continue Assessment
            </Button>
            <Button
              onClick={handleSubmit}
              loading={isSubmitting}
              fullWidth
            >
              Submit Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AssessmentStep;