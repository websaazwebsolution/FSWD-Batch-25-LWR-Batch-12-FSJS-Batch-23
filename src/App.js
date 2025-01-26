import logo from "./logo.svg";
import "./App.css";

import Products from "./Products";
import TodoApp from "./TodoApp";

import { BrowserRouter as Router, Routes, Route } from "react-router";

import ProductDetails from "./ProductDetails";
import { CartProvider } from "./CartProvider";
import Cart from "./Cart";
import Weathermap from "./Weathermap";
import FirebaseCrud from "./FirebaseCrud";
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />

          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/todos" element={<TodoApp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/weather" element={<Weathermap />} />
          <Route path="/firebasecrud" element={<FirebaseCrud />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
