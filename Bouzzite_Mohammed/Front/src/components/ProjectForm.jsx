import React, { useState, useEffect } from "react";
import { createProject, updateProject } from "../api/project";
import { getClientsForDropdown } from "../api/client";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";

const ProjectForm = ({ project, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    client_id: "",
    description: "",
    billing_type: "hourly",
    hourly_rate: "",
    fixed_amount: "",
    status: "pending",
    start_date: "",
    end_date_estimated: "",
    shared: false // NEW
  });

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await getClientsForDropdown();
      if (res.status === "ok") setClients(res.clients);
    };
    fetchClients();

    // Load project when editing
    if (project) {
      setForm({
        name: project.name || "",
        client_id: project.client_id || "",
        description: project.description || "",
        billing_type: project.billing_type || "hourly",
        hourly_rate: project.hourly_rate || "",
        fixed_amount: project.fixed_amount || "",
        status: project.status || "pending",
        start_date: project.start_date?.split("T")[0] || "",
        end_date_estimated: project.end_date_estimated?.split("T")[0] || "",
        shared: project.shared || false // NEW
      });
    }
  }, [project]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // PREPARE CLEAN PAYLOAD
  const preparePayload = () => {
    const payload = { ...form };

    // Convert numeric fields
    if (payload.hourly_rate !== "") {
      payload.hourly_rate = Number(payload.hourly_rate);
    }
    if (payload.fixed_amount !== "") {
      payload.fixed_amount = Number(payload.fixed_amount);
    }

    // Shared must be boolean
    payload.shared = Boolean(payload.shared);

    // Remove fields depending on billing type
    if (payload.billing_type === "fixed") delete payload.hourly_rate;
    if (payload.billing_type === "hourly") delete payload.fixed_amount;

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = preparePayload();
    console.log("FINAL PAYLOAD", payload);

    try {
      if (project) await updateProject(project.id, payload);
      else await createProject(payload);

      onSuccess();
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      
      <TextField
        fullWidth
        label="Project Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        sx={{ mb: 2 }}
        required
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Client</InputLabel>
        <Select
          name="client_id"
          value={form.client_id}
          onChange={handleChange}
          required
        >
          {clients.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Billing Type</InputLabel>
        <Select
          name="billing_type"
          value={form.billing_type}
          onChange={handleChange}
          required
        >
          <MenuItem value="hourly">Hourly</MenuItem>
          <MenuItem value="fixed">Fixed</MenuItem>
        </Select>
      </FormControl>

      {form.billing_type === "hourly" && (
        <TextField
          fullWidth
          label="Hourly Rate"
          name="hourly_rate"
          type="number"
          value={form.hourly_rate}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
      )}

      {form.billing_type === "fixed" && (
        <TextField
          fullWidth
          label="Fixed Amount"
          name="fixed_amount"
          type="number"
          value={form.fixed_amount}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
      )}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select name="status" value={form.status} onChange={handleChange}>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="on_hold">On Hold</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Start Date"
        type="date"
        name="start_date"
        value={form.start_date}
        onChange={handleChange}
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        fullWidth
        label="End Date Estimated"
        type="date"
        name="end_date_estimated"
        value={form.end_date_estimated}
        onChange={handleChange}
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
      />

      {/* NEW SHARED CHECKBOX */}
      <FormControl sx={{ mb: 2 }}>
        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            name="shared"
            checked={form.shared}
            onChange={(e) =>
              setForm({ ...form, shared: e.target.checked })
            }
          />
          Shared with other freelancers
        </label>
      </FormControl>

      <Button variant="contained" type="submit">
        {project ? "Update Project" : "Create Project"}
      </Button>
    </Box>
  );
};

export default ProjectForm;
