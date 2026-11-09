
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, Mail, Lock, ArrowRight } from "lucide-react";
import "../App.css";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const result = await login(email, password);

    if (result.success) {
      navigate("/");
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

        <p className="auth-eyebrow">BIENVENIDO/A DE NUEVO</p>
        <h1>Inicia sesión</h1>
        <p className="auth-description">
          Accede a tu cuenta y encuentra tu próximo hogar.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="login-email">Correo electrónico</label>
          <div className="auth-input">
            <Mail size={19} />
            <input
              id="login-email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <label htmlFor="login-password">Contraseña</label>
          <div className="auth-input">
            <Lock size={19} />
            <input
              id="login-password"
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Accediendo..." : "Entrar"}
            {!loading && <ArrowRight size={19} />}
          </button>
        </form>

        <p className="auth-switch">
          ¿Todavía no tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </section>
    </main>
  );
}
