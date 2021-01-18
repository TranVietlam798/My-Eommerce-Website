import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

function BtnRender({ product }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.usersAPI.isAdmin;
  const addCart = state.usersAPI.addCart;
  //   const state = useContext(GlobalState);
  // const [isAdmin] = state.userAPI.isAdmin
  // const addCart = state.userAPI.addCart

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          {" "}
          <Link className="btn_buy" to="#!">
            Delete
          </Link>
          <Link className="btn_view" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link className="btn_buy" onClick={() => addCart(product)} to="#!">
            Buy
          </Link>
          <Link className="btn_view" to={`/detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;
