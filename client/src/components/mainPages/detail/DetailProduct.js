import React, { useContext, useEffect, useState } from "react";
import "./DeatailProduct.css";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../ultis/productItem/ProductItem";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;

  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
        }
      });
    }
  }, [params, products]);
  
  if (detailProduct.length === 0) {
    return null;
  }
  return (
    <div>
      <div className="detail">
        <img src={detailProduct.images.url} alt="" className="" />
        <div className="box_detail">
          <div className="row">
            <h2 className="">{detailProduct.title}</h2>
            <h6 className="">{detailProduct.product_id}</h6>
          </div>

          <span>${detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link className="cart" to="/cart">
            Buy Now
          </Link>
        </div>
      </div>

      <div>
        <h2>Related products</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category &&
              product._id !== detailProduct._id ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
