import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function EmployeesForm({
  onCancel,
  onSubmit,
  initialData,
}) {
  const [employee, setEmployee] = useState(
    initialData || {
      firstName: "",
      lastName: "",
      documentNumber: "",
      hireDate: "",
      terminationDate: "",
    }
  );

  const isEdit = Boolean(employee.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      documentNumber: employee.documentNumber,
      hireDate: employee.hireDate,
      terminationDate:
        isEdit && employee.terminationDate !== ""
          ? employee.terminationDate
          : null,
    });
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {isEdit ? "Editar empleado" : "Nuevo empleado"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="firstName"
            label="Nombre"
            value={employee.firstName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="lastName"
            label="Apellido"
            value={employee.lastName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="documentNumber"
            label="Documento"
            value={employee.documentNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="hireDate"
            label="Fecha de ingreso"
            type="date"
            value={employee.hireDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {isEdit && (
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="terminationDate"
              label="Fecha de egreso"
              type="date"
              value={employee.terminationDate ?? ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
}
