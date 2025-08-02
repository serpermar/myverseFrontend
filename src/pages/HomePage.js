import React from 'react';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a MyVerse</h1>
        <p className="text-gray-600">Explora un mundo de contenido, comparte tus reseñas y organiza tu lista personal de películas, series, juegos, libros y más.</p>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700">Explora Contenidos</h2>
            <p className="mt-2 text-gray-600">Descubre nuevas películas, series, juegos, cómics y libros añadidos por la comunidad.</p>
            <a href="/contenidos" className="mt-4 inline-block text-blue-500 hover:underline font-medium">Ver todos los contenidos</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700">Mi Lista</h2>
            <p className="mt-2 text-gray-600">Revisa tus contenidos marcados, añade reseñas y puntuaciones.</p>
            <a href="/mis-contenidos" className="mt-4 inline-block text-blue-500 hover:underline font-medium">Ir a mi lista</a>
          </div>
        </div>
      </div>
    </div>
  );
}