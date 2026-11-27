import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firestore/config";
import { IconoEstrellaRellena } from "../components/icons/IconoEstrellaRellena";
import { IconoEstrellaVacia } from "../components/icons/IconoEstrellaVacia";
import { Spinner } from "../components/spinner/Spinner";

import { useCart } from "../context/CartContext";

import styles from "./DetalleProducto.module.css";
export const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart, favoritos, toggleFavorito } = useCart();

  const [isAdding, setIsAdding] = useState(false);
  const isFavorite = favoritos.includes(id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(producto);

    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  useEffect(() => {
    const obtenerProductoDetalle = async () => {
      setCargando(true);
      setError(null);

      try {
        const productoRef = doc(db, "productos", id);
        const snapshot = await getDoc(productoRef);

        if (!snapshot.exists()) {
          throw new Error("El juego solicitado no existe en nuestro catálogo");
        }
        setProducto({
          ...snapshot.data(),
          id: snapshot.id,
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
      <div className={styles.titleContainer}>
        <button
          className={styles.goBackBtn}
          onClick={() => navigate("/productos")}
        >
          Volver
        </button>

        <span className={styles.subtitleContainer}>
          <button
            className={`${styles.addToCartBtn} ${isAdding ? styles.btnDisabled : ""}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Agregado!" : "Agregar"}
          </button>

          <button
            className={`${styles.favoriteBtn}`}
            onClick={() => toggleFavorito(id)}
            data-tooltip-id="estrella-tooltip"
            data-tooltip-content={
              isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
            }
          >
            {isFavorite ? (
              <IconoEstrellaRellena isActive={true} />
            ) : (
              <IconoEstrellaVacia isActive={false} />
            )}
          </button>
        </span>
      </div>
    </div>
  );
};
