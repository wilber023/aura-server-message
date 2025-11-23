// src/domain/entities/Message.js
const UUID = require("../value-objects/UUID");

class Message {
    constructor(id, conversationId, senderId, text, type, timestamp) {
        this.id = id;
        this.conversationId = conversationId;
        this.senderId = senderId;
        this.text = text;
        this.type = type;
        this.timestamp = timestamp;
    }

    static createNew(conversationId, senderId, text, type) {
        return new Message(
            UUID.generate(),
            conversationId,
            senderId,
            text,
            type,
            new Date()
        );
    }
    
    toPrimitives() {
        return {
            id: this.id.value,
            conversationId: this.conversationId.value,
            senderId: this.senderId.value,
            text: this.text,
            type: this.type,
            timestamp: this.timestamp,
        };
    }
}

module.exports = Message;