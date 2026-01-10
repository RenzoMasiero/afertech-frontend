import { Box, Typography, Button, Divider } from "@mui/material";

const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export default function EmployeesView({
  employee,
  authUser,
  onEdit,
  onDelete,
  onBack,
}) {
  const isAdmin = authUser?.role === "ADMIN";

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Detalle de empleado
      </Typography>

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

      <Typography>
        <strong>Cargado el:</strong>{" "}
        {formatDateTime(employee.loadedAt)}
      </Typography>

      <Typography>
        <strong>Cargado por:</strong> {employee.loadedBy}
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {isAdmin && (
          <>
            <Button
              variant="contained"
              onClick={() => onEdit(employee)}
            >
              Editar
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(employee.id)}
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
