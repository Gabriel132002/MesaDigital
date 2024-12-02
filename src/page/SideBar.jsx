
import './SideBar.css';
import {
  FaBars,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function SideBar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div id="sideBar">
      <div id="container">
        <div id="fabars-button-container">
          <button id="fabars-button" onClick={onClose}>
            <FaBars size={30} />
          </button>
        </div>
        <div id="list-container">
          {/* Exibe apenas o botão de Entrar se estiver na rota "/home" */}
          {location.pathname === '/home' ? (
            <ul id="home-button-container">
              <li>
                <button
                  id="home-button"
                  onClick={() => navigateTo('/Authentication/Auth')}
                >
                  <FaHome /> Entrar
                </button>
              </li>
            </ul>
          ) : (
            <>
              {/* Exibe os outros botões se não estiver na rota /home */}
              <ul id="backoffice-container">
                {location.pathname !== '/backoffice' && (
                  <li>
                    <button
                      id="backoffice-button"
                      onClick={() => navigateTo('/backoffice')}
                    >
                      <FaHome /> Home
                    </button>
                  </li>
                )}
              </ul>
              <ul id="help-container">
                {location.pathname !== '/backoffice/help' && (
                  <li>
                    <button
                      id="sidebar-button-help"
                      onClick={() => navigateTo('/backoffice/help')}
                    >
                      <FaQuestionCircle /> Help
                    </button>
                  </li>
                )}
              </ul>
              <ul id="config-container">
                {location.pathname !== '/backoffice/settings' && (
                  <li>
                    <button
                      id="sidebar-button-config"
                      // onClick={() => navigateTo('/backoffice/settings')}
                    >
                      <FaCog /> Configuração
                    </button>
                  </li>
                )}
              </ul>
              <ul id="signout-container">
                <li>
                  <button id="sidebar-button-signout">
                    <FaSignOutAlt /> Log out
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
