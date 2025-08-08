import { Task, UserProgress } from "../types";

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Digital Literacy Assessment - Step 1',
    description: 'Complete the foundational digital literacy assessment covering A1 and A2 competency levels. This assessment evaluates your basic digital skills.',
    type: 'assessment',
    step: 1,
    level: 'A1',
    status: 'available',
    estimatedTime: 44,
    difficulty: 'easy',
    prerequisites: [],
    rewards: [
      { type: 'points', value: 100, description: '100 points for completion' },
      { type: 'certificate', value: 'A1-A2', description: 'Digital Literacy Certificate' }
    ],
    progress: 0,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Practice: Basic Computer Operations',
    description: 'Practice fundamental computer operations including file management, basic software usage, and system navigation.',
    type: 'practice',
    level: 'A1',
    status: 'in-progress',
    estimatedTime: 30,
    difficulty: 'easy',
    prerequisites: [],
    rewards: [
      { type: 'points', value: 50, description: '50 points for completion' }
    ],
    progress: 65,
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    title: 'Digital Security Fundamentals',
    description: 'Learn and practice essential digital security concepts including password management, safe browsing, and data protection.',
    type: 'practice',
    level: 'A2',
    status: 'completed',
    estimatedTime: 25,
    difficulty: 'medium',
    prerequisites: [],
    rewards: [
      { type: 'points', value: 75, description: '75 points for completion' },
      { type: 'badge', value: 'Security Aware', description: 'Digital Security Badge' }
    ],
    progress: 100,
    createdAt: '2024-01-13T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    title: 'Intermediate Assessment - Step 2',
    description: 'Advanced digital competency assessment for B1 and B2 levels. Requires completion of Step 1 assessment.',
    type: 'assessment',
    step: 2,
    level: 'B1',
    status: 'locked',
    estimatedTime: 44,
    difficulty: 'medium',
    prerequisites: ['1'],
    rewards: [
      { type: 'points', value: 150, description: '150 points for completion' },
      { type: 'certificate', value: 'B1-B2', description: 'Intermediate Digital Certificate' }
    ],
    progress: 0,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    title: 'Advanced Data Analysis',
    description: 'Master advanced data analysis techniques using spreadsheets and data visualization tools.',
    type: 'practice',
    level: 'B2',
    status: 'locked',
    estimatedTime: 60,
    difficulty: 'hard',
    prerequisites: ['1', '4'],
    rewards: [
      { type: 'points', value: 100, description: '100 points for completion' },
      { type: 'badge', value: 'Data Analyst', description: 'Advanced Data Analysis Badge' }
    ],
    progress: 0,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

export const mockUserProgress: UserProgress = {
  userId: '1',
  totalPoints: 1250,
  currentStreak: 7,
  longestStreak: 12,
  completedTasks: ['3'],
  achievements: [
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed your first task',
      icon: '🎯',
      unlockedAt: '2024-01-15T10:00:00Z',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Security Champion',
      description: 'Mastered digital security fundamentals',
      icon: '🛡️',
      unlockedAt: '2024-01-15T12:00:00Z',
      rarity: 'rare'
    }
  ],
  weeklyGoal: 5,
  weeklyProgress: 3
};