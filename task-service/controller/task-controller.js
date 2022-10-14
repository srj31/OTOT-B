import {
    ormCreateTask as _createTask,
    ormFindTask as _findTask,
    ormDeleteTask as _deleteTask,
    ormChangeGrader as _changeGrader,
} from "../model/task-orm.js";

export async function createTask(req, res) {
    try {
        const { name, points, grader } = req.body;
        if (name && points && grader) {
            const existingTask = await _findTask(name);

            //check if database have existing name
            if (existingTask) {
                return res.status(409).json({ message: "Existing task!" });
            }

            const resp = await _createTask(name, points, grader);
            if (resp.err) {
                return res
                    .status(400)
                    .json({ message: "Could not create a new task!" });
            } else {
                console.log(`Created new task ${name} successfully!`);
                return res.status(201).json({
                    message: `Created new task ${name} successfully!`,
                });
            }
        } else {
            return res.status(400).json({ message: "Incomplete fields" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Database failure when creating new task!" });
    }
}

export async function findTask(req, res) {
    try {
        const { name } = req.query;
        if (name) {
            const task = await _findTask(name);
            // check if name exists
            if (!task) {
                return res.status(400).json({ message: "Task does not exist" });
            }
            return res.status(200).json({
                task: task,
                message: `Found task ${name} succesfully`,
            });
            // all good to go
        } else {
            return res.status(400).json({ message: "Incomplete fields" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Server error in finding the task" });
    }
}

export async function changeGrader(req, res) {
    try {
        const { name, newGrader } = req.body;
        if (name && newGrader) {
            const task = await _findTask(name);

            // check if name exists
            if (!task) {
                return res.status(400).json({ message: "Task does not exist" });
            }

            // update old password to new password
            const resp = await _changeGrader(name, newGrader);
            if (resp.err) {
                return res
                    .status(400)
                    .json({ message: "Could not update password!" });
            } else {
                return res.status(200).json({
                    message: `Successfully updated grader for task ${name}!`,
                });
            }
        } else {
            return res.status(400).json({
                message: "Incomplete Fields!",
            });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Server error when updating grader!" });
    }
}

export async function deleteTask(req, res) {
    try {
        const { name } = req.query;
        if (name) {
            const task = await _findTask(name);
            if (!task) {
                return res.status(406).json({ message: "Task does not exist" });
            }

            console.log("Task was found");
            const resp = await _deleteTask(name);
            console.log(resp);
            if (resp.err) {
                return res
                    .status(400)
                    .json({ message: "Could not delete the task!" });
            } else {
                return res.status(200).json({
                    message: `Deleted task ${name} successfully!`,
                });
            }
        } else {
            return res.status(400).json({ message: "name missing!" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Database failure when deleting the task!" });
    }
}
