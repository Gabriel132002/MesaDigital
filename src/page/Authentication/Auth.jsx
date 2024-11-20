import { useState } from 'react';
import { FaAt, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpg';
import './Auth.css';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/backoffice');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="Logo">
        <img src={Logo} alt="Imagem principal" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' , paddingBottom: '10px' }}>
        <h1>Login</h1>
      </div>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <div className="input-wrapper">
            <FaAt className="icon" />
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
