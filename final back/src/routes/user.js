const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

//create user
router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get all users
router.get("/users", (req, res) => {
    const user = userSchema(req.body);
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get a user
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/users/find-by-username-and-password/:name_user/:password", (req, res) => {
    userSchema
        .findOne({
            name_user: req.params.name_user,
            password: req.params.password
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//update a users
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, name_user, password } = req.body;
    userSchema
        .updateOne({ _id: id }, { $set: { name, email, name_user, password } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//delete a users
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;