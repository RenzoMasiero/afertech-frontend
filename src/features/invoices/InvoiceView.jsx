import { Box, Typography, Button, Divider } from "@mui/material";

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(typeof value === "number" ? value : 0);

const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export default function InvoiceView({
  invoice,
  authUser,
  onEdit,
  onDelete,
  onBack,
}) {
  const isAdmin = authUser?.role === "ADMIN";

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Detalle de factura
      </Typography>

      <Typography>
        <strong>Cliente:</strong> {invoice.clientName}
      </Typography>
      <Typography>
        <strong>N° Factura:</strong> {invoice.invoiceNumber}
      </Typography>
      <Typography>
        <strong>Fecha de factura:</strong> {invoice.issueDate}
      </Typography>
      <Typography>
        <strong>Descripción:</strong> {invoice.description}
      </Typography>

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

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Cargada el:</strong>{" "}
        {formatDateTime(invoice.loadedAt)}
      </Typography>
      <Typography>
        <strong>Cargada por:</strong> {invoice.loadedBy}
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {isAdmin && (
          <>
            <Button variant="contained" onClick={() => onEdit(invoice)}>
              Editar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(invoice.id)}
            >
              Eliminar
            </Button>
          </>
        )}

        <Button variant="outlined" onClick={onBack}>
          Volver
        </Button>
      </Box>
    </Box>
  );
}
