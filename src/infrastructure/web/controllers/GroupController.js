// src/infrastructure/web/controllers/GroupController.js
const container = require('../../config/dependency-injection');
const CreateGroupDTO = require('../../../application/dtos/CreateGroupDTO');
const CreateGroupUseCase = require('../../../application/use-cases/groups/CreateGroupUseCase');
const GetGroupMessagesUseCase = require('../../../application/use-cases/groups/GetGroupMessagesUseCase');
const logger = require('../../../shared/utils/logger');

// Controller para el CRUD de Creación
async function createGroup(req, res) {
    try {
        // Validación de request (usar Joi en un middleware real)
        if (!req.body.name || !req.body.memberIds || req.body.memberIds.length < 1) {
            return res.status(400).json({ error: "Name and at least one memberId required." });
        }
        
        // Creator ID tomado del token JWT
        const creatorId = req.user.id; 
        
        // Asegurar que el creador esté en la lista de miembros
        if (!req.body.memberIds.includes(creatorId)) {
            req.body.memberIds.push(creatorId);
        }

        const dto = new CreateGroupDTO({
            name: req.body.name,
            creatorId: creatorId,
            memberIds: req.body.memberIds,
            type: req.body.type
        });

        const useCase = container.resolve(CreateGroupUseCase);
        const group = await useCase.execute(dto);
        
        res.status(201).json({ message: 'Group created successfully', group });

    } catch (error) {
        logger.error('Error in createGroup:', error);
        res.status(500).json({ error: 'Internal Server Error during group creation.' });
    }
}

// Controller para el CRUD de Lectura
async function getGroupMessages(req, res) {
    try {
        const groupId = req.params.groupId;
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;
        
        const useCase = container.resolve(GetGroupMessagesUseCase);
        const messages = await useCase.execute({ groupId, limit, offset });
        
        res.status(200).json(messages);
    } catch (error) {
        logger.error('Error in getGroupMessages:', error);
        res.status(500).json({ error: 'Internal Server Error while fetching messages.' });
    }
}

// Agregar miembro a grupo
async function addMember(req, res) {
    // Aquí deberías validar y agregar el miembro a la base de datos
    res.status(201).json({ message: 'Member added (mock)' });
}

// Remover miembro de grupo
async function removeMember(req, res) {
    // Aquí deberías validar y eliminar el miembro de la base de datos
    res.status(200).json({ message: 'Member removed (mock)' });
}

module.exports = {
    createGroup,
    getGroupMessages,
    addMember,
    removeMember,
};