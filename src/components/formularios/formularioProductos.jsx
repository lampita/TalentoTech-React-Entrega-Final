export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio }) {
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "24rem",
    margin: "3rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    gap: "16px",
  };
  return (
    <form style={formStyle} onSubmit={manejarEnvio}>
      {" "}
      <h3>Agregar Nuevo Producto</h3>{" "}
      <div>
        {" "}
        <label>Id: </label>{" "}
        <input
          type="text"
          placeholder=""
          name="id"
          value={datosForm.id}
          onChange={manejarCambio}
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <label>Titulo: </label>{" "}
        <input
          type="text"
          placeholder="GTA Saga"
          name="title"
          value={datosForm.title}
          onChange={manejarCambio}
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <label>Caratula: </label>{" "}
        <input
          type="text"
          placeholder="Subir Imagen"
          name="image"
          value={datosForm.image}
          onChange={manejarCambio}
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <label>Descripcion: </label>{" "}
        <input
          type="text"
          placeholder="Subir descripcion original del juego"
          name="descripcion"
          value={datosForm.descripcion}
          onChange={manejarCambio}
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <label>Stars: </label>{" "}
        <input
          type="number"
          placeholder="Estrellas hasta 5"
          name="stars"
          value={datosForm.stars}
          onChange={manejarCambio}
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <label>Status:</label>{" "}
        <input
          type="text"
          placeholder="Seleccionar"
          name="status"
          value={datosForm.status}
          onChange={manejarCambio}
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <label>Stock: </label>{" "}
        <input
          type="number"
          placeholder="Cantidad disponible"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <label>Categoria: </label>{" "}
        <input
          type="text"
          placeholder=""
          name="categoria"
          value={datosForm.categoria}
          onChange={manejarCambio}
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <label>Precio $:</label>{" "}
        <input
          type="number"
          placeholder=""
          name="price"
          value={datosForm.price}
          onChange={manejarCambio}
        />{" "}
      </div>{" "}
      <button type="submit">Guardar Producto</button>{" "}
    </form>
  );
}
