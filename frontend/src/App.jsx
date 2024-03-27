import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/Productscreen";

import Cart from "./screens/Cart";

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
      <Footer></Footer>
    </BrowserRouter>
  );
}
