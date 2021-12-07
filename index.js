require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./src/routers/main");

const server = express();
// const logger = morgan();

const port = 8080;
server.listen(port, () => {
  console.log(`Server sudah berjalan di port ${port}`);
});

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// server.use(logger);
server.use(mainRouter);
