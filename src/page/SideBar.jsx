import './SideBar.css';
import { FaBars } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
function SideBar({ onClose }) {
  return (
    <div id="sideBar">
      <button id="fabars" onClick={onClose}>
        <FaBars />
      </button>
      <h2>Ajuda</h2>
      <ul>
        <li>Ajuda</li>
      </ul>
      <ul>
        <li>Configuração</li>
      </ul>
    </div>
  );
}

export default SideBar;
