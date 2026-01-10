import { Box, Typography, Button, Divider } from "@mui/material";

const formatCurrency = (value) =>
  typeof value === "number"
    ? new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(value)
    : "-";

export default function VariableCostView({
  cost,
  authUser,
  onEdit,
  onDelete,
  onBack,
}) {
  const isAdmin = authUser?.role === "ADMIN";

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Detalle de costo variable
      </Typography>

      <Typography>
        <strong>Tipo de costo:</strong> {cost.costTypeName}
      </Typography>

      <Typography>
        <strong>Proveedor:</strong> {cost.supplierName}
      </Typography>

      <Typography>
        <strong>Proyecto:</strong> {cost.projectName ?? "-"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Mes de imputación:</strong> {cost.allocationMonth}
      </Typography>

      <Typography>
        <strong>Fecha de pago:</strong> {cost.paymentDate}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Monto:</strong> {formatCurrency(cost.amount)}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Descripción:</strong> {cost.description ?? "-"}
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {isAdmin && (
          <>
            <Button variant="contained" onClick={() => onEdit(cost)}>
              Editar
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(cost.id)}
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
