import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CrearContenido from './pages/CrearContenido';
import MisContenidos from './pages/MisContenidos';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
