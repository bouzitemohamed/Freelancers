// src/api/project.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/project"; // change to your backend URL

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all projects for the logged-in user
export const getProjects = async () => {
  try {
    const res = await axios.get(API_URL, { headers: getAuthHeaders() });
    return { status: "ok", projects: res.data };
  } catch (error) {
    return { status: "error", message: error.response?.data?.message || error.message };
  }
};

// Get a single project by ID
export const getProjectById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return { status: "ok", project: res.data };
  } catch (error) {
    return { status: "error", message: error.response?.data?.message || error.message };
  }
};

// Create a new project
export const createProject = async (projectData) => {
  try {
    const res = await axios.post(API_URL, projectData, { headers: getAuthHeaders() });
    return { status: "ok", project: res.data };
  } catch (error) {
    return { status: "error", message: error.response?.data?.message || error.message };
  }
};

// Update a project
export const updateProject = async (id, projectData) => {
  try {
    const res = await axios.patch(`${API_URL}/${id}`, projectData, { headers: getAuthHeaders() });
    return { status: "ok", project: res.data };
  } catch (error) {
    return { status: "error", message: error.response?.data?.message || error.message };
  }
};

// Delete a project
export const deleteProject = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return { status: "ok", message: res.data.message };
  } catch (error) {
    return { status: "error", message: error.response?.data?.message || error.message };
  }
};

// Toggle project shared status
export const toggleSharedProject = async (id) => {
  try {
    const res = await axios.patch(`${API_URL}/${id}/toggle-shared`, {}, { headers: getAuthHeaders() });
    return { status: "ok", project: res.data.project };
  } catch (error) {
    return { status: "error", message: error.response?.data?.message || error.message };
  }
};

// Get shared projects
export const getSharedProjects = async () => {
  try {
    const res = await axios.get(`${API_URL}/shared`, { headers: getAuthHeaders() });
    return { status: "ok", projects: res.data };
  } catch (error) {
    return { status: "error", message: error.response?.data?.message || error.message };
  }
};
