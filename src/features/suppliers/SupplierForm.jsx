import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function SupplierForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const isEdit = Boolean(initialData?.id);

  const [supplier, setSupplier] = useState(
    initialData || {
      name: "",
      taxId: "",
    }
  );

  const handleChange = (e) =>
    setSupplier({ ...supplier, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (isEdit) {
      onSubmit({
        id: supplier.id,
        name: supplier.name,
        taxId: supplier.taxId,
      });
      return;
    }

    onSubmit({
      name: supplier.name,
      taxId: supplier.taxId,
    });
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {isEdit ? "Editar proveedor" : "Nuevo proveedor"}
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          name="name"
          label="Proveedor"
          value={supplier.name ?? ""}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          name="taxId"
          label="CUIT"
          value={supplier.taxId ?? ""}
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
