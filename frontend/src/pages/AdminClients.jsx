
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, RefreshCw, X } from "lucide-react";
import api from "../services/api";
import "../styles/AdminClients.css";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  interest: "compra",
  budget: 0
};

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadClients = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/clients");
      setClients(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "No se pudieron cargar los clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError("");
    setMessage("");
  };

  const openEditForm = (client) => {
    setEditingId(client._id);
    setForm({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      interest: client.interest || "compra",
      budget: client.budget ?? 0
    });
    setShowForm(true);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const clientData = {
        ...form,
        budget: Number(form.budget)
      };

      if (editingId) {
        await api.put(`/clients/${editingId}`, clientData);
        setMessage("Cliente actualizado correctamente.");
      } else {
        await api.post("/clients", clientData);
        setMessage("Cliente creado correctamente.");
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadClients();
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo guardar el cliente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este cliente?")) return;

    setError("");
    setMessage("");

    try {
      await api.delete(`/clients/${id}`);
      setMessage("Cliente eliminado correctamente.");
      await loadClients();
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo eliminar el cliente.");
    }
  };

  return (
    <main className="admin-clients-page">
      <header className="admin-clients-header">
        <Link to="/admin" className="clients-back">
          <ArrowLeft size={18} /> Volver al panel
        </Link>
        <h1>Gestión de clientes</h1>
        <p>Administra los clientes registrados en CASALIA.</p>
      </header>

      <section className="admin-clients-content">
        <div className="clients-actions">
          <button className="clients-primary-button" onClick={openCreateForm}>
            <Plus size={18} /> Nuevo cliente
          </button>

          <button className="clients-refresh-button" onClick={loadClients} disabled={loading}>
            <RefreshCw size={17} /> Actualizar
          </button>
        </div>

        {error && <p className="clients-error">{error}</p>}
        {message && <p className="clients-success">{message}</p>}

        {showForm && (
          <form className="clients-form" onSubmit={handleSubmit}>
            <div className="clients-form-heading">
              <h2>{editingId ? "Editar cliente" : "Registrar cliente"}</h2>
              <button type="button" onClick={() => setShowForm(false)} aria-label="Cerrar formulario">
                <X size={20} />
              </button>
            </div>

            <label htmlFor="client-name">Nombre completo</label>
            <input id="client-name" name="name" value={form.name} onChange={handleChange} required />

            <label htmlFor="client-email">Correo electrónico</label>
            <input id="client-email" name="email" type="email" value={form.email} onChange={handleChange} required />

            <label htmlFor="client-phone">Teléfono</label>
            <input id="client-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />

            <label htmlFor="client-interest">Interés</label>
            <select id="client-interest" name="interest" value={form.interest} onChange={handleChange} required>
              <option value="compra">Compra</option>
              <option value="alquiler">Alquiler</option>
            </select>

            <label htmlFor="client-budget">Presupuesto (€)</label>
            <input id="client-budget" name="budget" type="number" min="0" value={form.budget} onChange={handleChange} />

            <div className="clients-form-buttons">
              <button type="submit" disabled={saving}>
                {saving ? "Guardando..." : editingId ? "Guardar cambios" : "Crear cliente"}
              </button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="clients-list">
          <h2>Clientes registrados ({clients.length})</h2>

          {loading ? (
            <p>Cargando clientes...</p>
          ) : clients.length === 0 ? (
            <p className="clients-empty">Todavía no hay clientes registrados.</p>
          ) : (
            clients.map((client) => (
              <article className="client-item" key={client._id}>
                <div className="client-information">
                  <strong>{client.name}</strong>
                  <p>{client.email}</p>
                  <p>{client.phone}</p>
                  <span>
                    {client.interest === "compra" ? "Compra" : "Alquiler"}
                    {" · "}
                    {Number(client.budget || 0).toLocaleString("es-ES")} €
                  </span>
                </div>

                <div className="client-item-actions">
                  <button
                    className="client-edit-button"
                    onClick={() => openEditForm(client)}
                    aria-label={`Editar ${client.name}`}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="client-delete-button"
                    onClick={() => handleDelete(client._id)}
                    aria-label={`Eliminar ${client.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
