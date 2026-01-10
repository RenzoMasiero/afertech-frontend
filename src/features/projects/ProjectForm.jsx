import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ProjectForm({ onCancel, onSubmit, initialData }) {
  const [project, setProject] = useState(
    initialData || {
      name: "",
      description: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit({
      id: project.id,
      name: project.name,
      description: project.description,
    });
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {project.id ? "Editar proyecto" : "Nuevo proyecto"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="name"
            label="Nombre"
            value={project.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="description"
            label="Descripción"
            multiline
            rows={4}
            value={project.description}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
}
