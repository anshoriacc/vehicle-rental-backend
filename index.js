require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mainRouter = require("./src/routers/main");
const cors = require("cors");

const server = express();
const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms"
);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server sudah berjalan di port ${port}`);
});

const corsOptions = {
  origin: [
    "http://localhost:8080",
    "http://localhost:3000",
    "https://naughty-jepsen-5afced.netlify.app",
  ],
  allowedHeaders: ["x-access-token", "content-type"],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
};

server.use(cors(corsOptions));

server.use(helmet());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger);
server.use(express.static("public"));
server.use(mainRouter);
