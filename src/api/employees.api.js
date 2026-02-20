// src/api/employees.api.js
import { api } from "./http";

/**
 * GET /employees
 * Lista paginada real
 */
export async function getEmployees(page = 0, size = 20) {
  const response = await api.get("/employees", {
    params: { page, size },
  });

  return response.data;
}

export async function createEmployee(data) {
  const response = await api.post("/employees", data);
  return response.data;
}

export async function updateEmployee(id, data) {
  const response = await api.put(`/employees/${id}`, data);
  return response.data;
}

export async function deleteEmployee(id) {
  await api.delete(`/employees/${id}`);
}