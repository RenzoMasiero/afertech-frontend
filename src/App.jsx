import { useState } from "react";
import AppLayout from "./layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import { Box, Typography } from "@mui/material";
import InvoicesFeature from "./features/invoices/InvoicesFeature";
import PaymentOrdersFeature from "./features/paymentOrders/PaymentOrdersFeature";
import ClientsFeature from "./features/clients/ClientsFeature";

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
          <Typography variant="h3">Afertech</Typography>
        </Box>
      )}

      {section === "invoices" && (
        <InvoicesFeature authUser={authUser} />
      )}

      {section === "paymentOrders" && (
        <PaymentOrdersFeature authUser={authUser} />
      )}

      {section === "clients" && (
        <ClientsFeature authUser={authUser} />
      )}
    </AppLayout>
  );
}
