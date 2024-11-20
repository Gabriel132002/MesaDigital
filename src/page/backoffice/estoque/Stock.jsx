import React, { useState } from 'react';
import SideBar from '../../SideBar'; 
import { FaBars } from 'react-icons/fa'; // Certifique-se de que 'react-icons' está instalado
import './Stock.css'; // Importando o CSS atualizado

function Stock() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div className="app-container">
      <div id="side-button-container">
        <button id="side-button" onClick={toggleSideBar}>
          <FaBars size={30} />
        </button>
      </div>
      {isSideBarOpen && <SideBar onClose={handleClose} />}
      <div className="content">
        <header id='header-grid'>
          <h1>Estoque</h1>
          <div className="search-container">
            <input type="text" placeholder="Pesquisar Item" className="search-input" />
          </div>
        </header>
        <div className="button-container">
          <button className="report-button">Relatório</button>
          <button className="register-button">Cadastrar Item</button>
        </div>
        <main className="inventory-container">
          <section className="section">
            <h2>Câmara Fria</h2>
            <div className="item">
              <p>Alface Americana</p>
              <p>Qtd.: 10</p>
              <select>
                <option>Baixo Estoque</option>
              </select>
            </div>
            <div className="item">
              <p>Tomate</p>
              <p>Qtd.: 20</p>
              <select>
                <option>Próxima validade</option>
              </select>
            </div>
          </section>

          <section className="section">
            <h2>Congelador</h2>
            <div className="item">
              <p>Peito de Frango</p>
              <p>Qtd.: 15</p>
              <select>
                <option>Não selecionado</option>
              </select>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Stock;
