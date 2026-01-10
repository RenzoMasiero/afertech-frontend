import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
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

      <Grid container spacing={2}>
        {/* Tipo de costo */}
        <Grid item xs={12} md={6}>
          <Select
            fullWidth
            name="costTypeId"
            value={cost.costTypeId}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Seleccionar tipo de costo</em>
            </MenuItem>
            {costTypes.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Proveedor */}
        <Grid item xs={12} md={6}>
          <Select
            fullWidth
            name="supplierId"
            value={cost.supplierId}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Seleccionar proveedor</em>
            </MenuItem>
            {suppliers.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Proyecto (opcional) */}
        <Grid item xs={12} md={6}>
          <Select
            fullWidth
            name="projectId"
            value={cost.projectId ?? ""}
            onChange={handleChange}
            displayEmpty
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
        </Grid>

        {/* Monto */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="amount"
            label="Monto"
            type="number"
            value={cost.amount}
            onChange={handleChange}
          />
        </Grid>

        {/* Mes de imputación */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="allocationMonth"
            label="Mes de imputación"
            type="date"
            value={cost.allocationMonth}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Fecha de pago */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="paymentDate"
            label="Fecha de pago"
            type="date"
            value={cost.paymentDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Descripción */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="description"
            label="Descripción"
            value={cost.description}
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
