import './Activity.css';
import Logo from '../../../assets/images/logo.jpg';
import { FaArrowLeft, FaBars, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import SideBar from '../../SideBar';
import { useNavigate } from 'react-router-dom';

function Activity() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
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
    <div className="full-screen ">
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
        <section className="top-section">Atividades</section>
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
            <h2>Área de atendimento</h2>
            <div className="item">
              <p>Nome usuário</p>
              <p>Garçom</p>
              <p>Pedido comanda 001</p>
              <p>Horários 00:00</p>
            </div>
            <div className="item">
              <p>Nome usuário</p>
              <p>Garçom</p>
              <p>Pedido comanda 002</p>
              <p>Horário 00:00</p>
            </div>
          </div>

          <div className="column">
            <h2>Cozinha</h2>

            <div className="item">
              <p>Nome usuário</p>
              <p>Pedido comanda 002</p>
              <p>Assitente cozinha</p>
              <p>Horário 00:00</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Activity;
