const ConversationID = require('../value-objects/ConversationID');
const ConversationType = require('../value-objects/ConversationType');
const Participant = require('./Participant');
const Message = require('./Message');

class Conversation {
    constructor(id, name, type, participants = [], messages = []) {
        this.id = id; // ConversationID
        this.name = name;
        this.type = type; // ConversationType
        this.participants = participants; // List<Participant>
        this.messages = messages; // List<Message>
    }

    addParticipant(participant) {
        this.participants.push(participant);
    }

    addMessage(message) {
        this.messages.push(message);
    }

    static createNew(name, type, participants = []) {
        return new Conversation(
            ConversationID.generate(),
            name,
            ConversationType.create(type),
            participants,
            []
        );
    }
}

module.exports = Conversation;
