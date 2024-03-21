import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Header></Header>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}
