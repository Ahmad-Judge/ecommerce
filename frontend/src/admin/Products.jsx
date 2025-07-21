import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./admin.css";

const API_BASE = import.meta.env.VITE_API_URL;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "";
  const featuredFilter = searchParams.get("isFeatured") || "";
  const sortField = searchParams.get("sortField") || "title";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products`, {
          params: {
            page,
            q: searchQuery,
            category: categoryFilter,
            isFeatured: featuredFilter,
            sortField,
            sortOrder,
          },
        });
        setProducts(res.data.products || res.data); // Adjust depending on backend response
        setTotalPages(res.data.totalPages || 1);    // Same
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [page, searchQuery, categoryFilter, featuredFilter, sortField, sortOrder]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/categories`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_BASE}/api/products/${id}`);
        setProducts((prev) => prev.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  return (
    <div className="container mt-4">
      <h3>Products</h3>

      {/* Sort Dropdown */}
      <div className="dropdown my-4">
        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          Sort Products
        </button>
        <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to={`?sortField=title&sortOrder=asc`}>Title (A-Z)</Link></li>
          <li><Link className="dropdown-item" to={`?sortField=title&sortOrder=desc`}>Title (Z-A)</Link></li>
          <li><Link className="dropdown-item" to={`?sortField=price&sortOrder=asc`}>Price (Low to High)</Link></li>
          <li><Link className="dropdown-item" to={`?sortField=price&sortOrder=desc`}>Price (High to Low)</Link></li>
        </ul>
      </div>

      {/* Filters */}
      <form className="row g-3">
        <div className="col-12 col-md-4">
          <input
            type="text"
            name="q"
            className="form-control"
            placeholder="Search by title or category..."
            value={searchQuery}
            onChange={(e) => handleFilterChange("q", e.target.value)}
          />
        </div>
        <div className="col-6 col-md-3">
          <select
            name="category"
            className="form-select"
            value={categoryFilter}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.title}</option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-2">
          <select
            name="isFeatured"
            className="form-select"
            value={featuredFilter}
            onChange={(e) => handleFilterChange("isFeatured", e.target.value)}
          >
            <option value="">All Products</option>
            <option value="true">Featured</option>
            <option value="false">Not Featured</option>
          </select>
        </div>
        <div className="col-12 col-md-3">
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={() => setSearchParams({})}
          >
            Reset Filters
          </button>
        </div>
      </form>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination">
          {page > 1 && (
            <li className="page-item">
              <Link className="page-link" to={`?page=${page - 1}`}>&laquo;</Link>
            </li>
          )}

          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
              <Link className="page-link" to={`?page=${i + 1}`}>{i + 1}</Link>
            </li>
          ))}

          {page < totalPages && (
            <li className="page-item">
              <Link className="page-link" to={`?page=${page + 1}`}>&raquo;</Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Product List */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <h4>Product List</h4>
        <Link to="/admin/productform" className="btn btn-info">Create New Product</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Size</th>
              <th>Gender</th>
              <th>Featured</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.category?.title || "No Category"}</td>
                <td>{product.description}</td>
                <td>PKR {product.price}</td>
                <td>{product.size}</td>
                <td>{product.gender}</td>
                <td>{product.isFeatured ? "Yes" : "No"}</td>
                <td>
                  <img
                    src={`${API_BASE}/uploads/${product.picture}`}
                    alt="Product"
                    width="100"
                    className="img-fluid rounded"
                  />
                </td>
                <td>
                  <Link to={`/admin/productEditForm/${product._id}`} className="btn btn-warning btn-sm me-1">Edit</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
