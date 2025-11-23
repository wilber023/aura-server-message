const io = require('socket.io-client');
const http = require('http');
const server = require('../src/server');
const { v4: uuidv4 } = require('uuid');

describe('WebSocket Validation & Sanitization', () => {
  let client, httpServer;
  beforeAll((done) => {
    httpServer = http.createServer(server);
    httpServer.listen(4000, () => {
      client = io('http://localhost:4000', { transports: ['websocket'] });
      client.on('connect', done);
    });
  });
  afterAll((done) => {
    client.close();
    httpServer.close(done);
  });

  it('should reject invalid join_group payload', (done) => {
    client.emit('join_group', { groupId: 'bad', userId: 'bad' });
    client.on('error', (data) => {
      if (data.event === 'join_group') {
        expect(data.errors).toBeDefined();
        done();
      }
    });
  });

  it('should accept valid join_group payload', (done) => {
    const groupId = uuidv4();
    const userId = uuidv4();
    client.emit('join_group', { groupId, userId });
    client.on('new_member', (data) => {
      expect(data.userId).toBe(userId);
      done();
    });
  });

  it('should reject invalid send_message payload', (done) => {
    client.emit('send_message', { conversationId: 'bad', text: '' }, (resp) => {
      expect(resp).toBeUndefined(); // Should emit error, not callback
    });
    client.on('error', (data) => {
      if (data.event === 'send_message') {
        expect(data.errors).toBeDefined();
        done();
      }
    });
  });
});
