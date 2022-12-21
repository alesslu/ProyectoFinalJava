const express = require("express");
const userSchema = require("../models/favorito");

const router = express.Router();

// create user
router.post("/favoritos", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all users
router.get("/favoritos", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/favoritos/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/favoritos/:pokemon", (req, res) => {
  userSchema
    .findOne({ pokemon: req.params.pokemon })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/favoritos/find-by-user-id/:user_id", (req, res) => {
  userSchema
    .find({ user_id: req.params.user_id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
router.delete("/favoritos/:id", (req, res) => {
   const { id } = req.params;
   userSchema
     .deleteOne({ _id: id })
     .then((data) => res.json(data))
     .catch((error) => res.json({ message: error }));
});

// update a user
router.put("/favoritos/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;