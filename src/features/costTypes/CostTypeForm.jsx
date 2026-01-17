import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function CostTypeForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const isEdit = Boolean(initialData?.id);

  const [form, setForm] = useState(
    initialData || {
      name: "",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name?.trim()) {
      alert("El nombre del tipo de costo es obligatorio.");
      return;
    }

    if (isEdit) {
      onSubmit({
        id: form.id,
        name: form.name,
      });
      return;
    }

    onSubmit({
      name: form.name,
    });
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {isEdit ? "Editar tipo de costo fijo" : "Nuevo tipo de costo fijo"}
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Nombre"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </Stack>

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
