const express = require('express');
const { PrismaClient } = require('@prisma/client');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
[Error] 
const globalDoubts = [];

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Leaderboard endpoint (for authenticated users)
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        xp: true,
        level: true,
        firstName: true,
        lastName: true
      },
      orderBy: { xp: 'desc' },
      take: 10
    });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      username: user.username,
      displayName: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.username,
      xp: user.xp,
      level: user.level
    }));

    res.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Socket.io for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('doubt', (data) => {
    const doubt = {
      id: Date.now(),
      user: data.user,
      text: data.text,
      timestamp: new Date()
    };
    globalDoubts.push(doubt);
    
    // Keep only last 50 doubts
    if (globalDoubts.length > 50) {
      globalDoubts.shift();
    }
    
    io.emit('doubt', doubt);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Environment variables
const PORT = process.env.PORT || 5001;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    version: '2.0.0'
  });
});

// Get global doubts (for chat)
app.get('/api/doubts', (req, res) => {
  res.json({ doubts: globalDoubts });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
