import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';  // Estilos para el menú

const Menu: React.FC = () => {
  return (
    <div className="menu-container">
      <h1>Menú Principal</h1>
      <div className="menu-buttons">
        <Link to="/empresa">
          <button className="menu-button">Empresa</button>
        </Link>
        <Link to="/sucursales">
          <button className="menu-button">Sucursales</button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
