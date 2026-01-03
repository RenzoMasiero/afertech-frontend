// src/api/paymentOrders.api.js
import { api } from "./http";

/**
 * GET /payment-orders
 * Lista paginada de órdenes de pago
 */
export async function getPaymentOrders() {
  const response = await api.get("/payment-orders");
  return response.data;
}

/**
 * GET /payment-orders/{id}
 */
export async function getPaymentOrderById(id) {
  const response = await api.get(`/payment-orders/${id}`);
  return response.data;
}

/**
 * POST /payment-orders
 */
export async function createPaymentOrder(data) {
  const response = await api.post("/payment-orders", data);
  return response.data;
}

/**
 * PUT /payment-orders/{id}
 */
export async function updatePaymentOrder(id, data) {
  const response = await api.put(`/payment-orders/${id}`, data);
  return response.data;
}

/**
 * DELETE /payment-orders/{id}
 */
export async function deletePaymentOrder(id) {
  await api.delete(`/payment-orders/${id}`);
}
