import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./dashboard";
import Products from "./Products";
import Categories from "./Categories";
import Orders from "./Orders";
import './admin.css';
import EditProduct from "./productEditForm";
import ProductForm from "./productform";
import CategoryForm from "./categoryform";
import CategoryEditForm from "./categoryEditForm";

const AdminPanel = () => {
  return (
    <div className="admin-panel" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productform" element={<ProductForm />} />
          <Route path="/productEditForm/:id" element={<EditProduct />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categoryForm" element={<CategoryForm />} />
          <Route path="/categoryEditForm/:id" element={<CategoryEditForm />} />
          <Route path="/adminOrders" element={<Orders />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
