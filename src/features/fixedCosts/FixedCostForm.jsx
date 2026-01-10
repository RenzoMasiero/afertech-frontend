import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export default function FixedCostForm({
  onCancel,
  onSubmit,
  initialData,
  costTypes = [],
  employees = [],
}) {
  const [fixedCost, setFixedCost] = useState(
    initialData || {
      costTypeId: "",
      employeeId: "",
      amount: "",
      allocationMonth: "",
      paymentDate: "",
      description: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFixedCost({ ...fixedCost, [name]: value });
  };

  const selectedCostType = costTypes.find(
    (ct) => ct.id === Number(fixedCost.costTypeId)
  );

  const isSalary =
    selectedCostType?.name?.trim().toLowerCase() === "sueldo";

  const handleSubmit = () => {
    onSubmit({
      id: fixedCost.id,
      costTypeId: Number(fixedCost.costTypeId),
      employeeId: isSalary
        ? Number(fixedCost.employeeId)
        : null,
      amount: Number(fixedCost.amount),
      allocationMonth: fixedCost.allocationMonth,
      paymentDate: fixedCost.paymentDate,
      description: fixedCost.description,
    });
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {fixedCost.id ? "Editar costo fijo" : "Nuevo costo fijo"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Select
            fullWidth
            name="costTypeId"
            value={fixedCost.costTypeId}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Seleccionar tipo de costo</em>
            </MenuItem>

            {costTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {isSalary && (
          <Grid item xs={12} md={6}>
            <Select
              fullWidth
              name="employeeId"
              value={fixedCost.employeeId}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="">
                <em>Seleccionar empleado</em>
              </MenuItem>

              {employees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="amount"
            label="Monto"
            type="number"
            value={fixedCost.amount}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="allocationMonth"
            label="Mes imputado"
            type="date"
            value={fixedCost.allocationMonth}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="paymentDate"
            label="Fecha de pago"
            type="date"
            value={fixedCost.paymentDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {!isSalary && (
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="description"
              label="Descripción"
              value={fixedCost.description}
              onChange={handleChange}
            />
          </Grid>
        )}

        {isSalary && (
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="description"
              label="Mes del sueldo"
              type="month"
              value={
                fixedCost.description
                  ? fixedCost.description.slice(0, 7)
                  : ""
              }
              onChange={(e) =>
                setFixedCost({
                  ...fixedCost,
                  description: e.target.value + "-01",
                })
              }
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
