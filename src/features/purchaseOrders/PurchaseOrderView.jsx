import { Box, Typography, Button, Divider } from "@mui/material";

const formatCurrency = (value) =>
  typeof value === "number"
    ? new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(value)
    : "-";

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
        <strong>Orden de compra:</strong> {order.purchaseOrderNumber}
      </Typography>

      <Typography>
        <strong>Fecha:</strong> {order.issueDate}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Total sin IVA:</strong>{" "}
        {formatCurrency(order.totalWithoutTax)}
      </Typography>

      <Typography>
        <strong>Total con IVA:</strong>{" "}
        {formatCurrency(order.totalWithTax)}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Descripción:</strong> {order.description}
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
