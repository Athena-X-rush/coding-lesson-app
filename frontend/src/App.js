import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, CheckCircle, BookOpen, Code, Trophy, MessageCircle, Flame, ChevronRight, Star, Sun, Moon } from 'lucide-react';
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
      example: 'name = "Alice"\nprint(name)',
      hint: 'First create a variable, then print it',
      quiz: {
        question: 'How do you create a variable in Python?',
        options: [
          'var name = "Alice"',
          'let name = "Alice"',
          'name = "Alice"',
          'const name = "Alice"'
        ],
        correct: 2,
        explanation: 'In Python, variables are created simply with: name = "value"'
      }
    },
    {
      id: 3,
      name: 'Function Fortress',
      monster: 'Logic Dragon',
      challenge: 'Numbers & Math',
      description: 'The dragon breathes math problems! Use calculations to defeat it.',
      reward: { xp: 30, item: 'Fire Spell' },
      boss: true,
      steps: [
        'Create a variable for math: result = 5 + 3',
        'Print the result: print(result)',
        'Click "Attack!" to defeat the dragon!'
      ],
      example: 'result = 5 + 3\nprint(result)',
      hint: 'Use + for addition, then print the result',
      quiz: {
        question: 'What will be the output of: print(5 + 3 * 2)?',
        options: [
          '16',
          '11',
          '10',
          '13'
        ],
        correct: 1,
        explanation: 'Python follows order of operations: 5 + (3 * 2) = 5 + 6 = 11'
      }
    }
  ],
  javascript: [
    {
      id: 1,
      name: 'Console Catacombs',
      monster: 'Undefined Ghost',
      challenge: 'Console Log',
      description: 'A ghost haunts this area! Use console.log() to banish it.',
      reward: { xp: 10, item: 'Ghost Bane' },
      boss: false,
      steps: [
        'Start by typing: console.log()',
        'Add your message inside quotes: "Hello, World!"',
        'Place the message inside the parentheses: console.log("Hello, World!")',
        'Don\'t forget the semicolon at the end!',
        'Click "Attack!" to banish the ghost!'
      ],
      example: 'console.log("Hello, World!");',
      hint: 'Use console.log() with a semicolon at the end',
      quiz: {
        question: 'How do you output to console in JavaScript?',
        options: [
          'print("Hello")',
          'console.log("Hello")',
          'echo "Hello"',
          'log("Hello")'
        ],
        correct: 1,
        explanation: 'JavaScript uses console.log() to output to the console.'
      }
    },
    {
      id: 2,
      name: 'Variable Crypt',
      monster: 'Null Skeleton',
      challenge: 'Variables',
      description: 'Skeleton guards demand variable declarations!',
      reward: { xp: 20, item: 'Bone Charm' },
      boss: false,
      steps: [
        'First, declare your variable: let name = "Your Name"',
        'Then use console.log() to show it: console.log(name)',
        'Remember the semicolon!',
        'Click "Attack!" to defeat the skeleton!'
      ],
      example: 'let name = "Alice";\nconsole.log(name);',
      hint: 'Use let to declare variables, then console.log()',
      quiz: {
        question: 'What is the modern way to declare variables in JavaScript?',
        options: [
          'var name = "Alice"',
          'variable name = "Alice"',
          'let name = "Alice"',
          'name = "Alice"'
        ],
        correct: 2,
        explanation: 'Modern JavaScript uses let (or const) to declare variables.'
      }
    },
    {
      id: 3,
      name: 'Function Tower',
      monster: 'Async Demon',
      challenge: 'Numbers & Math',
      description: 'A demon challenges your JavaScript math skills!',
      reward: { xp: 30, item: 'Lightning Bolt' },
      boss: true,
      steps: [
        'Create a variable for math: let result = 5 + 3',
        'Log the result: console.log(result)',
        'Remember semicolons!',
        'Click "Attack!" to defeat the demon!'
      ],
      example: 'let result = 5 + 3;\nconsole.log(result);',
      hint: 'Use let for variables, console.log() for output',
      quiz: {
        question: 'What does === mean in JavaScript?',
        options: [
          'Assignment',
          'Equality check (type and value)',
          'Equality check (value only)',
          'Not equal'
        ],
        correct: 1,
        explanation: '=== checks both value and type (strict equality).'
      }
    }
  ],
  html: [
    {
      id: 1,
      name: 'Tag Temple',
      monster: 'Broken Tag Beast',
      challenge: 'Hello HTML',
      description: 'A beast made of broken HTML tags blocks your path! Create proper tags to defeat it.',
      reward: { xp: 10, item: 'Tag Cleaner' },
      boss: false,
      steps: [
        'Start with opening tag: <h1>',
        'Add your text: Hello World',
        'Close with closing tag: </h1>',
        'Complete: <h1>Hello World</h1>',
        'Click "Attack!" to defeat the beast!'
      ],
      example: '<h1>Hello World</h1>',
      hint: 'HTML tags need opening and closing tags',
      quiz: {
        question: 'Which is the correct way to create a heading in HTML?',
        options: [
          '<heading>Hello</heading>',
          '<h1>Hello</h1>',
          '<head>Hello</head>',
          '<title>Hello</title>'
        ],
        correct: 1,
        explanation: 'HTML uses <h1> to <h6> for headings, with matching closing tags.'
      }
    },
    {
      id: 2,
      name: 'Link Labyrinth',
      monster: 'Dead Link Demon',
      challenge: 'Links & Images',
      description: 'A demon guards the path with broken links and images! Create proper elements to pass.',
      reward: { xp: 20, item: 'Hyperlink Sword' },
      boss: false,
      steps: [
        'Create a link: <a href="https://example.com">Click me</a>',
        'Add an image: <img src="image.jpg" alt="Description">',
        'Combine elements in HTML structure',
        'Click "Attack!" to defeat the demon!'
      ],
      example: '<a href="https://example.com">Visit Site</a>\n<img src="hero.jpg" alt="Hero Image">',
      hint: 'Links use <a> tags, images use <img> tags with src and alt attributes',
      quiz: {
        question: 'What is the correct attribute for an image source in HTML?',
        options: [
          'source="image.jpg"',
          'src="image.jpg"',
          'href="image.jpg"',
          'url="image.jpg"'
        ],
        correct: 1,
        explanation: 'Images use the src attribute to specify the image source.'
      }
    },
    {
      id: 3,
      name: 'Form Fortress',
      monster: 'Validation Hydra',
      challenge: 'Forms & Input',
      description: 'A multi-headed hydra demands proper form structure! Create forms to defeat it.',
      reward: { xp: 30, item: 'Form Shield' },
      boss: true,
      steps: [
        'Create a form: <form></form>',
        'Add input field: <input type="text" name="username">',
        'Add submit button: <button type="submit">Submit</button>',
        'Complete: <form><input type="text" name="username"><button type="submit">Submit</button></form>',
        'Click "Attack!" to defeat the hydra!'
      ],
      example: '<form>\n  <input type="text" name="username" placeholder="Enter name">\n  <button type="submit">Submit</button>\n</form>',
      hint: 'Forms contain input elements with different types and names',
      quiz: {
        question: 'Which input type would you use for a password field?',
        options: [
          '<input type="text">',
          '<input type="password">',
          '<input type="secret">',
          '<input type="hidden">'
        ],
        correct: 1,
        explanation: 'Use type="password" for password fields that hide the input.'
      }
    }
  ],
  css: [
    {
      id: 1,
      name: 'Style Sanctum',
      monster: 'Ugly Goblin',
      challenge: 'Basic Styling',
      description: 'An ugly goblin with bad styling! Use CSS to make it beautiful.',
      reward: { xp: 15, item: 'Color Palette' },
      boss: false,
      steps: [
        'Select the element: body',
        'Add background color: background-color: blue',
        'Add text color: color: white',
        'Complete: body { background-color: blue; color: white; }',
        'Click "Attack!" to defeat the goblin!'
      ],
      example: 'body {\n  background-color: blue;\n  color: white;\n}',
      hint: 'CSS styles HTML elements with properties',
      quiz: {
        question: 'What does CSS stand for?',
        options: [
          'Computer Style Sheets',
          'Creative Style Sheets',
          'Cascading Style Sheets',
          'Colorful Style Sheets'
        ],
        correct: 2,
        explanation: 'CSS stands for Cascading Style Sheets.'
      }
    },
    {
      id: 2,
      name: 'Layout Labyrinth',
      monster: 'Position Phantom',
      challenge: 'Layout & Positioning',
      description: 'A phantom messes with element positions! Use CSS layout properties to defeat it.',
      reward: { xp: 25, item: 'Layout Compass' },
      boss: false,
      steps: [
        'Set display: flex for container',
        'Add justify-content: center',
        'Add align-items: center',
        'Complete: .container { display: flex; justify-content: center; align-items: center; }',
        'Click "Attack!" to defeat the phantom!'
      ],
      example: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}',
      hint: 'Flexbox helps with layout using display, justify-content, and align-items',
      quiz: {
        question: 'Which CSS property is used to center items horizontally in a flex container?',
        options: [
          'align-items: center',
          'justify-content: center',
          'text-align: center',
          'margin: auto'
        ],
        correct: 1,
        explanation: 'justify-content: center centers items horizontally in a flex container.'
      }
    },
    {
      id: 3,
      name: 'Animation Abyss',
      monster: 'Static Stone Golem',
      challenge: 'Animations & Transitions',
      description: 'A stone golem refuses to move! Use CSS animations to bring it to life.',
      reward: { xp: 35, item: 'Animation Staff' },
      boss: true,
      steps: [
        'Create keyframes: @keyframes bounce',
        'Add animation property: animation: bounce 2s infinite',
        'Define animation steps: 0%, 50%, 100%',
        'Complete: @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }',
        'Click "Attack!" to defeat the golem!'
      ],
      example: '@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}\n.golem {\n  animation: bounce 2s infinite;\n}',
      hint: 'CSS animations use @keyframes and animation properties',
      quiz: {
        question: 'What CSS property controls the duration of an animation?',
        options: [
          'animation-duration',
          'animation-time',
          'animation-speed',
          'animation-length'
        ],
        correct: 0,
        explanation: 'animation-duration controls how long an animation takes to complete.'
      }
    }
  ]
};

const CHARACTERS = {
  python: {
    name: 'Python Mage',
    icon: '🧙‍♂️',
    color: 'from-blue-500 to-purple-600',
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    level: 1,
    xp: 0,
    inventory: []
  },
  javascript: {
    name: 'JavaScript Warrior',
    icon: '⚔️',
    color: 'from-yellow-500 to-orange-600',
    health: 120,
    maxHealth: 120,
    mana: 40,
    maxMana: 40,
    level: 1,
    xp: 0,
    inventory: []
  },
  html: {
    name: 'HTML Knight',
    icon: '🛡️',
    color: 'from-orange-500 to-red-600',
    health: 110,
    maxHealth: 110,
    mana: 45,
    maxMana: 45,
    level: 1,
    xp: 0,
    inventory: []
  },
  css: {
    name: 'CSS Sorceress',
    icon: '🧙‍♀️',
    color: 'from-pink-500 to-purple-600',
    health: 90,
    maxHealth: 90,
    mana: 55,
    maxMana: 55,
    level: 1,
    xp: 0,
    inventory: []
  }
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [selectedLang, setSelectedLang] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [completed, setCompleted] = useState([]);
  const [showBattle, setShowBattle] = useState(false);
  const [battleResult, setBattleResult] = useState(null);
  const [currentPage, setCurrentPage] = useState('dungeon');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [battleLevel, setBattleLevel] = useState(null);
  
  const [character, setCharacter] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [showSetup, setShowSetup] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [globalDoubts, setGlobalDoubts] = useState([]);

  const currentDungeon = selectedLang ? DUNGEON_LEVELS[selectedLang][currentLevel] : null;

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    const storedLang = localStorage.getItem('selectedLang');
    
    if (!storedUserId) {
      const newUserId = 'player_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
      setShowSetup(true);
    } else {
      setUserId(storedUserId);
      if (!storedUsername || !storedLang) {
        setShowSetup(true);
      } else {
        setUsername(storedUsername);
        setSelectedLang(storedLang);
        setCharacter(CHARACTERS[storedLang]);
        loadUserData();
      }
    }
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    // Always try to load localStorage data even if user is set up
    const savedXp = localStorage.getItem('xp');
    const savedCompleted = localStorage.getItem('completed');
    const savedInventory = localStorage.getItem('inventory');
    
    if (savedXp && character) {
      const xp = parseInt(savedXp);
      setCharacter(prev => ({
        ...prev,
        xp: xp,
        level: Math.floor(xp / 100) + 1
      }));
    }
    
    if (savedCompleted) {
      setCompleted(JSON.parse(savedCompleted));
    }
    
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  const loadUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCharacter(prev => ({
          ...prev,
          xp: data.xp || 0,
          level: Math.floor((data.xp || 0) / 100) + 1
        }));
        setCompleted(data.completed || []);
        setInventory(data.inventory || []);
      }
    } catch (error) {
      console.log('Backend not available, loading from localStorage');
      // Load from localStorage as fallback
      const savedXp = localStorage.getItem('xp');
      const savedCompleted = localStorage.getItem('completed');
      const savedInventory = localStorage.getItem('inventory');
      
      if (savedXp) {
        const xp = parseInt(savedXp);
        setCharacter(prev => ({
          ...prev,
          xp: xp,
          level: Math.floor(xp / 100) + 1
        }));
      }
      
      if (savedCompleted) {
        setCompleted(JSON.parse(savedCompleted));
      }
      
      if (savedInventory) {
        setInventory(JSON.parse(savedInventory));
      }
    }
  };

  // Load real leaderboard data
  const loadLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/leaderboard');
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data);
      }
    } catch (error) {
      console.log('Backend not available, showing empty leaderboard');
      setLeaderboard([]);
    }
  };

  // Load leaderboard on component mount and when currentPage changes
  useEffect(() => {
    if (currentPage === 'leaderboard') {
      loadLeaderboard();
    }
  }, [currentPage]);

  const saveUserData = async () => {
    // Always save to localStorage first (primary storage)
    localStorage.setItem('xp', character.xp.toString());
    localStorage.setItem('completed', JSON.stringify(completed));
    localStorage.setItem('inventory', JSON.stringify(inventory));
    
    // Try to also save to backend if available
    try {
      const response = await fetch('http://localhost:5001/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          username,
          xp: character.xp,
          completed,
          inventory
        })
      });
      
      if (!response.ok) {
        console.log('Backend save failed, but localStorage saved successfully');
      }
    } catch (error) {
      console.log('Backend not available, but localStorage saved successfully');
    }
  };

  const saveUsername = () => {
    if (username.trim() && selectedLang) {
      localStorage.setItem('username', username);
      localStorage.setItem('selectedLang', selectedLang);
      setCharacter(CHARACTERS[selectedLang]);
      setShowSetup(false);
      saveUserData();
    }
  };

  const runCode = () => {
    // Clear previous battle results when trying new code
    setBattleResult(null);
    
    let result = '';
    let errorMessage = '';
    
    if (selectedLang === 'python') {
      if (code.includes('print(')) {
        const printMatch = code.match(/print\(["\'](.+?)["\']/);
        if (printMatch) {
          result = printMatch[1];
        } else {
          const varMatch = code.match(/print\((\w+)\)/);
          if (varMatch) {
            const varName = varMatch[1];
            const varLine = code.match(new RegExp(varName + '\\s*=\\s*["\'](.+?)["\']'));
            if (varLine) {
              result = varLine[1];
            } else {
              const numLine = code.match(new RegExp(varName + '\\s*=\\s*(.+)'));
              if (numLine) {
                try {
                  result = eval(numLine[1]);
                } catch (e) {
                  errorMessage = `Variable "${varName}" not found or invalid expression`;
                }
              } else {
                errorMessage = `Variable "${varName}" not defined`;
              }
            }
          } else {
            errorMessage = 'Invalid print() syntax. Use: print("text") or print(variable)';
          }
        }
      } else if (code.includes('+') || code.includes('-') || code.includes('*') || code.includes('/')) {
        const mathMatch = code.match(/result\s*=\s*(.+)/);
        if (mathMatch) {
          try {
            result = eval(mathMatch[1]);
          } catch (e) {
            errorMessage = 'Invalid math expression. Check your syntax.';
          }
        } else {
          errorMessage = 'Math expressions should be assigned to result variable. Use: result = 5 + 3';
        }
      } else {
        errorMessage = 'No valid Python code found. Try: print("Hello, World!") or result = 5 + 3';
      }
    } else if (selectedLang === 'javascript') {
      if (code.includes('console.log(')) {
        const logMatch = code.match(/console\.log\(["\'](.+?)["\']/);
        if (logMatch) {
          result = logMatch[1];
        } else {
          const varMatch = code.match(/console\.log\((\w+)\)/);
          if (varMatch) {
            const varName = varMatch[1];
            const varLine = code.match(new RegExp(varName + '\\s*=\\s*["\'](.+?)["\']'));
            if (varLine) {
              result = varLine[1];
            } else {
              const numLine = code.match(new RegExp(varName + '\\s*=\\s*(.+)'));
              if (numLine) {
                try {
                  result = eval(numLine[1]);
                } catch (e) {
                  errorMessage = `Variable "${varName}" not found or invalid expression`;
                }
              } else {
                errorMessage = `Variable "${varName}" not defined`;
              }
            }
          } else {
            errorMessage = 'Invalid console.log() syntax. Use: console.log("text") or console.log(variable)';
          }
        }
      } else {
        errorMessage = 'No valid JavaScript code found. Try: console.log("Hello, World!")';
      }
    } else if (selectedLang === 'html') {
      // HTML validation - check for proper tag structure
      const cleanCode = code.trim();
      
      if (cleanCode === '') {
        errorMessage = 'Please write some HTML code. Try: <h1>Hello World</h1>';
      } else if (cleanCode.includes('<h1>') && cleanCode.includes('</h1>')) {
        result = 'HTML heading created successfully';
      } else if (cleanCode.includes('<h2>') && cleanCode.includes('</h2>')) {
        result = 'HTML heading created successfully';
      } else if (cleanCode.includes('<p>') && cleanCode.includes('</p>')) {
        result = 'HTML paragraph created successfully';
      } else if (cleanCode.includes('<a href=') && cleanCode.includes('</a>')) {
        result = 'HTML link created successfully';
      } else if (cleanCode.includes('<img src=') && cleanCode.includes('>')) {
        result = 'HTML image created successfully';
      } else if (cleanCode.includes('<form>') && cleanCode.includes('</form>')) {
        result = 'HTML form created successfully';
      } else if (cleanCode.includes('<input') && cleanCode.includes('>')) {
        result = 'HTML input created successfully';
      } else if (cleanCode.includes('<button') && cleanCode.includes('</button>')) {
        result = 'HTML button created successfully';
      } else if (cleanCode.includes('<a') && cleanCode.includes('<img')) {
        // Multiple tags case - link and image together
        const hasValidLink = cleanCode.includes('<a href=') && cleanCode.includes('</a>');
        const hasValidImage = cleanCode.includes('<img src=') && cleanCode.includes('alt=');
        if (hasValidLink && hasValidImage) {
          result = 'HTML link and image created successfully';
        } else if (hasValidLink) {
          result = 'HTML link created successfully';
        } else if (hasValidImage) {
          result = 'HTML image created successfully';
        } else {
          errorMessage = 'Invalid HTML syntax. Check link and image tags.';
        }
      } else if (cleanCode.includes('<') && cleanCode.includes('>')) {
        // Generic HTML tag detection
        const tagMatch = cleanCode.match(/<(\w+)[^>]*>/);
        if (tagMatch) {
          const tagName = tagMatch[1];
          const closingTag = `</${tagName}>`;
          if (cleanCode.includes(closingTag)) {
            result = `HTML ${tagName} element created successfully`;
          } else {
            errorMessage = `HTML ${tagName} element found but missing closing tag </${tagName}>`;
          }
        } else {
          errorMessage = 'Invalid HTML tag syntax. Check your tag structure.';
        }
      } else {
        errorMessage = 'No valid HTML tags found. Try: <h1>Hello World</h1>';
      }
    } else if (selectedLang === 'css') {
      // CSS validation - check for proper CSS structure
      const cleanCode = code.trim();
      
      if (cleanCode === '') {
        errorMessage = 'Please write some CSS code. Try: body { color: white; }';
      } else if (cleanCode.includes('{') && cleanCode.includes('}')) {
        const selectorMatch = cleanCode.match(/([^{]+)\s*\{/);
        if (selectorMatch) {
          const selector = selectorMatch[1].trim();
          result = `CSS rule for "${selector}" created successfully`;
        } else {
          result = 'CSS rule created successfully';
        }
      } else if (cleanCode.includes('color:')) {
        result = 'CSS color property set successfully';
      } else if (cleanCode.includes('background-color:')) {
        result = 'CSS background-color property set successfully';
      } else if (cleanCode.includes('font-size:')) {
        result = 'CSS font-size property set successfully';
      } else if (cleanCode.includes('display:')) {
        result = 'CSS display property set successfully';
      } else if (cleanCode.includes('margin:')) {
        result = 'CSS margin property set successfully';
      } else if (cleanCode.includes('padding:')) {
        result = 'CSS padding property set successfully';
      } else if (cleanCode.includes('@keyframes')) {
        result = 'CSS animation keyframes created successfully';
      } else if (cleanCode.includes('animation:')) {
        result = 'CSS animation property set successfully';
      } else if (cleanCode.includes('transform:')) {
        result = 'CSS transform property set successfully';
      } else if (cleanCode.includes('justify-content:')) {
        result = 'CSS justify-content property set successfully';
      } else if (cleanCode.includes('align-items:')) {
        result = 'CSS align-items property set successfully';
      } else {
        errorMessage = 'Invalid CSS syntax. Try: body { color: white; } or p { font-size: 16px; }';
      }
    }
    
    setOutput(result);
    console.log("Code result:", result);
    console.log("Error message:", errorMessage);

    if (showBattle) {
      if (errorMessage !== '') {
        // Show specific error message
        setBattleResult({
          victory: false,
          damage: 0,
          xp: 0,
          error: errorMessage
        });
        // Don't end battle, let user try again
      } else if (result !== '') {
        // Valid code, proceed with battle
        const success = Math.random() > 0.3;
        console.log("Battle success:", success);
        if (success) {
          setBattleResult({
            victory: true,
            damage: Math.floor(Math.random() * 30) + 20,
            xp: currentDungeon.reward.xp
          });
          const newXp = character.xp + currentDungeon.reward.xp;
          const newLevel = Math.floor(newXp / 100) + 1;
          setCharacter(prev => ({
            ...prev,
            xp: newXp,
            level: newLevel,
            health: Math.min(prev.health + 10, prev.maxHealth)
          }));
          setCompleted([...completed, `${selectedLang}-${currentLevel}`]);
          const newInventory = [...inventory, currentDungeon.reward.item];
          setInventory(newInventory);
          saveUserData();
          setShowBattle(false);
        } else {
          setBattleResult({
            victory: false,
            damage: Math.floor(Math.random() * 20) + 10,
            xp: 0
          });
          const newHealth = Math.max(character.health - 15, 0);
          setCharacter(prev => ({
            ...prev,
            health: newHealth
          }));
          
          // Check if health reached 0 - GAME OVER
          if (newHealth === 0) {
            setTimeout(() => {
              setBattleResult({
                victory: false,
                damage: 0,
                xp: 0,
                gameOver: true,
                message: "Your hero has fallen! Game Over!"
              });
            }, 2000);
          }
          setShowBattle(false);
        }
      }
    }
  };

  const useHint = () => {
    if (character.mana >= 10) {
      setCharacter(prev => ({
        ...prev,
        mana: prev.mana - 10
      }));
      
      let hintText = '';
      if (selectedLang === 'python') {
        if (currentLevel === 0) {
          hintText = 'Try: print("Hello, World!")';
        } else if (currentLevel === 1) {
          hintText = 'Try: name = "Your Name"\nprint(name)';
        } else if (currentLevel === 2) {
          hintText = 'Try: result = 5 + 3\nprint(result)';
        }
      } else if (selectedLang === 'javascript') {
        if (currentLevel === 0) {
          hintText = 'Try: console.log("Hello, World!");';
        } else if (currentLevel === 1) {
          hintText = 'Try: let name = "Your Name";\nconsole.log(name);';
        } else if (currentLevel === 2) {
          hintText = 'Try: let result = 5 + 3;\nconsole.log(result);';
        }
      } else if (selectedLang === 'html') {
        if (currentLevel === 0) {
          hintText = 'Try: <h1>Hello World</h1>';
        } else if (currentLevel === 1) {
          hintText = 'Try: <a href="https://example.com">Visit Site</a>\n<img src="hero.jpg" alt="Hero Image">';
        } else if (currentLevel === 2) {
          hintText = 'Try: <form>\n  <input type="text" name="username" placeholder="Enter name">\n  <button type="submit">Submit</button>\n</form>';
        }
      } else if (selectedLang === 'css') {
        if (currentLevel === 0) {
          hintText = 'Try: body {\n  background-color: blue;\n  color: white;\n}';
        } else if (currentLevel === 1) {
          hintText = 'Try: .container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}';
        } else if (currentLevel === 2) {
          hintText = 'Try: @keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}\n.golem {\n  animation: bounce 2s infinite;\n}';
        }
      }
      
      setCode(hintText);
      saveUserData();
    }
  };

  const restoreMana = () => {
    setCharacter(prev => ({
      ...prev,
      mana: prev.maxMana
    }));
    saveUserData();
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setQuizResult(null);
    setSelectedAnswer(null);
  };

  const submitQuizAnswer = () => {
    if (selectedAnswer !== null && currentDungeon.quiz) {
      const isCorrect = selectedAnswer === currentDungeon.quiz.correct;
      setQuizResult({
        correct: isCorrect,
        answer: selectedAnswer,
        explanation: currentDungeon.quiz.explanation
      });
      
      if (isCorrect) {
        const bonusXp = 5;
        setCharacter(prev => ({
          ...prev,
          xp: prev.xp + bonusXp,
          level: Math.floor((prev.xp + bonusXp) / 100) + 1
        }));
        saveUserData();
      }
    }
  };

  const startBattle = () => {
    setBattleLevel(currentLevel);
    setShowBattle(true);
    setBattleResult(null);
    setCode('');
    setCurrentPage('battle');
  };

  const nextLevel = () => {
    if (currentLevel < DUNGEON_LEVELS[selectedLang].length - 1) {
      setCurrentLevel(currentLevel + 1);
      setShowBattle(false);
      setBattleResult(null);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Child-friendly theme colors
  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        bg: 'bg-gray-900',
        text: 'text-gray-100',
        button: 'bg-gray-800 hover:bg-gray-700 text-white',
        border: 'border-gray-600'
      };
    } else {
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-900',
        button: 'bg-blue-200 hover:bg-blue-300 text-blue-900',
        border: 'border-blue-300'
      };
    }
  };

  return (
    <>
      {/* Setup Modal */}
      {showSetup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-md w-full`}>
            <h2 className="text-2xl font-bold mb-4">Welcome to Code Dungeon! 🏰</h2>
            <p className="mb-6">Choose your hero name to begin your adventure:</p>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your hero name..."
              className={`w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500 ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              maxLength={20}
            />
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => setSelectedLang('python')}
                className={`py-3 rounded-lg font-medium transition-colors ${
                  selectedLang === 'python' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                🧙‍♂️ Python Mage
              </button>
              <button
                onClick={() => setSelectedLang('javascript')}
                className={`py-3 rounded-lg font-medium transition-colors ${
                  selectedLang === 'javascript' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                ⚔️ JavaScript Warrior
              </button>
              <button
                onClick={() => setSelectedLang('html')}
                className={`py-3 rounded-lg font-medium transition-colors ${
                  selectedLang === 'html' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                🛡️ HTML Knight
              </button>
              <button
                onClick={() => setSelectedLang('css')}
                className={`py-3 rounded-lg font-medium transition-colors ${
                  selectedLang === 'css' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                🧙‍♀️ CSS Sorceress
              </button>
            </div>
            <button
              onClick={saveUsername}
              disabled={!username.trim() || !selectedLang}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-white"
            >
              Start Adventure!
            </button>
            <p className="text-xs text-gray-400 mt-4">
              Choose a hero name and select your character to begin!
            </p>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && currentDungeon.quiz && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                🧪 Knowledge Challenge
              </h2>
              <button
                onClick={() => setShowQuiz(false)}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                ✕
              </button>
            </div>
            
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-6 mb-6`}>
              <h3 className="text-lg font-bold mb-4">{currentDungeon.quiz.question}</h3>
              
              <div className="space-y-3">
                {currentDungeon.quiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      selectedAnswer === idx
                        ? quizResult
                          ? quizResult.correct && idx === quizResult.answer
                            ? 'border-green-500 bg-green-500/20'
                            : !quizResult.correct && idx === quizResult.answer
                              ? 'border-red-500 bg-red-500/20'
                              : 'border-gray-300 bg-gray-300/20'
                          : 'border-blue-500 bg-blue-500/20'
                        : theme === 'dark' 
                          ? 'border-gray-600 hover:border-gray-500' 
                          : 'border-gray-300 hover:border-gray-400'
                    }`}
                    disabled={quizResult !== null}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === idx
                          ? quizResult
                            ? quizResult.correct && idx === quizResult.answer
                              ? 'border-green-500 bg-green-500'
                              : !quizResult.correct && idx === quizResult.answer
                                ? 'border-red-500 bg-red-500'
                                : 'border-gray-400 bg-gray-400'
                            : 'border-blue-500 bg-blue-500'
                          : theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
                      }`}>
                        {selectedAnswer === idx && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                      <span className={selectedAnswer === idx ? 'font-medium' : ''}>
                        {option}
                      </span>
                      {quizResult && idx === currentDungeon.quiz.correct && (
                        <span className="ml-auto text-green-500">✓ Correct</span>
                      )}
                      {quizResult && selectedAnswer === idx && !quizResult.correct && (
                        <span className="ml-auto text-red-500">✗ Wrong</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {quizResult && (
              <div className={`p-4 rounded-lg mb-6 ${
                quizResult.correct 
                  ? 'bg-green-500/20 border border-green-500' 
                  : 'bg-red-500/20 border border-red-500'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{quizResult.correct ? '🎉' : '💡'}</span>
                  <span className="font-bold">
                    {quizResult.correct ? 'Correct!' : 'Not quite!'}
                  </span>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {currentDungeon.quiz.explanation}
                </p>
                {quizResult.correct && (
                  <p className="text-green-400 font-medium mt-2">+5 Bonus XP Earned!</p>
                )}
              </div>
            )}

            <div className="flex gap-3">
              {!quizResult ? (
                <button
                  onClick={submitQuizAnswer}
                  disabled={selectedAnswer === null}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-bold"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={() => setShowQuiz(false)}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
                >
                  Close Quiz
                </button>
              )}
              <button
                onClick={() => setShowQuiz(false)}
                className={`px-6 py-3 rounded-xl font-bold ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Left Sidebar */}
        <div className={`w-64 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className={`bg-gradient-to-r ${character ? character.color : 'from-gray-500 to-gray-600'} p-3 rounded-lg flex items-center justify-center`}>
                <span className="text-3xl">{character ? character.icon : '👤'}</span>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold">{character ? character.name : 'No Hero Selected'}</h1>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {character ? `Level ${character.level} • ${character.xp} XP` : 'Choose your hero'}
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-blue-200 hover:bg-blue-300 text-blue-900'
                }`}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? '🌙' : '🌞'}
              </button>
            </div>

            {character ? (
              <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-4 mb-6`}>
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <span>⚔️ Battle Stats</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Health</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-300 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs">{character.health}/{character.maxHealth}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Mana</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-300 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(character.mana / character.maxMana) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs">{character.mana}/{character.maxMana}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSetup(true)}
                  className={`w-full mt-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  🔄 Switch Hero
                </button>
              </div>
            ) : (
              <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-4 mb-6 text-center`}>
                <div className="text-4xl mb-2">👤</div>
                <p className="text-sm font-medium mb-3">No Hero Selected</p>
                <button
                  onClick={() => setShowSetup(true)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm"
                >
                  Choose Your Hero
                </button>
              </div>
            )}

            <nav className="space-y-2">
              {[
                { id: 'dungeon', icon: '🏰', label: 'Dungeon' },
                { id: 'quiz', icon: '🧪', label: 'Knowledge Challenge' },
                { id: 'leaderboard', icon: '🏆', label: 'Heroes' },
                { id: 'chat', icon: '💬', label: 'Tavern' },
                { id: 'profile', icon: '👤', label: 'Hero' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? `${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50 text-blue-600'} font-medium`
                      : `${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Dungeon Page */}
          {currentPage === 'dungeon' && (
            <div className="p-8">
              <div className="max-w-6xl mx-auto">
                {currentDungeon ? (
                  <>
                    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'} rounded-xl p-6 mb-6`}>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold">{currentDungeon.name}</h2>
                          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Level {currentLevel + 1} • {selectedLang === 'python' ? '🧙‍♂️' : selectedLang === 'javascript' ? '⚔️' : selectedLang === 'html' ? '🛡️' : '🧙‍♀️'} Class
                          </p>
                        </div>
                        <div className="text-right">
                          {completed.includes(`${selectedLang}-${currentLevel}`) ? (
                            <span className="text-green-500">✅ Cleared</span>
                          ) : (
                            <span className="text-yellow-500">🔒 Locked</span>
                          )}
                        </div>
                      </div>
                      
                      <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {currentDungeon.description}
                      </p>

                      {currentDungeon.steps && (
                        <div className="mb-6">
                          <h4 className="font-bold mb-3 flex items-center gap-2">
                            <span>📝</span> How to defeat {currentDungeon.monster}:
                          </h4>
                          <div className="space-y-2">
                            {currentDungeon.steps.map((step, idx) => (
                              <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
                                  {idx + 1}
                                </div>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {!completed.includes(`${selectedLang}-${currentLevel}`) && !showBattle && (
                        <button
                          onClick={startBattle}
                          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-lg"
                        >
                          ⚔️ Challenge {currentDungeon.monster}!
                        </button>
                      )}

                      {completed.includes(`${selectedLang}-${currentLevel}`) && !showBattle && (
                        <div className="text-center py-4">
                          <div className="text-green-500 text-xl mb-4">✅ Level Complete!</div>
                          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                            Ready for your next challenge?
                          </p>
                          {currentLevel < DUNGEON_LEVELS[selectedLang].length - 1 && (
                            <button
                              onClick={nextLevel}
                              className="py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
                            >
                              🚪 Enter Next Level → {DUNGEON_LEVELS[selectedLang][currentLevel + 1].name}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'} rounded-xl p-12 text-center`}>
                    <div className="text-6xl mb-4">🏰</div>
                    <h2 className="text-2xl font-bold mb-4">Choose Your Hero First!</h2>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                      Select a hero to begin your dungeon adventure!
                    </p>
                    <button
                      onClick={() => setShowSetup(true)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
                    >
                      Choose Hero
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Battle Arena Page */}
          {currentPage === 'battle' && battleLevel !== null && (
            <div className="flex flex-col h-screen">
              {/* Battle Header */}
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'} p-4`}>
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                  <button
                    onClick={() => {
                      setCurrentPage('dungeon');
                      setShowBattle(false);
                      setBattleResult(null);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    ← Back to Dungeon
                  </button>
                  <h2 className="text-2xl font-bold">⚔️ Battle Arena</h2>
                  <div className="text-right">
                    <span className="text-yellow-500">{DUNGEON_LEVELS[selectedLang][battleLevel].monster}</span>
                    <button
                      onClick={toggleTheme}
                      className={`ml-4 p-2 rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                          : 'bg-blue-200 hover:bg-blue-300 text-blue-900'
                      }`}
                      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                      {theme === 'dark' ? '🌙' : '🌞'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Battle Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-6">
                  {/* Battle Characters */}
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <div className="text-center">
                      <div className="text-6xl mb-2">{character.icon}</div>
                      <p className="font-bold">{character.name}</p>
                      <div className="flex justify-center mt-2">
                        <div className="w-32 bg-gray-300 rounded-full h-3">
                          <div 
                            className="bg-red-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm">HP: {character.health}/{character.maxHealth}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl mb-2">👾</div>
                      <p className="font-bold">{DUNGEON_LEVELS[selectedLang][battleLevel].monster}</p>
                      <div className="w-32 bg-gray-300 rounded-full h-3 mt-2">
                        <div className="bg-purple-500 h-3 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="mb-6">
                    <h4 className="font-bold mb-3 text-center">Write code to attack:</h4>
                    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg p-4 mb-4`}>
                      <Editor
                        height="250px"
                        language={selectedLang}
                        theme={theme}
                        value={code}
                        onChange={(value) => setCode(value)}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          wordWrap: 'on',
                          scrollBeyondLastLine: false,
                          automaticLayout: true
                        }}
                      />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-4">
                      <button
                        onClick={runCode}
                        className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold"
                      >
                        ⚔️ Attack!
                      </button>
                      <button
                        onClick={useHint}
                        disabled={character.mana < 10}
                        className={`px-4 py-3 rounded-lg font-bold ${
                          character.mana >= 10 
                            ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                            : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        💡 Hint (10 MP)
                      </button>
                      {inventory.includes('Health Potion') && (
                        <button
                          onClick={() => {
                            setCharacter(prev => ({
                              ...prev,
                              health: Math.min(prev.health + 30, prev.maxHealth)
                            }));
                          }}
                          className="px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold"
                        >
                          🧪 Potion
                        </button>
                      )}
                      {inventory.includes('Mana Crystal') && (
                        <button
                          onClick={restoreMana}
                          className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold"
                        >
                          💎 Mana
                        </button>
                      )}
                    </div>

                    {/* Retreat Button */}
                    <button
                      onClick={() => {
                        setCurrentPage('dungeon');
                        setShowBattle(false);
                        setBattleResult(null);
                      }}
                      className={`w-full py-2 rounded-lg font-medium ${
                        theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      🏃 Retreat from Battle
                    </button>
                  </div>

                  {/* Battle Result */}
                  {battleResult && (
                    <div className={`p-4 rounded-lg ${
                      battleResult.victory 
                        ? 'bg-green-500/20 border border-green-500' 
                        : battleResult.gameOver
                          ? 'bg-red-500/30 border border-red-500'
                          : 'bg-red-500/20 border border-red-500'
                    }`}>
                      <div className="text-center">
                        <div className="text-2xl mb-2">
                          {battleResult.victory 
                            ? '🎉 Victory!' 
                            : battleResult.gameOver
                              ? '💀 GAME OVER!'
                              : battleResult.error 
                                ? '❌ Error!' 
                                : '💀 Defeated!'
                          }
                        </div>
                        <p className="font-bold">
                          {battleResult.victory 
                            ? `You dealt ${battleResult.damage} damage!`
                            : battleResult.gameOver
                              ? battleResult.message
                              : battleResult.error 
                                ? battleResult.error
                                : `You took ${battleResult.damage} damage!`
                          }
                        </p>
                        {battleResult.victory && (
                          <div className="mt-3">
                            <p className="text-green-400">+{battleResult.xp} XP Earned!</p>
                            <p className="text-yellow-400">🎁 Found: {DUNGEON_LEVELS[selectedLang][battleLevel].reward.item}</p>
                          </div>
                        )}
                        {battleResult.gameOver && (
                          <div className="mt-4 space-y-3">
                            <p className="text-red-400">Your hero has been defeated in battle!</p>
                            <button
                              onClick={() => {
                                // Reset character and start over
                                setCharacter(prev => ({
                                  ...prev,
                                  health: prev.maxHealth,
                                  mana: prev.maxMana,
                                  xp: 0,
                                  level: 1
                                }));
                                setCompleted([]);
                                setInventory([]);
                                setBattleResult(null);
                                setCurrentPage('dungeon');
                                saveUserData();
                              }}
                              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold"
                            >
                              🔄 Resurrect Hero
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Victory Actions */}
                  {battleResult && battleResult.victory && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-md w-full text-center`}>
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold mb-4">Victory!</h3>
                        <p className="text-lg mb-2">You dealt {battleResult.damage} damage!</p>
                        <p className="text-green-400 text-lg mb-4">+{battleResult.xp} XP Earned!</p>
                        <div className="text-yellow-400 text-lg mb-6">🎁 Found: {DUNGEON_LEVELS[selectedLang][battleLevel].reward.item}</div>
                        
                        <div className="text-green-500 text-xl mb-4">✅ Dungeon Cleared!</div>
                        <div className="text-yellow-400 text-lg mb-4">🎁 Reward: {DUNGEON_LEVELS[selectedLang][battleLevel].reward.item}</div>
                        
                        {currentLevel < DUNGEON_LEVELS[selectedLang].length - 1 ? (
                          <div className="space-y-3">
                            <button
                              onClick={() => {
                                nextLevel();
                                setBattleResult(null);
                                setCode('');
                              }}
                              className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg"
                            >
                              🚪 Enter Next Level → {DUNGEON_LEVELS[selectedLang][currentLevel + 1].name}
                            </button>
                            <button
                              onClick={() => {
                                setCurrentPage('dungeon');
                                setShowBattle(false);
                                setBattleResult(null);
                              }}
                              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
                            >
                              Return to Dungeon
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="text-2xl mb-2">🎉 Congratulations!</div>
                            <div className="text-lg mb-4">You've completed all {selectedLang} dungeons!</div>
                            <button
                              onClick={() => {
                                setCurrentPage('dungeon');
                                setShowBattle(false);
                                setBattleResult(null);
                              }}
                              className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-lg"
                            >
                              🏆 View Your Progress
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quiz Page */}
          {currentPage === 'quiz' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                {currentDungeon && currentDungeon.quiz ? (
                  <>
                    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'} rounded-xl p-6 mb-6`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🧪</span>
                        <h2 className="text-2xl font-bold">Knowledge Challenge</h2>
                      </div>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                        Test your knowledge of {currentDungeon.name}!
                      </p>
                    </div>

                    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'} rounded-xl p-8`}>
                      <h3 className="text-lg font-bold mb-6">{currentDungeon.quiz.question}</h3>
                      
                      <div className="space-y-3 mb-6">
                        {currentDungeon.quiz.options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedAnswer(idx)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                              selectedAnswer === idx
                                ? quizResult
                                  ? quizResult.correct && idx === quizResult.answer
                                    ? 'border-green-500 bg-green-500/20'
                                    : !quizResult.correct && idx === quizResult.answer
                                      ? 'border-red-500 bg-red-500/20'
                                      : 'border-gray-300 bg-gray-300/20'
                                  : 'border-blue-500 bg-blue-500/20'
                                : theme === 'dark' 
                                  ? 'border-gray-600 hover:border-gray-500' 
                                  : 'border-gray-300 hover:border-gray-400'
                            }`}
                            disabled={quizResult !== null}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswer === idx
                                  ? quizResult
                                    ? quizResult.correct && idx === quizResult.answer
                                      ? 'border-green-500 bg-green-500'
                                      : !quizResult.correct && idx === quizResult.answer
                                        ? 'border-red-500 bg-red-500'
                                        : 'border-gray-400 bg-gray-400'
                                    : 'border-blue-500 bg-blue-500'
                                  : theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
                              }`}>
                                {selectedAnswer === idx && (
                                  <span className="text-white text-xs">✓</span>
                                )}
                              </div>
                              <span className={selectedAnswer === idx ? 'font-medium' : ''}>
                                {option}
                              </span>
                              {quizResult && idx === currentDungeon.quiz.correct && (
                                <span className="ml-auto text-green-500">✓ Correct</span>
                              )}
                              {quizResult && selectedAnswer === idx && !quizResult.correct && (
                                <span className="ml-auto text-red-500">✗ Wrong</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      {quizResult && (
                        <div className={`p-4 rounded-lg mb-6 ${
                          quizResult.correct 
                            ? 'bg-green-500/20 border border-green-500' 
                            : 'bg-red-500/20 border border-red-500'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{quizResult.correct ? '🎉' : '💡'}</span>
                            <span className="font-bold">
                              {quizResult.correct ? 'Correct!' : 'Not quite!'}
                            </span>
                          </div>
                          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {currentDungeon.quiz.explanation}
                          </p>
                          {quizResult.correct && (
                            <p className="text-green-400 font-medium mt-2">+5 Bonus XP Earned!</p>
                          )}
                        </div>
                      )}

                      <div className="flex gap-3">
                        {!quizResult ? (
                          <button
                            onClick={submitQuizAnswer}
                            disabled={selectedAnswer === null}
                            className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-bold"
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setQuizResult(null);
                              setSelectedAnswer(null);
                            }}
                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
                          >
                            Try Another Question
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'} rounded-xl p-12 text-center`}>
                    <div className="text-6xl mb-4">🧪</div>
                    <h2 className="text-2xl font-bold mb-4">No Quiz Available</h2>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                      Select a dungeon level to test your knowledge!
                    </p>
                    <button
                      onClick={() => setCurrentPage('dungeon')}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
                    >
                      Go to Dungeon
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Leaderboard Page */}
          {currentPage === 'leaderboard' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'} rounded-xl p-6 mb-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Heroes Leaderboard</h3>
                    <button
                      onClick={loadLeaderboard}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      🔄 Refresh
                    </button>
                  </div>
                  <div className="space-y-3">
                    {leaderboard.length > 0 ? (
                      leaderboard.map((user, idx) => (
                        <div key={user.userId} className={`flex items-center gap-4 p-4 rounded-lg ${
                          user.userId === userId
                            ? 'bg-blue-500/20 border border-blue-500/50'
                            : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            idx < 3 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-500'
                          }`}>
                            {idx < 3 ? ['🏆', '🥈', '🥉'][idx] : '⭐'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold">{user.username}</span>
                              {user.userId === userId && <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full ml-auto">YOU</span>}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>Rank #{idx + 1}</span>
                              <span>{user.xp} XP</span>
                              <span>Level {user.level}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <Star size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No heroes yet</p>
                        <p className="text-xs">Be the first to clear a dungeon!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat Page */}
          {currentPage === 'chat' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'} rounded-xl p-6`}>
                  <div className="flex items-center gap-3 mb-6">
                    <MessageCircle size={32} className="text-purple-500" />
                    <h2 className="text-3xl font-bold">Tavern Chat</h2>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-6 mb-6 max-h-96 overflow-y-auto`}>
                    <div className="text-center py-12 text-gray-400">
                      <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Gather around the tavern fire</p>
                      <p className="text-sm">Share your dungeon adventures and help other heroes!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Page */}
          {currentPage === 'profile' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'} rounded-xl p-8 mb-6`}>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                      {username ? username[0].toUpperCase() : 'H'}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{username || 'Anonymous Hero'}</h2>
                      <p className="text-gray-400">Member since March 2024</p>
                      <p className="text-xs text-gray-500 mt-1">ID: {userId}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="text-3xl mb-2">🏆</div>
                      <div className="text-2xl font-bold">{character ? character.xp : 0}</div>
                      <div className="text-sm text-gray-400">Total XP</div>
                    </div>
                    <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="text-3xl mb-2">🏰</div>
                      <div className="text-2xl font-bold">{character ? character.level : 1}</div>
                      <div className="text-sm text-gray-400">Hero Level</div>
                    </div>
                    <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="text-3xl mb-2">⚔️</div>
                      <div className="text-2xl font-bold">{completed.length}</div>
                      <div className="text-sm text-gray-400">Dungeons Cleared</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold mb-4">Hero Inventory</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {inventory.length > 0 ? (
                        inventory.map((item, idx) => (
                          <div key={idx} className={`text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div className="text-2xl mb-2">🎁</div>
                            <p className="text-sm font-medium">{item}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-400">
                          <div className="text-4xl mb-2">🎒</div>
                          <p className="text-sm">No items yet</p>
                          <p className="text-xs">Defeat monsters to find treasure!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
