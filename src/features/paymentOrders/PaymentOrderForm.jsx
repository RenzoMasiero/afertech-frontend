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

export default function PaymentOrderForm({
  clients = [],
  projects = [],
  invoices = [],
  purchaseOrders = [],
  initialData,
  onSubmit,
  onCancel,
}) {
  const [order, setOrder] = useState(
    initialData || {
      clientId: "",
      projectId: "",
      invoiceId: "",
      purchaseOrderId: "",
      paymentOrderNumber: "",
      issueDate: "",
      totalWithoutTax: "",
      totalWithTax: "",
      withholdings: "",
      concept: "",
    }
  );

  const handleChange = (e) =>
    setOrder({ ...order, [e.target.name]: e.target.value });

  const handleSubmit = () =>
    onSubmit({
      ...order,
      clientId: Number(order.clientId),
      projectId: Number(order.projectId),
      invoiceId: Number(order.invoiceId),
      purchaseOrderId: Number(order.purchaseOrderId),
    });

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {order.id ? "Editar orden de pago" : "Nueva orden de pago"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Select fullWidth name="clientId" value={order.clientId} onChange={handleChange} displayEmpty>
            <MenuItem value="">Seleccionar cliente</MenuItem>
            {clients.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} md={6}>
          <Select fullWidth name="projectId" value={order.projectId} onChange={handleChange} displayEmpty>
            <MenuItem value="">Seleccionar proyecto</MenuItem>
            {projects.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} md={6}>
          <Select fullWidth name="invoiceId" value={order.invoiceId} onChange={handleChange} displayEmpty>
            <MenuItem value="">Seleccionar factura</MenuItem>
            {invoices.map((i) => (
              <MenuItem key={i.id} value={i.id}>{i.invoiceNumber}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} md={6}>
          <Select fullWidth name="purchaseOrderId" value={order.purchaseOrderId} onChange={handleChange} displayEmpty>
            <MenuItem value="">Seleccionar OC</MenuItem>
            {purchaseOrders.map((po) => (
              <MenuItem key={po.id} value={po.id}>{po.purchaseOrderNumber}</MenuItem>
            ))}
          </Select>
        </Grid>

        {[
          ["paymentOrderNumber", "N° Orden de pago"],
          ["issueDate", "Fecha", "date"],
          ["totalWithoutTax", "Total sin IVA", "number"],
          ["totalWithTax", "Total con IVA", "number"],
          ["withholdings", "Retenciones", "number"],
          ["concept", "Concepto"],
        ].map(([n, l, t]) => (
          <Grid item xs={12} md={6} key={n}>
            <TextField
              fullWidth
              name={n}
              label={l}
              type={t || "text"}
              value={order[n] ?? ""}
              onChange={handleChange}
              InputLabelProps={t === "date" ? { shrink: true } : {}}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
        <Button variant="outlined" onClick={onCancel}>Cancelar</Button>
      </Box>
    </Box>
  );
}
