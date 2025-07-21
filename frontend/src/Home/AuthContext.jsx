import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    const checkSession = () => {
      const expiry = localStorage.getItem("tokenExpiry");
      if (expiry && Date.now() > expiry) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("tokenExpiry");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const login = (userData) => {
    const expiryTime = Date.now() + 30 * 60 * 1000; // 30 mins session expiry
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("tokenExpiry", expiryTime);
    setUser(userData);
  };

  // ✅ Fix: Remove `useNavigate()` from here
  const logout = (navigate) => {
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
    setUser(null);
    navigate("/login"); // ✅ Now `navigate` is passed from the calling component
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
