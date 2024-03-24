import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/Productscreen";
import Loading from "./components/loading";

import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

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
