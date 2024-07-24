const express = require("express");
const userSchema = require("../models/userSchema");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const newUser = await userSchema(req.body);
        newUser
            .save()
            .then(() => res.sendStatus(200))
            .catch((error) => {
                if (error.code === 11000) {
                    res.status(400).send("Email already registered");
                }
            });
    } catch (error) {
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email });
        if (req.body.password === user.password) {
            res.status(200).send(user._id);
        } else {
            res.status(401).send("Incorrect password.! Please try again...");
        }
    } catch (error) {
        res.status(401).send("User not found");
    }
});
router.post("/google-login", async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email });
        res.status(200).send(user._id);
    } catch (error) {
        res.status(401).send("User not found");
    }
});
module.exports = router;
