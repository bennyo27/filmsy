// imports
const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../../../db/dbConfig");

// import middlewares from file
const { generateToken, protected } = require("../../middlewares/middlewares");

// exports
module.exports = server => {
  server.post("/api/post/usertodb", createUser);
  server.get("/api/get/userfromdb"), getUser;
};

function createUser(req, res) {
  const newUser = req.body;
  db("users")
    .insert("users")
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(500).json(err));
}

function getUser(req, res) {
  const { id } = req.params;
  db("users")
    .insert("users")
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(500).json(err));
}
