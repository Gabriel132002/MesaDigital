import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderDetails.css';

function OrderDetails() {
  const { orderId } = useParams(); // Captura o ID da comanda
  const navigate = useNavigate();

  const handleNewRequest = () => {
    navigate('/backoffice/sales/newrequest');
  };

  const handleCloseOrder = () => {
    navigate(`/backoffice/sales/closeorder/${orderId}`);
  };

  return (
    <div className="order-details">
      {/* Título */}
      <h1 className="order-details-title">Comanda {orderId}</h1>

      {/* Botões */}
      <div className="order-details-buttons">
        <button onClick={handleNewRequest}>Novo Pedido</button>
        <button onClick={handleCloseOrder}>Fechar Comanda</button>
      </div>

      {/* Listas */}
      <div className="order-details-section">
        <div className="order-details-launched">
          <h2>Lançados</h2>
          <ul>
            <li>02 Espetinhos de Frango - Mesa 07</li>
            <li>01 Espetinho de Contra Filé - Mesa 07</li>
          </ul>
        </div>
        <div className="order-details-completed">
          <h2>Concluídos</h2>
          <ul>
            <li>02 Coca-Cola Zero - Mesa 07</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
