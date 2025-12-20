import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { useMemo, useState } from "react";

const columns = [
  { field: "invoiceNumber", headerName: "N° Factura", flex: 1 },
  { field: "company", headerName: "Empresa", flex: 1.5 },
  { field: "issueDate", headerName: "Fecha de factura", flex: 1 },
  { field: "totalWhitoutTax", headerName: "Total sin IVA", flex: 1 },
  { field: "totalWhitTax", headerName: "Total con IVA", flex: 1 },
  {
    field: "actions",
    headerName: "Acciones",
    sortable: false,
    renderCell: (params) => (
      <Button size="small" onClick={() => params.row.onView(params.row)}>
        Ver
      </Button>
    ),
  },
];

export default function InvoicesTable({ rows, onAdd, onView }) {
  const [companyFilter, setCompanyFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [numberFilter, setNumberFilter] = useState("");

  const companies = [...new Set(rows.map((r) => r.company))];

  const filteredRows = useMemo(() => {
    return rows
      .filter((r) =>
        companyFilter ? r.company === companyFilter : true
      )
      .filter((r) =>
        monthFilter ? r.issueDate.startsWith(monthFilter) : true
      )
      .filter((r) =>
        numberFilter
          ? r.invoiceNumber.includes(numberFilter)
          : true
      )
      .map((r) => ({
        ...r,
        onView,
      }));
  }, [rows, companyFilter, monthFilter, numberFilter, onView]);

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5">Facturas</Typography>

        <Button variant="contained" onClick={onAdd}>
          + Agregar factura
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          select
          label="Empresa"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Todas</MenuItem>
          {companies.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="month"
          label="Mes"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        />

        <TextField
          label="N° Factura"
          size="small"
          value={numberFilter}
          onChange={(e) => setNumberFilter(e.target.value)}
        />
      </Box>

      {/* Table */}
      <Box sx={{ height: 520 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
