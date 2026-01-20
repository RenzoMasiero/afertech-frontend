// src/api/financeReports.api.js
import { api } from "./http";

/**
 * Obtiene el reporte financiero mensual.
 *
 * @param {string} month - Formato YYYY-MM (ej: "2026-01")
 * @returns {Promise<Object>} Reporte financiero mensual
 */
export async function getMonthlyFinanceReport(month) {
  const response = await api.get("/reports/finance/monthly", {
    params: { month },
  });

  return response.data;
}
