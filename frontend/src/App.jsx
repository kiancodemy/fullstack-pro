import Header from "./components/Header";

import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Header></Header>
        <h1>hu</h1>
      </div>
    </BrowserRouter>
  );
}
