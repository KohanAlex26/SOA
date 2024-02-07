import React, { useState, useEffect } from 'react';

const OrderMicrofrontend = () => {
  const [orders, setOrders] = useState([]);
  const [modifiedOrders, setModifiedOrders] = useState([]);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        // If the token is not present in local storage, perform authentication
        if (!jwtToken) {
          const authResponse = await fetch("http://localhost:80/api/v1/auth/authenticate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: "user19@gmail.com",
              password: "password",
            }),
          });

          if (authResponse.ok) {
            const { token } = await authResponse.json();
            setJwtToken(token);

            // Store the token in local storage for future use
            localStorage.setItem('jwtToken', token);
          } else {
            console.error("Authentication failed:", authResponse.statusText);
          }
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
      }
    };

    authenticateUser();
  }, []);

  useEffect(() => {
    if (jwtToken) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:80/api/v1/orders", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          if (response.ok) {
            const ordersData = await response.json();
            setOrders(ordersData);
            setModifiedOrders(ordersData); // Initialize modifiedOrders with initial data
          } else {
            console.error("Failed to fetch orders:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchData();
    }
  }, [jwtToken]);

  useEffect(() => {
    // This useEffect will run whenever modifiedOrders is updated
    // You can add additional logic or API calls here if needed
    console.log("Modified orders updated:", modifiedOrders);
  }, [modifiedOrders]);

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
          
          // Update modifiedOrders after each process
          setModifiedOrders((prevOrders) => prevOrders.map(order => order.id === orderId ? { ...order, completed: true } : order));
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
          {modifiedOrders.map((order) => (
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
