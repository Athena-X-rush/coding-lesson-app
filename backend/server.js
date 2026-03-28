const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// In-memory storage for anonymous users (for simplicity)
const anonymousUsers = new Map();
const globalDoubts = [];

// Anonymous user endpoints
app.post('/api/user', async (req, res) => {
  try {
    const { userId, username, xp, streak, completed } = req.body;
    
    const userData = {
      userId,
      username,
      xp: xp || 0,
      streak: streak || 7,
      completed: completed || [],
      lastSeen: new Date()
    };
    
    anonymousUsers.set(userId, userData);
    
    res.json({ success: true, user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = anonymousUsers.get(userId);
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leaderboard endpoint
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = Array.from(anonymousUsers.values())
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10);
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/doubts', async (req, res) => {
  try {
    const { user, msg, time, userId } = req.body;
    
    const doubt = {
      user,
      msg,
      time,
      userId,
      timestamp: new Date()
    };
    
    globalDoubts.push(doubt);
    
    // Keep only last 50 doubts
    if (globalDoubts.length > 50) {
      globalDoubts.shift();
    }
    
    // Broadcast to all connected clients
    io.emit('newDoubt', doubt);
    
    res.json({ success: true, doubt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/doubts', async (req, res) => {
  try {
    res.json(globalDoubts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

io.on('connection', (socket) => {
    socket.on('join-doubt', (room) => {
        socket.join(room);
    });
    socket.on('send-message', (data) => {
        io.to(data.room).emit('receive-message', data);
    });
});

app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashedPassword }
    });
    res.json({ user });
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
});

app.get('/api/lessons', async (req, res) => {
    const lessons = await prisma.lesson.findMany();
    res.json(lessons);
});

app.get('/api/groups', async (req, res) => {
    const groups = await prisma.group.findMany({
        include: { members: { include: { user: true } } }
    });
    res.json(groups);
});

app.post('/api/groups/join', async (req, res) => {
    const { groupId, userId } = req.body;
    const membership = await prisma.userGroup.create({
        data: { userId, groupId }
    });
    res.json(membership);
});

app.get('/api/progress', async (req, res) => {
    const progress = await prisma.progress.findMany({
        include: { user: true }
    });
    res.json(progress);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
