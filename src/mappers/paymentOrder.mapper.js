/**
 * Convierte una orden de pago del backend
 * al modelo de UI (reflejo exacto del response)
 */
export function mapPaymentOrderToUI(order) {
  return {
    id: order.id,

    clientId: order.clientId,
    clientName: order.clientName,

    projectId: order.projectId,
    projectName: order.projectName,

    invoiceId: order.invoiceId,
    invoiceNumber: order.invoiceNumber,

    purchaseOrderId: order.purchaseOrderId,
    purchaseOrderNumber: order.purchaseOrderNumber,

    paymentOrderNumber: order.paymentOrderNumber,
    issueDate: order.issueDate,

    totalWithoutTax: order.totalWithoutTax,
    totalWithTax: order.totalWithTax,
    withholdings: order.withholdings,

    concept: order.concept,

    // 🔹 CAMPOS NUEVOS — OBLIGATORIOS
    executed: order.executed,
    executionDate: order.executionDate,

    loadedAt: order.loadedAt,
    loadedBy: order.loadedBy,
  };
}

/**
 * Convierte la respuesta paginada del backend
 * en un modelo usable por el frontend
 */
export function mapPaymentOrdersPageToUI(page) {
  const items = Array.isArray(page?.items)
    ? page.items.map(mapPaymentOrderToUI)
    : [];

  return {
    items,
    page: page?.page ?? 0,
    size: page?.size ?? items.length,
    totalItems: page?.totalItems ?? items.length,
    totalPages: page?.totalPages ?? 1,
  };
}
