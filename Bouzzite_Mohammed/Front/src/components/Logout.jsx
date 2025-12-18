import React, { useContext } from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../api/auth";
import { AuthContext } from "../contexts/authContext";

const LogoutButton = () => {
  const { setAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    const res = await logout();

    alert(res.message);

    if (res.status === "ok") {
      setAuth(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{ mt: 2 }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
