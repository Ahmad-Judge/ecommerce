import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [API_URL]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${API_URL}/api/categories/${id}`);
        setCategories(prev => prev.filter(category => category._id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h1 className="mb-3">Categories</h1>
        <Link to="/admin/categoryForm" className="btn btn-primary mb-3">
          Add Category
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category._id}>
                <td>{category.title}</td>
                <td>{category.description}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <Link
                      to={`/admin/categoryEditForm/${category._id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
