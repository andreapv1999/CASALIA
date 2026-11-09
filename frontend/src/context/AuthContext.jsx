
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("casalia_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("casalia_token") || null
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

      const { user: userData, token: accessToken } = response.data;

      setUser(userData);
      setToken(accessToken);

      localStorage.setItem("casalia_user", JSON.stringify(userData));
      localStorage.setItem("casalia_token", accessToken);

      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "No se ha podido iniciar sesión."
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "No se ha podido completar el registro."
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("casalia_user");
    localStorage.removeItem("casalia_token");

    delete api.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: Boolean(token && user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
}
