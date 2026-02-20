// src/api/variableCostTypes.api.js
import { api } from "./http";

/**
 * GET /variable-cost-types
 * Lista paginada real
 */
export async function getVariableCostTypes(page = 0, size = 20) {
  const response = await api.get("/variable-cost-types", {
    params: { page, size },
  });

  return response.data;
}

/**
 * GET /variable-cost-types/{id}
 */
export async function getVariableCostTypeById(id) {
  const response = await api.get(`/variable-cost-types/${id}`);
  return response.data;
}

/**
 * POST /variable-cost-types
 */
export async function createVariableCostType(data) {
  const response = await api.post("/variable-cost-types", data);
  return response.data;
}

/**
 * PUT /variable-cost-types/{id}
 */
export async function updateVariableCostType(id, data) {
  const response = await api.put(`/variable-cost-types/${id}`, data);
  return response.data;
}

/**
 * DELETE /variable-cost-types/{id}
 */
export async function deleteVariableCostType(id) {
  await api.delete(`/variable-cost-types/${id}`);
}