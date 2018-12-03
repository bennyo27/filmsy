// imports
const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../dbConfig");

// import middlewares from file
const { generateToken, protected } = require("../../middlewares/middlewares");

// exports
module.exports = server => {
  server.get("/users", getUsers);
};

function getUsers(req, res) {
  db("users")
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(500).json(err));
}
