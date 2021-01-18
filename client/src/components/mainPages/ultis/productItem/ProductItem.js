import React from "react";

import BtnRender from "./BtnRender";
import "./ProductItem.css";

function ProductItem({ product, isAdmin }) {
  return (
    <div className="product_card">
      {isAdmin && <input type="checkbox" checked={product.checked}></input>}
      <img src={product.images.url} alt="" className="" />
      <div className="product_box">
        <h2 title={product.title} className="">
          {product.title}
        </h2>
        <span>${product.price}</span>
        <p>${product.description}</p>
      </div>
      <BtnRender key={product._id} product={product} />
    </div>
  );
}

export default ProductItem;
