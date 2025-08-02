import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function ListarContenidos() {
  const [contenidos, setContenidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContenidos = async () => {
      try {
        // Obtener todos los contenidos de la base de datos
        const response = await api.get('/contenidos/contenidos');
        setContenidos(response.data);
      } catch (err) {
        setError('Error al cargar la lista de contenidos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContenidos();
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
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Explorar Contenidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contenidos.map(contenido => (
            <Link to={`/contenidos/${contenido.id}`} key={contenido.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {contenido.imagen_url ? (
                <img src={contenido.imagen_url} alt={contenido.titulo} className="w-full h-72 object-cover" onError={(e) => e.target.src = 'https://placehold.co/400x600/e2e8f0/6b7280?text=No+Image'} />
              ) : (
                <div className="w-full h-72 flex items-center justify-center bg-gray-200 text-gray-500 text-center">No Image</div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{contenido.titulo}</h3>
                <p className="text-sm text-gray-500 capitalize">{contenido.tipo}</p>
                {contenido.año && <p className="text-sm text-gray-500">({contenido.año})</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}