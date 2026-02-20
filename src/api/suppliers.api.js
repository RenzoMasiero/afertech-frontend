// src/api/suppliers.api.js
import { api } from "./http";

/**
 * GET /suppliers
 * Lista paginada real
 */
export async function getSuppliers(page = 0, size = 20) {
  const response = await api.get("/suppliers", {
    params: { page, size },
  });

  return response.data;
}

/**
 * GET /suppliers/{id}
 */
export async function getSupplierById(id) {
  const response = await api.get(`/suppliers/${id}`);
  return response.data;
}

/**
 * POST /suppliers
 */
export async function createSupplier(data) {
  const response = await api.post("/suppliers", data);
  return response.data;
}

/**
 * PUT /suppliers/{id}
 */
export async function updateSupplier(id, data) {
  const response = await api.put(`/suppliers/${id}`, data);
  return response.data;
}

/**
 * DELETE /suppliers/{id}
 */
export async function deleteSupplier(id) {
  await api.delete(`/suppliers/${id}`);
}