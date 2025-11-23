const MessageService = require('../src/domain/services/MessageService');

describe('MessageService', () => {
  it('should send a message', async () => {
    // Simulación básica con datos válidos
    const fakeRepo = { save: async (msg) => msg };
    const service = new MessageService(fakeRepo);
    const validData = {
      conversationId: '123e4567-e89b-12d3-a456-426614174000',
      senderId: '123e4567-e89b-12d3-a456-426614174001',
      text: 'Hola',
      type: 'direct'
    };
    const result = await service.sendMessage(validData);
    expect(result).toBeDefined();
    expect(result.text).toBe('Hola');
  });
});
