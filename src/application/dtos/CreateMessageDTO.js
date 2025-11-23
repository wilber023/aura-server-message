// src/application/dtos/CreateMessageDTO.js
// Solo una representación de los datos
class CreateMessageDTO {
    constructor(data) {
        this.conversationId = data.conversationId;
        this.senderId = data.senderId;
        this.text = data.text;
        this.type = data.type || 'direct';
    }
}

module.exports = CreateMessageDTO;