import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { NavLink } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2">
        <div className="container-fluid mx-3">
          <img src={logo} alt="Freshcart Logo" />
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="Signin">
                  SignIn
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="Signup">
                  SignUp
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
