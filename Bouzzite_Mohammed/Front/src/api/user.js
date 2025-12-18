import axios from "axios";

const URI = "http://localhost:3000/api/user"; 

export async function getMe() {
  try {
    const token = localStorage.getItem("token"); 
    if (!token) throw new Error("No token found");

    const res = await axios.get(`${URI}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { user: res.data.user, status: "ok" };
  } catch (error) {
    const msg = error.response?.data?.error || error.message;
    return { user: null, status: "error", message: msg };
  }
}
