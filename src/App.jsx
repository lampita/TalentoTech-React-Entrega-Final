import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { Inicio } from "./pages/Inicio";
import { DetalleProducto } from "./pages/DetalleProducto";
import { CarritoPage } from "./pages/CarritoPage";

import GestionCupones from "./components/Cuponera/GestionCupones";
import Gestion from "./components/Gestion/Gestion";
import Registro from "./components/Registro/Registro";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./components/login/Login";

import "./App.css";

function App() {
  return (
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
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <Gestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cupones"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <GestionCupones />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
