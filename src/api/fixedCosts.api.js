// src/api/fixedCosts.api.js
import { api } from "./http";

/**
 * GET /fixed-costs
 * Lista paginada real
 */
export async function getFixedCosts(page = 0, size = 20) {
  const response = await api.get("/fixed-costs", {
    params: { page, size },
  });

  return response.data;
}

export async function createFixedCost(data) {
  const response = await api.post("/fixed-costs", data);
  return response.data;
}

export async function updateFixedCost(id, data) {
  const response = await api.put(`/fixed-costs/${id}`, data);
  return response.data;
}

export async function deleteFixedCost(id) {
  await api.delete(`/fixed-costs/${id}`);
}