// src/application/dtos/CreateGroupDTO.js
class CreateGroupDTO {
    constructor(data) {
        this.name = data.name;
        this.creatorId = data.creatorId;
        this.memberIds = data.memberIds; // Lista de UUIDs
        this.type = data.type || 'group';
    }
}
module.exports = CreateGroupDTO;