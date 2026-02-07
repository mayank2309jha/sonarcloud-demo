import React, { useState } from "react";

export default function Seven() {
  const [user] = useState({
    role: "admin",
    isBlocked: false,
    credits: 120,
  });

  const [orders, setOrders] = useState([
    { id: 1, amount: 40 },
    { id: 2, amount: 60 },
  ]);

  // ❌ Business logic + authorization + state mutation
  const placeOrder = (orderAmount) => {
    if (user) {
      if (!user.isBlocked) {
        if (user.role === "admin" || user.credits >= orderAmount) {
          if (orderAmount > 0) {
            if (orderAmount <= 100) {
              setOrders([
                ...orders,
                { id: orders.length + 1, amount: orderAmount },
              ]);
            } else {
              alert("Order amount too high");
            }
          } else {
            alert("Invalid order amount");
          }
        } else {
          alert("Not enough credits");
        }
      } else {
        alert("User is blocked");
      }
    } else {
      alert("User not logged in");
    }
  };

  return (
    <div className="component">
      <h2>Orders</h2>

      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            Order #{o.id} — ₹{o.amount}
          </li>
        ))}
      </ul>

      <button onClick={() => placeOrder(50)}>Place Order (₹50)</button>
    </div>
  );
}
