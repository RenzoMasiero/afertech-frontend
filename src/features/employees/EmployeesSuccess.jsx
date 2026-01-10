import { Box, Typography, Button, Divider } from "@mui/material";

export default function EmployeesSuccess({ employee, onBack }) {
  return (
    <Box>
      <Typography variant="h5" color="success.main" mb={2}>
        ✔ Empleado guardado correctamente
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography>
        <strong>Nombre:</strong> {employee.firstName}
      </Typography>

      <Typography>
        <strong>Apellido:</strong> {employee.lastName}
      </Typography>

      <Typography>
        <strong>Documento:</strong> {employee.documentNumber}
      </Typography>

      <Typography>
        <strong>Fecha de ingreso:</strong> {employee.hireDate}
      </Typography>

      <Typography>
        <strong>Fecha de egreso:</strong>{" "}
        {employee.terminationDate ?? "-"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Button sx={{ mt: 3 }} variant="contained" onClick={onBack}>
        Volver a empleados
      </Button>
    </Box>
  );
}
