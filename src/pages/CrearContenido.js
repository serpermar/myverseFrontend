import React, { useState } from 'react';
import api from '../services/api';

export default function CrearContenido() {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('pelicula');
  const [año, setAño] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await api.post('/contenidos/crear', { titulo, tipo, año }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Contenido creado');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Contenido</h2>
      <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="pelicula">Película</option>
        <option value="serie">Serie</option>
        <option value="juego">Juego</option>
        <option value="manga">Manga</option>
        <option value="libro">Libro</option>
        <option value="comic">Cómic</option>
      </select>
      <input placeholder="Año" type="number" value={año} onChange={e => setAño(e.target.value)} />
      <button type="submit">Guardar</button>
    </form>
  );
}
