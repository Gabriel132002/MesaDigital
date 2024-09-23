import { useState } from 'react';
import './Home.css';
import SideBar from './SideBar';
import { FaUserShield, FaBox, FaBars, FaDollarSign } from 'react-icons/fa';

function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false)
  }

  return (
    <div>
      <header>
        <button id="side-button" onClick={toggleSideBar}>
          <FaBars />
        </button>
      </header>

      {isSideBarOpen && <SideBar onClose={handleClose} />}

      <div id="container">
        <div id="title-container">
          <h1 id="title-h1">Mesa digital</h1>
        </div>

        <div id="btns-container">
          <div id="btn-cardapio-container">
            <button id="btn-cardapio">
              <FaBars /> Cardápio
            </button>
          </div>
          <div id="btn-vendas-container">
            <button id="btn-vendas">
              <FaDollarSign /> Vendas
            </button>
          </div>
          <div id="btn-estoque-container">
            <button id="btn-estoque">
              <FaBox /> Estoque
            </button>
          </div>
          <div id="btn-admin-container">
            <button id="btn-admin">
              <FaUserShield /> Administração
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
