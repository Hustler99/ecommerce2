import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { storeContext } from "../../Context/storeContext";


export default function Navbar() {
  function signOut() {
    localStorage.clear();
    window.location = "/signin"
  }
  let { counter, getUserCart, setCounter, wCount, setwCounter, getUserWishlist } = useContext(storeContext)
  async function getWL() {
    let data = await getUserWishlist()
    console.log(data)
    setwCounter(data.count)
  }
  useEffect(() => {
    (async() => {
      let data = await getUserCart()
      setCounter(data.numOfCartItems)
    
    })()
    getWL()
  },[])
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2">
        <div className="container-fluid mx-3">
          <img  src={logo} alt="Freshcart Logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" aria-current="page" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/brands">
                  Brands
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item position-relative ">
                <NavLink className="nav-link" activeclassname="active" to="/cart">
                  Cart <i className="fab fa-opencart cartIcon mx-2" />
                  {counter? <span className="position-absolute badger start-100 translate-middle badge doksh rounded-pill bg-danger">
                    {counter }<span className="visually-hidden">unread messages</span>
                  </span> : ""}
                </NavLink>
              </li>
              <li className="nav-item position-relative ">
                <NavLink className="nav-link " activeclassname="active" to="/wishlist">
                  Wishlist <i className="fas fa-heart cartIcon mx-2" />
                  <span className="position-absolute badger2 start-100 translate-middle badge rounded-pill bg-danger">
                    {wCount }<span className="visually-hidden">unread messages</span>
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink onClick={()=>{signOut()}} className="nav-link signout " activeclassname="active" to="/">
                  SignOut
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
