import React, { useContext, useState } from "react";
import { login } from "../api/auth";
import { AuthContext } from "../contexts/authContext";
import { useNavigate, useLocation } from "react-router-dom";

// Material UI
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Divider,
} from "@mui/material";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);

    alert(res.message);

    if (res.status === "ok") {
      setAuth(true);
      navigate(from, { replace: true });
    }
  };

  return (
    // Full screen flex container to center the card
    <Box
      sx={{
        minHeight: "100vh",        // Full viewport height
        display: "flex",           // Flex container
        justifyContent: "center",  // Center horizontally
        alignItems: "center",      // Center vertically
        bgcolor: "#f5f5f5",       // Optional background color
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
        component={Paper}
      >
        <Typography variant="h5" mb={3} textAlign="center" fontWeight={600}>
          Welcome Back
        </Typography>

        <form onSubmit={handelSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handelChange}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handelChange}
              fullWidth
            />

            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>

            <Divider sx={{ my: 1 }}>or</Divider>

            {!auth && (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
