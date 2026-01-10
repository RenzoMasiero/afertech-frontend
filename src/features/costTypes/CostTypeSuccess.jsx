import { Box, Typography, Button, Divider } from "@mui/material";

export default function CostTypeSuccess({
  costType = {}, // 🔒 Blindaje
  onBack,
}) {
  return (
    <Box>
      <Typography variant="h5" color="success.main" mb={2}>
        ✔ Tipo de costo fijo guardado correctamente
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography>
        <strong>Nombre:</strong> {costType.name ?? "-"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Cargado por:</strong> {costType.loadedBy ?? "-"}
      </Typography>

      <Typography>
        <strong>Fecha de carga:</strong> {costType.loadedAt ?? "-"}
      </Typography>

      <Button sx={{ mt: 3 }} variant="contained" onClick={onBack}>
        Volver a tipos de costo fijo
      </Button>
    </Box>
  );
}
