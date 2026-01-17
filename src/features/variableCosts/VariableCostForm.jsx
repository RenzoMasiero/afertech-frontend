import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

export default function VariableCostForm({
  costTypes = [],
  suppliers = [],
  projects = [],
  initialData,
  onSubmit,
  onCancel,
}) {
  const isEdit = Boolean(initialData?.id);

  const [cost, setCost] = useState(
    initialData || {
      costTypeId: "",
      supplierId: "",
      projectId: "",
      amount: "",
      allocationMonth: "",
      paymentDate: "",
      description: "",
    }
  );

  const handleChange = (e) =>
    setCost({ ...cost, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const payload = {
      costTypeId: Number(cost.costTypeId),
      supplierId: Number(cost.supplierId),
      amount: Number(cost.amount),
      allocationMonth: cost.allocationMonth,
      paymentDate: cost.paymentDate,
      description: cost.description,
      projectId: cost.projectId ? Number(cost.projectId) : null,
    };

    if (isEdit) {
      onSubmit({ id: cost.id, ...payload });
      return;
    }

    onSubmit(payload);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {isEdit ? "Editar costo variable" : "Nuevo costo variable"}
      </Typography>

      <Stack spacing={2}>
        {/* Tipo de costo */}
        <FormControl fullWidth>
          <InputLabel id="cost-type-label">Tipo de costo</InputLabel>
          <Select
            labelId="cost-type-label"
            name="costTypeId"
            value={cost.costTypeId}
            label="Tipo de costo"
            onChange={handleChange}
          >
            {costTypes.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Proveedor */}
        <FormControl fullWidth>
          <InputLabel id="supplier-label">Proveedor</InputLabel>
          <Select
            labelId="supplier-label"
            name="supplierId"
            value={cost.supplierId}
            label="Proveedor"
            onChange={handleChange}
          >
            {suppliers.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Proyecto (opcional) */}
        <FormControl fullWidth>
          <InputLabel id="project-label">Proyecto</InputLabel>
          <Select
            labelId="project-label"
            name="projectId"
            value={cost.projectId ?? ""}
            label="Proyecto"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Sin proyecto</em>
            </MenuItem>
            {projects.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Monto */}
        <TextField
          fullWidth
          name="amount"
          label="Monto"
          type="number"
          value={cost.amount}
          onChange={handleChange}
        />

        {/* Mes de imputación */}
        <TextField
          fullWidth
          name="allocationMonth"
          label="Mes de imputación"
          type="date"
          value={cost.allocationMonth}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        {/* Fecha de pago */}
        <TextField
          fullWidth
          name="paymentDate"
          label="Fecha de pago"
          type="date"
          value={cost.paymentDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        {/* Descripción */}
        <TextField
          fullWidth
          name="description"
          label="Descripción"
          value={cost.description}
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
