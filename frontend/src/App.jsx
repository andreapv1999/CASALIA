
import { useState } from "react";
import { Search, MapPin, Home, ArrowRight } from "lucide-react";

import Navbar from "./components/Navbar";
import PropertyCard from "./components/PropertyCard";
import useFavorites from "./hooks/useFavorites";
import useProperties from "./hooks/useProperties";
import "./App.css";

function App() {
  const { properties, loading, error } = useProperties();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const [operation, setOperation] = useState("venta");
  const [location, setLocation] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredProperties = properties.filter((property) => {
    const matchesOperation = property.operation === operation;

    const matchesLocation = (property.location || "")
      .toLowerCase()
      .includes(location.toLowerCase());

    return (
      matchesOperation &&
      matchesLocation &&
      property.status === "disponible"
    );
  });

  const closeDetails = () => setSelectedProperty(null);

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(price);

  return (
    <div className="app">
      <Navbar />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-overlay"></div>

          <div className="container hero-content">
            <span className="eyebrow">
              TU NUEVO HOGAR COMIENZA AQUÍ
            </span>

            <h1>
              Encuentra el lugar
              <br />
              donde <em>perteneces.</em>
            </h1>

            <p>
              Descubre viviendas únicas y encuentra el hogar
              que siempre has imaginado.
            </p>

            <div className="search-box">
              <div className="operation-tabs">
                <button
                  type="button"
                  className={operation === "venta" ? "active" : ""}
                  onClick={() => setOperation("venta")}
                >
                  Comprar
                </button>

                <button
                  type="button"
                  className={operation === "alquiler" ? "active" : ""}
                  onClick={() => setOperation("alquiler")}
                >
                  Alquilar
                </button>
              </div>

              <div className="search-fields">
                <div className="location-field">
                  <MapPin size={20} />

                  <input
                    type="text"
                    placeholder="Ciudad, barrio o localidad"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    aria-label="Buscar por ubicación"
                  />
                </div>

                <button
                  type="button"
                  className="search-button"
                  onClick={() =>
                    document
                      .getElementById("propiedades")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Search size={19} />
                  Buscar vivienda
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="properties-section" id="propiedades">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow dark">SELECCIÓN CASALIA</span>

                <h2 className="section-title">
                  Viviendas destacadas
                </h2>

                <p>
                  Espacios especiales para comenzar nuevas historias.
                </p>
              </div>

              <span className="property-count">
                {filteredProperties.length} propiedades
              </span>
            </div>

            <p className="favorites-counter">
              <strong>{favorites.length}</strong> viviendas guardadas en favoritos
            </p>

            {loading && (
              <p className="empty-message">Cargando viviendas...</p>
            )}

            {error && (
              <p className="empty-message" role="alert">{error}</p>
            )}

            {!loading && !error && (
              <div className="property-grid">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      isFavorite={isFavorite(property._id)}
                      onToggleFavorite={toggleFavorite}
                      onViewDetails={setSelectedProperty}
                    />
                  ))
                ) : (
                  <p className="empty-message">
                    No hay viviendas disponibles con esos criterios.
                    Prueba otra ubicación u operación.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="about-section" id="nosotros">
          <div className="container about-content">
            <span className="eyebrow">
              MÁS QUE UNA INMOBILIARIA
            </span>

            <h2>
              Encontrar un hogar es encontrar tu lugar.
            </h2>

            <p>
              En CASALIA te acompañamos en cada paso para que
              encontrar tu próxima vivienda sea una experiencia
              sencilla, cercana y especial.
            </p>

            <a href="#contacto" className="about-button">
              Conócenos <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="container contact-content">
            <div>
              <span className="eyebrow dark">
                ESTAMOS AQUÍ PARA AYUDARTE
              </span>

              <h2 className="section-title">
                ¿Buscas tu próximo hogar?
              </h2>

              <p>
                Hablemos y encontraremos la vivienda ideal para ti.
              </p>
            </div>

            <a
              href="mailto:info@casalia.es"
              className="contact-button"
            >
              Contactar con CASALIA
            </a>
          </div>
        </section>
      </main>

      {selectedProperty && (
        <div
          className="property-modal-overlay"
          onClick={closeDetails}
        >
          <section
            className="property-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="property-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={closeDetails}
              aria-label="Cerrar detalles"
            >
              ×
            </button>

            <h2 id="property-modal-title">
              {selectedProperty.title}
            </h2>

            <p>{selectedProperty.description}</p>

            <p>
              <strong>Ubicación:</strong> {selectedProperty.location}
            </p>

            <p>
              <strong>Precio:</strong> {formatPrice(selectedProperty.price)}
            </p>

            <p>
              <strong>Superficie:</strong> {selectedProperty.area} m²
            </p>

            <p>
              <strong>Habitaciones:</strong> {selectedProperty.bedrooms}
            </p>

            <p>
              <strong>Baños:</strong> {selectedProperty.bathrooms}
            </p>

            <button
              type="button"
              className="search-button"
              onClick={closeDetails}
            >
              Cerrar
            </button>
          </section>
        </div>
      )}

      <footer className="footer">
        <div className="container footer-content">
          <a href="#inicio" className="brand footer-brand">
            <Home size={24} />
            <span>CASALIA</span>
          </a>

          <p>
            © {new Date().getFullYear()} CASALIA. Proyecto inmobiliario.
          </p>

          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
