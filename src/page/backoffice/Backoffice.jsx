import { useState } from 'react';
import './Backoffice.css';
import Logo from '../../assets/images/logo.jpg';
import SideBar from '../SideBar';
import { FaUserShield, FaBox, FaBars, FaDollarSign } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import useFetchData from '../../../service/Connection';

function Backoffice() {
  // const { data, error, loading } = useFetchData(
  //   //colocar a url endpoint do backoffice aqui
  // );
  const { t } = useTranslation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
    onclose();
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
              <button
                id="btn-cardapio"
                onClick={() => navigateTo('/Backoffice/Menu')}
              >
                <FaBars /> {t('Cardápio')}
              </button>
            )}
          </div>
          <div id="btn-vendas-container">
            {location.pathname !== '/backoffice/Sales' && (
              <button
                id="btn-vendas"
                onClick={() => navigateTo('/Backoffice/Sales')}
              >
                <FaDollarSign /> Vendas
              </button>
            )}
          </div>
          <div id="btn-estoque-container">
            {location.pathname !== '/backoffice/Stock' && (
              <button
                id="btn-estoque"
                onClick={() => navigateTo('/Backoffice/Stock')}
              >
                <FaBox /> Estoque
              </button>
            )}
          </div>
          <div id="btn-admin-container">
            {location.pathname !== '/backoffice/admin/Main' && (
              <button
                id="btn-admin"
                onClick={() => navigateTo('/Backoffice/Admin/main')}
              >
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
