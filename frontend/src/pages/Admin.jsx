
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  CalendarDays,
  Building2,
  RefreshCw,
  LogOut,
  ArrowRight
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/Admin.css";

export default function Admin() {
  const { user, logout } = useAuth();

  const [stats, setStats] = useState({
    properties: 0,
    clients: 0,
    appointments: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    setLoading(true);
    setError("");

    try {
      const [properties, clients, appointments] = await Promise.all([
        api.get("/properties"),
        api.get("/clients"),
        api.get("/appointments")
      ]);

      setStats({
        properties:
          properties.data.total ?? properties.data.data?.length ?? 0,
        clients:
          clients.data.total ?? clients.data.data?.length ?? 0,
        appointments:
          appointments.data.total ?? appointments.data.data?.length ?? 0
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "No se han podido cargar las estadísticas."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    {
      title: "Propiedades",
      value: stats.properties,
      icon: Building2,
      description: "Viviendas registradas",
      path: "/admin/propiedades"
    },
    {
      title: "Clientes",
      value: stats.clients,
      icon: Users,
      description: "Clientes registrados",
      path: "/admin/clientes"
    },
    {
      title: "Citas",
      value: stats.appointments,
      icon: CalendarDays,
      description: "Visitas programadas",
      path: "/admin/citas"
    }
  ];

  return (
    <main className="admin-page">
      <header className="admin-header">
        <Link to="/" className="admin-brand">
          <Home size={25} />
          CASALIA
        </Link>

        <div className="admin-account">
          <span>{user?.name}</span>

          <button onClick={logout} className="admin-logout">
            <LogOut size={17} />
            Salir
          </button>
        </div>
      </header>

      <section className="admin-content">
        <p className="admin-eyebrow">PANEL DE CONTROL</p>

        <h1>Administración</h1>

        <p className="admin-description">
          Bienvenido/a a la gestión interna de CASALIA.
        </p>

        <button
          className="admin-refresh"
          onClick={loadStats}
          disabled={loading}
        >
          <RefreshCw size={17} />
          Actualizar datos
        </button>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-stats">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                to={card.path}
                className="admin-stat-card admin-stat-card-link"
                key={card.title}
              >
                <div className="admin-stat-icon">
                  <Icon size={23} />
                </div>

                <p>{card.title}</p>

                <strong>{loading ? "..." : card.value}</strong>

                <span>{card.description}</span>

                <div className="admin-card-link">
                  Gestionar <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="admin-welcome">
          <h2>Gestión de CASALIA</h2>

          <p>
            Desde este panel podrás supervisar y administrar
            la actividad de la inmobiliaria.
          </p>

          <Link to="/" className="admin-home-link">
            Volver a la página principal
          </Link>
        </div>
      </section>
    </main>
  );
}
