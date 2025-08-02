import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { email, contraseña });
      setMensaje(`Bienvenido, ${res.data.usuario.nombre}`);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      setMensaje('Error al iniciar sesión');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}
