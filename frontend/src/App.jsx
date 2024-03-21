import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";

import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
console.log(1);

export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Homescreen />}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}
