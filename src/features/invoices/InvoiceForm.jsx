import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  ListSubheader,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useMemo, useState } from "react";

export default function InvoiceForm({
  onCancel,
  onSubmit,
  initialData,
  clients = [],
  projects = [],
  purchaseOrders = [],
}) {
  const [invoice, setInvoice] = useState(
    initialData || {
      clientId: "",
      projectId: "",
      purchaseOrderId: "",
      invoiceNumber: "",
      issueDate: "",
      description: "",
      totalWithoutTax: "",
      totalWithTax: "",
      deferredPaymentDays: "",
      purchaseOrderPercentage: "",
    }
  );

  const [clientFilter, setClientFilter] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "purchaseOrderPercentage") {
      const numeric =
        value === "" ? "" : Math.min(100, Math.max(0, Number(value)));
      setInvoice({ ...invoice, [name]: numeric });
      return;
    }

    setInvoice({ ...invoice, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit({
      clientId: Number(invoice.clientId),
      projectId: Number(invoice.projectId),
      purchaseOrderId: Number(invoice.purchaseOrderId),
      invoiceNumber: invoice.invoiceNumber,
      issueDate: invoice.issueDate,
      description: invoice.description,
      totalWithoutTax: Number(invoice.totalWithoutTax),
      totalWithTax: Number(invoice.totalWithTax),
      deferredPaymentDays: Number(invoice.deferredPaymentDays),
      purchaseOrderPercentage: Number(invoice.purchaseOrderPercentage),
      id: invoice.id,
    });
  };

  const filteredClients = useMemo(() => {
    const q = clientFilter.toLowerCase();
    return clients.filter((c) => c.name.toLowerCase().includes(q));
  }, [clients, clientFilter]);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {invoice.id ? "Editar factura" : "Nueva factura"}
      </Typography>

      {/* LAYOUT VERTICAL REAL */}
      <Stack spacing={2}>
        {/* Cliente */}
        <FormControl fullWidth>
          <InputLabel id="client-label">Cliente</InputLabel>
          <Select
            labelId="client-label"
            name="clientId"
            value={invoice.clientId}
            label="Cliente"
            onChange={handleChange}
          >
            <ListSubheader>
              <TextField
                size="small"
                placeholder="Buscar cliente"
                fullWidth
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </ListSubheader>

            {filteredClients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
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
            value={invoice.projectId}
            label="Proyecto"
            onChange={handleChange}
          >
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Orden de compra */}
        <FormControl fullWidth>
          <InputLabel id="po-label">Orden de compra</InputLabel>
          <Select
            labelId="po-label"
            name="purchaseOrderId"
            value={invoice.purchaseOrderId}
            label="Orden de compra"
            onChange={handleChange}
          >
            {purchaseOrders.map((po) => (
              <MenuItem key={po.id} value={po.id}>
                {po.purchaseOrderNumber}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Orden de pago (solo lectura) */}
        <TextField
          fullWidth
          label="Orden de pago"
          value={invoice.paymentOrderNumber || "Sin orden de pago"}
          InputProps={{ readOnly: true }}
        />

        {/* Campos estándar */}
        {[
          ["invoiceNumber", "N° Factura"],
          ["issueDate", "Fecha de factura", "date"],
          ["description", "Descripción"],
          ["totalWithoutTax", "Total sin IVA", "number"],
          ["totalWithTax", "Total con IVA", "number"],
          ["deferredPaymentDays", "Días de pago diferido", "number"],
          ["purchaseOrderPercentage", "% Orden de compra", "number"],
        ].map(([name, label, type]) => (
          <TextField
            key={name}
            fullWidth
            name={name}
            label={label}
            type={type || "text"}
            value={invoice[name] ?? ""}
            onChange={handleChange}
            InputLabelProps={type === "date" ? { shrink: true } : {}}
            inputProps={
              name === "purchaseOrderPercentage"
                ? { min: 0, max: 100 }
                : undefined
            }
          />
        ))}
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
