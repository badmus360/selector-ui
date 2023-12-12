const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://selector-production.up.railway.app/',
      changeOrigin: true,
    })
  );
};
