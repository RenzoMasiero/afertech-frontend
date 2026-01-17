import { Box, Typography, Button, Divider } from "@mui/material";

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(typeof value === "number" ? value : 0);

export default function InvoiceSuccess({ invoice, onBack }) {
  return (
    <Box>
      <Typography variant="h5" color="success.main" mb={2}>
        ✔ Factura guardada correctamente
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography><strong>Cliente:</strong> {invoice.clientName}</Typography>
      <Typography><strong>N° Factura:</strong> {invoice.invoiceNumber}</Typography>
      <Typography><strong>Fecha de factura:</strong> {invoice.issueDate}</Typography>
      <Typography><strong>Descripción:</strong> {invoice.description}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Total sin IVA:</strong>{" "}
        {formatCurrency(invoice.totalWithoutTax)}
      </Typography>
      <Typography>
        <strong>Total con IVA:</strong>{" "}
        {formatCurrency(invoice.totalWithTax)}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Proyecto:</strong> {invoice.projectName}
      </Typography>
      <Typography>
        <strong>Orden de compra:</strong>{" "}
        {invoice.purchaseOrderNumber ?? "-"}
      </Typography>
      <Typography>
        <strong>% Orden de compra:</strong>{" "}
        {invoice.purchaseOrderPercentage}
      </Typography>
      <Typography>
        <strong>Orden de pago:</strong>{" "}
        {invoice.paymentOrderNumber ?? "-"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Días de pago diferido:</strong>{" "}
        {invoice.deferredPaymentDays}
      </Typography>

      <Button sx={{ mt: 3 }} variant="contained" onClick={onBack}>
        Volver a facturas
      </Button>
    </Box>
  );
}
