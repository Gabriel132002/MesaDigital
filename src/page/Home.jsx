// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import SideBar from './SideBar'; 
import { FaBars } from 'react-icons/fa';
import './Home.css';
import useConnection from '../service/Connection.jsx';

function Home() {
  const { data: dados, error, loading } = useConnection("http://localhost:8080/cardapio/get");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div>
      {isSideBarOpen && <SideBar onClose={handleClose} />}
      <div id="container">
        <div id="side-button-container">
          <button id="side-button" onClick={toggleSideBar}>
            <FaBars size={30} />
          </button>
        </div>
        <div className="menu-container">
          <h1>Cardápio</h1>
          {loading && <p>Carregando pratos...</p>} {/* Mensagem de carregamento */}
          {error && <p>{error}</p>} {/* Mensagem de erro */}
          {dados == null && <p>Nenhum prato encontrado</p>}
          {dados !== null && dados.produtoList.map((prato, index) => (
            <div key={index} className="menu-section">
              <h2>{prato.nome}</h2> {/* Ajuste os atributos conforme a estrutura da resposta da API */}
              <div className="menu-item">
                <div className="item-details">
                  <h3>{prato.nome}</h3>
                  <p>{prato.descricao}</p>
                  <span>{prato.valor}</span>
                </div>
                <button className="add-image-btn">📷</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
