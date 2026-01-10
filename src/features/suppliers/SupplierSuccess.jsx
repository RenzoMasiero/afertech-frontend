import { Box, Typography, Button, Divider } from "@mui/material";

export default function SupplierSuccess({
  supplier = {}, // ⬅️ BLINDAJE DEFINITIVO
  onBack,
}) {
  return (
    <Box>
      <Typography variant="h5" color="success.main" mb={2}>
        ✔ Proveedor guardado correctamente
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography>
        <strong>Proveedor:</strong> {supplier.name ?? "-"}
      </Typography>

      <Typography>
        <strong>CUIT:</strong> {supplier.taxId ?? "-"}
      </Typography>

      <Button sx={{ mt: 3 }} variant="contained" onClick={onBack}>
        Volver a proveedores
      </Button>
    </Box>
  );
}
