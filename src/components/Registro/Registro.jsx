import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "../login/Auth.module.css";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);

    try {
      await signup(email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado.");
      } else {
        setError("No se pudo crear la cuenta. Intentá nuevamente.");
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
        <h2 className={styles.titulo}>Crear Cuenta</h2>

        {error && <div className={styles.alertaError}>{error}</div>}

        <form onSubmit={handleRegistro} className={styles.formulario}>
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
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="confirmarPassword">Confirmar contraseña</label>
            <input
              id="confirmarPassword"
              type="password"
              placeholder="Repetí tu contraseña"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className={styles.btnPrincipal}
          >
            {cargando ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <div className={styles.pieEnlaces}>
          <span>
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className={styles.enlace}>
              Iniciá sesión
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

export default Registro;