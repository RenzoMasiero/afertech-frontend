import { Box, Typography, Button } from "@mui/material";

export default function ProjectSuccess({ project, onBack }) {
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Proyecto guardado correctamente
      </Typography>

      <Typography>
        El proyecto <strong>{project.name}</strong> fue guardado con éxito.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={onBack}>
          Volver al listado
        </Button>
      </Box>
    </Box>
  );
}
