// src/api/client.js
import axios from "axios";

const URI = "http://localhost:3000/api/client";

// Get token from localStorage (assumes you store JWT there)
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Get all clients
export async function getClients() {
  try {
    const res = await axios.get(URI, getAuthHeader());
    return { status: "ok", clients: res.data.clients };
  } catch (error) {
    return { status: "error", message: error.response?.data?.error || error.message };
  }
}

// Get client by id
export async function getClient(id) {
  try {
    const res = await axios.get(`${URI}/${id}`, getAuthHeader());
    return { status: "ok", client: res.data.client };
  } catch (error) {
    return { status: "error", message: error.response?.data?.error || error.message };
  }
}

// Create new client
export async function createClient(data) {
  try {
    const res = await axios.post(URI, data, getAuthHeader());
    return { status: "ok", client: res.data.client };
  } catch (error) {
    return { status: "error", message: error.response?.data?.error || error.message };
  }
}

// Update client
export async function updateClient(id, data) {
  try {
    const res = await axios.patch(`${URI}/${id}`, data, getAuthHeader());
    return { status: "ok", client: res.data.client };
  } catch (error) {
    return { status: "error", message: error.response?.data?.error || error.message };
  }
}

// Delete (soft delete) client
export async function deleteClient(id) {
  try {
    const res = await axios.delete(`${URI}/${id}`, getAuthHeader());
    return { status: "ok", message: res.data.message };
  } catch (error) {
    return { status: "error", message: error.response?.data?.error || error.message };
  }
};
export const getClientsForDropdown = async () => {
  try {
    const res = await axios.get(`${URI}/dropdown`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { status: "ok", clients: res.data.clients };
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || error.message,
    };
  }
};
