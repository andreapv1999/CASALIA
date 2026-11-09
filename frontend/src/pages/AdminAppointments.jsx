
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/AdminAppointments.css";

export default function AdminAppointments() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [properties, setProperties] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    property: "",
    client: "",
    date: "",
    status: "pendiente",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      const [appointmentsRes, propertiesRes, clientsRes] =
        await Promise.all([
          api.get("/appointments"),
          api.get("/properties"),
          api.get("/clients"),
        ]);

      setAppointments(appointmentsRes.data.data || []);
      setProperties(propertiesRes.data.data || []);
      setClients(clientsRes.data.data || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al cargar las citas."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/appointments", {
        property: form.property,
        client: form.client,
        agent: user.id,
        date: new Date(form.date).toISOString(),
        status: form.status,
      });

      setMessage("¡Visita creada correctamente!");
      setForm({
        property: "",
        client: "",
        date: "",
        status: "pendiente",
      });

      await loadData();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "No se pudo crear la visita."
      );
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      setMessage("Estado de la visita actualizado.");
      await loadData();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "No se pudo actualizar la visita."
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta visita?")) return;

    try {
      await api.delete(`/appointments/${id}`);
      setMessage("Visita eliminada correctamente.");
      await loadData();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "No se pudo eliminar la visita."
      );
    }
  };

  return (
    <main className="admin-appointments-page">
      <div className="admin-appointments-container">
        <Link to="/admin" className="appointments-back">
          ← Volver al panel
        </Link>

        <header className="appointments-header">
          <div>
            <span className="appointments-eyebrow">CASALIA ADMIN</span>
            <h1>Gestión de visitas</h1>
            <p>Organiza y administra las visitas a las propiedades.</p>
          </div>
          <span className="appointments-count">
            {appointments.length} visitas
          </span>
        </header>

        {message && <div className="appointments-message">{message}</div>}

        <section className="appointment-form-section">
          <h2>Programar una visita</h2>

          <form onSubmit={handleSubmit} className="appointment-form">
            <label>
              Propiedad
              <select
                name="property"
                value={form.property}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una propiedad</option>
                {properties.map((property) => (
                  <option key={property._id} value={property._id}>
                    {property.title} — {property.location}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Cliente
              <select
                name="client"
                value={form.client}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un cliente</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Fecha y hora
              <input
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Estado
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="realizada">Realizada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={!properties.length || !clients.length}
            >
              Crear visita
            </button>
          </form>

          {!clients.length && (
            <p className="appointments-hint">
              Primero tienes que registrar un cliente para poder programar
              una visita.
            </p>
          )}
        </section>

        <section className="appointments-list-section">
          <h2>Visitas programadas</h2>

          {loading ? (
            <p>Cargando visitas...</p>
          ) : appointments.length === 0 ? (
            <div className="appointments-empty">
              <h3>No hay visitas todavía</h3>
              <p>Cuando programes una visita aparecerá aquí.</p>
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <article
                  className="appointment-card"
                  key={appointment._id}
                >
                  <div className="appointment-card-info">
                    <h3>
                      {appointment.property?.title || "Propiedad"}
                    </h3>
                    <p>
                      <strong>Cliente:</strong>{" "}
                      {appointment.client?.name || "Sin cliente"}
                    </p>
                    <p>
                      <strong>Agente:</strong>{" "}
                      {appointment.agent?.name || "Sin agente"}
                    </p>
                    <p>
                      <strong>Fecha:</strong>{" "}
                      {new Date(appointment.date).toLocaleString("es-ES")}
                    </p>
                    <p>
                      <strong>Ubicación:</strong>{" "}
                      {appointment.property?.location || "No disponible"}
                    </p>
                  </div>

                  <div className="appointment-card-actions">
                    <label>
                      Estado
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusChange(
                            appointment._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmada">Confirmada</option>
                        <option value="realizada">Realizada</option>
                        <option value="cancelada">Cancelada</option>
                      </select>
                    </label>

                    <button
                      className="appointment-delete"
                      onClick={() => handleDelete(appointment._id)}
                    >
                      Eliminar visita
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
