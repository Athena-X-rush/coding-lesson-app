# 🎮 Coding Lesson App - Learn Programming Through RPG Battles

![Coding Lesson App](https://img.shields.io/badge/version-1.0.0-blue.svg)
![GitHub stars](https://img.shields.io/github/stars/Athena-X-rush/coding-lesson-app?style=social)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 About

An engaging **RPG-style coding game** that makes learning programming fun! Battle monsters by writing real code in Python, JavaScript, HTML, and CSS. Perfect for beginners and children who want to learn programming in an interactive way.

## 🚀 Features

### 🎮 Gameplay
- **⚔️ Battle System**: Fight coding monsters with real code
- **🧙‍♂️ 4 Hero Classes**: Python Mage, JavaScript Warrior, HTML Knight, CSS Sorceress
- **🏰 12 Dungeons**: 3 levels per programming language
- **💥 XP & Leveling**: Earn experience and level up your hero
- **🎯 Code Validation**: Real-time feedback with specific error messages
- **🧙‍♀️ Hint System**: Get help when stuck (costs mana)


### 📊 Progress Dashboard: Visualize player stats, completed dungeons, and overall progression using React props and state, updating based on user       actions


### 🎨 User Experience
- **🌙 Theme Toggle**: Light and dark modes with child-friendly colors
- **📱 Mobile Responsive**: Works on all devices
- **🏆 Leaderboard**: Compete with other players
- **📚 Knowledge Challenges**: Quiz system for theory
- **💾 Progress Saving**: Local and cloud storage

### 🛠️ Technical Features
- **⚡ Real-time Code Execution**: Python, JavaScript, HTML, CSS validation
- **🔧 Smart Error Messages**: Specific feedback for each language
- **🌐 Multi-language Support**: 4 popular programming languages
- **📊 Analytics**: Track learning progress
- **🔄 Auto-deployment**: Netlify + Render ready

## 📸 Screenshots
<img width="1280" height="694" alt="Screenshot 2026-03-27 at 22 20 35" src="https://github.com/user-attachments/assets/7ccfc538-437a-434a-814b-447fe0d45780" />




<img width="1280" height="694" alt="Screenshot 2026-03-27 at 22 19 36" src="https://github.com/user-attachments/assets/589cb6b9-4582-4709-a6ed-16d6c0890234" />








### 📋 Prerequisites
- **Node.js** 16+ 
- **npm** or **yarn**
- **Git** (for cloning)

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Athena-X-rush/coding-lesson-app.git
   cd coding-lesson-app
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   cd frontend
   npm install
   
   # Backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Frontend (.env)
   REACT_APP_BACKEND_URL=http://localhost:5001
   
   # Backend (.env)
   PORT=5001
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Terminal 1 - Start backend
   cd backend
   npm start
   
   # Terminal 2 - Start frontend
   cd frontend
   npm start
   ```

5. **Open your browser**
   ```
   Frontend: http://localhost:3000
   Backend API: http://localhost:5001
   ```

## 🎮 How to Play

### 🎯 Getting Started
1. **Choose Your Hero** → Select from 4 programming language characters
2. **Enter Hero Name** → Personalize your experience
3. **Select Dungeon** → Choose your coding challenge
4. **Battle Monsters** → Write code to defeat enemies

### ⚔️ Battle System
- **Write Code** → Use the code editor to solve challenges
- **Click Attack** → Execute your code and battle
- **Win Battles** → Earn XP, items, and level up
- **Use Hints** → Get help (costs mana points)
- **Complete Dungeons** → Master programming concepts

### 🎓 Learning Path
1. **Python Mage** → Learn variables, functions, loops
2. **JavaScript Warrior** → DOM manipulation, events
3. **HTML Knight** → Tags, attributes, structure
4. **CSS Sorceress** → Styling, animations, layout

## 🏗️ Project Structure

```
coding-lesson-app/
├── 📁 frontend/                 # React application
│   ├── 📁 src/
│   │   ├── 📄 App.js          # Main React component
│   │   ├── 📄 App.css         # App styles
│   │   └── 📄 index.js        # App entry point
│   ├── 📁 public/              # Static assets
│   ├── 📄 package.json         # Frontend dependencies
│   └── 📄 netlify.toml        # Deployment config
├── 📁 backend/                 # Node.js server
│   ├── 📄 server.js           # Express server
│   ├── 📄 seed.js             # Database seed
│   └── 📄 package.json        # Backend dependencies
├── 📄 README.md                # This file
└── 📄 .gitignore              # Git ignore rules
```

## 🛠️ Technologies Used

### 🎨 Frontend
- **React 18** - UI framework
- **Monaco Editor** - VS Code editor
- **TailwindCSS** - Styling framework
- **Lucide React** - Icon library

### 🌐 Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Socket.io** - Real-time communication

### 🎮 Programming Languages Taught
- **Python** - Variables, functions, loops, data structures
- **JavaScript** - DOM manipulation, events, async programming
- **HTML** - Semantic tags, forms, accessibility
- **CSS** - Selectors, layout, animations, Flexbox, Grid

### 🚀 Deployment
- **Netlify** - Frontend hosting
- **Render** - Backend hosting
- **GitHub** - Version control

### 🛠️ Development Tools
- **VS Code** - Code editor
- **Git** - Version control
- **npm** - Package management
- **Terminal** - Command line operations

## 🎯 Educational Impact

### 📚 Learning Outcomes
- **Syntax Mastery** - Through battle challenges
- **Problem Solving** - Error fixing with hints
- **Concept Retention** - Gamified repetition
- **Progress Tracking** - XP, levels, completed dungeons

### 🎮 Engagement Benefits
- **Higher Motivation** - RPG progression system
- **Reduced Anxiety** - Fun, game-like environment
- **Instant Gratification** - Victory celebrations, rewards
- **Social Competition** - Leaderboard drives practice

## 🌐 Deployment

### 🚀 Frontend (Netlify)
1. **Build the app**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag & drop `build` folder to [netlify.com](https://netlify.com)
   - Or connect GitHub repo for auto-deployment

### 🌐 Backend (Render)
1. **Push to GitHub** (already done!)
2. **Connect to Render** at [render.com](https://render.com)
3. **Deploy as Node.js service**

### 🔗 Live Demo
- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-backend.onrender.com`

## 🤝 Contributing

### 🎯 How to Contribute
1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add your feature"
   ```
5. **Push to your fork**
6. **Create a Pull Request**

### 🐛 Bug Reports
- **Use GitHub Issues** for bug reports
- **Include screenshots** and error messages
- **Provide steps to reproduce**

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Monaco Editor** - For the excellent code editor
- **TailwindCSS** - For the utility-first CSS framework
- **GitHub** - For hosting and version control

## 📞 Contact

- **GitHub**: [@Athena-X-rush](https://github.com/Athena-X-rush)
- **Project**: https://fun2-coding.netlify.app/

---

## 🎉 Ready to Start Your Coding Adventure?

**⚔️ Choose your hero, write some code, and battle your way to programming mastery!**

**Made with ❤️ for aspiring programmers everywhere!**
