// src/api/invoices.api.js
import { api } from "./http";

/**
 * GET /invoices
 * Lista paginada real
 */
export async function getInvoices(page = 0, size = 20) {
  const response = await api.get("/invoices", {
    params: { page, size },
  });

  return response.data;
}

export async function createInvoice(data) {
  const response = await api.post("/invoices", data);
  return response.data;
}

export async function updateInvoice(id, data) {
  const response = await api.put(`/invoices/${id}`, data);
  return response.data;
}

export async function deleteInvoice(id) {
  await api.delete(`/invoices/${id}`);
}