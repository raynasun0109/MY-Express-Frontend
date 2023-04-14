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
import MerchantDashboard from './pages/Merchant/MerchantDashboard/MerchantDashboard';
import UserOrders from './pages/Users/UserOrders/UserOrders';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux'
import store from "./redux/stores/index.js";
import MerchantOrders from './pages/Merchant/MerchantOrders/MerchantOrders';
import MerchantProducts from './pages/Merchant/MerchantProducts/MerchantProducts';
import UserCart from './pages/Users/UserCart/UserCart';
import Checkout from './pages/Checkout/Checkout';
import UserPaid from './pages/Users/UserOrders/UserPaid/UserPaid';
import UserProcessing from './pages/Users/UserOrders/UserProcessing/UserProcessing';
import UserShipped from './pages/Users/UserOrders/UserShipped/UserShipped';
import UserProfile from './pages/Users/UserProfile/UserProfile';
import MerchantTransaction from './pages/Merchant/MerchantTransaction/MerchantTransaction';
import MerchantPaid from './pages/Merchant/MerchantTransaction/MerchantPaid/MerchantPaid';
import MerchantProcessing from './pages/Merchant/MerchantTransaction/MerchantProcessing/MerchantProcessing';
import MerchantShipped from './pages/Merchant/MerchantTransaction/MerchantShipped/MerchantShipped';
import MerchantProfile from './pages/Merchant/MerchantProfile/MerchantProfile';
<<<<<<< HEAD
import ProductCategory from './pages/ProductCategory/ProductCategory';
=======
>>>>>>> 6adf3c050708e3b3b0be2f774060317d861dfd65

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
    path: "checkout",
    element: <Checkout />
  },
  {
    path: "logout",
    element: <Logout />,
    forceRefresh:true
  },
  {
    path: "dashboard/user/:id/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "dashboard/user/:id/profile",
    element: <UserProfile />,
  },
  {
    path: "dashboard/user/:id/orders",
    element: <UserOrders />
  },
  {
    path: "dashboard/user/:id/orders/paid",
    element: <UserPaid />
  },
  {
    path: "dashboard/user/:id/orders/processing",
    element: <UserProcessing />
  },
  {
    path: "dashboard/user/:id/orders/shipped",
    element: <UserShipped />
  },
  {
    path: "dashboard/user/:id/carts",
    element: <UserCart />
  },
  {
    path: "dashboard/merchant/:id/dashboard",
    element: <MerchantDashboard />
  },
  {
    path: "dashboard/merchant/:id/profile",
    element: <MerchantProfile />
  },
  {
    path: "dashboard/merchant/:id/orders",
    element: <MerchantOrders />
  },
  {
    path: "dashboard/merchant/:id/products",
    element: <MerchantProducts />
  },
  {
    path: "dashboard/merchant/:id/transaction",
    element: <MerchantTransaction />
  },
  {
    path: "dashboard/merchant/:id/transaction/paid",
    element: <MerchantPaid />
  },
  {
    path: "dashboard/merchant/:id/transaction/processing",
    element: <MerchantProcessing />
  },
  {
    path: "dashboard/merchant/:id/transaction/shipped",
    element: <MerchantShipped />
  },
  {
<<<<<<< HEAD
    path: "product/:category",
    element: <ProductCategory />,
=======
    path: "product/:category/:id",
    element: <ProductDetail />,
  },
  {
    path: "product/:category",
    element: <ProductDetail />,
>>>>>>> 6adf3c050708e3b3b0be2f774060317d861dfd65
  },
  {
    path: "product/:category/:id",
    element: <ProductDetail />,
  }

]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <Provider store={store}>
      <LogoHeader />
      <RouterProvider router={router} />
      
      <Footer/>
     </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
