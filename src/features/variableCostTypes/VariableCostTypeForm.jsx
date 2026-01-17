import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function VariableCostTypeForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const isEdit = Boolean(initialData?.id);

  const [type, setType] = useState(
    initialData || {
      name: "",
    }
  );

  const handleChange = (e) =>
    setType({ ...type, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (isEdit) {
      onSubmit({
        id: type.id,
        name: type.name,
      });
      return;
    }

    onSubmit({
      name: type.name,
    });
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {isEdit
          ? "Editar tipo de costo variable"
          : "Nuevo tipo de costo variable"}
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          name="name"
          label="Nombre"
          value={type.name ?? ""}
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
