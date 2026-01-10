import { api } from "./http";
import { mapEmployeesPageToUI } from "../mappers/employee.mapper";

export async function getEmployees() {
  const response = await api.get("/employees");
  return mapEmployeesPageToUI(response.data);
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
