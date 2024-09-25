import './SideBar.css';
import { FaBars, FaQuestionCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function SideBar({ onClose }) {
  const navigate = useNavigate();
  const helpPage = () => {
    navigate('/help')
  }
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
            <li>
              <button id="sidebar-button-help" onClick={helpPage}>
                <FaQuestionCircle /> Ajuda
              </button>
            </li>
          </ul>
          <ul id="config-container">
            <li>
              <button id="sidebar-button-config">
                <FaCog /> Configuração
              </button>
            </li>
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
