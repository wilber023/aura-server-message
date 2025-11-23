// src/infrastructure/database/models/MessageModel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        conversationId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        senderId: { // Integración con User ID externo
            type: DataTypes.UUID,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        type: { // 'direct' o 'group'
            type: DataTypes.ENUM('direct', 'group'),
            allowNull: false,
        },
        readStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        tableName: 'Messages',
        timestamps: true,
        updatedAt: false, // Solo necesitamos `createdAt`
    });
    return Message;
};