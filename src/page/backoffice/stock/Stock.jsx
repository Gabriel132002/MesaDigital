import React, { useState, useEffect } from 'react';
import SideBar from '../../SideBar';
import { FaBars } from 'react-icons/fa'; // Certifique-se de que 'react-icons' está instalado
import './Stock.css'; // CSS atualizado

function Stock() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [estoques, setEstoques] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [novoEstoque, setNovoEstoque] = useState("");

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  // Fetch Estoques e Produtos
  useEffect(() => {
    const fetchEstoquesEProdutos = async () => {
      try {
        setLoading(true);
        const [estoquesResponse, produtosResponse] = await Promise.all([
          fetch('http://localhost:8080/mesa/estoque/get-all'),
          fetch('http://localhost:8080/mesa/produtos/get-all'),
        ]);

        if (!estoquesResponse.ok || !produtosResponse.ok) {
          throw new Error("Erro ao buscar dados");
        }

        const estoquesData = await estoquesResponse.json();
        const produtosData = await produtosResponse.json();

        setEstoques(estoquesData);
        setProdutos(produtosData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstoquesEProdutos();
  }, []);

  // Criar Estoque
  const criarEstoque = async () => {
    if (!novoEstoque.trim()) {
      alert("Digite um nome válido para o estoque.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/mesa/estoque/create?nomeEstoque=${novoEstoque}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error("Erro ao criar estoque.");
      }
      alert("Estoque criado com sucesso!");
      setNovoEstoque("");
    } catch (error) {
      alert(error.message);
    }
  };

  // Filtrar produtos por estoque
  const produtosPorEstoque = (estoqueId) =>
    produtos.filter((produto) => produto.estoque?.id === estoqueId);

  return (
    <div className="app-container">
      <div id="side-button-container">
        <button id="side-button" onClick={toggleSideBar}>
          <FaBars size={30} />
        </button>
      </div>
      {isSideBarOpen && <SideBar onClose={handleClose} />}
      <div className="content">
        <header id="header-grid">
          <h1>Estoque</h1>
        </header>
        <div className="button-container">
          <input
            type="text"
            placeholder="Nome do Estoque"
            value={novoEstoque}
            onChange={(e) => setNovoEstoque(e.target.value)}
            className="new-stock-input"
          />
          <button style={{width: '100%'}} className="register-button" onClick={criarEstoque}>
            Criar Estoque
          </button>
        </div>
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <main className="inventory-container">
            {estoques.map((estoque) => (
              <section key={estoque.id} className="section">
                <h2>{estoque.nome}</h2>
                {produtosPorEstoque(estoque.id).length > 0 ? (
                  produtosPorEstoque(estoque.id).map((produto) => (
                    <div key={produto.id} className="item">
                      <p>{produto.nome}</p>
                      <p>Qtd.: {produto.quantidade}</p>
                      <p>Categoria: {produto.categoria.descricao}</p>
                    </div>
                  ))
                ) : (
                  <p>Sem produtos neste estoque.</p>
                )}
              </section>
            ))}
          </main>
        )}
      </div>
    </div>
  );
}

export default Stock;
