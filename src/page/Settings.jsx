import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import SideBar from './SideBar';
import './Settings.css';
import Logo from '../assets/images/logo.jpg';
import DropDownProp from '../assets/props/DropDownProp';

function Settings() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div>
      <div id="container">
        <header id="header">
          <img src={Logo} alt="Imagem principal" id="logo" />
          <button id="sidebar-button" onClick={toggleSideBar}>
            <FaBars />
          </button>
          {isSideBarOpen && <SideBar onClose={handleClose} />}
        </header>
        <div>
          <main id="main-content">
            <h1>Configurações</h1>
            <section id="theme-config-container">
              <DropDownProp />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Settings;
