// src/api/request.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/request";

// Helper: get JWT
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create a join request
export const createJoinRequest = async (project_id, role) => {
  try {
    const res = await axios.post(
      API_URL,
      { project_id, role },
      { headers: getAuthHeaders() }
    );
    return { status: "ok", request: res.data };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || error.message,
    };
  }
};

// Get requests for the project owner
export const getRequestsForOwner = async () => {
  try {
    const res = await axios.get(API_URL, { headers: getAuthHeaders() });
    return { status: "ok", requests: res.data };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || error.message,
    };
  }
};

// Approve a request
export const approveRequest = async (id) => {
  try {
    const res = await axios.patch(`${API_URL}/${id}`, {}, { headers: getAuthHeaders() });
    return { status: "ok", message: res.data.message };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || error.message,
    };
  }
};
