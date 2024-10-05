import { useState } from 'react';
import './Backoffice.css';
import Logo from '../../assets/images/logo.jpg';
import SideBar from '../SideBar';
import { FaUserShield, FaBox, FaBars, FaDollarSign } from 'react-icons/fa';

function Backoffice() {
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
        <div id="side-button-container">
          <button id="side-button" onClick={toggleSideBar}>
            <FaBars size={30} />
          </button>
        </div>
        {isSideBarOpen && <SideBar onClose={handleClose}/>}
        <div id="title-container">
          <h1 ><img src={Logo} alt="Imagem principal" id="logo"/></h1>
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
export default Backoffice;
