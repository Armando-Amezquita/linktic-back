const config = require('config')
const { serverConn } = require('./app.js');
const { connectDB } = require('./database/db');
const SocketIO = require('socket.io');    
connectDB();


const port = config.get("app.port") || 3001;

const server = serverConn.listen(port, () =>
  console.log(`[server] Connected to port ${port}`)
);


let io = SocketIO(server, {
  cors: {
    origin: "*"
  }
});
    
io.on('connection', (socket) => {
  console.log('new client connected');
  socket.on('disconnect', () => {
    console.log('client disconnected')
  })
});

process.on('unhandledRejection', (err) => {
  console.error(`[server] An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

exports.io = io