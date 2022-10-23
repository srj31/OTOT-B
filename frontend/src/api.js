import axios from "axios";
import { API, SERVERLESS_API1 } from "./constants.js";

export const getATask = async ({ name }) => {
    const res = await axios.get(`${API}/?name=${name}`);
    return res.data;
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
