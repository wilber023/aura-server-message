class ConversationType {
    constructor(type) {
        this.type = type;
    }
    static create(type) {
        // Validar tipos permitidos
        if (!["direct", "group", "community"].includes(type)) {
            throw new Error("Tipo de conversación inválido");
        }
        return new ConversationType(type);
    }
}

module.exports = ConversationType;
