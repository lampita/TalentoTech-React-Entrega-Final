import { useState, useEffect } from "react";
import { db } from "../../firestore/config";
import { FormularioContainer } from "../formularios/FormularioContainer";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Gestion = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const obtenerProductos = async () => {
    const productosRef = collection(db, "productos");
    const resp = await getDocs(productosRef);
    setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    obtenerProductos();
  }, []);
  
  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este producto?"
    );
    if (confirmacion) {
      await deleteDoc(doc(db, "productos", id));
      setProductos((prev) => prev.filter((prod) => prod.id !== id));
      if (productoAEditar?.id === id) setProductoAEditar(null);
      alert("Producto eliminado.");
    }
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <hr />
      <FormularioContainer
        productoAEditar={productoAEditar}
        limpiarEdicion={() => setProductoAEditar(null)}
        recargarProductos={obtenerProductos}
      />
      <hr />
      <h3>Lista de Productos</h3>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>
            {prod.id} - {prod.title} - ${prod.price} (Stock: {prod.stock})
            <button
              onClick={() => setProductoAEditar(prod)}
              style={{ marginLeft: "10px" }}
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(prod.id)}
              style={{ marginLeft: "10px" }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gestion;
