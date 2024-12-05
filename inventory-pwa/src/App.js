import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; // Asegúrate de que el archivo CSS esté correctamente enlazado
import inicio_inv from './images/inicio_inv.jpg';
import Start from './components/Start'; // Importa el componente Start desde la carpeta components

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginRef = useRef(null); // Referencia al contenedor del login
  const navigate = useNavigate(); // Hook para la navegación

  // Función para manejar el movimiento del mouse
  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = offsetX;
    const y = offsetY;

    const width = loginRef.current.offsetWidth;
    const height = loginRef.current.offsetHeight;

    const xOffset = (x / width) * 30 - 15; // Modificar la sombra de acuerdo al movimiento X
    const yOffset = (y / height) * 30 - 15; // Modificar la sombra de acuerdo al movimiento Y

    loginRef.current.style.boxShadow = `${xOffset}px ${yOffset}px 30px rgba(255, 255, 0, 0.6), ${-xOffset}px ${-yOffset}px 30px rgba(0, 0, 255, 0.6)`; // Sombra con color dinámico
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('Logged in successfully');
      navigate('/start'); // Navega a la página de Start después del login exitoso
    } else {
      alert('Failed to log in');
    }
  };

  return (
    <div className="App">
      <div
        className="login-container"
        ref={loginRef}
        onMouseMove={handleMouseMove} // Detecta el movimiento del ratón
      >
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1>CONTROL DE INVENTARIOS</h1>
            <h4>INICIAR SESIÓN</h4>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="login-image">
          <img src={inicio_inv} alt="Architecture" />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/start" element={<Start />} />
      </Routes>
    </Router>
  );
};

export default App;
