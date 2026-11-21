export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio,  manejarCambioImagen }) {
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
  <h3>Agregar Nuevo Producto</h3>

  <div>
    <label htmlFor="id">Id: </label>
    <input
      id="id"
      type="text"
      name="id"
      value={datosForm.id}
      onChange={manejarCambio}
      required
    />
  </div>

  <div>
    <label htmlFor="title">Título: </label>
    <input
      id="title"
      type="text"
      placeholder="GTA Saga"
      name="title"
      value={datosForm.title}
      onChange={manejarCambio}
      required
    />
  </div>

  <div>
    <label htmlFor="image">Carátula: </label>
    <input
      id="image"
      type="file"
      accept="image/*"
      name="image"
      onChange={manejarCambioImagen}
      required
    />
  </div>

  <div>
    <label htmlFor="descripcion">Descripción: </label>
    <textarea
      id="descripcion"
      placeholder="Subir descripción original del juego"
      name="descripcion"
      rows={3}
      value={datosForm.descripcion}
      onChange={manejarCambio}
      required
    />
  </div>

  <div>
    <label htmlFor="stars">Stars: </label>
    <select
      id="stars"
      name="stars"
      value={datosForm.stars}
      onChange={manejarCambio}
      required
    >
      <option value="" disabled>
        Selecciona una puntuación
      </option>
      <option value={1}>⭐ (1)</option>
      <option value={2}>⭐⭐ (2)</option>
      <option value={3}>⭐⭐⭐ (3)</option>
      <option value={4}>⭐⭐⭐⭐ (4)</option>
      <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
    </select>
  </div>

  <div>
    <label htmlFor="status">Status (opcional): </label>
    <select
      id="status"
      name="status"
      value={datosForm.status}
      onChange={manejarCambio}
    >
      <option value="">Ninguno</option>
      <option value="masVendido">Más Vendido</option>
      <option value="preventa">Preventa</option>
      <option value="ofertas">Ofertas</option>
    </select>
  </div>

  <div>
    <label htmlFor="stock">Stock: </label>
    <input
      id="stock"
      type="number"
      min={0}
      placeholder="Cantidad disponible"
      name="stock"
      value={datosForm.stock}
      onChange={manejarCambio}
      required
    />
  </div>

  <div>
    <label htmlFor="categoria">Categoría: </label>
    <select
      id="categoria"
      name="categoria"
      value={datosForm.categoria}
      onChange={manejarCambio}
      required
    >
      <option value="" disabled>
        Selecciona una categoría
      </option>
      <option value="deportes">Deportes</option>
      <option value="guerra-shooter">Guerra / Shooter</option>
      <option value="suspenso-terror">Suspenso / Terror</option>
      <option value="accion-aventura">Acción / Aventura</option>
      <option value="accion">Acción</option>
      <option value="simulacion">Simulación</option>
    </select>
  </div>

  <div>
    <label htmlFor="price">Precio ($): </label>
    <input
      id="price"
      type="number"
      min={0}
      step="0.01"
      name="price"
      value={datosForm.price}
      onChange={manejarCambio}
      required
    />
  </div>

  <button type="submit">Guardar Producto</button>
</form>



  );
}
