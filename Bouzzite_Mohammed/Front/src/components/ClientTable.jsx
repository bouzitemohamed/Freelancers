import React, { useEffect, useState } from "react";
import { getClients,deleteClient } from "../api/client";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import FormClient from "./FormClient";

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null); // <-- for update

  const fetchClients = async () => {
    setLoading(true);
    const res = await getClients();
    if (res.status === "ok") {
      setClients(res.clients);
    } else {
      console.error(res.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {clients.length === 0 ? (
        <Typography>No clients found.</Typography>
      ) : (
        <List>
          {clients.map((client) => (
            <React.Fragment key={client.id}>
              <ListItem
                secondaryAction={
                  <>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setSelectedClient(client); // set client data
                        setShowForm(true);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={async () => {
                        // handle delete here
                        await deleteClient(client.id);
                        fetchClients();
                      }}
                    >
                      Delete
                    </Button>
                  </>
                }
              >
                <ListItemText
                  primary={client.name}
                  secondary={`Contact: ${client.contact_name || "N/A"} - Email: ${
                    client.contact_email || "N/A"
                  }`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}

      {/* Create Client Button */}
      {!showForm && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedClient(null); // no client selected = create mode
              setShowForm(true);
            }}
          >
            Create Client
          </Button>
        </Box>
      )}

      {/* FormClient Component */}
      {showForm && (
        <FormClient
          client={selectedClient} // pass selected client to form
          onSuccess={() => {
            setShowForm(false);
            setSelectedClient(null);
            fetchClients();
          }}
          onCancel={() => {
            setShowForm(false);
            setSelectedClient(null);
          }}
        />
      )}
    </Box>
  );
};

export default ClientTable;
