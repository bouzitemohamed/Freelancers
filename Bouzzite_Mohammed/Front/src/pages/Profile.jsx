import React, { useEffect, useState } from "react";
import { getMe } from "../api/user";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Avatar,
  Grid,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const res = await getMe();
      if (res.status === "ok") setUser(res.user);
      else console.error(res.message);
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );

  if (!user)
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={5}>
        Failed to load user data.
      </Typography>
    );

  const getInitials = (firstName, lastName) =>
    `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          p: 3,
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        {/* Header with Avatar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "primary.main",
              fontSize: 36,
              mb: 1,
            }}
          >
            {getInitials(user.firstName, user.lastName)}
          </Avatar>
          <Typography variant="h5" fontWeight={600}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user.metier}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Info Grid */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Company
              </Typography>
              <Typography variant="body1">{user.company_name || "N/A"}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Currency
              </Typography>
              <Typography variant="body1">{user.currency}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Joined
              </Typography>
              <Typography variant="body1">
                {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Dashboard Button */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Profile;
