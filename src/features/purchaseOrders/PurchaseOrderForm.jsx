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

      <Grid container spacing={2}>
        {/* Cliente */}
        <Grid item xs={12} md={6}>
          <Select
            fullWidth
            name="clientId"
            value={order.clientId}
            onChange={handleChange}
            displayEmpty
            disabled={isEdit}
          >
            <MenuItem value="">
              <em>Seleccionar cliente</em>
            </MenuItem>
            {clients.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Proyecto */}
        <Grid item xs={12} md={6}>
          <Select
            fullWidth
            name="projectId"
            value={order.projectId}
            onChange={handleChange}
            displayEmpty
            disabled={isEdit}
          >
            <MenuItem value="">
              <em>Seleccionar proyecto</em>
            </MenuItem>
            {projects.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* N° Orden de compra */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="purchaseOrderNumber"
            label="N° Orden de compra"
            value={order.purchaseOrderNumber ?? ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Fecha */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="issueDate"
            label="Fecha"
            type="date"
            value={order.issueDate ?? ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Totales */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="totalWithoutTax"
            label="Total sin IVA"
            type="number"
            value={order.totalWithoutTax ?? ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="totalWithTax"
            label="Total con IVA"
            type="number"
            value={order.totalWithTax ?? ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Descripción */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="description"
            label="Descripción"
            value={order.description ?? ""}
            onChange={handleChange}
            multiline
            minRows={3}
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
