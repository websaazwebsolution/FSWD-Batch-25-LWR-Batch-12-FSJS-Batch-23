import React, { useState,useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "./Navbar";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch product details");
        setLoading(false);
      }

    }
        fetchProduct();
},[id]);
    console.log(product);


    const styles = {
        container: {
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f4f4f4',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          margin: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
        
        },
        heading: {
          textAlign: 'center',
          color: '#333',
          fontSize: '2rem',
          marginBottom: '20px',
        },
        productImage: {
          width: '50%',
          
          height: '200px',
          borderRadius: '8px',
          marginBottom: '20px',
        },
        productTitle: {
          fontSize: '1.8rem',
          color: '#333',
          fontWeight: 'bold',
          marginBottom: '10px',
        },
        productPrice: {
          fontSize: '1.2rem',
          color: '#E74C3C',
          marginBottom: '10px',
        },
        productCategory: {
          fontSize: '1.1rem',
          color: '#2C3E50',
          marginBottom: '10px',
        },
        productDescription: {
          fontSize: '1rem',
          color: '#555',
          lineHeight: '1.5',
        },
        errorMessage: {
          color: 'red',
          fontSize: '1.2rem',
          textAlign: 'center',
        },
        loadingMessage: {
          color: '#f39c12',
          fontSize: '1.2rem',
          textAlign: 'center',
        },
      };
    
      return (
        <div>  <Navbar />
        <div style={styles.container}>
          
          <h1 style={styles.heading}>Product Details</h1>
          {loading ? (
            <p style={styles.loadingMessage}>Loading...</p>
          ) : error ? (
            <p style={styles.errorMessage}>{error}</p>
          ) : (
            <div>
              <img
                src={product.image}
                alt={product.title}
                style={styles.productImage}
              />
              <h2 style={styles.productTitle}>{product.title}</h2>
              <p style={styles.productPrice}>Price: ${product.price}</p>
              <p style={styles.productCategory}>Category: {product.category}</p>
              <p style={styles.productDescription}>Description: {product.description}</p>
            </div>
          )}
        </div>
        </div>
      );
    };
export default ProductDetails;
