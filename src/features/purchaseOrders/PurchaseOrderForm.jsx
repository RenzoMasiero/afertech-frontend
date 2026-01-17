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

export default function PurchaseOrderForm({
  clients = [],
  projects = [],
  initialData,
  onSubmit,
  onCancel,
}) {
  const isEdit = Boolean(initialData?.id);

  const [order, setOrder] = useState(
    initialData || {
      clientId: "",
      projectId: "",
      purchaseOrderNumber: "",
      issueDate: "",
      totalWithoutTax: "",
      totalWithTax: "",
      description: "",
    }
  );

  const handleChange = (e) =>
    setOrder({ ...order, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (isEdit) {
      onSubmit({
        id: order.id,
        purchaseOrderNumber: order.purchaseOrderNumber,
        issueDate: order.issueDate,
        totalWithoutTax: Number(order.totalWithoutTax),
        totalWithTax: Number(order.totalWithTax),
        description: order.description,
      });
      return;
    }

    onSubmit({
      clientId: Number(order.clientId),
      projectId: Number(order.projectId),
      purchaseOrderNumber: order.purchaseOrderNumber,
      issueDate: order.issueDate,
      totalWithoutTax: Number(order.totalWithoutTax),
      totalWithTax: Number(order.totalWithTax),
      description: order.description,
    });
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {isEdit ? "Editar orden de compra" : "Nueva orden de compra"}
      </Typography>

      {/* Layout vertical real */}
      <Stack spacing={2}>
        {/* Cliente */}
        <FormControl fullWidth>
          <InputLabel id="client-label">Cliente</InputLabel>
          <Select
            labelId="client-label"
            name="clientId"
            value={order.clientId}
            label="Cliente"
            onChange={handleChange}
            disabled={isEdit}
          >
            {clients.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Proyecto */}
        <FormControl fullWidth>
          <InputLabel id="project-label">Proyecto</InputLabel>
          <Select
            labelId="project-label"
            name="projectId"
            value={order.projectId}
            label="Proyecto"
            onChange={handleChange}
            disabled={isEdit}
          >
            {projects.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* N° Orden de compra */}
        <TextField
          fullWidth
          name="purchaseOrderNumber"
          label="N° Orden de compra"
          value={order.purchaseOrderNumber ?? ""}
          onChange={handleChange}
        />

        {/* Fecha */}
        <TextField
          fullWidth
          name="issueDate"
          label="Fecha"
          type="date"
          value={order.issueDate ?? ""}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        {/* Total sin IVA */}
        <TextField
          fullWidth
          name="totalWithoutTax"
          label="Total sin IVA"
          type="number"
          value={order.totalWithoutTax ?? ""}
          onChange={handleChange}
        />

        {/* Total con IVA */}
        <TextField
          fullWidth
          name="totalWithTax"
          label="Total con IVA"
          type="number"
          value={order.totalWithTax ?? ""}
          onChange={handleChange}
        />

        {/* Descripción */}
        <TextField
          fullWidth
          name="description"
          label="Descripción"
          value={order.description ?? ""}
          onChange={handleChange}
          multiline
          minRows={3}
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
