// src/domain/entities/Group.js
const UUID = require("../value-objects/UUID");

class Group {
    constructor(id, name, creatorId, type, members = []) {
        this.id = id;
        this.name = name;
        this.creatorId = creatorId;
        this.type = type;
        this.members = members; // Lista de participantes/miembros
    }

    static createNew(name, creatorId, memberIds, type) {
        const id = UUID.generate();
        return new Group(
            id,
            name,
            creatorId,
            type,
            memberIds
        );
    }
    
    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name,
            creatorId: this.creatorId.value,
            type: this.type,
        };
    }
}
module.exports = Group;