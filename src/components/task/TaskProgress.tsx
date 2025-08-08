import React from 'react';
import { Trophy, Target, Flame, Calendar, Award, Star } from 'lucide-react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';
import { UserProgress, Achievement } from '../../types';

interface TaskProgressProps {
  userProgress: UserProgress;
  className?: string;
}

const TaskProgress: React.FC<TaskProgressProps> = ({
  userProgress,
  className
}) => {
  const weeklyProgressPercentage = (userProgress.weeklyProgress / userProgress.weeklyGoal) * 100;

  const getAchievementRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-600 bg-gray-100';
      case 'rare':
        return 'text-blue-600 bg-blue-100';
      case 'epic':
        return 'text-purple-600 bg-purple-100';
      case 'legendary':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Points */}
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {userProgress.totalPoints.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Points</div>
        </Card>

        {/* Current Streak */}
        <Card className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Flame className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {userProgress.currentStreak}
          </div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </Card>

        {/* Completed Tasks */}
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {userProgress.completedTasks.length}
          </div>
          <div className="text-sm text-gray-600">Tasks Completed</div>
        </Card>

        {/* Achievements */}
        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {userProgress.achievements.length}
          </div>
          <div className="text-sm text-gray-600">Achievements</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Goal Progress */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Weekly Goal
            </h3>
            <Badge 
              variant={weeklyProgressPercentage >= 100 ? 'success' : 'info'}
              size="sm"
            >
              {Math.round(weeklyProgressPercentage)}%
            </Badge>
          </div>
          
          <div className="mb-4">
            <ProgressBar
              value={userProgress.weeklyProgress}
              max={userProgress.weeklyGoal}
              variant={weeklyProgressPercentage >= 100 ? 'success' : 'default'}
              showLabel
              label={`${userProgress.weeklyProgress} / ${userProgress.weeklyGoal} tasks`}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>This week</span>
            </div>
            <span>
              {userProgress.weeklyGoal - userProgress.weeklyProgress > 0 
                ? `${userProgress.weeklyGoal - userProgress.weeklyProgress} tasks remaining`
                : 'Goal achieved! 🎉'
              }
            </span>
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-purple-600" />
            Recent Achievements
          </h3>
          
          {userProgress.achievements.length > 0 ? (
            <div className="space-y-3">
              {userProgress.achievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <Badge 
                        size="sm"
                        className={getAchievementRarityColor(achievement.rarity)}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {userProgress.achievements.length > 3 && (
                <div className="text-center pt-2">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all {userProgress.achievements.length} achievements
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No achievements yet</p>
              <p className="text-sm text-gray-500">Complete tasks to earn your first achievement!</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TaskProgress;