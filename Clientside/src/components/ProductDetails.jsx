import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const { productId } = useParams();
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3003/api/getProduct/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setProduct(res.data.product);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId, token]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-page">
      <h2>{product.name}</h2>
      <img src={product.thumbnail} alt={product.name} className="product-thumbnail" />
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <div className="product-images">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`Product image ${index + 1}`} className="product-image" />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
