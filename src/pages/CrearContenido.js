import React, { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function CrearContenido() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('pelicula');
  const [año, setAño] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía la solicitud al backend para crear un nuevo contenido
      await api.post('/contenidos/crear', { titulo, tipo, año, imagen_url: imagenUrl, descripcion });
      setMensaje('Contenido creado con éxito');
      setTitulo('');
      setAño('');
      setImagenUrl('');
      setDescripcion('');
      // Redirigir a la lista de contenidos después de un tiempo
      setTimeout(() => navigate('/contenidos'), 2000);
    } catch (error) {
      setMensaje('Error al crear el contenido');
      console.error('Error al crear contenido:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8 max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Crear Contenido</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          {mensaje && <div className="p-4 rounded-md bg-green-100 text-green-700">{mensaje}</div>}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Título</label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Título"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Tipo</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
            >
              <option value="pelicula">Película</option>
              <option value="serie">Serie</option>
              <option value="juego">Juego</option>
              <option value="manga">Manga</option>
              <option value="libro">Libro</option>
              <option value="comic">Cómic</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Año</label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Año de lanzamiento"
              type="number"
              value={año}
              onChange={e => setAño(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">URL de la imagen</label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/imagen.jpg"
              type="text"
              value={imagenUrl}
              onChange={e => setImagenUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Descripción</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Breve descripción del contenido"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Guardar Contenido
          </button>
        </form>
      </div>
    </div>
  );
}
