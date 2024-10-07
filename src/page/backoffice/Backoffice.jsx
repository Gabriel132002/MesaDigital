import { useState } from 'react';
import './Backoffice.css';
import Logo from '../../assets/images/logo.jpg';
import SideBar from '../SideBar';
import { FaUserShield, FaBox, FaBars, FaDollarSign } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

function Backoffice() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const MenuPage = () => {
    navigate('/Backoffice/Menu');
  };

  const SalesPage = () => {
    navigate('/Backoffice/Sales');
  };

  const StockPage = () => {
    navigate('/Backoffice/Stock');
  };

  const AdminPage = () => {
    navigate('/Backoffice/Admin/main');
  };

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
        {isSideBarOpen && <SideBar onClose={handleClose} />}
        <div id="title-container">
          <h1>
            <img src={Logo} alt="Imagem principal" id="logo" />
          </h1>
        </div>

        <div id="btns-container">
          <div id="btn-cardapio-container">
            {location.pathname !== '/backoffice/Menu' && (
              <button id="btn-cardapio" onClick={MenuPage}>
                <FaBars /> Cardápio
              </button>
            )}
          </div>
          <div id="btn-vendas-container">
            {location.pathname !== '/backoffice/Sales' && (
              <button id="btn-vendas" onClick={SalesPage}>
                <FaDollarSign /> Vendas
              </button>
            )}
          </div>
          <div id="btn-estoque-container">
            {location.pathname !== '/backoffice/Stock' && (
              <button id="btn-estoque" onClick={StockPage}>
                <FaBox /> Estoque
              </button>
            )}
          </div>
          <div id="btn-admin-container">
            {location.pathname !== '/backoffice/admin/Main' && (
              <button id="btn-admin" onClick={AdminPage}>
                <FaUserShield /> Administração
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Backoffice;
