import "./MainPages.css";
import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./Products/Products";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Notfound from "./ultis/not_found/Not_found";
import DetailProduct from "./detail/DetailProduct";
import { GlobalState } from "../../GlobalState";

function MainPages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.usersAPI.isLogged;

  return (
    <Switch>
      <Route path="/login">{isLogged ? <Notfound /> : <Login />}</Route>
      <Route path="/detail/:id">
        <DetailProduct />
      </Route>
      <Route path="/register">{!isLogged ? <Notfound /> : <Register />}</Route>
      <Route path="/cart">
        <Cart />
      </Route>

      <Route path="/">
        <Products />
      </Route>
      <Route path="/*">
        <Notfound />
      </Route>
    </Switch>
  );
}

export default MainPages;
