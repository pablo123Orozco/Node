import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './menu';
import Empresa from './componentes/empresa';  // El componente que ya tienes para manejar empresas
import SucursalComponent from './componentes/sucursales';  // Importa el componente de sucursales

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/sucursales" element={<SucursalComponent />} /> {/* Ruta para sucursales */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
