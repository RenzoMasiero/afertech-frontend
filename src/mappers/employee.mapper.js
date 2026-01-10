function mapEmployeeToUI(employee) {
  return {
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    documentNumber: employee.documentNumber,
    hireDate: employee.hireDate,
    terminationDate: employee.terminationDate,
    loadedAt: employee.loadedAt,
    loadedBy: employee.loadedBy,
  };
}

export function mapEmployeesPageToUI(page) {
  const items = Array.isArray(page?.items)
    ? page.items.map(mapEmployeeToUI)
    : [];

  return {
    items,
    page: page?.page ?? 0,
    size: page?.size ?? items.length,
    totalItems: page?.totalItems ?? items.length,
    totalPages: page?.totalPages ?? 1,
  };
}
