import React, { useEffect, useState } from 'react';
import api from '../services/api';

function MisContenidos() {
  const [contenidos, setContenidos] = useState([]);

  useEffect(() => {
    async function fetchContenidos() {
      try {
        const res = await api.get('/contenidos/mis-contenidos');
        setContenidos(res.data);
      } catch (error) {
        console.error('Error cargando contenidos:', error);
      }
    }
    fetchContenidos();
  }, []);

  return (
    <div>
      <h2>Mis Contenidos</h2>
      <ul>
        {contenidos.map(c => (
          <li key={c.id}>{c.nombre} ({c.tipo})</li>
        ))}
      </ul>
    </div>
  );
}

export default MisContenidos;
