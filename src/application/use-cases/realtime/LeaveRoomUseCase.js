// src/application/use-cases/realtime/LeaveRoomUseCase.js
const UUID = require("../../../domain/value-objects/UUID");

class LeaveRoomUseCase {
    constructor(wsRepository) {
        this.wsRepository = wsRepository;
    }

    async execute({ userId, room }) {
        if (!userId || !room) throw new Error('Datos insuficientes para salir de la sala');
        await this.wsRepository.leaveRoom(UUID.create(userId), room);
        return { left: true, room };
    }
}

module.exports = LeaveRoomUseCase;
