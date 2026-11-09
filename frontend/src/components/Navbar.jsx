
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const closeMenu = () => setMobileMenu(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="header">
      <div className="container navbar">
        <a href="#inicio" className="brand" onClick={closeMenu}>
          <Home size={27} strokeWidth={1.8} />
          <span>CASALIA</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label={mobileMenu ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenu}
          aria-controls="main-navigation"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>

        <nav
          id="main-navigation"
          className={mobileMenu ? "nav-links open" : "nav-links"}
        >
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#propiedades" onClick={closeMenu}>Propiedades</a>
          <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>

          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="nav-button"
                  onClick={closeMenu}
                >
                  <LayoutDashboard size={17} />
                  Administración
                </Link>
              )}

              <span className="nav-user">
                <User size={17} />
                {user?.name}
              </span>

              <button
                type="button"
                className="nav-button"
                onClick={handleLogout}
              >
                <LogOut size={17} />
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Iniciar sesión
              </Link>

              <Link
                to="/registro"
                className="nav-button"
                onClick={closeMenu}
              >
                Crear cuenta
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
