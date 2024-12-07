import { useState, useEffect } from 'react';
import SideBar from '../../SideBar';
import { FaBars } from 'react-icons/fa';
import './Management.css';
import Select from 'react-select';

function Management() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [estoques, setEstoques] = useState([]);
  // const [ingredientesProduto, setIngredientesProduto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [novoProduto, setNovoProduto] = useState({
    id: null,
    nome: '',
    descricao: '',
    valor: '',
    categoriaId: '',
    estoqueId: '',
    ingredientes: [],
  });

  const [novoIngrediente, setNovoIngrediente] = useState({
    id: null,
    nome: '',
    descricao: '',
    quantidade: '',
    unidade: '',
    estoqueId: '',
  });

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriasRes, ingredientesRes, produtosRes, estoquesRes] =
        await Promise.all([
          fetch('http://localhost:8080/cardapio/categoria/get-all'),
          fetch('http://localhost:8080/estoque/ingrediente/get-all'),
          fetch('http://localhost:8080/estoque/produto/get-all'),
          fetch('http://localhost:8080/mesa/estoque/get-all'),
        ]);

      if (
        !categoriasRes.ok ||
        !ingredientesRes.ok ||
        !produtosRes.ok ||
        !estoquesRes.ok
      ) {
        throw new Error('Erro ao buscar dados.');
      }

      setCategorias(await categoriasRes.json());
      setIngredientes(await ingredientesRes.json());
      setProdutos(await produtosRes.json());
      setEstoques(await estoquesRes.json());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateOrUpdate = async (
    entity,
    data,
    endpoint,
    isEdit = false
  ) => {
    try {
      const response = await fetch(endpoint, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok)
        throw new Error(`Erro ao ${isEdit ? 'alterar' : 'criar'} ${entity}`);
      alert(`${entity} ${isEdit ? 'alterado' : 'criado'} com sucesso!`);
      fetchData();
      setNovoProduto({
        id: null,
        nome: '',
        descricao: '',
        valor: '',
        categoriaId: '',
        estoqueId: '',
        quantidade: '',
        ingredientes: [],
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (entity, id, endpoint) => {
    try {
      const response = await fetch(`${endpoint}?produtoId=${id}`, {
        method: 'DELETE',
        param: { produtoId: id },
      });

      if (!response.ok) throw new Error(`Erro ao excluir ${entity}`);
      alert(`${entity} excluído com sucesso!`);
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app-container">
      <div id="side-button-container">
        <button id="side-button" onClick={toggleSideBar}>
          <FaBars size={30} />
        </button>
      </div>
      {isSideBarOpen && <SideBar onClose={handleClose} />}
      <div id="management-content-card">
        <header id="header-grid">
          <h1>Gerenciamento</h1>
        </header>
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <main className="management-container">
            {/* Produtos */}
            <section>
              <h2 style={{ color: 'black' }}>Produtos</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const endpoint = `http://localhost:8080/${
                    novoProduto.id
                      ? 'estoque/produto/update'
                      : 'cardapio/produto/create'
                  }`;
                  handleCreateOrUpdate(
                    'Produto',
                    novoProduto,
                    endpoint,
                    !!novoProduto.id
                  );
                }}
              >
                <input
                  type="text"
                  placeholder="Nome"
                  value={novoProduto.nome}
                  onChange={(e) =>
                    setNovoProduto({ ...novoProduto, nome: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  value={novoProduto.descricao}
                  onChange={(e) =>
                    setNovoProduto({
                      ...novoProduto,
                      descricao: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Valor"
                  value={novoProduto.valor}
                  onChange={(e) =>
                    setNovoProduto({ ...novoProduto, valor: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={novoProduto.quantidade}
                  onChange={(e) =>
                    setNovoProduto({
                      ...novoProduto,
                      quantidade: e.target.value,
                    })
                  }
                />
                <select
                  value={novoProduto.categoriaId}
                  onChange={(e) =>
                    setNovoProduto({
                      ...novoProduto,
                      categoriaId: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione a Categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
                <div className="form-group">
                  <label>Ingredientes</label>
                  <Select
                    options={ingredientes.map((ing) => ({
                      value: ing.id,
                      label: ing.nome,
                    }))}
                    isMulti
                    onChange={(option) =>
                      setNovoProduto({
                        ...novoProduto,
                        ingredientes: option.map((opt) => opt.value),
                      })
                    }
                  />
                </div>
                <select
                  value={novoProduto.estoqueId}
                  onChange={(e) =>
                    setNovoProduto({
                      ...novoProduto,
                      estoqueId: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione o Estoque</option>
                  {estoques.map((est) => (
                    <option key={est.id} value={est.id}>
                      {est.nome}
                    </option>
                  ))}
                </select>
                <button type="submit" className="management-create-button">
                  {novoProduto.id ? 'Alterar' : 'Criar'}
                </button>
              </form>
              <ul>
                {produtos.map((prod) => (
                  <li key={prod.id}>
                    {prod.nome} - R${prod.valor}
                    <button onClick={() => setNovoProduto(prod)}>
                      Alterar
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(
                          'Produto',
                          prod.id,
                          'http://localhost:8080/estoque/produto/delete'
                        )
                      }
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Ingredientes */}
            <section>
              <h2 style={{ color: 'black' }}>Ingredientes</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const endpoint = `http://localhost:8080/estoque/ingrediente/${
                    novoIngrediente.id ? 'update' : 'create'
                  }`;
                  handleCreateOrUpdate(
                    'Ingrediente',
                    novoIngrediente,
                    endpoint,
                    !!novoIngrediente.id
                  );
                }}
              >
                <input
                  type="text"
                  placeholder="Nome"
                  value={novoIngrediente.nome}
                  onChange={(e) =>
                    setNovoIngrediente({
                      ...novoIngrediente,
                      nome: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  value={novoIngrediente.descricao}
                  onChange={(e) =>
                    setNovoIngrediente({
                      ...novoIngrediente,
                      descricao: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={novoIngrediente.quantidade}
                  onChange={(e) =>
                    setNovoIngrediente({
                      ...novoIngrediente,
                      quantidade: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Unidade"
                  value={novoIngrediente.unidade}
                  onChange={(e) =>
                    setNovoIngrediente({
                      ...novoIngrediente,
                      unidade: e.target.value,
                    })
                  }
                />
                <select
                  value={novoIngrediente.estoqueId}
                  onChange={(e) =>
                    setNovoIngrediente({
                      ...novoIngrediente,
                      estoqueId: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione o Estoque</option>
                  {estoques.map((est) => (
                    <option key={est.id} value={est.id}>
                      {est.nome}
                    </option>
                  ))}
                </select>
                <button type="submit" className="management-create-button">
                  {novoIngrediente.id ? 'Alterar' : 'Criar'}
                </button>
              </form>
              <ul>
                {ingredientes.map((ing) => (
                  <li key={ing.id}>
                    {ing.nome} - {ing.quantidade} {ing.unidade}
                    <button onClick={() => setNovoIngrediente(ing)}>
                      Alterar
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(
                          'Ingrediente',
                          ing.id,
                          'http://localhost:8080/estoque/ingrediente/delete'
                        )
                      }
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}

export default Management;
