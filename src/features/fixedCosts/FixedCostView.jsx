import { Box, Typography, Button, Divider } from "@mui/material";

const formatCurrency = (value, currency) => {
  const number = typeof value === "number" ? value : 0;
  const symbol = currency === "USD" ? "U$S " : "$ ";

  return (
    symbol +
    new Intl.NumberFormat("es-AR", {
      maximumFractionDigits: 2,
    }).format(number)
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

export default function FixedCostView({
  fixedCost,
  authUser,
  onEdit,
  onDelete,
  onBack,
}) {
  const isAdmin = authUser?.role === "ADMIN";

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Detalle de costo fijo
      </Typography>

      <Typography>
        <strong>Tipo de costo:</strong> {fixedCost.costTypeName}
      </Typography>

      <Typography>
        <strong>Empleado:</strong> {fixedCost.employeeName ?? "-"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Moneda:</strong> {fixedCost.currencyOriginal}
      </Typography>

      <Typography>
        <strong>Monto:</strong>{" "}
        {formatCurrency(fixedCost.amount, fixedCost.currencyOriginal)}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Mes imputado:</strong> {fixedCost.allocationMonth}
      </Typography>

      <Typography>
        <strong>Fecha de pago:</strong> {fixedCost.paymentDate}
      </Typography>

      <Typography>
        <strong>Descripción:</strong> {fixedCost.description}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Cargado el:</strong>{" "}
        {formatDateTime(fixedCost.loadedAt)}
      </Typography>

      <Typography>
        <strong>Cargado por:</strong> {fixedCost.loadedBy}
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {isAdmin && (
          <>
            <Button variant="contained" onClick={() => onEdit(fixedCost)}>
              Editar
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(fixedCost.id)}
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