// src/api/invoices.api.js
import { api } from "./http";
import { mapInvoicesPageToUI } from "../mappers/invoice.mapper";

export async function getInvoices() {
  const response = await api.get("/invoices");
  return mapInvoicesPageToUI(response.data);
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
