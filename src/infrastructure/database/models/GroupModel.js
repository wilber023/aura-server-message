// src/infrastructure/database/models/GroupModel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Group = sequelize.define('Group', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creatorId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        type: { // 'group', 'community', etc.
            type: DataTypes.ENUM('group', 'community'),
            defaultValue: 'group',
        }
    }, {
        tableName: 'Groups',
        timestamps: true,
    });
    return Group;
};