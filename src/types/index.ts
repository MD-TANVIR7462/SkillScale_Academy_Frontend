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
