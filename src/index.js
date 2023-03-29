import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Logout from './pages/Logout/Logout';
import reportWebVitals from './reportWebVitals';
import LogoHeader from './components/LogoHeader/LogoHeader';
import UserDashboard from './pages/Users/UserDashboard/UserDashboard';
import MerchantDashboard from './pages/MerchantDashboard/MerchantDashboard';
import UserOrders from './pages/Users/UserOrders/UserOrders';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Footer from './components/Footer/Footer';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,Router,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    exact:true,
    element: <Home />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "setting",
    element: <Register />
  },
  {
    path: "profile",
    element: <Register />
  },
  {
    path: "logout",
    element: <Logout />
  },
  {
    path: "dashboard/user/:id/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "dashboard/user/:id/orders",
    element: <UserOrders />
  },
  {
    path: "dashboard/merchant/:id",
    element: <MerchantDashboard />
  },
  {
    path: "product/:id",
    element: <ProductDetail />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LogoHeader />
    <RouterProvider router={router} />
    <Footer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
