import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <- Importado aquí
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Gestion from './components/Gestion/Gestion.jsx'

import { FormularioContainer } from './components/formularios/FormularioContainer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <FormularioContainer />
        <Gestion />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)