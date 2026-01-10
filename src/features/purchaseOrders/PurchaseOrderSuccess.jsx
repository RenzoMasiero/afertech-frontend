import { Box, Typography, Button, Divider } from "@mui/material";

const formatCurrency = (value) =>
  typeof value === "number"
    ? new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(value)
    : "-";

export default function PurchaseOrderSuccess({
  order = {}, // ⬅️ BLINDAJE DEFINITIVO
  onBack,
}) {
  return (
    <Box>
      <Typography variant="h5" color="success.main" mb={2}>
        ✔ Orden de compra guardada correctamente
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography>
        <strong>Orden de compra:</strong>{" "}
        {order.purchaseOrderNumber ?? "-"}
      </Typography>

      <Typography>
        <strong>Cliente:</strong>{" "}
        {order.clientName ?? "-"}
      </Typography>

      <Typography>
        <strong>Proyecto:</strong>{" "}
        {order.projectName ?? "-"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Total con IVA:</strong>{" "}
        {formatCurrency(order.totalWithTax)}
      </Typography>

      <Button sx={{ mt: 3 }} variant="contained" onClick={onBack}>
        Volver a órdenes de compra
      </Button>
    </Box>
  );
}
