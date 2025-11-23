class ParticipantRole {
    constructor(role) {
        this.role = role;
    }
    static create(role) {
        if (!["admin", "member"].includes(role)) {
            throw new Error("Rol de participante inválido");
        }
        return new ParticipantRole(role);
    }
}

module.exports = ParticipantRole;
