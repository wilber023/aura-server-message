// src/application/use-cases/groups/CreateGroupUseCase.js
const Group = require("../../../domain/entities/Group");
const UUID = require("../../../domain/value-objects/UUID");

class CreateGroupUseCase {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    async execute(dto) {
        // 1. Crear la Entidad de Dominio
        const creatorId = UUID.create(dto.creatorId);
        const memberIds = dto.memberIds.map(UUID.create);
        
        const newGroup = Group.createNew(
            dto.name,
            creatorId,
            memberIds,
            dto.type
        );
        
        // 2. Persistencia (Guardar grupo y miembros en DB)
        // Se pasa la entidad Group y los IDs de los miembros.
        const persistedGroup = await this.groupRepository.save(newGroup, dto.memberIds);
        
        // 3. Notificación (Opcional: Emitir evento a todos los miembros que ya estén online)
        // await this.wsRepository.broadcast(groupRoom, 'new_group', persistedGroup);
        
        return persistedGroup;
    }
}
module.exports = CreateGroupUseCase;