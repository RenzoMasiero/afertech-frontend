// src/mappers/paymentOrder.mapper.js

/**
 * Convierte una orden de pago del backend
 * al modelo de UI (reflejo exacto del response)
 */
function mapPaymentOrderToUI(order) {
  return {
    id: order.id,

    clientId: order.clientId,
    clientName: order.clientName,

    projectId: order.projectId,
    projectName: order.projectName,

    invoiceId: order.invoiceId,
    purchaseOrderId: order.purchaseOrderId,

    paymentOrderNumber: order.paymentOrderNumber,
    issueDate: order.issueDate,

    totalWithoutTax: order.totalWithoutTax,
    totalWithTax: order.totalWithTax,

    concept: order.concept,
    withholdings: order.withholdings,

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
