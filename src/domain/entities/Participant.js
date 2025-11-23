const ParticipantRole = require('../value-objects/ParticipantRole');

class Participant {
    constructor(id, role) {
        this.id = id;
        this.role = role; // ParticipantRole
    }

    static create(id, role) {
        return new Participant(id, ParticipantRole.create(role));
    }
}

module.exports = Participant;
