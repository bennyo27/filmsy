// imports
const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../../../data/dbConfig");

// import middlewares from file
const { generateToken, protected } = require("../../middlewares/middlewares");

// exports
module.exports = server => {
  server.post("/users", createUser);
  server.get("/users", getUser);
};

function createUser(req, res) {
  const newUser = req.body;
  console.log(req);
  db("users")
    .insert(newUser)
    .then(ids => res.status(201).json(ids[0]))
    .catch(err => res.status(500).json(err));
}

function getUser(req, res) {
  const { id } = req.params;
  db("users")
    .insert("users")
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(500).json(err));
}
