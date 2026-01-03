import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(typeof value === "number" ? value : 0);

export default function InvoicesTable({ rows, onAdd, onView }) {
  const columns = [
    { field: "invoiceNumber", headerName: "N° Factura", flex: 1 },
    { field: "clientName", headerName: "Cliente", flex: 1.5 },
    { field: "issueDate", headerName: "Fecha de factura", flex: 1 },

    {
      field: "totalWithoutTax",
      headerName: "Total sin IVA",
      flex: 1,
      renderCell: (params) =>
        formatCurrency(params.row.totalWithoutTax),
    },
    {
      field: "totalWithTax",
      headerName: "Total con IVA",
      flex: 1,
      renderCell: (params) =>
        formatCurrency(params.row.totalWithTax),
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      renderCell: (params) => (
        <Button size="small" onClick={() => onView(params.row)}>
          Ver
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Facturas</Typography>
        <Button variant="contained" onClick={onAdd}>
          + Agregar factura
        </Button>
      </Box>

      <Box sx={{ height: 520 }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
