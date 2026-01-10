/**
 * Convierte una orden de compra del backend
 * al modelo de UI (reflejo exacto del response)
 */
export function mapPurchaseOrderToUI(order) {
  return {
    id: order.id,

    clientId: order.clientId,
    clientName: order.clientName,

    projectId: order.projectId,
    projectName: order.projectName,

    purchaseOrderNumber: order.purchaseOrderNumber,
    issueDate: order.issueDate,

    totalWithoutTax: order.totalWithoutTax,
    totalWithTax: order.totalWithTax,

    description: order.description,

    loadedAt: order.loadedAt,
    loadedBy: order.loadedBy,
  };
}

/**
 * Convierte la respuesta paginada del backend
 * en un modelo usable por el frontend
 */
export function mapPurchaseOrdersPageToUI(page) {
  const items = Array.isArray(page?.items)
    ? page.items.map(mapPurchaseOrderToUI)
    : [];

  return {
    items,
    page: page?.page ?? 0,
    size: page?.size ?? items.length,
    totalItems: page?.totalItems ?? items.length,
    totalPages: page?.totalPages ?? 1,
  };
}
