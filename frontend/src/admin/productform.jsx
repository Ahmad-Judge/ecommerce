import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    description: "This is IPhone desc",
    price: 5000,
    isFeatured: false,
    gender: "men",
    size: "small",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (file) data.append("file", file);

    try {
      await axios.post(`${API_URL}/api/products`, data);
      navigate("/admin/products");
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-md-start mb-4">Create New Product</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-4">

          {/* Category */}
          <div className="col-12 col-md-6">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="col-12 col-md-6">
            <label className="form-label">Price</label>
            <input
              name="price"
              type="number"
              className="form-control"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          {/* File Upload */}
          <div className="col-12 col-md-6">
            <label className="form-label">Picture</label>
            <input
              name="file"
              type="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* Featured Checkbox */}
          <div className="col-12 col-md-6 d-flex align-items-center">
            <div className="form-check mt-3">
              <input
                name="isFeatured"
                type="checkbox"
                className="form-check-input"
                id="featuredCheck"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
              />
              <label className="form-check-label ms-2" htmlFor="featuredCheck">
                Featured Product
              </label>
            </div>
          </div>

          {/* Gender */}
          <div className="col-12 col-md-6">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-control"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              required
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="children">Children</option>
            </select>
          </div>

          {/* Size */}
          <div className="col-12 col-md-6">
            <label className="form-label">Size</label>
            <select
              name="size"
              className="form-control"
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
              required
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
              <option value="xxxl">XXXL</option>
            </select>
          </div>

          {/* Submit */}
          <div className="col-12 text-center">
            <button className="btn btn-info px-4" type="submit">
              Create Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
