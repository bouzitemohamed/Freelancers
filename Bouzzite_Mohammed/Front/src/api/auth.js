import axios from "axios";

const URI = "http://localhost:3000/api/auth";

export async function register(data) {
  try {
    // Send real fields, not { data: data }
    const res = await axios.post(`${URI}/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Success
    if (res.status === 201) {
      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);

      return {message:`Welcome ${user.firstName}, you are registered successfully.`,status:'ok'};
    }
  } catch (e) {
    // Backend error message
    const msg = e.response?.data?.error || e.message;
    return {message:`User failed to register. Error: ${msg}`,status:'off'};
  }
};
export async function login(data) {
  try {
    const res = await axios.post(`${URI}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const token = res.data.token;
      const user = res.data.user;

      // save token
      localStorage.setItem("token", token);

      return {
        message: `Welcome back ${user.firstName}!`,
        status: "ok",
        user,
      };
    }
  } catch (e) {
    const msg = e.response?.data?.error || e.message;

    return {
      message: `Login failed: ${msg}`,
      status: "off",
    };
  }
};

export const logout = async () => {
  const token = localStorage.getItem("token");

  if (!token) return { status: "error", message: "No token found" };

  try {
    const res = await axios.post(
       `${URI}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return { status: "ok", message: res.data.message };
  } catch (err) {
    return {
      status: "error",
      message: err.response?.data?.error || "Logout failed",
    };
  }
};



