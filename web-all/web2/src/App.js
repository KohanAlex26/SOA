import React, { useState, useEffect } from 'react';

const MicrofrontendApp = () => {
  const [products, setProducts] = useState([]);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken2'));

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
              email: "user10@gmail.com",
              password: "password",
            }),
          });

          if (authResponse.ok) {
            const { token } = await authResponse.json();
            setJwtToken(token);
            
            // Store the token in local storage for future use
            localStorage.setItem('jwtToken2', token);
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
      };

      fetchData();
    }
  }, [jwtToken]);

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

  return (
    <div className="microfrontend-app">
      <h2>List of Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>

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
