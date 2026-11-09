
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  RefreshCw,
  Pencil,
  X
} from "lucide-react";

import api from "../services/api";
import "../styles/AdminProperties.css";

const initialForm = {
  title: "",
  description: "",
  price: "",
  type: "piso",
  operation: "venta",
  location: "",
  bedrooms: 2,
  bathrooms: 1,
  area: "",
  status: "disponible"
};

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadProperties = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/properties");
      setProperties(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "No se pudieron cargar las viviendas."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await api.post("/properties", {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area)
      });

      resetForm();
      setMessage("Vivienda creada correctamente.");
      await loadProperties();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "No se pudo crear la vivienda."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (property) => {
    setForm({
      title: property.title || "",
      description: property.description || "",
      price: property.price ?? "",
      type: property.type || "piso",
      operation: property.operation || "venta",
      location: property.location || "",
      bedrooms: property.bedrooms ?? 0,
      bathrooms: property.bathrooms ?? 0,
      area: property.area ?? "",
      status: property.status || "disponible"
    });

    setEditingId(property._id);
    setShowForm(true);
    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await api.put(`/properties/${editingId}`, {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area)
      });

      resetForm();
      setMessage("Vivienda actualizada correctamente.");
      await loadProperties();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "No se pudo actualizar la vivienda."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar esta vivienda?"
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await api.delete(`/properties/${id}`);

      if (editingId === id) {
        resetForm();
      }

      setMessage("Vivienda eliminada correctamente.");
      await loadProperties();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "No se pudo eliminar la vivienda."
      );
    }
  };

  return (
    <main className="admin-properties">
      <header className="admin-properties-header">
        <Link to="/admin">
          <ArrowLeft size={18} />
          Volver al panel
        </Link>

        <h1>Gestión de propiedades</h1>
        <p>Administra las viviendas de CASALIA.</p>
      </header>

      <section className="admin-properties-content">
        <div className="admin-properties-actions">
          <button
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setForm(initialForm);
                setEditingId(null);
                setShowForm(true);
              }
            }}
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Cerrar formulario" : "Nueva vivienda"}
          </button>

          <button
            className="refresh-properties"
            onClick={loadProperties}
            disabled={loading}
          >
            <RefreshCw size={17} />
            Actualizar
          </button>
        </div>

        {error && <p className="admin-error">{error}</p>}
        {message && <p className="admin-success">{message}</p>}

        {showForm && (
          <form
            className="property-admin-form"
            onSubmit={editingId ? handleUpdate : handleCreate}
          >
            <h2>
              {editingId ? "Editar vivienda" : "Crear vivienda"}
            </h2>

            <label htmlFor="title">Título</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />

            <label htmlFor="price">Precio (€)</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
            />

            <label htmlFor="type">Tipo</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="piso">Piso</option>
              <option value="casa">Casa</option>
              <option value="chalet">Chalet</option>
              <option value="atico">Ático</option>
              <option value="local">Local</option>
            </select>

            <label htmlFor="operation">Operación</label>
            <select
              id="operation"
              name="operation"
              value={form.operation}
              onChange={handleChange}
            >
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
            </select>

            <label htmlFor="location">Ubicación</label>
            <input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />

            <label htmlFor="bedrooms">Habitaciones</label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              min="0"
              value={form.bedrooms}
              onChange={handleChange}
            />

            <label htmlFor="bathrooms">Baños</label>
            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              min="0"
              value={form.bathrooms}
              onChange={handleChange}
            />

            <label htmlFor="area">Superficie (m²)</label>
            <input
              id="area"
              name="area"
              type="number"
              min="1"
              value={form.area}
              onChange={handleChange}
              required
            />

            <label htmlFor="status">Estado</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="disponible">Disponible</option>
              <option value="reservada">Reservada</option>
              <option value="vendida">Vendida</option>
              <option value="alquilada">Alquilada</option>
            </select>

            <button type="submit" disabled={saving}>
              {saving
                ? "Guardando..."
                : editingId
                  ? "Guardar cambios"
                  : "Crear vivienda"}
            </button>

            {editingId && (
              <button
                type="button"
                className="refresh-properties"
                onClick={resetForm}
              >
                Cancelar edición
              </button>
            )}
          </form>
        )}

        {loading ? (
          <p>Cargando viviendas...</p>
        ) : (
          <div className="property-admin-list">
            <h2>Viviendas registradas ({properties.length})</h2>

            {properties.length === 0 ? (
              <p>No hay viviendas registradas.</p>
            ) : (
              properties.map((property) => (
                <article
                  className="property-admin-item"
                  key={property._id}
                >
                  <div>
                    <strong>{property.title}</strong>

                    <p>
                      {property.location} · {property.operation}
                    </p>

                    <span>
                      {Number(property.price).toLocaleString("es-ES")} €
                    </span>

                    <p>
                      Estado: {property.status || "disponible"}
                    </p>
                  </div>

                  <div className="property-admin-buttons">
                    <button
                      className="edit-property"
                      onClick={() => handleEdit(property)}
                      aria-label={`Editar ${property.title}`}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="delete-property"
                      onClick={() => handleDelete(property._id)}
                      aria-label={`Eliminar ${property.title}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
}
