// src/infrastructure/websocket/middleware/AuthSocketMiddleware.js
const jwt = require('jsonwebtoken');
const logger = require('../../../../shared/utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

module.exports = (socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.query.token;

    if (!token) {
        logger.warn(`Auth rechazada: Token no proporcionado. Socket ID: ${socket.id}`);
        return next(new Error("Authentication error: Token required"));
    }

    try {
        const decoded = jwt.verify(token.toString(), JWT_SECRET);
        
        // Adjuntar datos del usuario al socket (se asume que el token contiene { id: 'userId' })
        socket.data.user = decoded; 
        
        // Aquí se puede añadir Rate Limiting por IP/user
        
        next();
    } catch (error) {
        logger.error(`Auth rechazada: Token inválido. Socket ID: ${socket.id}`);
        next(new Error("Authentication error: Invalid token"));
    }
};