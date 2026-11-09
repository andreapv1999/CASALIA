
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, User, Mail, Lock, ArrowRight } from "lucide-react";
import "../App.css";

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const result = await register(name, email, password);

    if (result.success) {
      setSuccess("¡Cuenta creada correctamente! Ya puedes iniciar sesión.");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-logo">
          <Home size={25} />
          <span>CASALIA</span>
        </Link>

        <p className="auth-eyebrow">EMPIEZA TU NUEVA ETAPA</p>
        <h1>Crea tu cuenta</h1>
        <p className="auth-description">
          Regístrate para descubrir viviendas y guardar tus favoritas.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="register-name">Nombre completo</label>
          <div className="auth-input">
            <User size={19} />
            <input
              id="register-name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <label htmlFor="register-email">Correo electrónico</label>
          <div className="auth-input">
            <Mail size={19} />
            <input
              id="register-email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <label htmlFor="register-password">Contraseña</label>
          <div className="auth-input">
            <Lock size={19} />
            <input
              id="register-password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
            {!loading && <ArrowRight size={19} />}
          </button>
        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  );
}
