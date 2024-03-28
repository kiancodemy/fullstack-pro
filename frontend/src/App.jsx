import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/Productscreen";

import Cart from "./screens/Cart";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Login from "./screens/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Homescreen />}></Route>
        <Route path="/product/:id" element={<Productscreen />}></Route>
        <Route path="/card" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <ToastContainer
        transition={Zoom}
        limit={3}
        theme="light"
        autoClose={2000}
      />
      <Footer></Footer>
    </BrowserRouter>
  );
}
