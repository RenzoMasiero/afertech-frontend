// src/api/projects.api.js
import { api } from "./http";

/**
 * GET /projects
 * Lista paginada real
 */
export async function getProjects(page = 0, size = 20) {
  const response = await api.get("/projects", {
    params: { page, size },
  });

  return response.data;
}

/**
 * GET /projects/{id}
 */
export async function getProjectById(id) {
  const response = await api.get(`/projects/${id}`);
  return response.data;
}

/**
 * POST /projects
 */
export async function createProject(data) {
  const response = await api.post("/projects", data);
  return response.data;
}

/**
 * PUT /projects/{id}
 */
export async function updateProject(id, data) {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
}

/**
 * DELETE /projects/{id}
 */
export async function deleteProject(id) {
  await api.delete(`/projects/${id}`);
}