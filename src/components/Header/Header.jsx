import styles from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export const Header = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          PS4<span className={styles.logoAccent}>Store</span>
        </Link>

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

            {user?.rol === "boss" && (
              <>
                {" "}
                <li>
                  <NavLink
                    to="/gestion"
                    className={({ isActive }) =>
                      `${styles.navLink} ${styles.adminLink} ${
                        isActive ? styles.active : ""
                      }`
                    }
                  >
                    Stock
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cupones"
                    className={({ isActive }) =>
                      `${styles.navLink} ${styles.adminLink} ${
                        isActive ? styles.active : ""
                      }`
                    }
                  >
                    Cupones
                  </NavLink>
                </li>
              </>
            )}
            {user?.rol === "admin" && (
              <>
                {" "}
                <li>
                  <NavLink
                    to="/gestion"
                    className={({ isActive }) =>
                      `${styles.navLink} ${styles.adminLink} ${
                        isActive ? styles.active : ""
                      }`
                    }
                  >
                    Stock
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className={styles.accionesDerecha}>
          {user ? (
            <div className={styles.userBadge}>
              <span className={styles.userEmail} title={user.email}>
                👤 {user.email.split("@")[0]}
              </span>
              <button
                type="button"
                onClick={logout}
                className={styles.btnLogout}
              >
                Salir
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={styles.btnLogin}>
              Login
            </NavLink>
          )}

          <NavLink to="/carrito" className={styles.cartWidget}>
            <span className={styles.cartIcon}>🛒</span>
            <span className={styles.cartBadge}>{totalItems}</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
