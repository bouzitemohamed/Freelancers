// src/components/Header.jsx
import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import LogoutButton from "./Logout";

const Header = () => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
        color: "#1565c0",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            cursor: "pointer",
            fontWeight: "bold",
            letterSpacing: 0.5,
            color: "#1565c0",
          }}
          onClick={() => navigate("/")}
        >
          FreelanceHub
        </Typography>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!auth ? (
            <>
              <Button
                variant="text"
                sx={{ color: "#1565c0", fontWeight: "bold" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#1565c0",
                  color: "white",
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#0d47a1" },
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              {/* Available Projects Button */}
              <Button
                variant="text"
                sx={{
                  color: "#1565c0",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
                onClick={() => navigate("/available-projects")}
              >
                Available Projects
              </Button>

              {/* User Avatar */}
              <IconButton onClick={handleMenu}>
                <Avatar
                  sx={{
                    bgcolor: "#1565c0",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {user?.firstName?.[0]?.toUpperCase() || "U"}
                </Avatar>
              </IconButton>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{ sx: { borderRadius: 2, mt: 1 } }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/profile");
                  }}
                >
                  Profile
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <LogoutButton />
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
