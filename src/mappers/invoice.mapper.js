// src/mappers/invoice.mapper.js

/**
 * Convierte un invoice del backend al modelo de UI
 * ⚠️ El modelo UI refleja EXACTAMENTE el response del backend
 */
function mapInvoiceToUI(invoice) {
  return {
    id: invoice.id,

    clientId: invoice.clientId,
    clientName: invoice.clientName,

    projectId: invoice.projectId,
    projectName: invoice.projectName,

    purchaseOrderId: invoice.purchaseOrderId,
    purchaseOrderNumber: invoice.purchaseOrderNumber,

    paymentOrderId: invoice.paymentOrderId,
    paymentOrderNumber: invoice.paymentOrderNumber,

    invoiceNumber: invoice.invoiceNumber,
    issueDate: invoice.issueDate,

    description: invoice.description,

    totalWithoutTax: invoice.totalWithoutTax,
    totalWithTax: invoice.totalWithTax,

    deferredPaymentDays: invoice.deferredPaymentDays,
    purchaseOrderPercentage: invoice.purchaseOrderPercentage,

    loadedAt: invoice.loadedAt,
    loadedBy: invoice.loadedBy,
  };
}

/**
 * Convierte la respuesta paginada del backend
 * en un modelo usable por el frontend
 */
export function mapInvoicesPageToUI(page) {
  const items = Array.isArray(page?.items)
    ? page.items.map(mapInvoiceToUI)
    : [];

  return {
    items,
    page: page?.page ?? 0,
    size: page?.size ?? items.length,
    totalItems: page?.totalItems ?? items.length,
    totalPages: page?.totalPages ?? 1,
  };
}
