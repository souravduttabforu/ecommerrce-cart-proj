import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./components/Home";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

import "./style/app.scss"
import { useState } from "react";
function App() {
  //state for sending data between sibling
  const [addNewDAta, setAddNewData] = useState({})
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home addNewDAta={addNewDAta}/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addproduct" element={<AddProduct setAddNewData={setAddNewData} />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
