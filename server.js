const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Route
app.get('/', (req, res) => {
  res.render('index');
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('✅ New user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast to all users
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

// Start server
server.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
