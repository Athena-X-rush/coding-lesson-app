import React from 'react';
import { Trophy, Target, Clock, Star } from 'lucide-react';

const ProgressDashboard = ({ character, completed, totalDungeons }) => {
  const completionRate = totalDungeons > 0 ? Math.round((completed / totalDungeons) * 100) : 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Progress Dashboard
        </h3>
        <span className="text-sm text-gray-500">
          {completionRate}% Complete
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="font-semibold">Dungeons Cleared</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {completed}/{totalDungeons}
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-4 h-4 text-green-500" />
            <span className="font-semibold">Study Time</span>
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {Math.floor(character.xp / 10)}h
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-4 h-4 text-purple-500" />
            <span className="font-semibold">Current Level</span>
          </div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {character.level}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-semibold mb-3">Recent Achievements</h4>
        <div className="space-y-2">
          {completed >= 1 && (
            <div className="bg-yellow-50 dark:bg-gray-700 rounded p-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">First Dungeon Cleared! 🎉</span>
            </div>
          )}
          {character.level >= 5 && (
            <div className="bg-blue-50 dark:bg-gray-700 rounded p-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Level 5 Achieved! ⭐</span>
            </div>
          )}
          {character.xp >= 100 && (
            <div className="bg-green-50 dark:bg-gray-700 rounded p-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm">100 XP Reached! 🎯</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
