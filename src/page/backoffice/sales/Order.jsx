import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';

function Order() {
  const navigate = useNavigate();

  // Função para redirecionar para Nova Comanda
  const handleNewOrder = () => {
    navigate('/backoffice/sales/neworder');
  };

  // Função para redirecionar para os detalhes de uma comanda
  const handleOrderDetails = (orderId) => {
    const formattedId = String(orderId).padStart(3, '0'); // Formata o ID com 3 dígitos
    navigate(`/backoffice/sales/orderdetails/${formattedId}`); // Navega para OrderDetails com ID formatado
  };

  return (
    <div className="order">
      {/* Título */}
      <h1 className="order-title">Comandas</h1>

      {/* Botões */}
      <div className="order-buttons">
        <button onClick={handleNewOrder}>Nova Comanda</button>
        <button>Fechar Caixa</button>
      </div>

      {/* Listas */}
      <div className="order-section">
        <div className="order-open">
          <h2>Abertas</h2>
          <ul>
            {/* Adicionando evento de clique para navegar para os detalhes */}
            <li onClick={() => handleOrderDetails(1)}>Comanda #001 - Mesa 5</li>
            <li onClick={() => handleOrderDetails(2)}>Comanda #002 - Mesa 3</li>
          </ul>
        </div>
        <div className="order-closed">
          <h2>Fechadas</h2>
          <ul>
            <li onClick={() => handleOrderDetails(3)}>Comanda #003 - Mesa 8</li>
            <li onClick={() => handleOrderDetails(4)}>Comanda #004 - Mesa 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Order;
