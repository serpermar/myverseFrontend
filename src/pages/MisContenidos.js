import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function MisContenidos() {
  const [misContenidos, setMisContenidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMisContenidos = async () => {
      try {
        const response = await api.get('/contenidos/mis-contenidos');
        setMisContenidos(response.data);
      } catch (err) {
        setError('Error al cargar tu lista de contenidos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMisContenidos();
  }, []);

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Mi Lista de Contenidos</h2>
        {misContenidos.length === 0 ? (
          <p className="text-gray-600">Aún no has agregado ningún contenido a tu lista. <Link to="/contenidos" className="text-blue-500 hover:underline">¡Explora y añade!</Link></p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {misContenidos.map(contenido => (
              <div key={contenido.contenido_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/contenidos/${contenido.contenido_id}`}>
                  {contenido.imagen_url ? (
                    <img src={contenido.imagen_url} alt={contenido.titulo} className="w-full h-72 object-cover" onError={(e) => e.target.src = 'https://placehold.co/400x600/e2e8f0/6b7280?text=No+Image'} />
                  ) : (
                    <div className="w-full h-72 flex items-center justify-center bg-gray-200 text-gray-500 text-center">No Image</div>
                  )}
                </Link>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{contenido.titulo}</h3>
                  <p className="text-sm text-gray-500 capitalize">Tipo: {contenido.tipo}</p>
                  <p className="text-sm text-gray-600">Estado: <span className="font-medium text-blue-500">{contenido.estado}</span></p>
                  {contenido.puntuacion && <p className="text-sm text-gray-600">Puntuación: {contenido.puntuacion}/10</p>}
                  {contenido.reseña && <p className="text-sm text-gray-600 mt-2 italic line-clamp-3">"{contenido.reseña}"</p>}
                  <Link to={`/marcar-contenido/${contenido.contenido_id}`} className="mt-4 inline-block text-blue-500 hover:underline font-medium text-sm">Editar</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

