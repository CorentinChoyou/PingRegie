import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? '*'
      : "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Store current state of signals
const signalStates = {
  A: false,
  B: false,
  C: false
};

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Send current state to newly connected clients
  socket.emit("initial_state", signalStates);

  socket.on("signal", (signal) => {
    console.log("Received signal from client:", signal);
    
    // Update signal state
    signalStates[signal.type] = signal.active;
    console.log("Updated signal states:", signalStates);
    
    // Broadcast to all clients including sender
    io.emit("signal", {
      type: signal.type,
      active: signal.active,
      timestamp: new Date().toISOString()
    });

    // Set timeout to deactivate the signal after 3 seconds
    setTimeout(() => {
      signalStates[signal.type] = false;
      console.log("Deactivating signal:", signal.type);
      io.emit("signal", {
        type: signal.type,
        active: false,
        timestamp: new Date().toISOString()
      });
    }, 3000);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});