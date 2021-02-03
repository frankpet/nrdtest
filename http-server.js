const app = require('express')();
const http = require('http');
const https = require('https');
const fs = require('fs');
const cfg = require('./config.js');
var server;
if (cfg.http === 'http') {
   server =require('http').Server(app);
}else {
   server =require('http').Server(app);
}
// var HttpServer = /** @class */ (function () {
//     function HttpServer() {
//     }
//     HttpServer.create = function () {
//         if (!fs.existsSync(cfg.ssl_key) ||
//             !fs.existsSync(cfg.ssl_cert) ||
//             !cfg.ssl_enabled) {
//             return http.createServer(app);
//         }
//         else {
//             return https.createServer({
//                 key: fs.readFileSync(cfg.ssl_key),
//                 cert: fs.readFileSync(cfg.ssl_cert)
//             },app);
//         }
//     };
//     return HttpServer;
// }());


module.exports = {
  server , app
}
// module.exports = {
//   app ,
//   HttpServer
// }
