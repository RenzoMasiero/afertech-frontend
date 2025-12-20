import { useEffect, useState } from "react";
import { api } from "../api/http";

export default function PaymentOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/payment-orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Payment Orders loco</h2>

      <ul>
        {orders.map(op => (
          <li key={op.id}>
            {op.paymentOrderNumber} – {op.company}
          </li>
        ))}
      </ul>
    </div>
  );
}
