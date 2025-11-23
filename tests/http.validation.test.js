const request = require('supertest');
const app = require('../src/server');

describe('HTTP Validation & Sanitization', () => {
  describe('POST /groups', () => {
    it('should reject missing required fields', async () => {
      const res = await request(app)
        .post('/groups')
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.details).toBeDefined();
    });
    it('should reject invalid group type', async () => {
      const res = await request(app)
        .post('/groups')
        .send({ name: 'Test', creatorId: 'not-a-uuid', members: [], type: 'invalid' });
      expect(res.statusCode).toBe(400);
      expect(res.body.details).toBeDefined();
    });
    it('should trim and sanitize input', async () => {
      const valid = {
        name: '  Group Name  ',
        creatorId: '123e4567-e89b-12d3-a456-426614174000',
        members: ['123e4567-e89b-12d3-a456-426614174000'],
        type: 'group'
      };
      const res = await request(app)
        .post('/groups')
        .send(valid);
      // Accepts and trims
      expect(res.statusCode).toBe(201);
      expect(res.body.group.name).toBe('Group Name');
    });
  });

  describe('POST /users', () => {
    it('should reject invalid email', async () => {
      const res = await request(app)
        .post('/users')
        .send({ username: 'test', email: 'bademail' });
      expect(res.statusCode).toBe(400);
    });
  });
});
