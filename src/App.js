import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/styles.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CrearContenido from './pages/CrearContenido';
import MisContenidos from './pages/MisContenidos';
import MarcarContenido from './pages/MarcarContenido';
import ListarContenidos from './pages/ListarContenido';
import DetalleContenido from './pages/DetalleContenido';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/crear-contenido" element={<CrearContenido />} />
        <Route path="/mis-contenidos" element={<MisContenidos />} />
        {/* Usamos un parámetro dinámico para el ID del contenido */}
        <Route path="/marcar-contenido/:id" element={<MarcarContenido />} />
        <Route path="/contenidos" element={<ListarContenidos />} />
        {/* Usamos un parámetro dinámico para el ID del contenido */}
        <Route path="/contenidos/:id" element={<DetalleContenido />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

