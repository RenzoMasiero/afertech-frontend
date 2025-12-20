import { Box, Typography, Button, Divider } from "@mui/material";

export default function InvoiceView({ invoice, onEdit, onBack }) {
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Detalle de factura
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {[
        ["Empresa", invoice.company],
        ["N° Factura", invoice.invoiceNumber],
        ["Fecha de factura", invoice.issueDate],
        ["Descripción", invoice.description],
        ["Total sin IVA", invoice.totalWhitoutTax],
        ["Total con IVA", invoice.totalWhitTax],
        ["Días de pago diferido", invoice.deferredPaymentDays],
        ["N° Proyecto", invoice.projectNumber],
        ["Orden de compra", invoice.purchaseOrder],
        ["% Orden de compra", invoice.purchaseOrderPercentage],
        ["Orden de pago", invoice.paymentOrder],
      ].map(([label, value]) => (
        <Typography key={label} sx={{ mb: 1 }}>
          <strong>{label}:</strong> {value}
        </Typography>
      ))}

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => onEdit(invoice)}
        >
          Editar
        </Button>

        <Button variant="outlined" onClick={onBack}>
          Volver
        </Button>
      </Box>
    </Box>
  );
}
