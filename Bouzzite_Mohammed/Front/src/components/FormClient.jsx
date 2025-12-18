import React, { useState, useEffect } from "react";
import { createClient, updateClient } from "../api/client";
import { Box, TextField, Button } from "@mui/material";

const FormClient = ({ client, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Company",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    billing_address: "",
  });

  // Fill form if updating
  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || "",
        type: client.type || "Company",
        contact_name: client.contact_name || "",
        contact_email: client.contact_email || "",
        contact_phone: client.contact_phone || "",
        billing_address: client.billing_address || "",
      });
    }
  }, [client]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (client) {
        await updateClient(client.id, formData); // update
      } else {
        await createClient(formData); // create
      }
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Contact Name"
        name="contact_name"
        value={formData.contact_name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Contact Email"
        name="contact_email"
        value={formData.contact_email}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Contact Phone"
        name="contact_phone"
        value={formData.contact_phone}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Billing Address"
        name="billing_address"
        value={formData.billing_address}
        onChange={handleChange}
        margin="normal"
      />

      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" type="submit">
          {client ? "Update Client" : "Create Client"}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default FormClient;
