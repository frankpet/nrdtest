require('dotenv').config();
const cfg = require('./config.js');
//const app = require('express')();
//const server = require('http').Server(app);
const {app , server} = require('./http-server');
//const server = http.createServer(app);

const io = require('socket.io')(server);
const Redis = require('ioredis');
const redis = new Redis();

app.get('/', function(req,res){
  res.sendFile(__dirname + '/views/index.html');
})

server.listen(cfg.port, () => {
    console.log('started on port: ' + cfg.port);
});


//socket - connection

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("authenticate", data => {

      if(data.uuid.includes('company-')) {
        data.uuid = data.uuid.replace("company-", "company:");
      }
      console.log('authenticating and joined');
      socket.join(data.uuid );

  })



});


//redis subscriptions
redis.subscribe('orders');

redis.on('message', function(channel,message) {

  message = JSON.parse(message)
  let event = message.event

  switch (event) {
    case "order.created":
      io.to("company:" + message.data.company.guid)
      .emit("order.created", message.data)
      .emit("notify.company", message.data)
      .emit("notify.printer", message.data.order);
      break;
    case "order.completed":
      io.to("company:" + message.data.company.guid)
      .emit("order.completed", message.data)
      break;
    case "order.reopened":
      io.to("company:" + message.data.company.guid)
      .emit("order.reopened", message.data)
      break;
    default:

  }


});
