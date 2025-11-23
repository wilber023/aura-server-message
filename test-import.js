// test-import.js
try {
  const IWebSocketRepository = require('./src/domain/repositories/IWebSocketRepository');
  console.log('IWebSocketRepository loaded:', typeof IWebSocketRepository === 'function');
} catch (err) {
  console.error('Import failed:', err);
  process.exit(1);
}
