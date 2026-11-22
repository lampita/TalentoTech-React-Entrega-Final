import { FormularioProducto } from "./FormularioProducto";
import { useState, useEffect } from "react";
import { db } from "../../firestore/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const apiKey = import.meta.env.VITE_API_KEY_IMGBB;

const estadoInicial = {
  id: "",
  stars: 1,
  title: "",
  price: 0,
  status: "",
  stock: 0,
  categoria: "",
  descripcion: "",
  image: "",
};

export function FormularioContainer({
  productoAEditar,
  limpiarEdicion,
  recargarProductos,
}) {
  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [imagenFile, setImagenFile] = useState(null);

  const modoEdicion = Boolean(productoAEditar);

  useEffect(() => {
    if (productoAEditar) {
      setDatosForm(productoAEditar);
    } else {
      setDatosForm(estadoInicial);
    }
    setImagenFile(null);
  }, [productoAEditar]);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: name === "stars" ? Number(value) : value,
    });
  };

  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0]);
  };

  const cancelarEdicion = () => {
    setDatosForm(estadoInicial);
    setImagenFile(null);
    limpiarEdicion();
  };

  const subirImagenImgbb = async (archivo) => {
    const formData = new FormData();
    formData.append("image", archivo);
    const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    const datos = await respuesta.json();
    if (!datos.success) throw new Error("La subida de la imagen a Imgbb falló.");
    return datos.data.url;
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    const idLimpio = String(datosForm.id).trim();

    if (!idLimpio) {
      alert("Por favor, ingresá un ID válido para el producto.");
      return;
    }

    if (!modoEdicion && !imagenFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }

    try {
      const productoRef = doc(db, "productos", idLimpio);

      if (modoEdicion) {

        let urlImagenFinal = datosForm.image;

        if (imagenFile) {
          urlImagenFinal = await subirImagenImgbb(imagenFile);
        }

        const datosActualizados = {
          ...datosForm,
          id: idLimpio,
          price: Number(datosForm.price),
          stock: Number(datosForm.stock),
          stars: Number(datosForm.stars),
          image: urlImagenFinal,
        };

        await updateDoc(productoRef, datosActualizados);
        alert("¡Producto actualizado con éxito!");
        limpiarEdicion();
      } else {

        const docSnap = await getDoc(productoRef);
        if (docSnap.exists()) {
          alert(`El ID "${idLimpio}" ya está en uso. Elegí otro.`);
          return;
        }

        const urlImagenNueva = await subirImagenImgbb(imagenFile);

        const productoCompleto = {
          ...datosForm,
          id: idLimpio,
          price: Number(datosForm.price),
          stock: Number(datosForm.stock),
          stars: Number(datosForm.stars),
          image: urlImagenNueva,
        };

        await setDoc(productoRef, productoCompleto);
        alert("¡Producto agregado con éxito!");
      }

      setDatosForm(estadoInicial);
      setImagenFile(null);
      evento.target.reset();
      recargarProductos(); 
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert("Hubo un error al guardar el producto.");
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      modoEdicion={modoEdicion}
      cancelarEdicion={cancelarEdicion}
    />
  );
}
