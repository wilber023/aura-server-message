const { v4: uuidv4 } = require('uuid');

class MessageID {
    constructor(id) {
        this.id = id;
    }
    static generate() {
        return new MessageID(uuidv4());
    }
    static create(id) {
        return new MessageID(id);
    }
}

module.exports = MessageID;
