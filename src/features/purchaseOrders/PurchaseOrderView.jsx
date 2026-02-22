import { Box, Typography, Button, Divider } from "@mui/material";

const formatCurrency = (value, currency) => {
  if (typeof value !== "number") return "-";

  const symbol = currency === "USD" ? "U$S " : "$ ";

  return (
    symbol +
    new Intl.NumberFormat("es-AR", {
      maximumFractionDigits: 2,
    }).format(value)
  );
};

const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export default function PurchaseOrderView({
  order,
  authUser,
  onEdit,
  onDelete,
  onBack,
}) {
  const isAdmin = authUser?.role === "ADMIN";

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Detalle de orden de compra
      </Typography>

      <Typography>
        <strong>Cliente:</strong> {order.clientName}
      </Typography>

      <Typography>
        <strong>Proyecto:</strong> {order.projectName}
      </Typography>

      <Typography>
        <strong>N° Orden:</strong> {order.purchaseOrderNumber}
      </Typography>

      <Typography>
        <strong>Fecha:</strong> {order.issueDate}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Moneda:</strong> {order.currencyOriginal}
      </Typography>

      <Typography>
        <strong>Total sin IVA:</strong>{" "}
        {formatCurrency(order.totalWithoutTax, order.currencyOriginal)}
      </Typography>

      <Typography>
        <strong>Total con IVA:</strong>{" "}
        {formatCurrency(order.totalWithTax, order.currencyOriginal)}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Descripción:</strong> {order.description ?? "-"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Cargada el:</strong>{" "}
        {formatDateTime(order.loadedAt)}
      </Typography>

      <Typography>
        <strong>Cargada por:</strong> {order.loadedBy}
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {isAdmin && (
          <>
            <Button variant="contained" onClick={() => onEdit(order)}>
              Editar
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(order.id)}
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