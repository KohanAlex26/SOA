import React, { useEffect, useState } from "react";

const Dashboard = ({ jwtToken }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch("http://localhost:80/api/v1/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch orders
        const ordersResponse = await fetch("http://localhost:80/api/v1/orders", {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [jwtToken]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const addProduct = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("http://localhost:80/api/v1/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        // Refresh the list of products after adding a new one
        const updatedProductsResponse = await fetch("http://localhost:80/api/v1/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        const updatedProductsData = await updatedProductsResponse.json();
        setProducts(updatedProductsData);

        // Clear the form after adding a new product
        setNewProduct({ name: "", price: "" });
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred during product addition:", error);
    }
  };

  return (
    <div className="dashboard">
      <div className="table-container">
        <div className="column">
          <h3>Products</h3>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column">
          <h3>Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.productName}</td>
                  <td>{order.completed ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column">
          <h3>Add New Product</h3>
          <form onSubmit={addProduct}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
