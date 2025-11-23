// src/application/use-cases/groups/GetGroupMessagesUseCase.js
class GetGroupMessagesUseCase {
  constructor(messageRepository, groupRepository) {
    this.messageRepository = messageRepository;
    this.groupRepository = groupRepository;
  }

  async execute({ groupId, limit = 50, offset = 0 }) {
    // Implementa la lógica real según tu repositorio
    return this.messageRepository.getMessagesByGroup(groupId, limit, offset);
  }
}

module.exports = GetGroupMessagesUseCase;
