import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function InvoiceForm({
  onCancel,
  onSubmit,
  initialData,
}) {
  const [invoice, setInvoice] = useState(
    initialData || {
      company: "",
      invoiceNumber: "",
      issueDate: "",
      description: "",
      totalWhitoutTax: "",
      totalWhitTax: "",
      deferredPaymentDays: "",
      projectNumber: "",
      purchaseOrder: "",
      purchaseOrderPercentage: "",
      paymentOrder: "",
    }
  );

  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const isEdit = Boolean(invoice.id);
    const url = isEdit
      ? `http://localhost:8080/invoices/${invoice.id}`
      : "http://localhost:8080/invoices";

    fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoice),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((savedInvoice) => {
        onSubmit(savedInvoice);
      })
      .catch(() => {
        alert("Error al guardar la factura");
      });
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {invoice.id ? "Editar factura" : "Nueva factura"}
      </Typography>

      <Grid container spacing={2}>
        {[
          ["company", "Empresa"],
          ["invoiceNumber", "N° Factura"],
          ["issueDate", "Fecha de factura", "date"],
          ["description", "Descripción"],
          ["totalWhitoutTax", "Total sin IVA"],
          ["totalWhitTax", "Total con IVA"],
          ["deferredPaymentDays", "Días de pago diferido"],
          ["projectNumber", "N° Proyecto"],
          ["purchaseOrder", "Orden de compra"],
          ["purchaseOrderPercentage", "% Orden de compra"],
          ["paymentOrder", "Orden de pago"],
        ].map(([name, label, type]) => (
          <Grid item xs={12} md={6} key={name}>
            <TextField
              fullWidth
              required
              name={name}
              label={label}
              type={type || "text"}
              value={invoice[name]}
              onChange={handleChange}
              InputLabelProps={type === "date" ? { shrink: true } : {}}
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
