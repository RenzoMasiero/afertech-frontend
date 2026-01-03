import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  ListSubheader,
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
      paymentOrderId: null,
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
      ...invoice,
      clientId: Number(invoice.clientId),
      projectId: Number(invoice.projectId),
      purchaseOrderId: invoice.purchaseOrderId
        ? Number(invoice.purchaseOrderId)
        : null,
    });
  };

  const filteredClients = useMemo(() => {
    const q = clientFilter.toLowerCase();
    return clients.filter((c) =>
      c.name.toLowerCase().includes(q)
    );
  }, [clients, clientFilter]);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {invoice.id ? "Editar factura" : "Nueva factura"}
      </Typography>

      <Grid container spacing={2}>
        {/* Cliente */}
        <Grid item xs={12} md={6}>
          <Select
            fullWidth
            name="clientId"
            value={invoice.clientId}
            onChange={handleChange}
            displayEmpty
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

            <MenuItem value="">
              <em>Seleccionar cliente</em>
            </MenuItem>

            {filteredClients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Proyecto */}
        <Grid item xs={12} md={6}>
          <Select
            fullWidth
            name="projectId"
            value={invoice.projectId}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Seleccionar proyecto</em>
            </MenuItem>

            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Orden de compra */}
        <Grid item xs={12} md={6}>
          <Select
            fullWidth
            name="purchaseOrderId"
            value={invoice.purchaseOrderId}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Sin orden de compra</em>
            </MenuItem>

            {purchaseOrders.map((po) => (
              <MenuItem key={po.id} value={po.id}>
                {po.purchaseOrderNumber}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {[
          ["invoiceNumber", "N° Factura"],
          ["issueDate", "Fecha de factura", "date"],
          ["description", "Descripción"],
          ["totalWithoutTax", "Total sin IVA", "number"],
          ["totalWithTax", "Total con IVA", "number"],
          ["deferredPaymentDays", "Días de pago diferido", "number"],
          ["purchaseOrderPercentage", "% Orden de compra", "number"],
        ].map(([name, label, type]) => (
          <Grid item xs={12} md={6} key={name}>
            <TextField
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
