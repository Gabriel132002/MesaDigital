import React from 'react';
import './NewRequest.css';

function NewRequest() {
  return (
    <div className="new-request" >
      <h1>Novo Pedido</h1>
      <form className="new-request-form">
        <label>
          Categoria:
          <select>
            <option value="">Selecione</option>
            {/* Opções de categoria */}
          </select>
        </label>
        <label>
          Item Pedido:
          <select>
            <option value="">Selecione</option>
            {/* Opções de itens */}
          </select>
        </label>
        <label>
          Mesa:
          <input type="number" min="1" />
        </label>
        <label>
          Quantidade:
          <input type="number" min="1" />
        </label>
        <label>
          Observação:
          <textarea />
        </label>
        <button type="submit">Lançar Pedido</button>
      </form>
    </div>
  );
}

export default NewRequest;
