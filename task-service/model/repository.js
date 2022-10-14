import TaskModel from "./task-model.js";
import "dotenv/config";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB =
    process.env.ENV == "PROD"
        ? process.env.DB_CLOUD_URI
        : process.env.DB_LOCAL_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function createTask(params) {
    return new TaskModel(params);
}

export async function findTask(name) {
    return TaskModel.findOne({ name });
}

export async function deleteTask(name) {
    return TaskModel.deleteOne({ name });
}

export async function changeGrader(name, newGrader) {
    return TaskModel.updateOne(
        {
            name: name,
        },
        {
            $set: {
                grader: newGrader,
            },
        }
    );
}
