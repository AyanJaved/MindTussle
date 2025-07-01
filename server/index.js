const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

// Routes
const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/room");
const questionRoutes = require("./routes/questions");

// Config
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/questions", questionRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// In-memory room state
let rooms = {};

// Socket.IO setup
io.on("connection", (socket) => {
  console.log(`✅ Socket connected: ${socket.id}`);

  socket.on("join-room", ({ roomId, username }) => {
    socket.join(roomId);

    if (!rooms[roomId]) rooms[roomId] = [];

    const alreadyJoined = rooms[roomId].some(
      (user) => user.username === username
    );
    if (!alreadyJoined) {
      rooms[roomId].push({ id: socket.id, username, score: 0 });
    }

    io.to(roomId).emit("room-users", rooms[roomId]);
    console.log(`👥 ${username} joined room ${roomId}`);
  });

  socket.on("submit-answer", ({ roomId, username, isCorrect }) => {
    const user = rooms[roomId]?.find((u) => u.username === username);
    if (user && isCorrect) {
      user.score += 1;
      console.log(
        `✅ ${username} scored in room ${roomId} | Total: ${user.score}`
      );
    }
  });

  socket.on("end-quiz", (roomId) => {
    io.to(roomId).emit("final-scores", rooms[roomId]);
    console.log(`🏁 Quiz ended in room ${roomId}`);
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((user) => user.id !== socket.id);
      io.to(roomId).emit("room-users", rooms[roomId]);
      if (rooms[roomId].length === 0) {
        delete rooms[roomId]; // clean up empty room
        console.log(`🧹 Room ${roomId} cleaned up`);
      }
    }
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
