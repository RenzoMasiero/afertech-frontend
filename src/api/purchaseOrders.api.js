import { api } from "./http";

/**
 * GET /purchase-orders
 * Lista paginada de órdenes de compra (para tablas)
 */
export async function getPurchaseOrders(page = 0, size = 20) {
  const response = await api.get("/purchase-orders", {
    params: {
      page,
      size,
      sort: "id,desc",
    },
  });

  return response.data;
}

/**
 * GET /purchase-orders
 * Trae TODAS las órdenes (para selects relacionales)
 */
export async function getAllPurchaseOrders() {
  const response = await api.get("/purchase-orders", {
    params: {
      page: 0,
      size: 1000, // suficiente para entorno actual
      sort: "id,desc",
    },
  });

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
