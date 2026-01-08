import { Box, Typography, Button, Divider } from "@mui/material";

export default function ClientSuccess({ client, onBack }) {
  if (!client) return null;

  return (
    <Box>
      <Typography variant="h5" color="success.main" mb={2}>
        ✔ Cliente guardado correctamente
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography>
        <strong>Nombre:</strong> {client.name}
      </Typography>
      <Typography>
        <strong>CUIT:</strong> {client.taxId}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Button sx={{ mt: 3 }} variant="contained" onClick={onBack}>
        Volver a clientes
      </Button>
    </Box>
  );
}
