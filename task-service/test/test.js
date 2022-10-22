import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import { ormDeleteTask } from "../model/task-orm.js";

const validTasks = [
    {
        name: "Task A",
        points: 10,
        grader: "Person 1",
    },
    {
        name: "Task B",
        points: 20,
        grader: "Person 2",
    },
    {
        name: "Task C",
        points: 40,
        grader: "Person 1",
    },
];

const invalidTasks = [
    {
        name: "Missing grader",
        points: 10,
    },
    {
        name: "Missing points",
        grader: "Person 3",
    },
];

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Tasks", () => {
    describe("POST /", () => {
        before(async () => {
            // runs once before the first test in this block
            // delete the task if existing
            try {
                await ormDeleteTask("Task A");
            } catch (err) {
                console.log(err);
            }
        });

        it("should create the task", (done) => {
            const taskToAdd = validTasks[0];
            chai.request(app)
                .post("/api/v1")
                .send(taskToAdd)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("error for creating invalid task", (done) => {
            const invalidTaskToAdd = invalidTasks[0];
            chai.request(app)
                .post("/api/v1")
                .send(invalidTaskToAdd)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("GET /", () => {
        it("should get the task", (done) => {
            const taskName = "Task B";
            chai.request(app)
                .get("/api/v1")
                .query({ name: taskName })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("get a non existing task", (done) => {
            const taskName = "Task BMW";
            chai.request(app)
                .get("/api/v1")
                .query({ name: taskName })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("PUT /", () => {
        it("should update the task", (done) => {
            const taskName = "Task C";
            chai.request(app)
                .put("/api/v1")
                .send({ name: taskName, newGrader: "Person 5" })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("invalid body for updating task", (done) => {
            const taskName = "Task C";
            chai.request(app)
                .put("/api/v1")
                .send({ name: taskName })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("DELETE /", () => {
        it("delete a task", (done) => {
            const taskName = "Task A";
            chai.request(app)
                .delete("/api/v1")
                .query({ name: taskName })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
