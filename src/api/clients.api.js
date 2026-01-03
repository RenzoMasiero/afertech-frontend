// src/api/clients.api.js
import { api } from "./http";

export async function getClients() {
  const response = await api.get("/clients");
  return {
    items: Array.isArray(response.data?.items)
      ? response.data.items
      : [],
    total: response.data?.totalItems ?? 0,
  };
}
