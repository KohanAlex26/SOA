import React, { useState, useEffect } from 'react';

const MicrofrontendApp = () => {
  const [products, setProducts] = useState([]);
  const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTAwQGdtYWlsLmNvbSIsImV4cCI6MTcwOTAzNzg4OCwiaWF0IjoxNzA3MzA5ODg4fQ.cWKqf030juHRCYFAbyOZvO2BnUNk-di3H2LORm92Rng";

  useEffect(() => {
    fetchData();
  }, [jwtToken]);

  const fetchData = async () => {
    if (jwtToken) {
      try {
        const response = await fetch("http://localhost:80/api/v1/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        } else {
          console.error("Failed to fetch products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };

  const handleButtonClick = async (productId) => {
    const clickedProduct = products.find((product) => product.id === productId);

    if (clickedProduct) {
      try {
        const response = await fetch("http://localhost:80/api/v1/publish", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName: clickedProduct.name,
            completed: false,
          }),
        });

        if (response.ok) {
          console.log(`Post request successful for product with ID: ${productId}`);
        } else {
          console.error("Failed to send post request:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending post request:", error);
      }
    } else {
      console.error(`Product with ID ${productId} not found`);
    }
  };

  const handleRefreshClick = () => {
    fetchData();
  };

  return (
    <div className="microfrontend-app">
      <div>
        <h2>List of Products</h2>
        <button onClick={handleRefreshClick}>Refresh</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleButtonClick(product.id)}>
                  Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MicrofrontendApp;
