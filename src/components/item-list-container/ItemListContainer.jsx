import { ItemList } from "../item-list/Itemlist";
import { Spinner } from "../spinner/Spinner";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { IconoEstrellaVacia } from "../icons/IconoEstrellaVacia";
import { IconoEstrellaRellena } from "../icons/IconoEstrellaRellena";
import styles from "./ItemListContainer.module.css";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firestore/config";

export function ItemListContainer({ Mensaje }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [categoriaSel, setCategoriaSel] = useState("");
  const [statusSel, setStatusSel] = useState("");
  const [starsSel, setStarsSel] = useState("");
  const [soloFavoritos, setSoloFavoritos] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [modoBusqueda, setModoBusqueda] = useState(false);

  const { favoritos } = useCart();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const q = query(productosRef, orderBy("title", "asc"));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          throw new Error("No se encontraron productos en la base de datos");
        }

        const listaProductos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(listaProductos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  const productosFiltrados = productos.filter((juego) => {
    if (modoBusqueda) {
      return juego.title.toLowerCase().includes(busqueda.toLowerCase());
    }

    const cumpleFavorito = !soloFavoritos || favoritos.includes(juego.id);
    const cumpleCategoria = !categoriaSel || juego.categoria === categoriaSel;
    const cumpleStatus = !statusSel || juego.status === statusSel;
    const cumpleStars = !starsSel || juego.stars >= Number(starsSel);

    return cumpleFavorito && cumpleCategoria && cumpleStatus && cumpleStars;
  });

  const desactivarBusqueda = () => {
    setModoBusqueda(false);
    setBusqueda("");
    setCategoriaSel("");
    setStatusSel("");
    setStarsSel("");
  };

  return (
    <div className={styles.container}>
      <h2>{Mensaje}</h2>

      <div className={styles.filterBar}>
        {modoBusqueda ? (
          <div className={styles.searchActiveContainer}>
            <button
              className={styles.backFilterBtn}
              onClick={desactivarBusqueda}
            >
              ← Volver a Filtros
            </button>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Escribe el nombre del juego de PS4..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                autoFocus
              />
              {busqueda && (
                <button
                  className={styles.clearSearchBtn}
                  onClick={() => setBusqueda("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <button
              className={styles.filterBtn}
              onClick={() => setModoBusqueda(true)}
            >
              🔍 Buscar por título
            </button>

            <button
              className={`${styles.filterBtn} ${styles.favFilter} ${soloFavoritos ? styles.active : ""}`}
              onClick={() => setSoloFavoritos(!soloFavoritos)}
              data-tooltip-id="tienda-tooltip"
              data-tooltip-content="Muestra solo tus juegos marcados con estrella"
            >
              {soloFavoritos ? (
                <IconoEstrellaRellena isActive={true} />
              ) : (
                <IconoEstrellaVacia isActive={false} />
              )}
              <span>Mis Favoritos</span>
            </button>

            <div className={styles.selectWrapper}>
              <select
                className={styles.filterSelect}
                value={categoriaSel}
                onChange={(e) => setCategoriaSel(e.target.value)}
              >
                <option value="">Todas las Categorías</option>
                <option value="deportes">Deportes</option>
                <option value="guerra-shooter">Guerra / Shooter</option>
                <option value="suspenso-terror">Suspenso / Terror</option>
                <option value="accion-aventura">Acción / Aventura</option>
                <option value="accion">Acción</option>
                <option value="simulacion">Simulación</option>
              </select>
            </div>

            <div className={styles.selectWrapper}>
              <select
                className={styles.filterSelect}
                value={statusSel}
                onChange={(e) => setStatusSel(e.target.value)}
              >
                <option value="">Cualquier Estado</option>
                <option value="masVendido">Más Vendidos</option>
                <option value="preventa">Preventas</option>
                <option value="ofertas">Ofertas</option>
              </select>
            </div>

            <div className={styles.selectWrapper}>
              <select
                className={styles.filterSelect}
                value={starsSel}
                onChange={(e) => setStarsSel(e.target.value)}
              >
                <option value="">Calificación</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 Estrellas</option>
                <option value="4">⭐⭐⭐⭐ 4 o más</option>
                <option value="3">⭐⭐⭐ 3 o más</option>
              </select>
            </div>
          </>
        )}
      </div>

      {productosFiltrados.length > 0 ? (
        <ItemList productos={productosFiltrados} />
      ) : (
        <p className={styles.noResults}>
          No se encontraron juegos que coincidan con la búsqueda o filtros.
        </p>
      )}
    </div>
  );
}
