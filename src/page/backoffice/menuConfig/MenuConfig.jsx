import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const MenuConfig = () => {
  const [categorias, setCategorias] = useState([]);
  const [estoques, setEstoques] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [newCategory, setNewCategory] = useState({ nome: '', descricao: '', tipo: ''});
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    quantidade: 0,
    valor: 0.0,
    categoriaId: null,
    estoqueId: null,
    ingredientes: [],
  });

  useEffect(() => {
    axios.get("http://localhost:8080/cardapio/categoria/get-all").then((res) => setCategorias(res.data));
    axios.get("http://localhost:8080/estoque/ingrediente/get-all").then((res) => setIngredientes(res.data));
    axios.get("http://localhost:8080/mesa/estoque/get-all").then((res) => setEstoques(res.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/estoque/produto/create", produto);
      if (response.status === 200) {
        alert("Produto cadastrado com sucesso!");
        setProduto({
          nome: "",
          descricao: "",
          quantidade: 0,
          valor: 0.0,
          categoriaId: null,
          estoqueId: null,
          ingredientes: [],
        });
      }
    } catch (error) {
      alert("Erro ao cadastrar o produto. Verifique os dados." + error.message);
    }
  };
  const handleAddCategory = async () => {
    if (!newCategory.nome || !newCategory.descricao) {
      alert('Preencha todos os campos para adicionar uma categoria.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/cardapio/categoria/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        alert('Categoria criada com sucesso!');
        setNewCategory({ nome: '', descricao: '', tipo: '' });
        const updatedCategories = await fetch('http://localhost:8080/cardapio/categoria/get-all');
        const data = await updatedCategories.json();
        setCategorias(data);
      } else {
        alert('Erro ao criar categoria.');
      }
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", overflowY: "auto", height: "100%" }}>
      <h1>Cadastro de Categoria</h1>
      <div>
        <h3>Categorias Existentes</h3>
        <ul style={{ margin: '5%' }}>
          {categorias.map((category) => (
            <li key={category.id}>
              {category.nome} - {category.descricao} - {category.tipo}
            </li>
          ))}
        </ul>
      </div>

      {/* Formulário para adicionar uma nova categoria */}
      <div>
        <h2>Adicionar Nova Categoria</h2>
        <input
          type="text"
          placeholder="Nome"
          value={newCategory.nome}
          onChange={(e) => setNewCategory({ ...newCategory, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={newCategory.descricao}
          onChange={(e) => setNewCategory({ ...newCategory, descricao: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tipo"
          value={newCategory.tipo}
          onChange={(e) => setNewCategory({ ...newCategory, tipo: e.target.value })}
        />
        <button onClick={handleAddCategory}>Adicionar Categoria</button>
      </div>

      <h1>Cadastro de Produto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Produto</label>
          <input
            type="text"
            name="nome"
            value={produto.nome}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group" style={{ marginTop: 15, display: 'flex', flexDirection: 'column' }}>
          <label>Descrição</label>
          <input
            name="descricao"
            value={produto.descricao}
            onChange={handleInputChange}
            className="form-control"
            required
          ></input>
        </div>

        <div className="form-group">
          <label>Quantidade</label>
          <input
            type="number"
            name="quantidade"
            value={produto.quantidade}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Valor</label>
          <input
            type="number"
            name="valor"
            step="0.01"
            value={produto.valor}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Categoria</label>
          <Select
            options={categorias.map((cat) => ({
              value: cat.id,
              label: cat.nome,
            }))}
            onChange={(option) => handleSelectChange("categoriaId", option.value)}
            isClearable
          />
        </div>

        <div className="form-group">
          <label>Estoque</label>
          <Select
            options={estoques.map((estoque) => ({
              value: estoque.id,
              label: estoque.nome,
            }))}
            onChange={(option) => handleSelectChange("estoqueId", option.value)}
            isClearable
          />
        </div>

        <div className="form-group">
          <label>Ingredientes</label>
          <Select
            options={ingredientes.map((ing) => ({
              value: ing.id,
              label: ing.nome,
            }))}
            isMulti
            onChange={(options) =>
              handleSelectChange(
                "ingredientes",
                options.map((opt) => (opt.value))
              )
            }
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default MenuConfig;
