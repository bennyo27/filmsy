// imports
const express = require("express");
const cors = require("cors");

// configure routes
const configureRoutes = require("../config/routes/users/userRoutes");

// iinstantiate server
const server = express();
server.use(express.json());
server.use(cors());
configureRoutes(server);

// export server
module.exports = {
  server
};
