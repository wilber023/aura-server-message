const GroupService = require('../src/domain/services/GroupService');

describe('GroupService', () => {
  it('should create a group', async () => {
    const fakeRepo = { save: async (group, participants) => ({ group, participants }) };
    const service = new GroupService(fakeRepo);
    const validData = {
      name: 'Test Group',
      createdBy: '123e4567-e89b-12d3-a456-426614174000',
      members: [
        '123e4567-e89b-12d3-a456-426614174000',
        '123e4567-e89b-12d3-a456-426614174001'
      ]
    };
    const result = await service.createGroup(validData);
    expect(result).toBeDefined();
    expect(result.group.name).toBe('Test Group');
    expect(result.participants.length).toBe(2);
  });
});
