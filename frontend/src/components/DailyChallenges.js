import React, { useState, useEffect } from 'react';
import { Target, Clock, Star, Zap, Trophy, Calendar } from 'lucide-react';

const DailyChallenges = ({ character, onChallengeComplete }) => {
  const [challenges, setChallenges] = useState([]);
  const [completedToday, setCompletedToday] = useState([]);

  const dailyChallenges = [
    {
      id: 1,
      title: "Python Master",
      description: "Complete 3 Python dungeons",
      icon: "🐍",
      difficulty: "Easy",
      xp: 50,
      type: "python"
    },
    {
      id: 2,
      title: "JavaScript Warrior",
      description: "Win 5 battles with JavaScript",
      icon: "⚡",
      difficulty: "Medium",
      xp: 100,
      type: "javascript"
    },
    {
      id: 3,
      title: "HTML Hero",
      description: "Complete HTML Knight's quest",
      icon: "🛡️",
      difficulty: "Easy",
      xp: 75,
      type: "html"
    },
    {
      id: 4,
      title: "CSS Sorcerer",
      description: "Style 10 elements successfully",
      icon: "🎨",
      difficulty: "Hard",
      xp: 150,
      type: "css"
    },
    {
      id: 5,
      title: "Speed Coder",
      description: "Complete any dungeon in under 2 minutes",
      icon: "⏱️",
      difficulty: "Hard",
      xp: 200,
      type: "speed"
    },
    {
      id: 6,
      title: "Perfect Score",
      description: "Get 100% on any knowledge challenge",
      icon: "🎯",
      difficulty: "Medium",
      xp: 120,
      type: "quiz"
    }
  ];

  useEffect(() => {
    // Get today's date for daily challenges
    const today = new Date().toDateString();
    const savedChallenges = JSON.parse(localStorage.getItem(`daily_challenges_${today}`) || '[]');
    const savedCompleted = JSON.parse(localStorage.getItem(`completed_challenges_${today}`) || '[]');
    
    setChallenges(savedChallenges.length > 0 ? savedChallenges : dailyChallenges);
    setCompletedToday(savedCompleted);
  }, []);

  const handleChallengeComplete = (challengeId) => {
    const today = new Date().toDateString();
    const newCompleted = [...completedToday, challengeId];
    
    setCompletedToday(newCompleted);
    localStorage.setItem(`completed_challenges_${today}`, JSON.stringify(newCompleted));
    
    // Award XP
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && onChallengeComplete) {
      onChallengeComplete(challenge);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'Hard':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const getProgressPercentage = () => {
    return Math.round((completedToday.length / challenges.length) * 100);
  };

  const getTotalXP = () => {
    return completedToday.reduce((total, challengeId) => {
      const challenge = challenges.find(c => c.id === challengeId);
      return total + (challenge ? challenge.xp : 0);
    }, 0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-500" />
          Daily Challenges
        </h3>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString()}
          </div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {getProgressPercentage()}% Complete
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {completedToday.length}/{challenges.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Challenges Completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {getTotalXP()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              XP Earned Today
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {challenges.length - completedToday.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Remaining
            </div>
          </div>
        </div>
      </div>

      {/* Challenge List */}
      <div className="space-y-3">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-500" />
          Today's Quests
        </h4>
        
        {challenges.map((challenge) => {
          const isCompleted = completedToday.includes(challenge.id);
          
          return (
            <div
              key={challenge.id}
              className={`border rounded-lg p-4 transition-all ${
                isCompleted
                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 opacity-75'
                  : 'bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-2xl">{challenge.icon}</div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                      {challenge.title}
                      {isCompleted && (
                        <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs rounded-full">
                          <Trophy className="w-3 h-3" />
                          Completed
                        </span>
                      )}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {challenge.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-purple-600 dark:text-purple-400">
                        <Star className="w-3 h-3" />
                        {challenge.xp} XP
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  {isCompleted ? (
                    <div className="text-green-600 dark:text-green-400">
                      <Trophy className="w-6 h-6" />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleChallengeComplete(challenge.id)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium text-sm transition-colors"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Reset Notice */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            <strong>Daily Reset:</strong> Challenges reset every day at midnight. Complete them all for bonus XP!
          </span>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenges;
