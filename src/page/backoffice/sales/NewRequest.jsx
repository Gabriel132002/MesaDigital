import React, { useState, useEffect } from 'react';
import './NewRequest.css';
import { useParams } from 'react-router-dom';

function NewRequest() {
  const { orderId } = useParams();
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedProduto, setSelectedProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);const [observacao, setObservacao] = useState('');
  const [pedidoProdutos, setPedidoProdutos] = useState([]); // Produtos selecionados
  const [isLoading, setIsLoading] = useState(true);

  // Buscar categorias e produtos do backend
  useEffect(() => {
    const fetchCategoriasEProdutos = async () => {
      try {
        const response = await fetch('http://localhost:8080/cardapio/get');
        const data = await response.json();
        setCategorias(data.produtoList.map((produto) => produto.categoria));
        setProdutos(data.produtoList);
      } catch (error) {
        console.error('Erro ao buscar categorias e produtos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriasEProdutos();
  }, []);

  const handleAdicionarProduto = () => {
    const produtoSelecionado = produtos.find((produto) => produto.id === Number(selectedProduto));
    if (produtoSelecionado) {
      setPedidoProdutos([
        ...pedidoProdutos,
        {
          produtoId: produtoSelecionado.id,
          nome: produtoSelecionado.nome,
          categoria: produtoSelecionado.categoria.nome,
          quantidade,
        },
      ]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const pedidoData = {
      categoriaId: selectedCategoria,
      comandaId: orderId,
      observacao,
      produtos: pedidoProdutos,
    };

    try {
      const response = await fetch('http://localhost:8080/mesa/comanda/pedido/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoData),
      });

      if (response.ok) {
        alert('Pedido lançado com sucesso!');
        setObservacao('');
        setPedidoProdutos([]);
      } else {
        console.log(response);
        alert('Erro ao lançar pedido' + response);
      }
    } catch (error) {
      console.error('Erro ao enviar pedido:', error.message);
    }
  };

  // Renderizar a interface de seleção de produtos
  if (isLoading) {
    return <div>Carregando categorias e produtos...</div>;
  }

  return (
    <div className="new-request">
      <h1>Novo Pedido</h1>
      <form className="new-request-form" onSubmit={handleSubmit}>
        <label>
          Categoria:
          <select value={selectedCategoria} onChange={(e) => setSelectedCategoria(e.target.value)}>
            <option value="">Selecione</option>
            {Array.from(new Set(categorias.map((cat) => cat.id))).map((categoriaId) => (
              <option key={categoriaId} value={categoriaId}>
                {categorias.find((cat) => cat.id === categoriaId)?.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Produto:
          <select value={selectedProduto} onChange={(e) => setSelectedProduto(e.target.value)}>
            <option value="">Selecione</option>
            {produtos
              .filter((produto) => produto.categoria.id === Number(selectedCategoria))
              .map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome} - R$ {produto.valor.toFixed(2)}
                </option>
              ))}
          </select>
        </label>

        <label>
          Quantidade:
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />
        </label>

        <label>
          Observação:
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
        </label>

        <button type="button" onClick={handleAdicionarProduto}>Adicionar Produto</button>

        {/* Lista de produtos adicionados */}
        <div className="produtos-adicionados">
          <h3>Produtos Adicionados:</h3>
          <ul>
            {pedidoProdutos.map((produto, index) => (
              <li key={index}>
                {produto.nome} - {produto.quantidade}x
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Lançar Pedido</button>
      </form>
    </div>
  );
}

export default NewRequest;
