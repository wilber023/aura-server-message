// src/infrastructure/database/repositories/GroupRepository.js
const IGroupRepository = require("../../../domain/repositories/IGroupRepository");
const { sequelize } = require('../../config/database');
const GroupModel = require('../models/GroupModel')(sequelize);
const GroupMemberModel = require('../models/GroupMemberModel')(sequelize);

class GroupRepository extends IGroupRepository {
    async save(group, initialMembers) {
        // C - CREATE (Con Transacción para garantizar consistencia)
        const result = await sequelize.transaction(async (t) => {
            const createdGroup = await GroupModel.create(group.toPrimitives(), { transaction: t });

            const memberRecords = initialMembers.map(memberId => ({
                groupId: createdGroup.id,
                userId: memberId,
                role: (memberId === createdGroup.creatorId) ? 'admin' : 'member'
            }));
            
            await GroupMemberModel.bulkCreate(memberRecords, { transaction: t });
            
            return createdGroup;
        });
        
        // Retornar la entidad Group
        // return Group.fromPrimitives(result.toJSON());
        return result.toJSON(); // Simplemente retornamos el JSON por simplicidad aquí
    }

    // ... Implementar R (Read), U (Update), D (Delete)
}

module.exports = GroupRepository;