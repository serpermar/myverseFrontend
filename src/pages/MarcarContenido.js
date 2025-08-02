import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function MarcarContenido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contenido, setContenido] = useState(null);
  const [estado, setEstado] = useState('pendiente');
  const [puntuacion, setPuntuacion] = useState('');
  const [reseña, setReseña] = useState('');
  const [recomendar, setRecomendar] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContenidoAndEstado = async () => {
      try {
        // Obtener la información del contenido
        const contenidoResponse = await api.get(`/contenidos/contenidos/${id}`);
        setContenido(contenidoResponse.data);

        // Obtener el estado del usuario para este contenido
        const estadoResponse = await api.get(`/contenidos/estado/${id}`);
        if (estadoResponse.data.estado) {
          setEstado(estadoResponse.data.estado);
          setPuntuacion(estadoResponse.data.puntuacion || '');
          setReseña(estadoResponse.data.reseña || '');
          setRecomendar(estadoResponse.data.recomendar || false);
        }
      } catch (err) {
        setMensaje('Error al cargar la información del contenido');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContenidoAndEstado();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía la solicitud al backend para marcar el contenido
      await api.post('/contenidos/marcar', {
        contenido_id: id,
        estado,
        puntuacion: puntuacion || null,
        reseña,
        recomendar
      });
      setMensaje('Estado del contenido actualizado con éxito');
      // Redirige a la lista del usuario después de un tiempo
      setTimeout(() => navigate('/mis-contenidos'), 2000);
    } catch (error) {
      setMensaje('Error al actualizar el estado');
      console.error('Error al marcar contenido:', error);
    }
  };

  if (loading) return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <p className="text-gray-600">Cargando...</p>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8 max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Marcar Contenido: {contenido?.titulo}
        </h2>
        {mensaje && <div className="p-4 rounded-md bg-green-100 text-green-700 mb-4">{mensaje}</div>}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Estado</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={estado}
              onChange={e => setEstado(e.target.value)}
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="viendo">Viendo/Leyendo/Jugando</option>
              <option value="terminado">Terminado</option>
              <option value="abandonado">Abandonado</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Puntuación (1-10)</label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              min="1"
              max="10"
              value={puntuacion}
              onChange={e => setPuntuacion(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Reseña</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reseña}
              onChange={e => setReseña(e.target.value)}
              rows="4"
              placeholder="Escribe tu reseña aquí..."
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={recomendar}
              onChange={e => setRecomendar(e.target.checked)}
            />
            <label className="ml-2 text-gray-700">Recomendar este contenido</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Guardar Estado
          </button>
        </form>
      </div>
    </div>
  );
}