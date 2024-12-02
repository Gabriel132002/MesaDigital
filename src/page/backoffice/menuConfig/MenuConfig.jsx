import './MenuConfig.css';
import SideBar from '../../SideBar';
import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

function MenuConfig() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [newCategory, setNewCategory] = useState({ nome: '', descricao: '' });
  const [newProduct, setNewProduct] = useState({
    categoriaId: '',
    estoqueId: '',
    nome: '',
    descricao: '',
    quantidade: '',
    valor: '',
  });

  useEffect(() => {
    // Função para buscar categorias
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/cardapio/categoria/get-all'
        );
        const data = await response.json();
        setCategories(data.filter((cat) => cat.tipo === 'COMIDA')); // Filtra apenas categorias do tipo COMIDA
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    // Função para buscar estoques
    const fetchStocks = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/mesa/estoque/get-all'
        );
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error('Erro ao buscar estoques:', error);
      }
    };

    fetchCategories();
    fetchStocks();
  }, []);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  // Função para adicionar uma nova categoria
  const handleAddCategory = async () => {
    if (!newCategory.nome || !newCategory.descricao) {
      alert('Preencha todos os campos para adicionar uma categoria.');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:8080/cardapio/categoria/create',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newCategory, tipo: 'COMIDA' }),
        }
      );

      if (response.ok) {
        alert('Categoria criada com sucesso!');
        setNewCategory({ nome: '', descricao: '' });
        const updatedCategories = await fetch(
          'http://localhost:8080/cardapio/categoria/get-all'
        );
        const data = await updatedCategories.json();
        setCategories(data.filter((cat) => cat.tipo === 'COMIDA'));
      } else {
        alert('Erro ao criar categoria.');
      }
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  // Função para criar um produto
  const handleCreateProduct = async () => {
    const { categoriaId, estoqueId, nome, descricao, quantidade, valor } =
      newProduct;

    if (
      !categoriaId ||
      !estoqueId ||
      !nome ||
      !descricao ||
      !quantidade ||
      !valor
    ) {
      alert('Preencha todos os campos para criar um produto.');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:8080/cardapio/produto/create',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            categoriaId: parseInt(categoriaId, 10),
            estoqueId: parseInt(estoqueId, 10),
            nome,
            descricao,
            quantidade: parseInt(quantidade, 10),
            valor: parseFloat(valor),
          }),
        }
      );

      if (response.ok) {
        alert('Produto criado com sucesso!');
        setNewProduct({
          categoriaId: '',
          estoqueId: '',
          nome: '',
          descricao: '',
          quantidade: '',
          valor: '',
        });
      } else {
        alert('Erro ao criar produto.');
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  return (
    <div>
      <header>
        <div id="side-button-container">
          <button id="side-button" onClick={toggleSideBar}>
            <FaBars size={30} />
          </button>
        </div>
        {isSideBarOpen && <SideBar onClose={handleClose} />}
      </header>
      <div id="global-sales-card">
        <h1>Configuração do Cardápio</h1>

        {/* Exibição das categorias */}
        <div>
          <h3>Categorias Existentes</h3>
          <ul style={{ margin: '5%' }}>
            {categories.map((category) => (
              <li key={category.id}>
                {category.nome} - {category.descricao}
              </li>
            ))}
          </ul>
        </div>

        {/* Formulário para adicionar uma nova categoria */}
        <div className='input-class'>
          <h2>Adicionar Nova Categoria</h2>
          <input
            className="input-class"
            type="text"
            placeholder="Nome"
            value={newCategory.nome}
            onChange={(e) =>
              setNewCategory({ ...newCategory, nome: e.target.value })
            }
          />
          <input
            className="input-class"
            type="text"
            placeholder="Descrição"
            value={newCategory.descricao}
            onChange={(e) =>
              setNewCategory({ ...newCategory, descricao: e.target.value })
            }
          />
          <button onClick={handleAddCategory} style={{ marginTop: '2px' }}>
            Adicionar Categoria
          </button>
        </div>

        {/* Formulário para criar um novo produto */}
        <div className='input-class'>
          <h2>Criar Produto</h2>
          <select
            value={newProduct.categoriaId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, categoriaId: e.target.value })
            }
          >
            <option value="" disabled>
              Selecionar Categoria
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nome}
              </option>
            ))}
          </select>

          <select
            value={newProduct.estoqueId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, estoqueId: e.target.value })
            }
          >
            <option value="" disabled>
              Selecionar Estoque
            </option>
            {stocks.map((stock) => (
              <option key={stock.id} value={stock.id}>
                {stock.nome}
              </option>
            ))}
          </select>

          <input
            className="input-class"
            type="text"
            placeholder="Nome do Produto"
            value={newProduct.nome}
            onChange={(e) =>
              setNewProduct({ ...newProduct, nome: e.target.value })
            }
          />
          <input
            className="input-class"
            type="text"
            placeholder="Descrição"
            value={newProduct.descricao}
            onChange={(e) =>
              setNewProduct({ ...newProduct, descricao: e.target.value })
            }
          />
          <input
            className="input-class"
            type="number"
            placeholder="Quantidade"
            value={newProduct.quantidade}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantidade: e.target.value })
            }
          />
          <input
            className="input-class"
            type="number"
            placeholder="Valor (R$)"
            value={newProduct.valor}
            onChange={(e) =>
              setNewProduct({ ...newProduct, valor: e.target.value })
            }
          />
          <button onClick={handleCreateProduct} style={{ marginTop: '2px' }}>
            Criar Produto
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuConfig;
