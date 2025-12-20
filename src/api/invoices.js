import { api } from "./http";

export const getInvoices = async () => {
  const response = await api.get("/invoices");
  return response.data;
};
