import { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { FaBars } from 'react-icons/fa';
import './Home.css';
import useConnection from '../service/Connection';

function Home() {
  const { data: dados, error, loading } = useConnection("http://localhost:8080/cardapio/get");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    if (dados && dados.produtoList) {
      const categoriasMap = {};
      dados.produtoList.forEach((produto) => {
        const categoria = produto.categoria;
        if (categoria.tipo === "COMIDA") {
          if (!categoriasMap[categoria.id]) {
            categoriasMap[categoria.id] = {
              ...categoria,
              produtos: [],
            };
          }
          categoriasMap[categoria.id].produtos.push(produto);
        }
      });
      setCategorias(Object.values(categoriasMap));
    }
  }, [dados]);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  const scrollToCategory = (id) => {
    const categoryElement = document.getElementById(`categoria-${id}`);
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth" });
    }
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

        {/* TopNavBar dinâmica */}
        <nav className="top-navbar">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => scrollToCategory(categoria.id)}
              className="nav-button"
            >
              {categoria.descricao}
            </button>
          ))}
        </nav>

        <div className="menu-container">
          <h1>Cardápio</h1>
          {loading && <p>Carregando pratos...</p>}
          {error && <p>{error}</p>}
          {categorias.length === 0 && !loading && <p>Nenhum prato encontrado</p>}

          {/* Renderizar produtos agrupados por categorias */}
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              id={`categoria-${categoria.id}`}
              className="menu-category"
            >
              <h2>{categoria.descricao}</h2>
              <div className="menu-items">
                {categoria.produtos.map((prato) => (
                  <div key={prato.id} className="menu-item">
                    <div className="item-details">
                      <h3>{prato.nome}</h3>
                      <p>{prato.descricao}</p>
                      <span>{prato.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                    </div>
                    <button className="add-image-btn">FAZER PEDIDO</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
