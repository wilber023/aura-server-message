// src/application/use-cases/realtime/BroadcastMessageUseCase.js
class BroadcastMessageUseCase {
    constructor(wsRepository) {
        this.wsRepository = wsRepository;
    }

    async execute({ room, event, payload }) {
        if (!room || !event) throw new Error('Datos insuficientes para broadcast');
        await this.wsRepository.broadcast(room, event, payload);
        return { broadcasted: true, event };
    }
}

module.exports = BroadcastMessageUseCase;
