import { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { FaBars } from 'react-icons/fa';
import './Home.css';
import useConnection from '../service/Connection';
import PratoPrincipal from '../assets/images/prato_principal.jpg'
import Prato1 from '../assets/images/prato2.avif'
import Prato2 from '../assets/images/prato3.jpeg'
import Prato3 from '../assets/images/prato4.jpg'
import Prato4 from '../assets/images/prato5.png'

function Home() {
  const { data: dados, error, loading } = useConnection("http://localhost:8080/cardapio/get");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [listImages, setListImages] = useState([]);

  useEffect(() => {
    let images = [PratoPrincipal, Prato1, Prato2, Prato3, Prato4];
    setListImages(images);
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

  const generatorRandomImage = () => {
    return listImages[Math.floor(Math.random() * listImages.length)];
  }

  return (
    <div>
      {isSideBarOpen && <SideBar onClose={handleClose} />}
      <div id="container">
        <div id="side-button-container">
          <button id="side-button" onClick={toggleSideBar}>
            <FaBars size={30} />
          </button>
        </div>

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
                  <div key={prato.id} className="menu-item" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div className="item-details">
                      <h3>{prato.nome}</h3>
                      <p style={{color: 'orange', font: 'menu'}}>{prato.descricao}</p>
                      <span style={{color: 'green'}}>{prato.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                    </div>
                    <div>
                      <img className="img" src={generatorRandomImage()} alt={'Prato Principal'} />
                  </div>
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
