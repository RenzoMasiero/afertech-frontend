import { Box, Typography, Button, Divider } from "@mui/material";

export default function InvoiceSuccess({ invoice, onBack }) {
  return (
    <Box>
      <Typography variant="h5" color="success.main" mb={2}>
        ✔ Factura guardada correctamente
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

      <Button sx={{ mt: 3 }} variant="contained" onClick={onBack}>
        Volver a facturas
      </Button>
    </Box>
  );
}
