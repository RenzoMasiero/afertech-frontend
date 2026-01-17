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

        {/* Factura */}
        <FormControl fullWidth>
          <InputLabel id="invoice-label">Factura</InputLabel>
          <Select
            labelId="invoice-label"
            name="invoiceId"
            value={order.invoiceId}
            label="Factura"
            onChange={handleChange}
            disabled={isEdit}
          >
            {invoices.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.invoiceNumber}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Orden de compra (derivada) */}
        <TextField
          fullWidth
          label="Orden de compra"
          value={selectedInvoice?.purchaseOrderNumber ?? "-"}
          disabled
        />

        {/* N° Orden de pago */}
        <TextField
          fullWidth
          name="paymentOrderNumber"
          label="N° Orden de pago"
          value={order.paymentOrderNumber ?? ""}
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

        {/* Retenciones */}
        <TextField
          fullWidth
          name="withholdings"
          label="Retenciones"
          type="number"
          value={order.withholdings ?? ""}
          onChange={handleChange}
        />

        {/* Concepto */}
        <TextField
          fullWidth
          name="concept"
          label="Concepto"
          value={order.concept ?? ""}
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
