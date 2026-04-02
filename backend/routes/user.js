const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get user progress
router.get('/progress', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const progress = await prisma.progress.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' }
    });

    res.json({ progress });

  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user progress
router.post('/progress', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { dungeonId, completed, score, attempts, bestTime } = req.body;

    if (!dungeonId) {
      return res.status(400).json({ error: 'Dungeon ID is required' });
    }

    // Upsert progress (create or update)
    const progress = await prisma.progress.upsert({
      where: {
        userId_dungeonId: {
          userId,
          dungeonId
        }
      },
      update: {
        completed: completed !== undefined ? completed : true,
        score: score || 0,
        attempts: attempts || 1,
        bestTime: bestTime || null,
        completedAt: new Date()
      },
      create: {
        userId,
        dungeonId,
        completed: completed !== undefined ? completed : true,
        score: score || 0,
        attempts: attempts || 1,
        bestTime: bestTime || null
      }
    });

    // Update user XP and level
    if (completed && score > 0) {
      const currentUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { xp: true, level: true }
      });

      const newXP = currentUser.xp + score;
      const newLevel = Math.floor(newXP / 100) + 1;

      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: newXP,
          level: newLevel
        }
      });
    }

    res.json({
      message: 'Progress updated successfully',
      progress
    });

  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user inventory
router.get('/inventory', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const inventory = await prisma.inventory.findMany({
      where: { userId },
      orderBy: { item: 'asc' }
    });

    res.json({ inventory });

  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add item to inventory
router.post('/inventory', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { item, quantity = 1 } = req.body;

    if (!item) {
      return res.status(400).json({ error: 'Item name is required' });
    }

    // Upsert inventory item
    const inventoryItem = await prisma.inventory.upsert({
      where: {
        userId_item: {
          userId,
          item
        }
      },
      update: {
        quantity: {
          increment: quantity
        }
      },
      create: {
        userId,
        item,
        quantity
      }
    });

    res.json({
      message: 'Item added to inventory successfully',
      item: inventoryItem
    });

  } catch (error) {
    console.error('Add inventory item error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove item from inventory
router.delete('/inventory/:item', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { item } = req.params;

    const inventoryItem = await prisma.inventory.findUnique({
      where: {
        userId_item: {
          userId,
          item
        }
      }
    });

    if (!inventoryItem) {
      return res.status(404).json({ error: 'Item not found in inventory' });
    }

    await prisma.inventory.delete({
      where: {
        userId_item: {
          userId,
          item
        }
      }
    });

    res.json({ message: 'Item removed from inventory successfully' });

  } catch (error) {
    console.error('Remove inventory item error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user basic info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        xp: true,
        level: true,
        createdAt: true
      }
    });

    // Get progress stats
    const progressStats = await prisma.progress.aggregate({
      where: { userId },
      _count: {
        id: true
      },
      _sum: {
        score: true
      },
      where: {
        completed: true
      }
    });

    // Get inventory count
    const inventoryCount = await prisma.inventory.count({
      where: { userId }
    });

    // Calculate days since registration
    const daysSinceRegistration = Math.floor(
      (new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)
    );

    const stats = {
      xp: user.xp,
      level: user.level,
      dungeonsCompleted: progressStats._count.id || 0,
      totalScore: progressStats._sum.score || 0,
      inventoryItems: inventoryCount,
      daysSinceRegistration,
      averageScore: progressStats._count.id > 0 
        ? Math.round((progressStats._sum.score || 0) / progressStats._count.id)
        : 0
    };

    res.json({ stats });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user character
router.put('/character', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { character } = req.body;

    if (!character) {
      return res.status(400).json({ error: 'Character data is required' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { character },
      select: {
        id: true,
        character: true
      }
    });

    res.json({
      message: 'Character updated successfully',
      character: updatedUser.character
    });

  } catch (error) {
    console.error('Update character error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
