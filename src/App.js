import React, { Component } from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Mainlayout from "./Components/MainLayout/Mainlayout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import AuthLayout from "./Components/MainLayout/AuthLayout";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import StoreContextProvider from "./Context/storeContext";
import { ToastContainer, toast } from 'react-toastify';
import CategoriesDetails from "./CategoriesDetails/CategoriesDetails";
import Address from "./Address/Address";
import Order from "./Orders/Order";
import ResetEmail from "./ResetEmail/ResetEmail";
import ResetCode from "./FinalReset/ResetCode";
import NewPassword from "./NewPassword/NewPassword";


export default function App() {
  let routes = createHashRouter([
    {
      path: "/",
      element: <Mainlayout />,
      children: [
        { index: true, element: <ProtectedRoutes> <Home/> </ProtectedRoutes> },
        { path: "home", element: <ProtectedRoutes> <Home/> </ProtectedRoutes> },
        { path: "products", element: <ProtectedRoutes> <Products/> </ProtectedRoutes> },
        { path: "categories", element: <ProtectedRoutes> <CategoriesDetails/> </ProtectedRoutes> },
        { path: "brands", element: <ProtectedRoutes> <Brands/> </ProtectedRoutes> },
        { path: "cart", element: <ProtectedRoutes> <Cart/> </ProtectedRoutes> },
        { path: "wishlist", element: <ProtectedRoutes> <Wishlist /> </ProtectedRoutes> },
        { path: "product-details/:id", element: <ProtectedRoutes> <ProductDetails /> </ProtectedRoutes> },
        { path: "address/:id", element: <ProtectedRoutes> <Address /> </ProtectedRoutes> },
        { path: "allorders", element: <ProtectedRoutes> <Order /> </ProtectedRoutes> },




        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "Signup", element: <Signup /> },
        { path: "Signin", element: <Signin /> },
        { path: "ResetEmail", element: <ResetEmail /> },
        { path: "ResetCode", element: <ResetCode /> },
        { path: "NewPassword", element:  <NewPassword/>  },



      ],
    },
  ]);
  return (
    <>
      <StoreContextProvider>
      <RouterProvider router={routes} />

      </StoreContextProvider>
      <ToastContainer autoClose={400}  theme="dark" />
    </>
  );
}
