// src/api/clients.api.js
import { api } from "./http";

/**
 * GET /clients
 * Lista paginada real
 */
export async function getClients(page = 0, size = 20) {
  const response = await api.get("/clients", {
    params: { page, size },
  });

  return response.data;
}

export async function createClient(data) {
  const response = await api.post("/clients", data);
  return response.data;
}

export async function updateClient(id, data) {
  const response = await api.put(`/clients/${id}`, data);
  return response.data;
}

export async function deleteClient(id) {
  await api.delete(`/clients/${id}`);
}