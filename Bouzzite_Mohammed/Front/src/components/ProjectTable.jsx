import React, { useEffect, useState } from "react";
import { getProjects,deleteProject } from "../api/project";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Button
} from "@mui/material";
import ProjectForm from "./ProjectForm";

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await getProjects();
    if (res.status === "ok") setProjects(res.projects);
    else console.error(res.message);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);
 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to archive this project?")) return;

  const res = await deleteProject(id);
  if (res.status === "ok") fetchProjects();
  else alert(res.message);
};

  if (loading) return <CircularProgress />;

  return (
    <Box>
      {projects.length === 0 ? (
        <Typography>No projects found.</Typography>
      ) : (
        <List>
          {projects.map(project => (
            <React.Fragment key={project.id}>
              <ListItem>
                <ListItemText
                  primary={project.name}
                  secondary={`Client: ${project.Client?.name || "N/A"} | Status: ${project.status}`}
                />
                <Button onClick={() => { setEditProject(project); setShowForm(true); }}>Update</Button>
                <Button color="error" onClick={() => handleDelete(project.id)} >Delete</Button>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button variant="contained" onClick={() => { setEditProject(null); setShowForm(true); }}>
          {showForm ? "Cancel" : "Create Project"}
        </Button>
      </Box>

      {showForm && <ProjectForm project={editProject} onSuccess={() => { setShowForm(false); fetchProjects(); }} />}
    </Box>
  );
};

export default ProjectTable;
