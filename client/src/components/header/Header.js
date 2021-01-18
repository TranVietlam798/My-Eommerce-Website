import "./Header.css";
import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/bars-solid.svg";
import Cart from "./icon/shopping-cart-solid.svg";
import Close from "./icon/times-solid.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.usersAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.usersAPI.isAdmin;
  const [cart, setCart] = state.usersAPI.cart;

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categoties</Link>
        </li>
      </>
    );
  };

  const logoutUser = async () => {
    if (window.confirm("Do you want to logout?")) {
      await axios.get("/user/logout");
      localStorage.clear();
      setIsAdmin(false);
      setIsLogged(false);
      window.location.href = "/";
    }
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link onClick={logoutUser} to="/">
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header className="">
      <div className="menu">
        <img src={Menu} alt="" width={30} className="" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "ANLOI"}</Link>
        </h1>
      </div>

      <ul className="">
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"} </Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login * Register</Link>
          </li>
        )}
        <li>
          <img src={Close} width={30} alt="" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart_icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width={30} className="" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
