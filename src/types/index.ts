// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  currentLevel?: CompetencyLevel;
  completedSteps: number[];
  certificates: Certificate[];
  createdAt: string;
  updatedAt: string;
}
export interface Certificate {
  id: string;
  userId: string;
  level: CompetencyLevel;
  issuedAt: string;
  validUntil?: string;
  certificateUrl: string;
  verificationCode: string;
  taskId?: string;
  score: number;
  percentage: number;
}
export type UserRole = 'admin' | 'student' | 'supervisor';

// Competency Types
export type CompetencyLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Competency {
  id: string;
  name: string;
  description: string;
  category: string;
  level: CompetencyLevel;
  questions: Question[];
}

// Question Types
export interface Question {
  id: string;
  competencyId: string;
  level: CompetencyLevel;
  question: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeAllowed: number; // in seconds
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// Assessment Types
export interface Assessment {
  id: string;
  userId: string;
  step: 1 | 2 | 3;
  questions: Question[];
  answers: UserAnswer[];
  startTime: string;
  endTime?: string;
  timeRemaining: number;
  score: number;
  percentage: number;
  status: 'in-progress' | 'completed' | 'failed' | 'expired';
  levelAchieved?: CompetencyLevel;
  canProceedToNext: boolean;
  totalTimeAllowed: number;
  timeSpent: number;
  flaggedQuestions: string[];
  reviewMode: boolean;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
  flagged: boolean;
  reviewedAt?: string;
}

// Task Types
export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'assessment' | 'practice' | 'review';
  step?: 1 | 2 | 3;
  competencyId?: string;
  level?: CompetencyLevel;
  status: 'available' | 'locked' | 'in-progress' | 'completed' | 'failed';
  dueDate?: string;
  estimatedTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  prerequisites: string[];
  rewards: TaskReward[];
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
}

export interface TaskReward {
  type: 'points' | 'badge' | 'certificate' | 'unlock';
  value: string | number;
  description: string;
}

export interface UserProgress {
  userId: string;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  completedTasks: string[];
  achievements: Achievement[];
  weeklyGoal: number;
  weeklyProgress: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

