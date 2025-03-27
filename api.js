import axios from "axios";

// const API_URL = "http://localhost:5000";
const API_URL = "https://uls-backend.onrender.com";

export const createProject = async (name) =>
    await axios.post(`${API_URL}/projects`, { name });

export const getProjects = async () => await axios.get(`${API_URL}/projects`);

export const createLog = async (projectID, message, level = "info") =>
    await axios.post(`${API_URL}/logs`, { projectID, message, level });

export const getLogs = async (projectID) =>
    await axios.get(`${API_URL}/logs/${projectID}`);
