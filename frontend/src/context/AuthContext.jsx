import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ get saved user from localStorage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      const userData = { username };

      setUser(userData);

      // ✅ save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);

    // ✅ remove from localStorage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};