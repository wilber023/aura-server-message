// src/infrastructure/config/websocket.js
const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');
const logger = require('../../shared/utils/logger');

require('dotenv').config();

function setupSocketServer(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CORS_ORIGIN || "*", 
            methods: ["GET", "POST"]
        },
        transports: ['websocket', 'polling'] 
    });

    // 1. Adaptador Redis
    const pubClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
    const subClient = pubClient.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        io.adapter(createAdapter(pubClient, subClient));
        logger.info('📡 Socket.io configurado con Redis Adapter.');
    }).catch(err => {
        logger.error('Failed to connect to Redis for Adapter:', err);
    });

    return io;
}

module.exports = setupSocketServer;