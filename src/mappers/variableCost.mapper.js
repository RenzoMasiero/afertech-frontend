/**
 * Convierte un costo variable del backend
 * al modelo de UI (reflejo exacto del response)
 */
export function mapVariableCostToUI(cost) {
  return {
    id: cost.id,

    costTypeId: cost.costTypeId,
    costTypeName: cost.costTypeName,

    supplierId: cost.supplierId,
    supplierName: cost.supplierName,

    projectId: cost.projectId,
    projectName: cost.projectName,

    amount: cost.amount,
    allocationMonth: cost.allocationMonth,
    paymentDate: cost.paymentDate,

    description: cost.description,

    loadedAt: cost.loadedAt,
    loadedBy: cost.loadedBy,
  };
}

/**
 * Convierte la respuesta paginada del backend
 * en un modelo usable por el frontend
 */
export function mapVariableCostsPageToUI(page) {
  const items = Array.isArray(page?.items)
    ? page.items.map(mapVariableCostToUI)
    : [];

  return {
    items,
    page: page?.page ?? 0,
    size: page?.size ?? items.length,
    totalItems: page?.totalItems ?? items.length,
    totalPages: page?.totalPages ?? 1,
  };
}
