import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export const Header = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          PS4<span className={styles.logoAccent}>Store</span>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/productos"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Productos
              </NavLink>
            </li>

            {user ? (
              <>
                {user.rol === "admin" && (
                  <li>
                    <NavLink
                      to="/gestion"
                      className={({ isActive }) =>
                        `${styles.navLink} ${isActive ? styles.active : ""}`
                      }
                    >
                      Gestión
                    </NavLink>
                  </li>
                )}
                <li>
                  <span>¡Hola, {user.email}!</span>
                </li>
                <li>
                  <button onClick={logout}>Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <NavLink to="/carrito" className={styles.cartWidget}>
          <span className={styles.cartIcon}>🛒</span>
          <span className={styles.cartBadge}>{totalItems}</span>
        </NavLink>
      </div>
    </header>
  );
};
