import React, { useState, useEffect } from 'react';

const MicrofrontendApp = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [products, setProducts] = useState([]);
  // const [jwtToken, setJwtToken] = useState(null);

  const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyNkBnbWFpbC5jb20iLCJleHAiOjE3MDcyMTU0NjMsImlhdCI6MTcwNzE3OTQ2M30.RJ8ZfDXwZ5gbKL1c6JUupedpx7xuInbT3cJlgtY1LR8";
  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  // useEffect(() => {
  //   const authenticateUser = async () => {
  //     const email = "user12@gmail.com";
  //     const password = "password";
  
  //     try {
  //       const response = await fetch("http://localhost:80/api/v1/auth/authenticate", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({ email, password })
  //       });
  
  //       if (response.ok) {
  //         const token = await response.text();
  //         setJwtToken(token);
  //       } else {
  //         setErrorMessages({ name: "uname", message: errors.uname });
  //       }
  //     } catch (error) {
  //       console.error("Error occurred during authentication:", error);
  //       setErrorMessages({ name: "uname", message: errors.uname });
  //     }
  //   };
    
  //   authenticateUser();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:80/api/v1/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
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
  }, []);

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
            {/* <th>Order</th> */}
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
