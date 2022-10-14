import mongoose from "mongoose";
var Schema = mongoose.Schema;
let TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    points: {
        type: String,
        required: true,
    },
    grader: {
        type: String,
        required: true,
    },
    create_date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("TaskModel", TaskSchema);
