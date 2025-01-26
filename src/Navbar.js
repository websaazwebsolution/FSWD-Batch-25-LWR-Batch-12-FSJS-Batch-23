import React from 'react'
import { Link } from "react-router";
import { useCart } from './CartProvider'; // Access CartContext


function Navbar() {
  const { totalQuantity } = useCart(); // Get totalQuantity from CartContext
  return (
    <div><nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <Link class="nav-link" to="/">Home </Link>
        </li>

        <li class="nav-item">
            <Link class="nav-link" to="/todos">todo</Link>
        </li>
        <li class="nav-item">
            <Link class="nav-link" to="/cart"> Cart ({totalQuantity})</Link>
        </li>
        <li class="nav-item">
            <Link class="nav-link" to="/weather"> weather</Link>
        </li>
        <li class="nav-item">
            <Link class="nav-link" to="/firebasecrud"> Crud</Link>
        </li>
        </ul>
    </div>
  </nav></div>
  )
}

export default Navbar