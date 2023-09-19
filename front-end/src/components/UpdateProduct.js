import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    console.warn(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const handleProduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        value={name}
      />

      <input
        onChange={(e) => setPrice(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        value={price}
      />

      <input
        onChange={(e) => setCategory(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        value={category}
      />

      <input
        onChange={(e) => setCompany(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        value={company}
      />

      <button onClick={handleProduct} className="appButton" type="button">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
