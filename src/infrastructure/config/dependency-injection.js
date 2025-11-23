// src/infrastructure/config/dependency-injection.js
// Implementación simple para cumplir con la inyección de dependencias de la Arquitectura Hexagonal

// Importar Repositorios (Adaptadores)
const MessageRepository = require('../database/repositories/MessageRepository');
const SocketRepository = require('../websocket/SocketRepository');

// Importar Casos de Uso
const SendMessageUseCase = require('../../application/use-cases/messages/SendMessageUseCase');
// ... otros Casos de Uso

class DependencyContainer {
    constructor() {
        this.dependencies = {};
    }

    init(io) {
        // Repositorios (Adaptadores)
        const messageRepository = new MessageRepository();
        const wsRepository = new SocketRepository(io);

        // Casos de Uso (Se inyectan los Repositorios/Puertos)
        this.dependencies[SendMessageUseCase.name] = new SendMessageUseCase(
            messageRepository, 
            wsRepository
        );

        // this.dependencies[CreateGroupUseCase.name] = new CreateGroupUseCase(...)
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