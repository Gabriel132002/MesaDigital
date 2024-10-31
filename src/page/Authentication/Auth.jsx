import { FaAt, FaLock } from 'react-icons/fa';
import Logo from '../../assets/images/logo.jpg';
import './Auth.css';

function Auth() {
  return (
    <div>
      <div className="Logo">
        <img src={Logo} alt="Imagem principal" />
      </div>
      <h1>Entrar</h1>
      <form>
        <div className="input-container">
          <FaAt id="email-icon" />
          <input type="email" placeholder="Digite seu email" />
          <FaLock id="password-icon" />
          <input type="password" placeholder="Digite sua senha"/>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
