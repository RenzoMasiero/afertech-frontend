import { Box, Typography, Button, Divider } from "@mui/material";

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(typeof value === "number" ? value : 0);

export default function FixedCostSuccess({ fixedCost, onBack }) {
  return (
    <Box>
      <Typography variant="h5" color="success.main" mb={2}>
        ✔ Costo fijo guardado correctamente
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography>
        <strong>Tipo de costo:</strong> {fixedCost.costTypeName}
      </Typography>

      <Typography>
        <strong>Empleado:</strong> {fixedCost.employeeName}
      </Typography>

      <Typography>
        <strong>Descripción:</strong> {fixedCost.description}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Monto:</strong>{" "}
        {formatCurrency(fixedCost.amount)}
      </Typography>

      <Typography>
        <strong>Mes imputado:</strong>{" "}
        {fixedCost.allocationMonth}
      </Typography>

      <Typography>
        <strong>Fecha de pago:</strong>{" "}
        {fixedCost.paymentDate}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Button sx={{ mt: 3 }} variant="contained" onClick={onBack}>
        Volver a costos fijos
      </Button>
    </Box>
  );
}
