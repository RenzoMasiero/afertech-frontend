import { api } from "./http";

/**
 * GET /variable-costs
 * Lista paginada de costos variables
 */
export async function getVariableCosts() {
  const response = await api.get("/variable-costs");
  return response.data;
}

/**
 * GET /variable-costs/{id}
 */
export async function getVariableCostById(id) {
  const response = await api.get(`/variable-costs/${id}`);
  return response.data;
}

/**
 * POST /variable-costs
 */
export async function createVariableCost(data) {
  const response = await api.post("/variable-costs", data);
  return response.data;
}

/**
 * PUT /variable-costs/{id}
 */
export async function updateVariableCost(id, data) {
  const response = await api.put(`/variable-costs/${id}`, data);
  return response.data;
}

/**
 * DELETE /variable-costs/{id}
 */
export async function deleteVariableCost(id) {
  await api.delete(`/variable-costs/${id}`);
}
