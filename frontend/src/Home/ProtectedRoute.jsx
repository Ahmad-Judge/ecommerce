import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ element, adminOnly = false }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // Redirect if not logged in
  if (adminOnly && user.role !== "admin") return <Navigate to="/" />; // Admin-only restriction

  return element;
}
