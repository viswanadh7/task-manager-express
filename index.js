require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const taskRouter = require("./routes/taskRouter");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected..."))
    .catch((error) => console.log(error.message));

const authorization = (req, res, next) => {
    // console.log(req.headers);
    const apiKey = req.headers.authorization;
    if (!apiKey || apiKey !== `Bearer ${process.env.API_KEY}`) {
        return res.status(403).json({ error: "Unauthorized" });
    }
    next();
};
const app = express();
app.use(express.json());
app.use(cors());
app.use(authorization);
app.use(taskRouter);
app.use(userRouter);
app.listen(8000, () => console.log("Running on port 8000"));
