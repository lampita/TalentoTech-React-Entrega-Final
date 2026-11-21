import { useState, useEffect } from "react";
import { db } from "../../firestore/config";
import { FormularioContainer } from "../formularios/FormularioContainer";
import { FormularioProducto } from "../formularios/FormularioProducto";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
const Gestion = () => {
  const [productos, setProductos] = useState([]);
  const estadoInicial = {
    id: "",
    stars: 1,
    title: "",
    price: 0,
    status: "",
    stock: 0,
    categoria: "",
    descripcion: "",
  };

  useEffect(() => {
    const fetchProductos = async () => {
      const productosRef = collection(db, "productos");
      const resp = await getDocs(productosRef);
      setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchProductos();
  }, [productos]);

  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este producto?",
    );
    if (confirmacion) {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);
      setProductos(productos.filter((prod) => prod.id !== id));
      alert("Producto eliminado.");
    }
  };

  return (
    <div>
      <h2>Gestión de Productos</h2> <hr />
      <FormularioContainer datosForm={estadoInicial} /> <hr />
      <h3>Lista de Productos</h3>{" "}
      <ul>
        {" "}
        {productos.map((prod) => (
          <li key={prod.id}>
            {" "}
            {prod.id} {prod.title} - ${prod.price} {prod.stock}
            <button
              onClick={() => handleDelete(prod.id)}
              style={{ marginLeft: "10px" }}
            >
              Eliminar
            </button>
          </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
};
export default Gestion;
