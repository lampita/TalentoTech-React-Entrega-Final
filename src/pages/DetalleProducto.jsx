import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firestore/config";
import { IconoEstrellaRellena } from "../components/Icons/IconoEstrellaRellena"; 
import { Spinner } from "../components/Spinner/Spinner";
import styles from "./DetalleProducto.module.css";

export const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const obtenerProductoDetalle = async () => {
    setCargando(true);
    setError(null);

    try {
      const productoId = doc(db, "productos", id);
      const query = await getDoc(productoId);

      if (!query.exists()) {
        throw new Error("El juego solicitado no existe en nuestro catálogo");
      }
      setProducto({
        ...query.data(),
        id: query.id,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  if (id) {
    obtenerProductoDetalle();
  }
}, [id]);

  if (cargando) return <Spinner />;
  if (error) return <p className={styles.errorText}>Error: {error}</p>;

  const totalEstrellas = Array(producto.stars || 0).fill(0);

  return (
    <div className={styles.detalleContainer}>
      <div className={styles.productPreview}>
        <div className={styles.imageWrapper}>
          <img
            src={producto.image}
            alt={producto.title}
            className={styles.gameImage}
          />
        </div>

        <h3 className={styles.gameTitle}>{producto.title}</h3>

        <div className={styles.starsContainer}>
          {totalEstrellas.map((_, index) => (
            <IconoEstrellaRellena key={index} className={styles.starIcon} />
          ))}
          <span className={styles.starsLabel}>({producto.stars} / 5)</span>
        </div>


        <p className={styles.gameDescription}>{producto.descripcion}</p>
      </div>

      <button
        className={styles.goBackBtn}
        onClick={() => navigate("/productos")}
      >
        Volver al Catálogo
      </button>
    </div>
  );
};