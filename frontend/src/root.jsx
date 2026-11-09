
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminProperties from "./pages/AdminProperties";
import AdminClients from "./pages/AdminClients";
import AdminAppointments from "./pages/AdminAppointments";

import { useAuth } from "./context/AuthContext";
import "./styles/Auth.css";

function ProtectedAdmin({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Admin />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/propiedades"
          element={
            <ProtectedAdmin>
              <AdminProperties />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/clientes"
          element={
            <ProtectedAdmin>
              <AdminClients />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/citas"
          element={
            <ProtectedAdmin>
              <AdminAppointments />
            </ProtectedAdmin>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
