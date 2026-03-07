import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handler(req, res);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a room (conversation between 2 users)
    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Send message
    socket.on("send-message", (message) => {
      // Broadcast to everyone in the room except sender
      socket.to(message.roomId).emit("receive-message", message);
    });

    // Typing indicator
    socket.on("typing", ({ roomId, userName }) => {
      socket.to(roomId).emit("user-typing", userName);
    });

    socket.on("stop-typing", ({ roomId }) => {
      socket.to(roomId).emit("user-stop-typing");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  httpServer.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});