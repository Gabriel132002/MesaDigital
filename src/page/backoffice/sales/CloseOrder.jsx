import React from 'react';
import { useParams } from 'react-router-dom';
import './CloseOrder.css';

function CloseOrder() {
  const { orderId } = useParams();

  return (
    <div className="close-order">
      <h1>Fechamento da Comanda {orderId}</h1>
      <div className="close-order-section">
        <div className="close-order-check">
          <h2>Conferir Pedidos</h2>
          <ul>
            {/* Simulando itens da comanda */}
            <li>Item 1 - Mesa 5</li>
            <li>Item 2 - Mesa 5</li>
          </ul>
        </div>
        <div className="close-order-payment">
          <h2>Pagamento</h2>
          <select>
            <option>Forma de Pagamento</option>
            <option>Dinheiro</option>
            <option>Cartão de Crédito</option>
          </select>
          <p>Valor: R$ 00,00</p>
          <p>Troco: R$ 00,00</p>
          <button>Concluir</button>
        </div>
      </div>
    </div>
  );
}

export default CloseOrder;
