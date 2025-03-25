import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    // Allow connections from any origin in production
    origin: process.env.NODE_ENV === 'production' 
      ? '*'
      : "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const rooms = new Map();

function generateRoomId() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("create_room", () => {
    let roomId;
    // Ensure unique room ID
    do {
      roomId = generateRoomId();
    } while (rooms.has(roomId));

    rooms.set(roomId, { sender: socket.id, receiver: null });
    socket.join(roomId);
    socket.emit("room_created", roomId);
  });

  socket.on("join_room", (roomId) => {
    const room = rooms.get(roomId);
    if (room && !room.receiver) {
      room.receiver = socket.id;
      socket.join(roomId);
      socket.emit("room_joined", roomId);
      io.to(roomId).emit("connection_established");
    } else {
      socket.emit("error", "Room not found or already full");
    }
  });

  socket.on("signal", ({ roomId, signal }) => {
    socket.to(roomId).emit("signal_received", signal);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    rooms.forEach((room, roomId) => {
      if (room.sender === socket.id || room.receiver === socket.id) {
        io.to(roomId).emit("peer_disconnected");
        rooms.delete(roomId);
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});