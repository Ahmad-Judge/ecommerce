import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCategory = () => {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    title: "",
    description: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch category details when component loads
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories/${id}`);
        setCategory(res.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, [id, API_URL]);

  // Handle input change
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/categories/${id}`, category);
      navigate("/admin/categories"); // Redirect after update
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Edit Category</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Title */}
          <div className="col-12 col-md-6">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              value={category.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows={3}
              value={category.description}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-info w-100 w-md-auto">
              Update Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
