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
  const helpPage = () => {
    navigate('/backoffice/help');
  };
  const Backoffice = () => {
    navigate('/backoffice');
  };
  const settingsPage = () => {
    navigate('/backoffice/settings');
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
          <ul id="help-container">
            {location.pathname !== '/backoffice/help' && (
              <li>
                <button id="sidebar-button-help" onClick={helpPage}>
                  <FaQuestionCircle /> Ajuda
                </button>
              </li>
            )}
          </ul>
          <ul id="home-button-container">
            {location.pathname !== '/backoffice' && (
              <li>
                <button id="home-button" onClick={Backoffice}>
                  <FaHome /> Home
                </button>
              </li>
            )}
            <ul id="config-container">
              {location.pathname != '/backoffice/settings' && (
                <li>
                  <button id="sidebar-button-config" onClick={settingsPage}>
                    <FaCog /> Configuração
                  </button>
                </li>
              )}
            </ul>
          </ul>
          <ul id="signout-container">
            <li>
              <button id="sidebar-button-signout">
                <FaSignOutAlt /> Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
