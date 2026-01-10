// src/api/fixedCosts.api.js
import { api } from "./http";
import { mapFixedCostsPageToUI } from "../mappers/fixedCost.mapper";

export async function getFixedCosts() {
  const response = await api.get("/fixed-costs");
  return mapFixedCostsPageToUI(response.data);
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
