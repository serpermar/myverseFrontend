import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/home" className="navbar-brand">MyVerse</Link>
        <div className="navbar-links">
          <Link to="/home">Inicio</Link>
          <Link to="/mis-contenidos">Mi Lista</Link>
          <Link to="/contenidos">Explorar</Link>
          <Link to="/crear-contenido">Crear Contenido</Link>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}