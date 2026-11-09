
import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function useProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/properties");

      setProperties(response.data.data || []);
    } catch (err) {
      console.error("Error al cargar viviendas:", err);

      setError(
        "No se pudieron cargar las viviendas. Comprueba la conexión con el servidor."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return {
    properties,
    loading,
    error,
    refreshProperties: fetchProperties
  };
}

export default useProperties;
