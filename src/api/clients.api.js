// src/api/clients.api.js
import { api } from "./http";
import { mapClientsPageToUI } from "../mappers/client.mapper";

export async function getClients() {
  const response = await api.get("/clients");
  return mapClientsPageToUI(response.data);
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
