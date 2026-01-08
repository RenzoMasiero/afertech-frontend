import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";

const formatCurrency = (v) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(typeof v === "number" ? v : 0);

export default function PaymentOrdersTable({ rows, onAdd, onView }) {
  const columns = [
    {
      field: "paymentOrderNumber",
      headerName: "Orden de pago",
      flex: 1,
    },
    {
      field: "invoiceNumber",
      headerName: "Factura",
      flex: 1,
    },
    {
      field: "clientName",
      headerName: "Cliente",
      flex: 1.5,
    },
    {
      field: "projectName",
      headerName: "Proyecto",
      flex: 1.5,
    },
    {
      field: "totalWithTax",
      headerName: "Total",
      flex: 1,
      renderCell: (p) => formatCurrency(p.row.totalWithTax),
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      renderCell: (p) => (
        <Button size="small" onClick={() => onView(p.row)}>
          Ver
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Órdenes de pago</Typography>
        <Button variant="contained" onClick={onAdd}>
          + Agregar orden de pago
        </Button>
      </Box>

      <Box sx={{ height: 520 }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          getRowId={(r) => r.id}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </Box>
  );
}
