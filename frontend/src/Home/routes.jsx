import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import FloatingCartButton from "../partials/carticon";
import Homepage from "./homepage";
import Products from "./products";
import Cart from "../cart/cart";
import Checkout from "../cart/checkout";
import ConfirmOrder from "../cart/confirm";
import Signlog from "./signlog";
import AdminPanel from "../admin/AdminPanel";
import { useCart } from "../cart/cartcontext";

const AppRoutes = () => {
  const { cartCount } = useCart();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route path="/login" element={<Signlog />} />
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
      <FloatingCartButton cartCount={cartCount} />
    </Router>
  );
};

export default AppRoutes;