// src/mappers/fixedCost.mapper.js

function mapFixedCostToUI(fixedCost) {
  return {
    id: fixedCost.id,

    costTypeId: fixedCost.costTypeId,
    costTypeName: fixedCost.costTypeName,

    employeeId: fixedCost.employeeId,
    employeeName: fixedCost.employeeName ?? "-",

    amount: fixedCost.amount,

    // 🔥 MONEDA (faltaba)
    currencyOriginal: fixedCost.currencyOriginal,

    allocationMonth: fixedCost.allocationMonth,
    paymentDate: fixedCost.paymentDate,

    description: fixedCost.description,

    loadedAt: fixedCost.loadedAt,
    loadedBy: fixedCost.loadedBy,
  };
}

export function mapFixedCostsPageToUI(page) {
  const items = Array.isArray(page?.items)
    ? page.items.map(mapFixedCostToUI)
    : [];

  return {
    items,
    page: page?.page ?? 0,
    size: page?.size ?? items.length,
    totalItems: page?.totalItems ?? items.length,
    totalPages: page?.totalPages ?? 1,
  };
}