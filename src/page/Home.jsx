import React, { useState, useEffect } from 'react';
//import { fetchPratos } from '../service/Connection'; // Importe o serviço
import SideBar from './SideBar'; 
import { FaBars } from 'react-icons/fa';
import './Home.css';

function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [pratos, setPratos] = useState([]); // Para armazenar os pratos da API
  const [loading, setLoading] = useState(true); // Para indicar que a requisição está carregando
  const [error, setError] = useState(null); // Para capturar erros da requisição

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  // Função para buscar pratos da API
  const loadPratos = async () => {
    try {
      const pratosData = await fetchPratos(); // Chama a função do serviço
      setPratos(pratosData); // Armazena os pratos retornados
    } catch (err) {
      setError('Erro ao carregar pratos.'); // Define uma mensagem de erro
    } finally {
      setLoading(false); // Define o loading como falso, independentemente do resultado
    }
  };

  // useEffect para buscar pratos quando o componente é montado
  useEffect(() => {
    loadPratos();
  }, []);

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
          {pratos.map((prato, index) => (
            <div key={index} className="menu-section">
              <h2>{prato.titulo}</h2> {/* Ajuste os atributos conforme a estrutura da resposta da API */}
              <div className="menu-item">
                <div className="item-details">
                  <h3>{prato.nome}</h3>
                  <p>{prato.descricao}</p>
                  <span>{prato.preco}</span>
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
