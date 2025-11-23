// src/application/use-cases/realtime/JoinRoomUseCase.js
const UUID = require("../../../domain/value-objects/UUID");

class JoinRoomUseCase {
    constructor(wsRepository) {
        this.wsRepository = wsRepository;
    }

    async execute({ userId, room }) {
        // Validar tipo y permisos (solo miembros pueden unirse a grupos o conversaciones)
        if (!userId || !room) throw new Error('Datos insuficientes para unirse a la sala');
        // Aquí se podría validar en DB si el usuario pertenece a la sala
        await this.wsRepository.joinRoom(UUID.create(userId), room);
        return { joined: true, room };
    }
}

module.exports = JoinRoomUseCase;
