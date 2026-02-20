// src/api/costTypes.api.js
import { api } from "./http";

/**
 * GET /cost-types
 * Lista paginada real
 */
export async function getCostTypes(page = 0, size = 20) {
  const response = await api.get("/cost-types", {
    params: { page, size },
  });

  return response.data;
}

/**
 * GET /cost-types/{id}
 */
export async function getCostTypeById(id) {
  const response = await api.get(`/cost-types/${id}`);
  return response.data;
}

/**
 * POST /cost-types
 */
export async function createCostType(data) {
  const response = await api.post("/cost-types", data);
  return response.data;
}

/**
 * PUT /cost-types/{id}
 */
export async function updateCostType(id, data) {
  const response = await api.put(`/cost-types/${id}`, data);
  return response.data;
}

/**
 * DELETE /cost-types/{id}
 */
export async function deleteCostType(id) {
  await api.delete(`/cost-types/${id}`);
}