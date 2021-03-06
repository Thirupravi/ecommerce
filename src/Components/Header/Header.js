import React from "react";
import "./Header.css";

export default function Header({ handleAddproduct }) {
  const handleaddproduct = () => {
    handleAddproduct();
  };
  return (
    <div className="header_container">
      <h3>Products</h3>
      <button onClick={handleaddproduct}>Add Product</button>
    </div>
  );
}
