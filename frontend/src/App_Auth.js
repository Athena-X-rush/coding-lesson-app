import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { MessageCircle, Star, Sun, Moon, LogOut, User, Settings } from 'lucide-react';
import ProgressDashboard from './components/ProgressDashboard';
import DailyChallenges from './components/DailyChallenges';
import Auth from './components/Auth';
import apiService from './services/api';
import './App.css';

const DUNGEON_LEVELS = {
  python: [
    {
      id: 1,
      name: 'Syntax Caverns',
      monster: 'Syntax Error Slime',
      challenge: 'Print Statement',
      description: 'A slimy creature blocks your path! Use print() to defeat it.',
      reward: { xp: 10, item: 'Health Potion' },
      boss: false,
      steps: [
        'Start by typing: print()',
        'Add your message inside quotes: "Hello, World!"',
        'Place the message inside the parentheses: print("Hello, World!")',
        'Click "Attack!" to cast your spell!'
      ],
      example: 'print("Hello, World!")',
      hint: 'Use print() with your message inside quotes',
      quiz: {
        question: 'What is the correct way to print "Hello" in Python?',
        options: [
          'print "Hello"',
          'print("Hello")',
          'console.log("Hello")',
          'echo "Hello"'
        ],
        correct: 1,
        explanation: 'In Python, we use print() with parentheses and quotes.'
      }
    },
    {
      id: 2,
      name: 'Variable Valley',
      monster: 'Type Golem',
      challenge: 'Variables',
      description: 'A stone guardian demands you create variables to pass!',
      reward: { xp: 20, item: 'Mana Crystal' },
      boss: false,
      steps: [
        'First, create a variable: name = "Your Name"',
        'Then use print() to show it: print(name)',
        'Click "Attack!" to defeat the golem!'
      ],
      example: 'name = "Hero"\nprint(name)',
      hint: 'Variables store values. Use = to assign values.'
    }
  ],
  javascript: [
    {
      id: 1,
      name: 'Console Forest',
      monster: 'Bug Beast',
      challenge: 'Console Log',
      description: 'A wild bug appears! Use console.log() to defeat it.',
      reward: { xp: 10, item: 'Debug Potion' },
      boss: false,
      steps: [
        'Type: console.log()',
        'Add your message inside quotes: "Hello, World!"',
        'Place the message inside: console.log("Hello, World!")',
        'Click "Attack!" to defeat the beast!'
      ],
      example: 'console.log("Hello, World!")',
      hint: 'JavaScript uses console.log() to output messages.'
    }
  ],
  html: [
    {
      id: 1,
      name: 'Tag Mountains',
      monster: 'Broken Tag Goblin',
      challenge: 'HTML Tags',
      description: 'A goblin with broken tags blocks your path!',
      reward: { xp: 10, item: 'Tag Fixer' },
      boss: false,
      steps: [
        'Create a heading: <h1>Your Title</h1>',
        'Add a paragraph: <p>Your content</p>',
        'Click "Attack!" to defeat the goblin!'
      ],
      example: '<h1>Hello World</h1>\n<p>Welcome to HTML!</p>',
      hint: 'HTML tags come in pairs: <tag>content</tag>'
    }
  ],
  css: [
    {
      id: 1,
      name: 'Style Desert',
      monster: 'UStyle Dragon',
      challenge: 'CSS Styling',
      description: 'A dragon with no style challenges you!',
      reward: { xp: 10, item: 'Style Wand' },
      boss: false,
      steps: [
        'Target an element: body { }',
        'Add properties: background: blue;',
        'Click "Attack!" to defeat the dragon!'
      ],
      example: 'body {\n  background: blue;\n  color: white;\n}',
      hint: 'CSS uses selectors and property-value pairs.'
    }
  ]
};

const CHARACTERS = {
  python: {
    name: 'Python Mage',
    icon: '🧙‍♂️',
    color: '#3776ab',
    skills: ['Magic Spells', 'Data Manipulation', 'Algorithm Mastery']
  },
  javascript: {
    name: 'JavaScript Warrior',
    icon: '⚔️',
    color: '#f7df1e',
    skills: ['DOM Combat', 'Event Handling', 'Async Power']
  },
  html: {
    name: 'HTML Knight',
    icon: '🛡️',
    color: '#e34c26',
    skills: ['Structure Defense', 'Semantic Attacks', 'Form Magic']
  },
  css: {
    name: 'CSS Sorceress',
    icon: '🎨',
    color: '#1572b6',
    skills: ['Style Spells', 'Layout Control', 'Animation Arts']
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('setup');
  const [selectedLang, setSelectedLang] = useState('');
  const [heroName, setHeroName] = useState('');
  const [character, setCharacter] = useState({
    name: '',
    class: '',
    hp: 100,
    maxHp: 100,
    xp: 0,
    level: 1,
    mana: 50,
    maxMana: 50,
    inventory: []
  });
  const [currentDungeon, setCurrentDungeon] = useState(null);
  const [code, setCode] = useState('');
  const [battleResult, setBattleResult] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [showChat, setShowChat] = useState(false);
  const [doubts, setDoubts] = useState([]);
  const [newDoubt, setNewDoubt] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (apiService.isAuthenticated()) {
          const userData = await apiService.getCurrentUser();
          setUser(userData.user);
          setIsAuthenticated(true);
          
          // Load user character and progress
          if (userData.user.character) {
            setCharacter(prev => ({
              ...prev,
              ...userData.user.character,
              hp: userData.user.character.hp || 100,
              maxHp: userData.user.character.maxHp || 100,
              mana: userData.user.character.mana || 50,
              maxMana: userData.user.character.maxMana || 50
            }));
          }
          
          // Load progress
          const progressData = await apiService.getProgress();
          if (progressData.progress) {
            setCompleted(progressData.progress.filter(p => p.completed).map(p => p.dungeonId));
          }
          
          setCurrentPage(userData.user.character ? 'menu' : 'setup');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        apiService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle authentication success
  const handleAuthSuccess = async (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    apiService.setToken(token);
    
    // Set initial character data
    setCharacter(prev => ({
      ...prev,
      xp: userData.xp || 0,
      level: userData.level || 1
    }));
  };

  // Handle logout
  const handleLogout = () => {
    apiService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('setup');
    setCharacter({
      name: '',
      class: '',
      hp: 100,
      maxHp: 100,
      xp: 0,
      level: 1,
      mana: 50,
      maxMana: 50,
      inventory: []
    });
    setCompleted([]);
  };

  // Save character to backend
  const saveCharacter = async (characterData) => {
    try {
      await apiService.updateCharacter(characterData);
    } catch (error) {
      console.error('Failed to save character:', error);
    }
  };

  // Save progress to backend
  const saveProgress = async (dungeonId, completed, score = 0) => {
    try {
      await apiService.updateProgress({
        dungeonId,
        completed,
        score
      });
      
      if (completed && !completed.includes(dungeonId)) {
        setCompleted(prev => [...prev, dungeonId]);
      }
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  // Load doubts from backend
  useEffect(() => {
    const loadDoubts = async () => {
      try {
        const data = await apiService.getDoubts();
        setDoubts(data.doubts || []);
      } catch (error) {
        console.error('Failed to load doubts:', error);
      }
    };

    if (isAuthenticated) {
      loadDoubts();
    }
  }, [isAuthenticated]);

  const runCode = () => {
    if (!code.trim()) {
      setBattleResult('❌ Please write some code first!');
      return;
    }

    const dungeon = DUNGEON_LEVELS[selectedLang][currentDungeon - 1];
    let isCorrect = false;
    let feedback = '';

    // Simple validation logic (can be enhanced)
    if (selectedLang === 'python') {
      if (dungeon.id === 1) {
        isCorrect = code.includes('print(') && code.includes('"');
        feedback = isCorrect ? '✅ Perfect! Your spell works!' : '❌ Use print("message") format';
      } else if (dungeon.id === 2) {
        isCorrect = code.includes('=') && code.includes('print(');
        feedback = isCorrect ? '✅ Excellent! Variables mastered!' : '❌ Create a variable and print it';
      }
    } else if (selectedLang === 'javascript') {
      isCorrect = code.includes('console.log(');
      feedback = isCorrect ? '✅ Great job! Console mastery!' : '❌ Use console.log("message")';
    } else if (selectedLang === 'html') {
      isCorrect = code.includes('<') && code.includes('>');
      feedback = isCorrect ? '✅ HTML tags perfect!' : '❌ Remember to use <tag>content</tag>';
    } else if (selectedLang === 'css') {
      isCorrect = code.includes('{') && code.includes(':');
      feedback = isCorrect ? '✅ CSS styling success!' : '❌ Use selector { property: value; }';
    }

    if (isCorrect) {
      const newXp = character.xp + dungeon.reward.xp;
      const newLevel = Math.floor(newXp / 100) + 1;
      
      setCharacter(prev => ({
        ...prev,
        xp: newXp,
        level: newLevel,
        inventory: [...prev.inventory, dungeon.reward.item]
      }));

      setBattleResult(`🎉 Victory! You earned ${dungeon.reward.xp} XP and found ${dungeon.reward.item}!`);
      saveProgress(`${selectedLang}-${dungeon.id}`, true, dungeon.reward.xp);
      
      if (dungeon.quiz) {
        setTimeout(() => setShowQuiz(true), 2000);
      }
    } else {
      setCharacter(prev => ({ ...prev, hp: Math.max(0, prev.hp - 10) }));
      setBattleResult(feedback);
    }
  };

  const startDungeon = (lang, dungeonId) => {
    setSelectedLang(lang);
    setCurrentDungeon(dungeonId);
    const dungeon = DUNGEON_LEVELS[lang][dungeonId - 1];
    setCode(dungeon.example);
    setBattleResult(null);
    setShowQuiz(false);
    setQuizResult(null);
    setCurrentPage('battle');
  };

  const submitQuizAnswer = () => {
    const dungeon = DUNGEON_LEVELS[selectedLang][currentDungeon - 1];
    if (selectedAnswer === dungeon.quiz.correct) {
      setQuizResult('🎉 Quiz passed! +5 XP');
      setCharacter(prev => ({ ...prev, xp: prev.xp + 5 }));
    } else {
      setQuizResult(`❌ Wrong! ${dungeon.quiz.explanation}`);
    }
  };

  const startGame = () => {
    if (!heroName.trim() || !selectedLang) {
      alert('Please enter your hero name and select a class!');
      return;
    }

    const selectedCharacter = CHARACTERS[selectedLang];
    const newCharacter = {
      ...character,
      name: heroName,
      class: selectedLang,
      className: selectedCharacter.name,
      icon: selectedCharacter.icon,
      color: selectedCharacter.color
    };

    setCharacter(newCharacter);
    saveCharacter(newCharacter);
    setCurrentPage('menu');
  };

  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        bg: 'bg-gray-900',
        text: 'text-gray-100',
        primary: 'bg-blue-700',
        secondary: 'bg-gray-700',
        border: 'border-gray-700',
        inputBg: 'bg-gray-800',
        inputText: 'text-gray-100',
        placeholder: 'placeholder-gray-400',
        buttonHover: 'hover:bg-blue-600',
        buttonText: 'text-white',
      };
    } else {
      return {
        bg: 'bg-white',
        text: 'text-gray-900',
        primary: 'bg-blue-500',
        secondary: 'bg-gray-200',
        border: 'border-gray-200',
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        placeholder: 'placeholder-gray-500',
        buttonHover: 'hover:bg-blue-600',
        buttonText: 'text-white',
      };
    }
  };

  const colors = getThemeColors();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  // Setup Page
  if (currentPage === 'setup') {
    return (
      <div className={`min-h-screen ${colors.bg} ${colors.text} p-8`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Choose Your Hero
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {Object.entries(CHARACTERS).map(([lang, char]) => (
              <div
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedLang === lang 
                    ? 'border-blue-500 bg-blue-500/20' 
                    : `${colors.border} hover:border-blue-400`
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{char.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{char.name}</h3>
                    <div className="text-sm opacity-75">{lang.toUpperCase()}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {char.skills.map((skill, i) => (
                    <div key={i} className="text-sm">• {skill}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Enter your hero name..."
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              className={`w-full p-4 rounded-lg ${colors.inputBg} ${colors.border} ${colors.inputText} ${colors.placeholder} mb-4`}
            />
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600 transition"
            >
              Start Adventure
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Menu
  if (currentPage === 'menu') {
    return (
      <div className={`min-h-screen ${colors.bg} ${colors.text} p-8`}>
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Coding Quest</h1>
              <p>Welcome back, {user?.firstName || character.name}!</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg ${colors.secondary} hover:opacity-80`}
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Character Stats */}
          <div className={`${colors.secondary} p-6 rounded-xl mb-8`}>
            <div className="flex items-center gap-6">
              <div className="text-6xl">{character.icon}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
                <div className="text-sm opacity-75 mb-2">{character.className}</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm opacity-75">Level</div>
                    <div className="text-xl font-bold">{character.level}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">XP</div>
                    <div className="text-xl font-bold">{character.xp}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">HP</div>
                    <div className="text-xl font-bold">{character.hp}/{character.maxHp}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Mana</div>
                    <div className="text-xl font-bold">{character.mana}/{character.maxMana}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => setCurrentPage('dungeons')}
              className={`p-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              <div className="text-3xl mb-3">🏰</div>
              <h3 className="text-xl font-bold mb-2">Dungeons</h3>
              <p className="text-sm opacity-90">Battle coding monsters</p>
            </button>
            
            <button
              onClick={() => setCurrentPage('progress')}
              className={`p-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2">Progress</h3>
              <p className="text-sm opacity-90">View your achievements</p>
            </button>
            
            <button
              onClick={() => setCurrentPage('daily')}
              className={`p-6 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              <div className="text-3xl mb-3">📅</div>
              <h3 className="text-xl font-bold mb-2">Daily Challenges</h3>
              <p className="text-sm opacity-90">Complete daily quests</p>
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className={`${colors.secondary} p-6 rounded-xl mb-8`}>
              <h3 className="text-xl font-bold mb-4">Settings</h3>
              <div className="flex items-center gap-4">
                <span>Theme:</span>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`p-2 rounded-lg ${colors.primary} text-white`}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Dungeons Page
  if (currentPage === 'dungeons') {
    return (
      <div className={`min-h-screen ${colors.bg} ${colors.text} p-8`}>
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setCurrentPage('menu')}
            className="mb-6 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Menu</span>
          </button>
          
          <h1 className="text-3xl font-bold mb-8">Choose Your Dungeon</h1>
          
          <div className="space-y-8">
            {Object.entries(DUNGEON_LEVELS).map(([lang, dungeons]) => (
              <div key={lang}>
                <h2 className="text-2xl font-bold mb-4 capitalize">{lang} Dungeons</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dungeons.map((dungeon) => {
                    const isCompleted = completed.includes(`${lang}-${dungeon.id}`);
                    return (
                      <div
                        key={dungeon.id}
                        onClick={() => startDungeon(lang, dungeon.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          isCompleted 
                            ? 'border-green-500 bg-green-500/20 hover:bg-green-500/30' 
                            : `${colors.border} hover:border-blue-400 hover:bg-blue-500/10`
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-lg">
                            {isCompleted ? '✅' : '🔒'} {dungeon.name}
                          </h3>
                          <div className="text-2xl">
                            {isCompleted ? '🏆' : '⚔️'}
                          </div>
                        </div>
                        <p className="text-sm mb-4 opacity-90">{dungeon.description}</p>
                        <div className="text-xs opacity-75 bg-black/20 p-2 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span>Reward: {dungeon.reward.xp} XP</span>
                            <span>{dungeon.reward.item}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Battle Page
  if (currentPage === 'battle') {
    const dungeon = DUNGEON_LEVELS[selectedLang][currentDungeon - 1];
    
    return (
      <div className={`min-h-screen ${colors.bg} ${colors.text} p-8`}>
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setCurrentPage('dungeons')}
            className="mb-6 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Dungeons</span>
          </button>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Battle Arena */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Battle Arena</h2>
              <div className={`${colors.secondary} p-6 rounded-xl mb-4`}>
                <h3 className="text-xl font-bold mb-2">{dungeon.monster}</h3>
                <p className="mb-4">{dungeon.description}</p>
                <div className="text-sm opacity-75">
                  <p>Challenge: {dungeon.challenge}</p>
                  <p>Reward: {dungeon.reward.xp} XP, {dungeon.reward.item}</p>
                </div>
              </div>
              
              {battleResult && (
                <div className={`p-4 rounded-lg mb-4 ${
                  battleResult.includes('✅') || battleResult.includes('🎉')
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {battleResult}
                </div>
              )}
              
              <button
                onClick={runCode}
                className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white p-6 rounded-xl font-bold text-lg hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <span className="text-2xl">⚔️</span>
                <span>Attack!</span>
              </button>
            </div>
            
            {/* Code Editor */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Spell</h2>
              <div className="border-2 border-gray-700 rounded-xl overflow-hidden">
                <Editor
                  height="400px"
                  language={selectedLang}
                  theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>
              
              <div className={`${colors.secondary} p-4 rounded-xl mt-4`}>
                <h4 className="font-bold mb-2">💡 Hint:</h4>
                <p className="text-sm">{dungeon.hint}</p>
                
                <h4 className="font-bold mb-2 mt-4">📝 Steps:</h4>
                <ol className="text-sm space-y-1">
                  {dungeon.steps.map((step, i) => (
                    <li key={i}>{i + 1}. {step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          
          {/* Quiz Modal */}
          {showQuiz && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className={`${colors.bg} p-6 rounded-xl max-w-md w-full`}>
                <h3 className="text-xl font-bold mb-4">Knowledge Check</h3>
                <p className="mb-4">{dungeon.quiz.question}</p>
                <div className="space-y-2 mb-4">
                  {dungeon.quiz.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedAnswer(i)}
                      className={`w-full p-3 text-left rounded-lg border-2 ${
                        selectedAnswer === i
                          ? 'border-blue-500 bg-blue-500/20'
                          : `${colors.border}`
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {quizResult && (
                  <div className={`p-3 rounded-lg mb-4 ${
                    quizResult.includes('✅') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {quizResult}
                  </div>
                )}
                <button
                  onClick={submitQuizAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Submit Answer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Progress Page
  if (currentPage === 'progress') {
    return (
      <div className={`min-h-screen ${colors.bg} ${colors.text} p-8`}>
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setCurrentPage('menu')}
            className="mb-6 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Menu</span>
          </button>
          
          <ProgressDashboard 
            character={character}
            completed={completed}
            totalDungeons={Object.values(DUNGEON_LEVELS).flat().length}
          />
        </div>
      </div>
    );
  }

  // Daily Challenges Page
  if (currentPage === 'daily') {
    return (
      <div className={`min-h-screen ${colors.bg} ${colors.text} p-8`}>
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setCurrentPage('menu')}
            className="mb-6 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Menu</span>
          </button>
          
          <DailyChallenges />
        </div>
      </div>
    );
  }

  return null;
}

export default App;
