import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ItemListContainer } from "./components/item-list-container/ItemListContainer";
import { Inicio } from "./pages/Inicio";
import { DetalleProducto } from "./pages/DetalleProducto";
import { CarritoPage } from "./pages/CarritoPage";
import { Tooltip } from "react-tooltip";

import GestionCupones from "./components/gestion-cupones/GestionCupones";
import Gestion from "./components/gestion-stock/Gestion";
import Registro from "./components/registro/Registro";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import Login from "./components/login/Login";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/productos"
            element={<ItemListContainer Mensaje="Productos" />}
          />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<CarritoPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          <Route
            path="/gestion"
            element={
              <ProtectedRoute rolesPermitidos={["admin", "boss"]}>
                <Gestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cupones"
            element={
              <ProtectedRoute rolesPermitidos={["boss"]}>
                <GestionCupones />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Tooltip
        id="estrella-tooltip"
        place="top-start"
        style={{
          backgroundColor: "#121926",
          color: "#ffffff",
          border: "1px solid #0072ce",
          borderRadius: "8px",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: "0.85rem",
          boxShadow: "0 4px 15px rgba(0, 114, 206, 0.3)",
          zIndex: 999,
        }}
      />
    </>
  );
}

export default App;
