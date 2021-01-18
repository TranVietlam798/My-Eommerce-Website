import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../ultis/loading/Loading";
import ProductItem from "../ultis/productItem/ProductItem";

function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isAdmin] = state.usersAPI.isAdmin;

  return (
    <div className="">
      <div className="products">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} isAdmin={isAdmin} />
        ))}
      </div>
      {products.length === 0 && <Loading />}
    </div>
  );
}

export default Products;
