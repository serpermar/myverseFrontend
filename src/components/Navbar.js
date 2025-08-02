import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-xl font-bold">MyVerse</Link>
        <div className="flex space-x-4 items-center">
          <Link to="/home" className="hover:text-gray-400 transition-colors">Inicio</Link>
          <Link to="/mis-contenidos" className="hover:text-gray-400 transition-colors">Mi Lista</Link>
          <Link to="/contenidos" className="hover:text-gray-400 transition-colors">Explorar</Link>
          <Link to="/crear-contenido" className="hover:text-gray-400 transition-colors">Crear Contenido</Link>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}