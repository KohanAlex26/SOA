import React, { useState, useEffect } from 'react';

const OrderMicrofrontend = () => {
  const [orders, setOrders] = useState([]);
  const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyNkBnbWFpbC5jb20iLCJleHAiOjE3MDcyNTE1NDIsImlhdCI6MTcwNzIxNTU0Mn0.TFoIkTygTCt_tbmQcEn4w-UG7JVJuddLn77Vh4y7BH4";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:80/api/v1/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        if (response.ok) {
          const ordersData = await response.json();
          setOrders(ordersData);
        } else {
          console.error("Failed to fetch orders:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = async (orderId) => {
    const clickedOrder = orders.find((order) => order.id === orderId);

    if (clickedOrder) {
      try {
        const response = await fetch(`http://localhost:80/api/v1/kafka?message=${clickedOrder.id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          console.log(`Post request successful for order with ID: ${orderId}`);
        } else {
          console.error("Failed to send post request:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending post request:", error);
      }
    } else {
      console.error(`Order with ID ${orderId} not found`);
    }
  };

  return (
    <div className="order-microfrontend">
      <h2>List of Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Completed</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.completed ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleButtonClick(order.id)}>
                  Process
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderMicrofrontend;
