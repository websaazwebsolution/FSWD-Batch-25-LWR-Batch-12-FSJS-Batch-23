import React, { useState, useEffect } from "react";
import { Link } from "react-router"; // Corrected import for React Router
import axios from "axios";
import Navbar from "./Navbar";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Fixed typo here

  useEffect(() => {
    const fetchData = async () => {
      // Fixed typo here
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error); // Log actual error for debugging
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.inputField} // Apply the custom input field styles
      />

      <ul style={styles.productList}>
        {filteredProducts.map((product) => (
          <li style={styles.productItem} key={product.id}>
            <div style={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.title}
                style={styles.productImage}
                className="magnifier-image"
              />
              <Magnifier /> {/* Added Magnifier here */}
            </div>
            <div style={styles.productDetails}>
              <h3 style={styles.productTitle}>{product.title}</h3>
              <p>{product.price}</p>
              <Link to={`/products/${product.id}`} style={styles.viewDetails}>
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  productList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "0",
    listStyle: "none",
  },
  inputField: {
    padding: '10px 15px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '300px',
    marginBottom: '20px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  inputFieldFocus: {
    borderColor: '#007bff', // Blue border when focused
  },
  productItem: {
    background: "#f9f9f9",
    borderRadius: "8px",
    margin: "10px",
    padding: "15px",
    width: "calc(25% - 20px)", // 4 items per row (100% / 4 = 25%)
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
    position: "relative",
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
    marginBottom: "15px",
  },
  productImage: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    transition: "transform 0.3s ease",
  },
  productDetails: {
    marginTop: "15px",
  },
  productTitle: {
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  viewDetails: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "black",
    padding: "10px 15px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
};

// CSS for magnifier effect
const magnifierStyle = {
  position: "absolute",
  border: "3px solid #000",
  borderRadius: "50%",
  cursor: "zoom-in",
  width: "100px",
  height: "100px",
  display: "none",
  pointerEvents: "none",
  backgroundSize: "200%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const Magnifier = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleMouseMove = (e) => {
    if (isHovered) {
      const image = e.target;
      const container = image.parentNode;
      const { left, top } = container.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;

      const zoomer = document.getElementById("magnifier");
      const bgPosX = (mouseX / image.offsetWidth) * 100;
      const bgPosY = (mouseY / image.offsetHeight) * 100;

      setPosition({ top: mouseY, left: mouseX });
      zoomer.style.backgroundImage = `url(${image.src})`;
      zoomer.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
      zoomer.style.display = "block";
    }
  };

  return (
    <div
      id="magnifier"
      style={{
        ...magnifierStyle,
        top: `${position.top - 50}px`,
        left: `${position.left - 50}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default Products;
