import { useState } from "react";
import AppLayout from "./layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import { Box, Typography } from "@mui/material";

import InvoicesFeature from "./features/invoices/InvoicesFeature";
import PaymentOrdersFeature from "./features/paymentOrders/PaymentOrdersFeature";
import PurchaseOrdersFeature from "./features/purchaseOrders/PurchaseOrdersFeature";
import CostTypesFeature from "./features/costTypes/CostTypesFeature";
import VariableCostTypesFeature from "./features/variableCostTypes/VariableCostTypesFeature";
import VariableCostsFeature from "./features/variableCosts/VariableCostsFeature";
import ClientsFeature from "./features/clients/ClientsFeature";
import ProjectsFeature from "./features/projects/ProjectsFeature";
import SuppliersFeature from "./features/suppliers/SuppliersFeature";
import FixedCostsFeature from "./features/fixedCosts/FixedCostsFeature";
import EmployeesFeature from "./features/employees/EmployeesFeature";

import MonthlyFinanceReportPage from "./pages/reports/finance/monthly/MonthlyFinanceReportPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("authToken"))
  );

  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [section, setSection] = useState("home");

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setAuthUser(user);
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <AppLayout selected={section} onSelect={setSection} authUser={authUser}>
      {section === "home" && (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h1">Afertech</Typography>
        </Box>
      )}

      {section === "invoices" && <InvoicesFeature authUser={authUser} />}
      {section === "paymentOrders" && (
        <PaymentOrdersFeature authUser={authUser} />
      )}
      {section === "purchaseOrders" && (
        <PurchaseOrdersFeature authUser={authUser} />
      )}
      {section === "clients" && <ClientsFeature authUser={authUser} />}
      {section === "projects" && <ProjectsFeature authUser={authUser} />}
      {section === "suppliers" && <SuppliersFeature authUser={authUser} />}
      {section === "employees" && <EmployeesFeature authUser={authUser} />}
      {section === "variableCosts" && (
        <VariableCostsFeature authUser={authUser} />
      )}
      {section === "fixedCosts" && (
        <FixedCostsFeature authUser={authUser} />
      )}
      {section === "costTypes" && <CostTypesFeature authUser={authUser} />}
      {section === "variableCostTypes" && (
        <VariableCostTypesFeature authUser={authUser} />
      )}

      {section === "monthlyFinanceReport" && (
        <MonthlyFinanceReportPage />
      )}
    </AppLayout>
  );
}
