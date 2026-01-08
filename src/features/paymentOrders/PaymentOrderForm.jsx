import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useMemo, useState } from "react";

export default function PaymentOrderForm({
  clients = [],
  projects = [],
  invoices = [],
  initialData,
  onSubmit,
  onCancel,
}) {
  const isEdit = Boolean(initialData?.id);

  const [order, setOrder] = useState(
    initialData || {
      clientId: "",
      projectId: "",
      invoiceId: "",
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

  const selectedInvoice = useMemo(
    () => invoices.find((i) => i.id === Number(order.invoiceId)),
    [invoices, order.invoiceId]
  );

  const handleSubmit = () => {
    if (!isEdit && !order.invoiceId) {
      alert("Debés seleccionar una factura para crear la orden de pago.");
      return;
    }

    if (isEdit) {
      onSubmit({
        id: order.id,
        paymentOrderNumber: order.paymentOrderNumber,
        issueDate: order.issueDate,
        totalWithoutTax: Number(order.totalWithoutTax),
        totalWithTax: Number(order.totalWithTax),
        withholdings: Number(order.withholdings),
        concept: order.concept,
      });
      return;
    }

    onSubmit({
      clientId: Number(order.clientId),
      projectId: Number(order.projectId),
      invoiceId: Number(order.invoiceId),
      paymentOrderNumber: order.paymentOrderNumber,
      issueDate: order.issueDate,
      totalWithoutTax: Number(order.totalWithoutTax),
      totalWithTax: Number(order.totalWithTax),
      withholdings: Number(order.withholdings),
      concept: order.concept,
    });
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {isEdit ? "Editar orden de pago" : "Nueva orden de pago"}
      </Typography>

      <Grid container spacing={2}>
        {/* Cliente */}
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
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

        {/* Factura */}
        <Grid item xs={12} md={4}>
          <Select
            fullWidth
            name="invoiceId"
            value={order.invoiceId}
            onChange={handleChange}
            displayEmpty
            disabled={isEdit}
          >
            <MenuItem value="">
              <em>Seleccionar factura</em>
            </MenuItem>
            {invoices.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.invoiceNumber}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Orden de compra (derivada) */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Orden de compra"
            value={selectedInvoice?.purchaseOrderNumber ?? "-"}
            disabled
          />
        </Grid>

        {/* N° Orden de pago (EDITABLE) */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="paymentOrderNumber"
            label="N° Orden de pago"
            value={order.paymentOrderNumber ?? ""}
            onChange={handleChange}
          />
        </Grid>

        {[
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
