import { Box, Typography, Button, Divider } from "@mui/material";

const formatCurrency = (value) =>
  typeof value === "number"
    ? new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(value)
    : "-";

export default function VariableCostSuccess({
  cost = {}, // 🔒 Blindaje definitivo
  onBack,
}) {
  return (
    <Box>
      <Typography variant="h5" color="success.main" mb={2}>
        ✔ Costo variable guardado correctamente
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography>
        <strong>Tipo de costo:</strong>{" "}
        {cost.costTypeName ?? "-"}
      </Typography>

      <Typography>
        <strong>Proveedor:</strong>{" "}
        {cost.supplierName ?? "-"}
      </Typography>

      <Typography>
        <strong>Proyecto:</strong>{" "}
        {cost.projectName ?? "-"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Mes de imputación:</strong>{" "}
        {cost.allocationMonth ?? "-"}
      </Typography>

      <Typography>
        <strong>Fecha de pago:</strong>{" "}
        {cost.paymentDate ?? "-"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Monto:</strong>{" "}
        {formatCurrency(cost.amount)}
      </Typography>

      <Typography>
        <strong>Descripción:</strong>{" "}
        {cost.description ?? "-"}
      </Typography>

      <Button sx={{ mt: 3 }} variant="contained" onClick={onBack}>
        Volver a costos variables
      </Button>
    </Box>
  );
}
