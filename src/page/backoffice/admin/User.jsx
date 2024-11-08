import './User.css';
import Logo from '../../../assets/images/logo.jpg';
import { FaArrowLeft, FaBars, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import SideBar from '../../SideBar';
import { useNavigate } from 'react-router-dom';

function User() {
  
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
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
    <div className="full-screen ">
      <header>
        <button
          type="button"
          id="return-header"
          onClick={() => navigateTo('/backoffice/admin/main')}
        >
          <FaArrowLeft />
        </button>

        <img src={Logo} alt="Logo principal" id="logo" />
        <button id="side-button" onClick={toggleSideBar}>
          <FaBars size={30} />
        </button>
        {isSideBarOpen && <SideBar onClose={handleClose} />}
      </header>
      <main>
        <section className="top-section">Usuários</section>
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
          <button
            type="button"
            id="new-user"
            onClick={() => navigateTo('/backoffice/admin/newUser')}
          >
            Novo usuário
          </button>
        </section>
        <section id="content-section">
          <div className="column">
            <h2>Área de atendimento</h2>
            <div className="item">
              <p>Nome</p>
              <p>CPF</p>
              <p>Permissão</p>
            </div>
            <div className="item">
              <p>Nome</p>
              <p>CPF </p>
              <p>Permissão</p>
            </div>
          </div>
          <div className="column">
            <h2>Cargo</h2>
          </div>
        </section>
      </main>
    </div>
  );
}

export default User;
