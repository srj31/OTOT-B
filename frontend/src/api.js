import axios from "axios";
import { SERVERLESS_API1 } from "./constants.js";

const API = "https://task-service-fi2xhkc76q-as.a.run.app/api/v1";

export const getATask = async ({ name }) => {
    const res = await axios.get(`${API}/?name=${name}`);
    return res.data.task;
};

export const createTask = async ({ name, points, grader }) => {
    const res = await axios.post(`${API}/`, {
        name,
        points,
        grader,
    });
    return res.data;
};

export const changeGrader = async ({ name, newGrader }) => {
    const res = await axios.put(`${API}/`, {
        name,
        newGrader,
    });
    return res.data;
};

export const deleteTask = async ({ name }) => {
    const res = await axios.delete(`${API}/?name=${name}`);
    return res.data;
};

export const getCsMods = async () => {
    const res = await axios.get(SERVERLESS_API1);
    return res.data;
};
