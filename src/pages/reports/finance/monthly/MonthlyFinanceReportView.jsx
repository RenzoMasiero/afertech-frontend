import { Box, Typography, Divider } from "@mui/material";

const formatAmount = (value) =>
  new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value ?? 0);

export default function MonthlyFinanceReportView({ report }) {
  const {
    incomes,
    fixedCosts,
    variableCosts,
    totalIncomeWithoutTax,
    totalIncomeWithTax,
    totalFixedCosts,
    totalVariableCosts,
    totalCosts,
    profitWithTax,
  } = report;

  return (
    <Box>
      {/* ===== BALANCE DEL MES ===== */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h6" mb={1}>
          Balance del mes
        </Typography>

        <Typography>
          <strong>Total ingresos:</strong>{" "}
          {formatAmount(totalIncomeWithTax)}
        </Typography>

        <Typography>
          <strong>Total gastos:</strong>{" "}
          {formatAmount(totalCosts)}
        </Typography>

        <Typography>
          <strong>Resultado:</strong>{" "}
          {formatAmount(profitWithTax)}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* ===== CUERPO ===== */}
      <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
        {/* ===== GASTOS ===== */}
        <Box sx={{ flex: 1 }}>
          {/* Header + totales CENTRADOS */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h6">Gastos del mes</Typography>

            <Typography>
              <strong>Costos fijos:</strong>{" "}
              {formatAmount(totalFixedCosts)}
            </Typography>

            <Typography>
              <strong>Costos variables:</strong>{" "}
              {formatAmount(totalVariableCosts)}
            </Typography>

            <Typography>
              <strong>Total gastos:</strong>{" "}
              {formatAmount(totalCosts)}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Encabezado tabla */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 3fr 1fr",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            <Typography>Tipo</Typography>
            <Typography>Imputación</Typography>
            <Typography>Descripción</Typography>
            <Typography align="right">Monto</Typography>
          </Box>

          {/* Costos fijos */}
          {fixedCosts.map((cost) => (
            <Box
              key={`fixed-${cost.fixedCostId}`}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 3fr 1fr",
                mb: 0.5,
              }}
            >
              <Typography>{cost.costTypeName}</Typography>
              <Typography>{cost.allocationMonth}</Typography>
              <Typography>
                {cost.salary ? "Sueldo" : "-"}
              </Typography>
              <Typography align="right">
                {formatAmount(cost.amount)}
              </Typography>
            </Box>
          ))}

          {/* Costos variables */}
          {variableCosts.map((cost) => (
            <Box
              key={`variable-${cost.variableCostId}`}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 3fr 1fr",
                mb: 0.5,
              }}
            >
              <Typography>{cost.costTypeName}</Typography>
              <Typography>{cost.allocationMonth}</Typography>
              <Typography>{cost.supplierName}</Typography>
              <Typography align="right">
                {formatAmount(cost.amount)}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ===== INGRESOS ===== */}
        <Box sx={{ flex: 1 }}>
          {/* Header + totales CENTRADOS */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h6">Ingresos del mes</Typography>

            <Typography>
              <strong>Sin IVA:</strong>{" "}
              {formatAmount(totalIncomeWithoutTax)}
            </Typography>

            <Typography>
              <strong>Con IVA:</strong>{" "}
              {formatAmount(totalIncomeWithTax)}
            </Typography>

            <Typography>
              <strong>Total ingresos:</strong>{" "}
              {formatAmount(totalIncomeWithTax)}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Encabezado tabla */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            <Typography>OP</Typography>
            <Typography>Factura</Typography>
            <Typography>Fecha</Typography>
            <Typography align="right">Monto</Typography>
          </Box>

          {/* Ingresos */}
          {incomes.map((income) => (
            <Box
              key={income.paymentOrderId}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                mb: 0.5,
              }}
            >
              <Typography>{income.paymentOrderNumber}</Typography>
              <Typography>{income.invoiceNumber}</Typography>
              <Typography>{income.cashInDate}</Typography>
              <Typography align="right">
                {formatAmount(income.amountWithTax)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
