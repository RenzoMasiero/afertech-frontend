import { api } from "./http";

/**
 * GET /purchase-orders
 * Lista paginada de órdenes de compra
 */
export async function getPurchaseOrders() {
  const response = await api.get("/purchase-orders");
  return response.data;
}

/**
 * GET /purchase-orders/{id}
 */
export async function getPurchaseOrderById(id) {
  const response = await api.get(`/purchase-orders/${id}`);
  return response.data;
}

/**
 * POST /purchase-orders
 */
export async function createPurchaseOrder(data) {
  const response = await api.post("/purchase-orders", data);
  return response.data;
}

/**
 * PUT /purchase-orders/{id}
 */
export async function updatePurchaseOrder(id, data) {
  const response = await api.put(`/purchase-orders/${id}`, data);
  return response.data;
}

/**
 * DELETE /purchase-orders/{id}
 */
export async function deletePurchaseOrder(id) {
  await api.delete(`/purchase-orders/${id}`);
}
