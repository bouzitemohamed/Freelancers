import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { getSharedProjects } from "../api/project";
import { createJoinRequest } from "../api/request";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
  Grid,
  Chip,
  Divider,
  Button
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const AvailableProjects = () => {
  const { user } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShared = async () => {
    const res = await getSharedProjects();
    if (res.status === "ok") setProjects(res.projects);
    else console.error(res.message);
    setLoading(false);
  };

  useEffect(() => {
    fetchShared();
  }, []);

  const handleJoin = async (projectId) => {
    console.log("Joining project:", projectId);
    


    alert("Join request sent for project ID: " + projectId);
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ mt: 4 }}>
      {/* Welcome Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 50, height: 50 }}>
          {user?.firstName?.[0] || "U"}
        </Avatar>

        <Box sx={{ ml: 2 }}>
          <Typography variant="h5">Welcome, {user?.firstName || "User"} 👋</Typography>
          <Typography variant="body1" color="text.secondary">
            Here are the projects shared by other freelancers.
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Shared Projects
      </Typography>

      {projects.length === 0 ? (
        <Typography>No shared projects available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {projects.map((p) => (
            <Grid item xs={12} md={6} lg={4} key={p.id}>
              <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                <CardContent>

                  {/* Project Title */}
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    <WorkIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    {p.name}
                  </Typography>

                  <Typography sx={{ mt: 1, mb: 2 }} color="text.secondary">
                    {p.description}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  {/* Client Info */}
                  <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                    Client Information
                  </Typography>

                  <Box sx={{ ml: 1 }}>
                    <Typography><PersonIcon sx={{ fontSize: 18 }} /> {p.Client?.name}</Typography>
                    <Typography><EmailIcon sx={{ fontSize: 18 }} /> {p.Client?.contact_email}</Typography>
                    <Typography><PhoneIcon sx={{ fontSize: 18 }} /> {p.Client?.contact_phone}</Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Freelancers */}
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    Freelancers Involved
                  </Typography>

                  {p.Freelancers?.map((f, index) => (
                    <Chip
                      key={index}
                      label={`${f.firstName} ${f.lastName} (${f.ProjectUser.role})`}
                      sx={{ mr: 1, mb: 1 }}
                      color="primary"
                      variant="outlined"
                    />
                  ))}

                  {/* ---------------- */}
                  {/* JOIN BUTTON ADDED */}
                  {/* ---------------- */}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleJoin(p.id)}
                  >
                    Join Project
                  </Button>

                  <Divider sx={{ my: 2 }} />

                  {/* Status */}
                  <Typography>
                    Status:{" "}
                    <Chip
                      label={p.status}
                      color={
                        p.status === "completed"
                          ? "success"
                          : p.status === "in_progress"
                          ? "warning"
                          : "default"
                      }
                      size="small"
                    />
                  </Typography>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AvailableProjects;
