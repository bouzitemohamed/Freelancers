import React, { useContext, useState } from "react";
import { metiers } from "../library/metiers";
import { register } from "../api/auth";
import { AuthContext } from "../contexts/authContext";
import { useNavigate, useLocation } from "react-router-dom";

// Material UI
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Stack,
  Divider,
} from "@mui/material";

const Register = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    company_name: "",
    metier: "Développeur Full-stack",
    currency: "",
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const res = await register(user);

    alert(res.message);

    if (res.status === "ok") {
      setAuth(true);
      navigate(from, { replace: true }); // Redirect to previous page or "/"
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: "50px auto",
        padding: 4,
        borderRadius: 3,
        boxShadow: 3,
      }}
      component={Paper}
    >
      <Typography variant="h5" mb={3} textAlign="center" fontWeight={600}>
        Create Account
      </Typography>

      <form onSubmit={handelSubmit}>
        <Stack spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={user.firstName}
            onChange={handelChange}
            fullWidth
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={user.lastName}
            onChange={handelChange}
            fullWidth
          />

          <TextField
            label="Company Name"
            name="company_name"
            value={user.company_name}
            onChange={handelChange}
            fullWidth
          />

          <TextField
            select
            label="Métier"
            name="metier"
            value={user.metier}
            onChange={handelChange}
            fullWidth
          >
            {metiers.map((l, i) => (
              <MenuItem key={i} value={l}>
                {l}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Currency"
            name="currency"
            value={user.currency}
            onChange={handelChange}
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handelChange}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handelChange}
            fullWidth
          />

          <Button variant="contained" type="submit" fullWidth>
            Register
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 1 }}>or</Divider>

          {/* Login Button */}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;
