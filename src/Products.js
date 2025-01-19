import React, { useState, useEffect } from "react";

import {Link, useParams} from "react-router";

import axios from "axios";
import Navbar from "./Navbar";
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("faild to fetch data");
        setLoading(false);
      }
    };

    fetcData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
        <div>
          <Navbar />
            <h1>Products</h1>
            <ul style={styles.productList}>
        {products.map((product) => (
          <li style={styles.productItem} key={product.id}>
            <div style={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.title}
                style={styles.productImage}
                className="magnifier-image"
              />
            </div>
            <div style={styles.productDetails}>
              <h3 style={styles.productTitle}>{product.title}</h3>
              {/* <p>{product.description}</p> */}
              <p>{product.price}</p>
              <Link to={`/products/${product.id}`} style={styles.viewDetails}> View Details</Link>
            </div>
          </li>
        ))}
      </ul>
        </div>
  );
}
const styles = {
    productList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between', // Space items evenly with space between
      padding: '0',
      listStyle: 'none',
    },
    productItem: {
      background: '#f9f9f9',
      borderRadius: '8px',
      margin: '10px',
      padding: '15px',
      width: 'calc(25% - 20px)', // 4 items per row (100% / 4 = 25%)
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease',
      position: 'relative',
    },
    imageContainer: {
      position: 'relative',
      overflow: 'hidden', // Ensures that the zoom effect does not overflow the container
      marginBottom: '15px',
    },
    productImage: {
      width: '200px', // Fixed width for image
      height: '200px', // Fixed height for image
      objectFit: 'cover', // Ensures the image covers the space without distortion
      borderRadius: '8px', // Rounded corners for the image
      transition: 'transform 0.3s ease',
    },
    productDetails: {
      marginTop: '15px',
    },
    productTitle: {
      fontSize: '1.2em',
      fontWeight: 'bold',
    },
    viewDetails: {
      textDecoration: 'none',
      color: '#fff',
      backgroundColor: 'black',
      padding: '10px 15px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: '#e0e0e0',
      },
    }
  };
  
  // CSS for magnifier effect
  const magnifierStyle = {
    position: 'absolute',
    border: '3px solid #000',
    borderRadius: '50%',
    cursor: 'zoom-in',
    width: '100px',
    height: '100px',
    display: 'none', // Hide by default
    pointerEvents: 'none',
    backgroundSize: '200%', // Make the image inside the magnifier appear zoomed in
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  
  const Magnifier = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    const handleMouseMove = (e) => {
      if (isHovered) {
        const image = e.target;
        const container = image.parentNode;
  
        // Get image and container positions
        const { left, top } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
  
        const zoomer = document.getElementById('magnifier');
  
        // Calculate the background position of the magnifier
        const bgPosX = (mouseX / image.offsetWidth) * 100;
        const bgPosY = (mouseY / image.offsetHeight) * 100;
  
        // Update the position of the magnifier
        setPosition({ top: mouseY, left: mouseX });
        zoomer.style.backgroundImage = `url(${image.src})`;
        zoomer.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
  
        // Make magnifier visible
        zoomer.style.display = 'block';
      }
    };
  
    return (
      <div
        id="magnifier"
        style={{
          ...magnifierStyle,
          top: `${position.top - 50}px`, // Position from top (offset by half the magnifier size)
          left: `${position.left - 50}px`, // Position from left (offset by half the magnifier size)
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  };
export default Products;
