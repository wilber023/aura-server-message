const io = require('socket.io-client');
const http = require('http');
const server = require('../src/server');

describe('WebSocket Integration', () => {
  let client;
  beforeAll((done) => {
    client = io('http://localhost:3000', { transports: ['websocket'] });
    client.on('connect', done);
  });
  afterAll(() => {
    client.close();
  });
  it('should join a group and receive new_member', (done) => {
    client.emit('join_group', { groupId: 'test', userId: 1 });
    client.on('new_member', (data) => {
      expect(data.userId).toBe(1);
      done();
    });
  });
});
