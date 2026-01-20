import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { getMonthlyFinanceReport } from "../../../../api/financeReports.api";
import MonthlyFinanceReportView from "./MonthlyFinanceReportView";

export default function MonthlyFinanceReportPage() {
  const [month, setMonth] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchReport = async () => {
    if (!month) return;

    setLoading(true);
    try {
      const data = await getMonthlyFinanceReport(month);
      setReport(data);
    } catch (error) {
      // error manejado por interceptor global
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* ===== SELECTOR DE MES (CENTRADO) ===== */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5" mb={2}>
          Reporte financiero mensual
        </Typography>

        <Stack spacing={2} sx={{ width: 320 }}>
          <TextField
            fullWidth
            label="Mes"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleFetchReport}
            disabled={!month || loading}
          >
            Ver reporte
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              setMonth("");
              setReport(null);
            }}
          >
            Limpiar
          </Button>
        </Box>
      </Box>

      {/* ===== REPORTE ===== */}
      {report && <MonthlyFinanceReportView report={report} />}
    </Box>
  );
}
