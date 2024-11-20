import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderDetails.css';

function OrderDetails() {
  const { orderId } = useParams(); // Captura o ID da comanda
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar detalhes da comanda
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/mesa/comanda/pedidos?comandaId=${orderId}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar detalhes da comanda: ${response.statusText}`);
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error(error);
        alert('Erro ao carregar detalhes da comanda.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Botão de novo pedido
  const handleNewRequest = () => {
    navigate('/backoffice/sales/newrequest');
  };

  // Botão de fechar comanda
  const handleCloseOrder = () => {
    navigate(`/backoffice/sales/closeorder/${orderId}`);
  };

  // Renderizar tela enquanto carrega
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Caso os detalhes não sejam encontrados
  if (!orderDetails) {
    return <div>Detalhes da comanda não encontrados.</div>;
  }

  // Separando os pedidos por status
  const launchedOrders = orderDetails.pedidos.filter(pedido => pedido.status === 'LANCADO');
  const completedOrders = orderDetails.pedidos.filter(pedido => pedido.status === 'CONCLUIDO');

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
        {/* Pedidos lançados */}
        <div className="order-details-launched">
          <h2>Lançados</h2>
          <ul>
            {launchedOrders.map(pedido => (
              <li key={pedido.id}>
                {pedido.id} - {pedido.comanda.numeroMesa} - {pedido.dataCriacao}
              </li>
            ))}
          </ul>
        </div>

        {/* Pedidos concluídos */}
        <div className="order-details-completed">
          <h2>Concluídos</h2>
          <ul>
            {completedOrders.map(pedido => (
              <li key={pedido.id}>
                {pedido.id} - {pedido.comanda.numeroMesa} - {pedido.dataCriacao}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
