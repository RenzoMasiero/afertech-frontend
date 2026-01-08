import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ClientForm({ onCancel, onSubmit, initialData }) {
  const [client, setClient] = useState(
    initialData || {
      name: "",
      taxId: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setClient({
      ...client,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(client);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {client.id ? "Editar cliente" : "Nuevo cliente"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="name"
            label="Nombre"
            value={client.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="taxId"
            label="CUIT"
            value={client.taxId}
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
