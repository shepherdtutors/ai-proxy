const express = require("express");
const httpProxy = require("http-proxy");
const https = require("https");
const fs = require("fs");

const app = express();
const targetIP = "68.183.128.115"; // Your IP

const proxy = httpProxy.createProxyServer({
  timeout: 600000,
});

app.all("*", (req, res) => {
  proxy.web(req, res, {
    target: `http://${targetIP}`,
  });
});

// If you have SSL certificates, you can enable this code to run the server with HTTPS.
// const httpsOptions = {
//     key: fs.readFileSync('path_to_key.pem'),
//     cert: fs.readFileSync('path_to_cert.pem')
// };

// const httpsServer = https.createServer(httpsOptions, app);

// httpsServer.listen(443, () => {
//     console.log('HTTPS Server running on port 443');
// });

// For now, using HTTP to test the proxy
app.listen(8080, () => {
  console.log("HTTP Proxy server running on port 8080");
});
