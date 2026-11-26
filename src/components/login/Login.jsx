import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Auth.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Correo electrónico o contraseña incorrectos.");
      } else {
        setError("Ocurrió un error al iniciar sesión. Intentá nuevamente.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className={styles.contenedorAuth}>
      <div className={styles.tarjetaAuth}>
        <div className={styles.marca}>
          PS4<span className={styles.marcaAcento}>Store</span>
        </div>
        <h2 className={styles.titulo}>Iniciar Sesión</h2>

        {error && <div className={styles.alertaError}>{error}</div>}

        <form onSubmit={handleLogin} className={styles.formulario}>
          <div className={styles.campo}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className={styles.btnPrincipal}
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <div className={styles.pieEnlaces}>
          <span>
            ¿No tenés una cuenta?{" "}
            <Link to="/registro" className={styles.enlace}>
              Registrate aquí
            </Link>
          </span>
          <Link to="/" className={styles.enlaceVolver}>
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
