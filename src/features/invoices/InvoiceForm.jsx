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
      currencyOriginal: "ARS",
    }
  );

  const [clientFilter, setClientFilter] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "projectId") {
      setInvoice({
        ...invoice,
        projectId: value,
        purchaseOrderId: "",
      });
      return;
    }

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
      currencyOriginal: invoice.currencyOriginal,
      id: invoice.id,
    });
  };

  const filteredClients = useMemo(() => {
    const q = clientFilter.toLowerCase();
    return clients.filter((c) => c.name.toLowerCase().includes(q));
  }, [clients, clientFilter]);

  const filteredPurchaseOrders = useMemo(() => {
    if (!invoice.projectId) return [];

    return purchaseOrders.filter(
      (po) => Number(po.projectId) === Number(invoice.projectId)
    );
  }, [purchaseOrders, invoice.projectId]);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {invoice.id ? "Editar factura" : "Nueva factura"}
      </Typography>

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
            disabled={!invoice.projectId}
          >
            {filteredPurchaseOrders.map((po) => (
              <MenuItem key={po.id} value={po.id}>
                {po.purchaseOrderNumber}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Datos generales */}
        <TextField
          fullWidth
          name="invoiceNumber"
          label="N° Factura"
          value={invoice.invoiceNumber ?? ""}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          name="issueDate"
          label="Fecha de factura"
          type="date"
          value={invoice.issueDate ?? ""}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          name="description"
          label="Descripción"
          value={invoice.description ?? ""}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          name="deferredPaymentDays"
          label="Días de pago diferido"
          type="number"
          value={invoice.deferredPaymentDays ?? ""}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          name="purchaseOrderPercentage"
          label="% Orden de compra"
          type="number"
          value={invoice.purchaseOrderPercentage ?? ""}
          onChange={handleChange}
          inputProps={{ min: 0, max: 100 }}
        />

        {/* Moneda */}
        <FormControl fullWidth>
          <InputLabel id="currency-label">Moneda</InputLabel>
          <Select
            labelId="currency-label"
            name="currencyOriginal"
            value={invoice.currencyOriginal}
            label="Moneda"
            onChange={handleChange}
          >
            <MenuItem value="ARS">ARS</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </Select>
        </FormControl>

        {/* Importes */}
        <TextField
          fullWidth
          name="totalWithoutTax"
          label="Total sin IVA"
          type="number"
          value={invoice.totalWithoutTax ?? ""}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          name="totalWithTax"
          label="Total con IVA"
          type="number"
          value={invoice.totalWithTax ?? ""}
          onChange={handleChange}
        />

        {/* Orden de pago (solo lectura) */}
        <TextField
          fullWidth
          label="Orden de pago"
          value={invoice.paymentOrderNumber || "Sin orden de pago"}
          InputProps={{ readOnly: true }}
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