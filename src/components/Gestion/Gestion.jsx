import { useState, useEffect } from "react";
import { db } from "../../firestore/config";
import { FormularioContainer } from "../Formularios/FormularioContainer";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import styles from "./Gestion.module.css";

const Gestion = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const obtenerProductos = async () => {
    const productosRef = collection(db, "productos");
    const resp = await getDocs(productosRef);
    const lista = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    lista.sort((a, b) => Number(b.id) - Number(a.id));
    setProductos(lista);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este producto?",
    );
    if (confirmacion) {
      await deleteDoc(doc(db, "productos", id));
      setProductos((prev) => prev.filter((prod) => prod.id !== id));
      if (productoAEditar?.id === id) setProductoAEditar(null);
      alert("Producto eliminado.");
    }
  };

  return (
    <section className={styles.contenedorPrincipal}>
      <header className={styles.headerTitulo}>
        <h2>Gestión de Stock</h2>
      </header>

      <div className={styles.layoutGrid}>
        <aside className={styles.columnaFormulario}>
          <FormularioContainer
            productoAEditar={productoAEditar}
            limpiarEdicion={() => setProductoAEditar(null)}
            recargarProductos={obtenerProductos}
          />
        </aside>

        <div className={styles.columnaLista}>
          {productos.map((prod) => (
            <article key={prod.id} className={styles.tarjetaHorizontal}>
              <img
                src={prod.image}
                alt={prod.title}
                className={styles.caratula}
              />

              <div className={styles.infoJuego}>
                <div className={styles.filaSuperior}>
                  <span className={styles.badgeId}>#{prod.id}</span>
                  <h4 className={styles.tituloJuego}>{prod.title}</h4>
                </div>

                <p className={styles.descripcionCorta} title={prod.descripcion}>
                  {prod.descripcion}
                </p>

                <div className={styles.metaDatos}>
                  <span className={styles.precio}>
                    ${Number(prod.price).toLocaleString("es-AR")}
                  </span>
                  <span
                    className={
                      prod.stock <= 5 ? styles.stockBajo : styles.stock
                    }
                  >
                    Stock: {prod.stock} u.
                  </span>
                </div>
              </div>

              <div className={styles.acciones}>
                <button
                  type="button"
                  onClick={() => setProductoAEditar(prod)}
                  className={styles.btnEditar}
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(prod.id)}
                  className={styles.btnEliminar}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gestion;
