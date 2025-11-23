// src/infrastructure/database/models/GroupMemberModel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const GroupMember = sequelize.define('GroupMember', {
        groupId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        userId: { // ID del miembro
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        role: { // 'admin', 'member'
            type: DataTypes.ENUM('admin', 'member'),
            defaultValue: 'member',
        },
    }, {
        tableName: 'GroupMembers',
        timestamps: true,
        updatedAt: false,
    });
    return GroupMember;
};