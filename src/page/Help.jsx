import Logo from '../assets/images/logo.jpg';
import { FaqList } from '../FaqList';
import './help.css';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import SideBar from './SideBar';

function HelpPage() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div>
      <header>
        <div id="top-container">
          <div id="logo-container">
            <img src={Logo} alt="Logo" id="logo-help" />
          </div>

          <div id="button-container">
            <button id="sidebar-button" onClick={toggleSideBar}>
              <FaBars size={30} />
            </button>
          </div>
          {isSideBarOpen && <SideBar onClose={handleClose} />}
        </div>
      </header>

      <main id="main">
        <section id="section-title">
          <h1>Ajuda</h1>
        </section>
        <section id="main-section">
          <div id="faq-content">
            Dúvida frequentes
            <ul>
              {FaqList.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
          <div id="support-container">
            Contato suporte
            <div id="client-data-container">
              <div>
                Nome: <input type="text" name="name" id="name" />
              </div>
              <div>
                Email: <input type="email" name="email" id="email" />
              </div>
            </div>
            <div id="client-opinion">
              Assunto
              <div id="textbox-client">
                <input type="text" name="textBox" id="text-box" />
              </div>
            </div>
            <div id="btn-container">
              <button id="submit">Enviar</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HelpPage;
