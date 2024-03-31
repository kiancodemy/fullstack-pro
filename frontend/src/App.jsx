import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/Productscreen";

import Cart from "./screens/Cart";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Shippingscreen from "./screens/Shippingscreen";
import Private from "./components/Private";
import Paymentscreen from "./screens/Paymentscreen";
import Placeorder from "./screens/Placeorder";
import Orderscreen from "./screens/Orderscreen";
export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Homescreen />}></Route>
        <Route path="/product/:id" element={<Productscreen />}></Route>
        <Route path="/card" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="/orders/:id" element={<Orderscreen />}></Route>

        <Route path="" element={<Private />}>
          <Route path="/shipping" element={<Shippingscreen />}></Route>
          <Route path="/payment" element={<Paymentscreen />}></Route>

          <Route path="/placeorder" element={<Placeorder />}></Route>
        </Route>
      </Routes>
      <ToastContainer
        transition={Zoom}
        limit={3}
        theme="light"
        autoClose={2000}
      />
    </BrowserRouter>
  );
}
