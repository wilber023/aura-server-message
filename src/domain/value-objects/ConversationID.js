const { v4: uuidv4 } = require('uuid');

class ConversationID {
    constructor(id) {
        this.id = id;
    }
    static generate() {
        return new ConversationID(uuidv4());
    }
    static create(id) {
        return new ConversationID(id);
    }
}

module.exports = ConversationID;
