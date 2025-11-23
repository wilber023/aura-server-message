// src/infrastructure/config/database.js
const { Sequelize } = require('sequelize');
const logger = require('../../shared/utils/logger');
require('dotenv').config();
// src/infrastructure/config/database.js (Solo la función connectDB actualizada)
// ... (código previo) ...
const MessageModel = require('../database/models/MessageModel');
const GroupModel = require('../database/models/GroupModel');
const GroupMemberModel = require('../database/models/GroupMemberModel');

// (Eliminada función connectDB duplicada)
// ... (código previo) ...
const sequelize = new Sequelize(
    process.env.DB_NAME || 'messaging_db',
    process.env.DB_USER || 'user',
    process.env.DB_PASSWORD || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: (msg) => logger.info(`[SQL] ${msg}`),
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        logger.info('📦 Conexión a MySQL establecida correctamente.');
        // Aquí se deben inicializar los modelos de Sequelize
    } catch (error) {
        logger.error('❌ No se pudo conectar a la base de datos:', error);
        throw new Error('Database connection failed.');
    }
}

module.exports = { sequelize, connectDB };