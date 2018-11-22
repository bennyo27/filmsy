// imports
const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../dbConfig");

// import middlewares from file
const { generateToken, protected } = require("./middlewares");

// exports
module.exports = server => {
  server.get("/home");
};
