import { FormularioProducto } from "./FormularioProducto";
import { useState } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const apiKey = import.meta.env.VITE_API_KEY_IMGBB;

const estadoInicial = {
  id: "",
  stars: "",
  title: "",
  price: "",
  status: "",
  stock: "",
  categoria: "",
  descripcion: "",
};

export function FormularioContainer() {
  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [imagenFile, setImagenFile] = useState(null);

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

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    
    const idLimpio = String(datosForm.id).trim();

    if (!idLimpio) {
      alert("Por favor, ingresá un ID válido para el producto.");
      return;
    }

    if (!imagenFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }

    try {
      const db = getFirestore();
      const productoRef = doc(db, "productos", idLimpio);

    
      const docSnap = await getDoc(productoRef);
      if (docSnap.exists()) {
        alert(
          `El ID "${idLimpio}" ya está en uso. Elegí otro para no sobrescribir el producto.`,
        );
        return;
      }

    
      console.log("Subiendo imagen a Imgbb...");
      const formData = new FormData();
      formData.append("image", imagenFile);
      const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const datosImgbb = await respuestaImgbb.json();

      if (datosImgbb.success) {
        const { id, ...restoDeDatos } = datosForm;

const productoCompleto = {
  ...datosForm,
  id: idLimpio, // Asegura que se guarde limpio (sin espacios extra)
  price: Number(datosForm.price),
  stock: Number(datosForm.stock),
  stars: Number(datosForm.stars),
  image: datosImgbb.data.url,
};

    
        await setDoc(productoRef, productoCompleto);
        alert("¡Producto agregado con éxito!");

    
        setDatosForm(estadoInicial);
        setImagenFile(null);
        evento.target.reset();
      } else {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert(
        "Hubo un error al guardar el producto. Por favor, intentá de nuevo.",
      );
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
    />
  );
}
