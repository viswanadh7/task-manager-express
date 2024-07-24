const express = require("express");
const taskSchema = require("../models/task");
const router = express.Router();

router.get("/tasks", async (req, res) => {
    // console.log(req.headers.userid);
    const allTasks = await taskSchema.find({ userID: req.headers.userid });
    // console.log(allTasks);
    res.send(allTasks);
});
router.get("/tasks/:id", async (req, res) => {
    // console.log(req.headers.userid);
    const detailTask = await taskSchema.findOne({ _id: req.params.id });
    // console.log(allTasks);
    res.send(detailTask);
});
router.post("/tasks", (req, res) => {
    const task = req.body;
    try {
        const newTask = taskSchema(task);
        newTask.save(); //.catch((error) => console.log(error.message));
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});
router.patch("/tasks/:id", async (req, res) => {
    const stage = req.body;
    try {
        await taskSchema
            .findByIdAndUpdate(req.params.id, stage)
            .then(() => res.sendStatus(200))
            .catch((error) => console.log(error));
    } catch (error) {
        console.log(error.message);
    }
});
router.put("/tasks/:id", async (req, res) => {
    try {
        await taskSchema.findByIdAndUpdate(req.params.id, req.body);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});
router.delete("/tasks/:id", async (req, res) => {
    try {
        await taskSchema.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});
module.exports = router;
