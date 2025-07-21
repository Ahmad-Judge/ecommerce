import { useState } from "react";
import axios from "axios";

const CategoryForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/categories`, {
        title,
        description,
      });
      setMessage("✅ Category created successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      setMessage("❌ Error creating category.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Create New Category</h4>
      {message && <div className="alert alert-info">{message}</div>}

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-info w-100 w-md-auto">
              Create Record
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
