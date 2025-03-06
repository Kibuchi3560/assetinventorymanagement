const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://assetinventorymanagement.onrender.com",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    })
  );
};
