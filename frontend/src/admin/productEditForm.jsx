import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    size: "",
    gender: "",
    isFeatured: false,
    picture: null,
  });

  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);
        setPreviewImage(`${API_URL}/uploads/${res.data.picture}`);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id, API_URL]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, picture: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("size", product.size);
    formData.append("gender", product.gender);
    formData.append("isFeatured", product.isFeatured);

    if (product.picture instanceof File) {
      formData.append("file", product.picture);
    }

    try {
      await axios.put(`${API_URL}/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-primary">Edit Product</h3>
      <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
        
        {/* Category */}
        <div className="col-12 col-md-6">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-control"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="col-12 col-md-6">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="col-12 col-md-4">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Size */}
        <div className="col-12 col-md-4">
          <label className="form-label">Size</label>
          <select
            name="size"
            className="form-control"
            value={product.size}
            onChange={handleChange}
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

        {/* Gender */}
        <div className="col-12 col-md-4">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            className="form-control"
            value={product.gender}
            onChange={handleChange}
            required
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="children">Children</option>
          </select>
        </div>

        {/* Featured */}
        <div className="col-12">
          <div className="form-check">
            <input
              type="checkbox"
              name="isFeatured"
              className="form-check-input"
              id="isFeatured"
              checked={product.isFeatured}
              onChange={handleChange}
            />
            <label htmlFor="isFeatured" className="form-check-label">
              Featured?
            </label>
          </div>
        </div>

        {/* File Upload */}
        <div className="col-12 col-md-6">
          <label className="form-label">Product Image</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="img-fluid mt-2 rounded shadow-sm"
              width="150"
            />
          )}
        </div>

        {/* Submit */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100 w-md-auto">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
