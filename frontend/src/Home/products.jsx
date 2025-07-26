import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import './products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch products
  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, [API_URL]);

  // Add to cart handler using Redux
  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
    alert("Product added to cart!");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-white mt-5 fw-bold">Popular</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 my-5">
        {products.map((product) => (
          <div className="col" key={product._id}>
            <div className="custom-card">
              <div className="custom-card-img">
                <img
                  src={product.picture} // ✅ Now using Cloudinary URL directly
                  alt="Product"
                  className="img-fluid"
                />
              </div>
              <div className="custom-card-body">
                <span className="custom-badge">
                  {product.category ? product.category.title : "No Category"}
                </span>
                <h5 className="custom-title">{product.title}</h5>
                <p className="custom-desc">{product.description}</p>
                <div className="custom-meta">
                  <span>Gender: {product.gender}</span>
                  <span>Size: {product.size}</span>
                </div>
                <button
                  className="custom-btn"
                  onClick={() => handleAddToCart(product._id)}
                >
                  PKR {product.price} • Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
