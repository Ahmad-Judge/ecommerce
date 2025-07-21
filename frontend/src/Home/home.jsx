import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider, useCart } from "../cart/cartcontext";
import Navbar from "./navbar";
import FloatingCartButton from "../partials/carticon";
import Homepage from "./homepage";
import AdminPanel from "../admin/AdminPanel";
import Products from "./products";
import Cart from "../cart/cart";
import Checkout from "../cart/checkout";
import ConfirmOrder from "../cart/confirm";
import Signlog from "./signlog";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function Home() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");
  const { cartCount } = useCart();

  return (
    <div style={{ backgroundColor: "black", color: "white" }}>
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
        <Route path="/confirm" element={<ProtectedRoute element={<ConfirmOrder />} />} />
        <Route path="/login" element={<Signlog />} />

        {/* ✅ Secure Admin Routes */}
        <Route path="/admin/*" element={<ProtectedRoute element={<AdminPanel />} adminOnly />} />
      </Routes>
      {!isAdminPath && <FloatingCartButton cartCount={cartCount} />}
    </div>
  );
};

export default Home;
