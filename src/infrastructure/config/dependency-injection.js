// src/infrastructure/config/dependency-injection.js
const MessageRepository = require('../database/repositories/MessageRepository');
const GroupRepository = require('../database/repositories/GroupRepository');
const SocketRepository = require('../websocket/SocketRepository');

// Casos de Uso
const SendMessageUseCase = require('../../application/use-cases/messages/SendMessageUseCase');
const CreateGroupUseCase = require('../../application/use-cases/groups/CreateGroupUseCase');
const GetGroupMessagesUseCase = require('../../application/use-cases/groups/GetGroupMessagesUseCase');

class DependencyContainer {
    constructor() {
        this.dependencies = {};
    }

    init(io) {
        // --- 1. Repositorios (Adaptadores de Infraestructura) ---
        const messageRepository = new MessageRepository();
        const groupRepository = new GroupRepository();
        const wsRepository = new SocketRepository(io);

        // --- 2. Casos de Uso (Se inyectan los Puertos) ---
        this.dependencies[SendMessageUseCase.name] = new SendMessageUseCase(
            messageRepository, 
            wsRepository
        );
        this.dependencies[CreateGroupUseCase.name] = new CreateGroupUseCase(
            groupRepository
        );
        this.dependencies[GetGroupMessagesUseCase.name] = new GetGroupMessagesUseCase(
            messageRepository,
            groupRepository
        );
        // ... (Aquí se registrarían EditMessageUseCase, AddUserToGroupUseCase, etc.)
    }

    resolve(DependencyClass) {
        const instance = this.dependencies[DependencyClass.name];
        if (!instance) {
            throw new Error(`Dependency not found: ${DependencyClass.name}`);
        }
        return instance;
    }
}

module.exports = new DependencyContainer();