const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    userID: { type: String, required: true },
    heading: {
        type: String,
        required: true,
    },
    description: String,
    date: String,
    stage: String,
});
module.exports = mongoose.model("tasks", taskSchema);
