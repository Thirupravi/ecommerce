import React from "react";
import "./Card.css";

export default function Card({ image, title, price }) {
  return (
    <div className="card">
      <img src={image} alt="Product" style={{ width: "100%" }} />
      <div className="text_container">
        <h4>
          <b>{title}</b>
        </h4>
        <p>{`$${price}`}</p>
      </div>
    </div>
  );
}
