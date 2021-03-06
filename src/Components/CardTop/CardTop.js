import React from "react";
import "./CardTop.css";

export default function CardTop({ image, title, price, rating }) {
  return (
    <div className="topcard_container">
      <img src={image} alt={title} />
      <div>
        <span>{title}</span>
        <div>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
        </div>
        <p className="price_tag">{price}</p>
      </div>
    </div>
  );
}
