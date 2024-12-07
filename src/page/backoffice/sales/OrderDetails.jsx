import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderDetails.css';

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFechada, setFechada] = useState(false);

  useEffect(() => {
    const fetchComanda= async () => {
      try {
        const response = await fetch(`http://localhost:8080/mesa/comanda/get?id=${orderId}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar detalhes da comanda: ${response.statusText}`);
        }
        const data = await response.json();
        if(data.status === "FECHADA") {
          setFechada(true);
        }
      } catch (error) {
        console.error(error);
        alert('Erro ao carregar detalhes da comanda.');
      } finally {
        setIsLoading(false);
      }
    };

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

    fetchComanda()
    fetchOrderDetails();
  }, [orderId]);

  // Botão de novo pedido
  const handleNewRequest = () => {
    navigate(`/backoffice/sales/newrequest/${orderId}`);
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

  return (
    <div className="order-details">
      {/* Título */}
      <h1 className="order-details-title">Comanda {orderId} - Mesa {orderDetails.pedidos[0]?.pedido?.comanda?.numeroMesa}</h1>

      {/* Botões */}
      {!isFechada ? (
        <div className="order-details-buttons">
          <button onClick={handleNewRequest}>Novo Pedido</button>
          <button onClick={handleCloseOrder}>Fechar Comanda</button>
        </div>
      ): null}

      {/* Listas */}
      <div className="order-details-section">
        {orderDetails.pedidos.map((pedidoItem) => (
          <div key={pedidoItem.pedido.id} className="order-details-completed">
            <h2>
              Pedido {pedidoItem.pedido.id} - {pedidoItem.pedido.status === 'LANCADO' ? 'Lançado' : 'Concluído'}
            </h2>
            <ul>
              {pedidoItem.produtos.map((produto) => (
                <li key={produto.id}>
                  {produto.nome} - R$ {produto.valor.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;
