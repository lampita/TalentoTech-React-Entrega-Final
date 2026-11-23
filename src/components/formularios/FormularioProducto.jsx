import styles from "./FormularioProducto.module.css";

export function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  modoEdicion,
  cancelarEdicion,
}) {
  return (
    <form className={styles.formulario} onSubmit={manejarEnvio}>
      <h3 className={styles.tituloForm}>
        {modoEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}
      </h3>

      <div className={styles.filaDoble}>
        <div className={styles.campo}>
          <label htmlFor="id">ID</label>
          <input
            id="id"
            type="text"
            name="id"
            value={datosForm.id}
            onChange={manejarCambio}
            disabled={modoEdicion}
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="stars">Puntuación</label>
          <select
            id="stars"
            name="stars"
            value={datosForm.stars}
            onChange={manejarCambio}
            required
          >
            <option value="" disabled>
              Elegir
            </option>
            <option value={1}>⭐ (1)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          </select>
        </div>
      </div>

      <div className={styles.campo}>
        <label htmlFor="title">Título del Juego</label>
        <input
          id="title"
          type="text"
          placeholder="Ej: EA SPORTS FC 24 PS4"
          name="title"
          value={datosForm.title}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="image">
          {modoEdicion ? "Cambiar carátula (opcional)" : "Carátula"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          name="image"
          onChange={manejarCambioImagen}
          required={!modoEdicion}
        />
        {modoEdicion && datosForm.image && (
          <div className={styles.previewContainer}>
            <img
              src={datosForm.image}
              alt={datosForm.title}
              className={styles.previewImg}
            />
            <span className={styles.previewTexto}>Carátula actual cargada</span>
          </div>
        )}
      </div>

      <div className={styles.campo}>
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          placeholder="Descripción original del juego..."
          name="descripcion"
          rows={3}
          value={datosForm.descripcion}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.filaDoble}>
        <div className={styles.campo}>
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={datosForm.categoria}
            onChange={manejarCambio}
            required
          >
            <option value="" disabled>
              Seleccionar
            </option>
            <option value="deportes">Deportes</option>
            <option value="guerra-shooter">Guerra / Shooter</option>
            <option value="suspenso-terror">Suspenso / Terror</option>
            <option value="accion-aventura">Acción / Aventura</option>
            <option value="accion">Acción</option>
            <option value="simulacion">Simulación</option>
          </select>
        </div>

        <div className={styles.campo}>
          <label htmlFor="status">Status (opcional)</label>
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
      </div>

      <div className={styles.filaDoble}>
        <div className={styles.campo}>
          <label htmlFor="price">Precio ($)</label>
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

        <div className={styles.campo}>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            min={0}
            placeholder="0"
            name="stock"
            value={datosForm.stock}
            onChange={manejarCambio}
            required
          />
        </div>
      </div>

      <div className={styles.grupoBotones}>
        <button type="submit" className={styles.btnSubmit}>
          {modoEdicion ? "Actualizar Producto" : "Guardar Producto"}
        </button>

        {modoEdicion && (
          <button
            type="button"
            onClick={cancelarEdicion}
            className={styles.btnCancelar}
          >
            Cancelar Edición
          </button>
        )}
      </div>
    </form>
  );
}

