require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const PORT = 3000;

const server = express();

const client = require("./db/client");
client.connect();

// Middleware
server.use(morgan("dev"));
server.use(express.json());

// Routes
server.use("/api", require("./routes"));

// Error Handler
server.use((err, req, res, next) => {
  res.send({
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});

// Sereve App
server.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
