import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Certifique-se de que 'react-icons' está instalado
import SideBar from '../../SideBar';
import './CriaItem.css'; // Importando o CSS atualizado

function CriaItem() {
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
      {isSideBarOpen && <SideBar onClose={handleClose} />}
      <div className="content">
        <header id="header-grid">
          <h1>Item Estoque</h1>
        </header>
        <form className="inventory-form">
          <select>
            <option>Local Armazenamento</option>
          </select>
          <input type="text" placeholder="Item Estoque" />
          <input type="text" placeholder="Validade: mm.aa" />
          <input type="text" placeholder="Fornecedor: Empresa X" />
          <input type="number" placeholder="Quantidade" />
          <div className="observation-container">
            <label id="label-observacao">
              <input type="checkbox" />
              Observação
            </label>
            <textarea></textarea>
          </div>
          <button className="register-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default CriaItem;