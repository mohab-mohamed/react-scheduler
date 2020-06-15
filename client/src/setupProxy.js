const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/google', { target: 'http://localhost:3001/' }));
  app.use(proxy('/api/task/*', { target: 'http://localhost:3001' }));
  app.use(proxy('/api/time_table/*', { target: 'http://localhost:3001' }));
  app.use(proxy('/api/*', { target: 'http://localhost:3001' }));
};