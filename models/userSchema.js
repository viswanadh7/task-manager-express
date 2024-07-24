const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: String,
});
module.exports = mongoose.model("users", userSchema);
