import { FaArrowLeft, FaBars, FaSearch } from 'react-icons/fa';
import Logo from '../../../assets/images/logo.jpg';
import './Financial.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SideBar from '../../SideBar';

function Financial() {
  const [isSideBarOpen, setIsSideBarOpen] = useState();
  const navigate = useNavigate();

  const previousPage = () => {
    navigate('/backoffice/admin/main');
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div className="full-screen">
      <header>
        <button type="button" id="return-header" onClick={previousPage}>
          <FaArrowLeft />
        </button>

        <img src={Logo} alt="Logo principal" id="logo" />
        <button id="side-button" onClick={toggleSideBar}>
          <FaBars size={30} />
        </button>
        {isSideBarOpen && <SideBar onClose={handleClose} />}
      </header>

      <main>
        <section className="top-section">Custos e receitas</section>
        <section className="input-text">
          <div className="search-wrapper">
            <input
              type="text"
              name="text"
              id="search-field"
              placeholder="Pesquisar atividade"
            />
            <button className="search-icon">
              <FaSearch id="fasearch" />
            </button>
          </div>
        </section>
        <section className="section-all-content">
          <button type="button" id="report">
            Relatório
          </button>
        </section>
        <section className="content-section">
          <div className="column">
            <h2>Custos operacionais</h2>
          </div>

          <div className="column">
            <h2>Receitas de vendas</h2>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Financial;
