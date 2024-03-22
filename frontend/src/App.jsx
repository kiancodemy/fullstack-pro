import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/Productscreen";

import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
console.log(1);

export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Homescreen />}></Route>
        <Route path="/product/:id" element={<Productscreen />}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}
