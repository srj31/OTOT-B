import {
    createTask,
    findTask,
    deleteTask,
    changeGrader,
} from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateTask(name, points, grader) {
    try {
        const newTask = await createTask({ name, points, grader });
        newTask.save((err) => {
            if (err) console.log(err);
        });
        return true;
    } catch (err) {
        console.log("ERROR: Could not create new task");
        return { err };
    }
}

export async function ormFindTask(name) {
    try {
        const task = await findTask(name);
        return task;
    } catch (err) {
        console.log("ERROR: Database error");
        return { err };
    }
}

export async function ormChangeGrader(name, newGrader) {
    try {
        const taskUpdated = await changeGrader(name, newGrader);
        return taskUpdated;
    } catch (err) {
        console.log("ERROR: Could not update grader");
        return { err };
    }
}

export async function ormDeleteTask(name) {
    try {
        await deleteTask(name);
        return true;
    } catch (err) {
        console.log("ERROR: Could not delete task");
        return { err };
    }
}
