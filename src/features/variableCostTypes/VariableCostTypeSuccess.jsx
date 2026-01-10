import { Box, Typography, Button, Divider } from "@mui/material";

export default function VariableCostTypeSuccess({
  type = {}, // ⬅️ BLINDAJE DEFINITIVO
  onBack,
}) {
  return (
    <Box>
      <Typography variant="h5" color="success.main" mb={2}>
        ✔ Tipo de costo variable guardado correctamente
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography>
        <strong>Nombre:</strong> {type.name ?? "-"}
      </Typography>

      <Button sx={{ mt: 3 }} variant="contained" onClick={onBack}>
        Volver a tipos de costo variable
      </Button>
    </Box>
  );
}
