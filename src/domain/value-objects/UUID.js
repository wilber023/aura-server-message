// src/domain/value-objects/UUID.js
const { v4: uuidv4 } = require('uuid');

class UUID {
    constructor(value) {
        if (!value) throw new Error("UUID must not be empty.");
        this.value = value;
    }

    static create(value) {
        return new UUID(value);
    }
    
    static generate() {
        return new UUID(uuidv4());
    }
    
    equals(other) {
        return this.value === other.value;
    }
}

module.exports = UUID;