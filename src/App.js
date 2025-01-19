import logo from './logo.svg';
import './App.css';

import Products from './Products';
import TodoApp from './TodoApp';

import { BrowserRouter as Router , Routes, Route } from 'react-router';
import ProductDetails from './ProductDetails';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />

        <Route path="/products/:id" element={<ProductDetails />} />
        
        <Route path="/todos" element={<TodoApp />} />
      </Routes>
    </Router>
  );
}

export default App;
