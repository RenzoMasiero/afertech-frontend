import { api } from "./http";

/**
 * GET /variable-cost-types
 * Lista paginada de tipos de costo variable
 */
export async function getVariableCostTypes() {
  const response = await api.get("/variable-cost-types");
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
