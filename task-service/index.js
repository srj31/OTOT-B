import express from "express";
import cors from "cors";
import {
    changeGrader,
    createTask,
    deleteTask,
    findTask,
} from "./controller/task-controller.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const router = express.Router();

// Controller will contain all the User-defined Routes
router.get("/", findTask);
router.post("/", createTask);
router.delete("/", deleteTask);
router.put("/", changeGrader);

app.use("/api/v1", router).all((_, res) => {
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(8000, () => console.log("otot-b backend listening on port 8000"));

export default app;
