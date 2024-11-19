import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';

function Order() {
  const navigate = useNavigate();

  const handleNewOrder = () => {
    navigate('/backoffice/sales/neworder'); // Redireciona para a página de nova comanda
  };

  return (
    <div className="order">
      <h1>Orders</h1>
      <div className="order-buttons">
        <button onClick={handleNewOrder}>New Order</button> {/* Botão para nova comanda */}
        <button>Close Orders</button>
      </div>
      <div className="order-section">
        <div className="order-open">
          <h2>Open Orders</h2>
          {/* Lista de pedidos abertos */}
        </div>
        <div className="order-closed">
          <h2>Closed Orders</h2>
          {/* Lista de pedidos fechados */}
        </div>
      </div>
    </div>
  );
}

export default Order;
