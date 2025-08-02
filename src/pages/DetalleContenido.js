import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function DetalleContenido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contenido, setContenido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContenido = async () => {
      try {
        // Obtener los detalles de un contenido específico
        const response = await api.get(`/contenidos/contenidos/${id}`);
        setContenido(response.data);
      } catch (err) {
        setError('Error al cargar el contenido');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContenido();
  }, [id]);

  if (loading) return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <p className="text-gray-600">Cargando...</p>
    </div>
  );
  if (error) return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <p className="text-red-500">{error}</p>
    </div>
  );
  if (!contenido) return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <p className="text-gray-600">Contenido no encontrado.</p>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            {contenido.imagen_url ? (
              <img src={contenido.imagen_url} alt={contenido.titulo} className="rounded-lg object-cover w-64 h-96 shadow-md" onError={(e) => e.target.src = 'https://placehold.co/400x600/e2e8f0/6b7280?text=No+Image'} />
            ) : (
              <div className="w-64 h-96 flex items-center justify-center bg-gray-200 text-gray-500 text-center rounded-lg">No Image</div>
            )}
          </div>
          <div className="flex-grow">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{contenido.titulo}</h1>
            <p className="text-lg text-gray-600 capitalize mb-4">{contenido.tipo} ({contenido.año})</p>
            <p className="text-gray-700 mb-6">{contenido.descripcion || 'No hay descripción disponible.'}</p>
            <button
              onClick={() => navigate(`/marcar-contenido/${contenido.id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Marcar como visto/leído
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}