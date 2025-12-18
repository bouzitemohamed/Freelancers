// src/components/DashboardLayout.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";

import ClientTable from "./ClientTable";
import ProjectTable from "./ProjectTable";

const DashboardLayout = () => {
  const { auth, user } = useContext(AuthContext);
  const [active, setActive] = useState("clients");

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#eef3f8" }}>
      
      {/* SIDEBAR */}
      <Box
        sx={{
          width: 250,
          bgcolor: "white",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          py: 3,
        }}
      >
        {/* USER PANEL */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            sx={{
              width: 70,
              height: 70,
              mx: "auto",
              bgcolor: "#1565c0",
              fontSize: 30,
            }}
          >
            {user?.firstName?.[0]?.toUpperCase() || "U"}
          </Avatar>

          <Typography
            variant="h6"
            sx={{ mt: 1, fontWeight: "bold", color: "#1565c0" }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>

        <Divider />

        {/* MENU */}
        <List sx={{ mt: 2 }}>
          <ListItemButton
            selected={active === "clients"}
            onClick={() => setActive("clients")}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 1,
              "&.Mui-selected": {
                bgcolor: "#1565c022",
                borderLeft: "4px solid #1565c0",
              },
              "&:hover": { bgcolor: "#1565c011" },
            }}
          >
            <ListItemIcon>
              <PeopleIcon sx={{ color: "#1565c0" }} />
            </ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItemButton>

          <ListItemButton
            selected={active === "projects"}
            onClick={() => setActive("projects")}
            sx={{
              borderRadius: 2,
              mx: 1,
              "&.Mui-selected": {
                bgcolor: "#1565c022",
                borderLeft: "4px solid #1565c0",
              },
              "&:hover": { bgcolor: "#1565c011" },
            }}
          >
            <ListItemIcon>
              <WorkIcon sx={{ color: "#1565c0" }} />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </List>
      </Box>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            p: 3,
            borderRadius: 3,
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Welcome back, {auth ? user?.firstName : "User"} 👋
          </Typography>
          <Typography sx={{ color: "gray", mt: 1 }}>
            Here is your workspace. Manage your clients and projects easily.
          </Typography>
        </Box>

        {/* CONTENT SECTION */}
        <Box
          sx={{
            bgcolor: "white",
            p: 3,
            borderRadius: 3,
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          {active === "clients" && <ClientTable />}
          {active === "projects" && <ProjectTable />}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
