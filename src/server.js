// src/server.js
const express = require('express');
const http = require('http');
require('dotenv').config();

const logger = require('./shared/utils/logger');
const { connectDB } = require('./infrastructure/config/database');
const setupSocketServer = require('./infrastructure/config/websocket');
const registerSocketHandlers = require('./infrastructure/websocket/SocketServer');
const container = require('./infrastructure/config/dependency-injection');

const PORT = process.env.PORT || 3003;

async function bootstrap() {
    // 1. Inicializar Express y HTTP Server
    const app = express();
    const httpServer = http.createServer(app);

    // Middleware y Rutas HTTP (Para Grupos/Comunidades, etc.)
    app.use(express.json());
    // require('./infrastructure/web/routes')(app); // Asumiendo que esto configura las rutas HTTP

    // 2. Conexión a Base de Datos
    await connectDB();

    // 3. Inicializar Socket.io con Redis Adapter
    const io = setupSocketServer(httpServer);
    
    // 4. Inyección de dependencias (para el Caso de Uso)
    container.init(io);

    // 5. Registrar Handlers y Middlewares de Socket.io
    registerSocketHandlers(io);

    // 6. Iniciar Servidor
    httpServer.listen(PORT, () => {
        logger.info(`🚀 Servidor HTTP/WS corriendo en puerto ${PORT}`);
    });
}

bootstrap().catch(err => {
    logger.error('Fatal error during application startup:', err);
    process.exit(1);
});