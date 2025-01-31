import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.scss";

const categories = [
  "face",
  "eye",
  "lip",
  "nail",
  "skincare",
  "occasion",
  "accessories",
  "fashion" 
];
const Home = ({ name }) => {
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(200000);

  useEffect(() => {
    const fetchAllOtherProducts = async () => {
      try {
        const res = await axios.get(
          token
            ? "http://localhost:3003/api/getAllOtherProducts"
            : "http://localhost:3003/api/getAllProducts",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        if (res.status === 200) {
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (token) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      }
    };

    fetchAllOtherProducts();
  }, [token]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesName =
      product.name?.toLowerCase().includes(name?.toLowerCase() || "");
    const matchesPrice = product.price <= priceRange;
    return matchesCategory && matchesName && matchesPrice;
  });

  return (
    <div className="home-page">
      <h2>All Products</h2>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        {selectedCategory && (
          <button className="clear-filter-button" onClick={() => setSelectedCategory("")}>
            Clear Filter
          </button>
        )}
      </div>

      <div className="price-filter">
        <label>Max Price: ₹{priceRange}</label>
        <input
          type="range"
          min="0"
          max="5000"
          step="10"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Link to={`/productdetailspage/${product._id}`} key={product._id} className="product-item">
  <img src={product.thumbnail} alt={product.name} className="product-thumbnail" />
  <span className="product-name">{product.name}</span>
  <span className="product-price">₹{product.price}</span>
</Link>

          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Home;

