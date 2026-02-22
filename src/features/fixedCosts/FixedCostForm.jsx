import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
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
      currencyOriginal: "ARS",
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
      employeeId: isSalary ? Number(fixedCost.employeeId) : null,
      amount: Number(fixedCost.amount),
      allocationMonth: fixedCost.allocationMonth,
      paymentDate: fixedCost.paymentDate,
      description: fixedCost.description,
      currencyOriginal: fixedCost.currencyOriginal,
    });
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {fixedCost.id ? "Editar costo fijo" : "Nuevo costo fijo"}
      </Typography>

      <Stack spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="cost-type-label">Tipo de costo</InputLabel>
          <Select
            labelId="cost-type-label"
            name="costTypeId"
            value={fixedCost.costTypeId}
            label="Tipo de costo"
            onChange={handleChange}
          >
            {costTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isSalary && (
          <FormControl fullWidth>
            <InputLabel id="employee-label">Empleado</InputLabel>
            <Select
              labelId="employee-label"
              name="employeeId"
              value={fixedCost.employeeId}
              label="Empleado"
              onChange={handleChange}
            >
              {employees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* 🔥 Moneda */}
        <FormControl fullWidth>
          <InputLabel id="currency-label">Moneda</InputLabel>
          <Select
            labelId="currency-label"
            name="currencyOriginal"
            value={fixedCost.currencyOriginal}
            label="Moneda"
            onChange={handleChange}
          >
            <MenuItem value="ARS">ARS</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          name="amount"
          label="Monto"
          type="number"
          value={fixedCost.amount}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          name="allocationMonth"
          label="Mes imputado"
          type="month"
          value={fixedCost.allocationMonth}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          name="paymentDate"
          label="Fecha de pago"
          type="date"
          value={fixedCost.paymentDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        {!isSalary && (
          <TextField
            fullWidth
            name="description"
            label="Descripción"
            value={fixedCost.description}
            onChange={handleChange}
          />
        )}

        {isSalary && (
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
        )}
      </Stack>

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