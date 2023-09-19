import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.warn(result);
    console.warn(userId);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="product">
      <h1>Product</h1>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        value={name}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid product name</span>
      )}
      <input
        onChange={(e) => setPrice(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        value={price}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        onChange={(e) => setCategory(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        value={category}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        onChange={(e) => setCompany(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        value={company}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      <button onClick={handleProduct} className="appButton" type="button">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
