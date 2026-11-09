
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Heart,
  ArrowRight,
  Home
} from "lucide-react";

function PropertyCard({ property, isFavorite, onToggleFavorite, onViewDetails }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(price);

  return (
    <article className="property-card">
      <div className="property-image">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            <Home size={45} />
            <span>CASALIA</span>
          </div>
        )}

        <span className="property-badge">
          {property.operation === "venta" ? "En venta" : "Alquiler"}
        </span>

        <button
          type="button"
          className={`favorite-button ${isFavorite ? "selected" : ""}`}
          onClick={() => onToggleFavorite(property._id)}
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          aria-pressed={isFavorite}
        >
          <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="property-info">
        <span className="property-type">{property.type}</span>

        <h3>{property.title}</h3>

        <p className="property-location">
          <MapPin size={15} />
          {property.location}
        </p>

        <div className="property-features">
          <span>
            <BedDouble size={17} />
            {property.bedrooms}
          </span>

          <span>
            <Bath size={17} />
            {property.bathrooms}
          </span>

          <span>
            <Maximize size={16} />
            {property.area} m²
          </span>
        </div>

        <div className="property-footer">
          <strong>
            {formatPrice(property.price)}
            {property.operation === "alquiler" && <small>/mes</small>}
          </strong>

          <button
            type="button"
            className="details-button"
            aria-label={`Ver detalles de ${property.title}`}
            onClick={() => onViewDetails(property)}
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
