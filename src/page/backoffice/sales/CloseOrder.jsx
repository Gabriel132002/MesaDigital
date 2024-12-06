import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CloseOrder.css';

function CloseOrder() {
  const { orderId } = useParams();
  const [pedidos, setPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [atendente, setAtendente] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [total, setTotal] = useState(0);
  const [totalGarcom, setTotalGarcom] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pedidos
        const pedidosResponse = await fetch(`http://localhost:8080/mesa/comanda/pedidos?comandaId=${orderId}`);
        const pedidosData = await pedidosResponse.json();

        // Fetch atendente
        const atendenteResponse = await fetch(`http://localhost:8080/mesa/comanda/get?id=${orderId}`);
        const atendenteData = await atendenteResponse.json();

        setIsLoading(false);
        setAtendente(atendenteData.atendente || { nome: 'Indisponível' });
        setPedidos(pedidosData.pedidos || []);
        setProdutos(pedidosData.pedidos.map((pedido) => pedido.produtos));
        calcularTotal();
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  const calcularTotal = () => {

    let valor = 0;
      for(const p in produtos){
        for (const v in produtos[p]) {
          valor = valor + produtos[p][v].valor;
        }
    }
    const totalPedidos = valor;
    const garcom = totalPedidos * 0.1;
    setTotal(totalPedidos);
    setTotalGarcom(totalPedidos + garcom);
  };

  const handleConcluir = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:8080/mesa/comanda/fechar?comandaId=${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        alert('Comanda fechada com sucesso!');
      } else {
        alert('Erro ao fechar comanda');
      }
    } catch (error) {
      console.error('Erro ao fechar comanda:', error);
      alert('Erro ao fechar comanda');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPedidos = () => {
    if (pedidos.length === 0) {
      return <li>Nenhum pedido encontrado.</li>;
    }

    return pedidos.map((pedido, index) => (
      pedido.produtos.map((prato) => (
        <li key={index}>
          {prato.nome} - Mesa {pedido.mesa} - R$ {prato.valor}
        </li>
      ))
    ));
  };

  if (isLoading) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div className="close-order">
      <h1>Fechamento da Comanda {orderId}</h1>
      <div className="close-order-section">
        <div className="close-order-check">
          <h2>Conferir Pedidos</h2>
          <ul>
            {renderPedidos()}
          </ul>
        </div>
        <div className="close-order-payment">
          <h2>Pagamento</h2>
          {total === 0 ?
            <button className={"close-order-button"} style={{ height: "20%"}} onClick={calcularTotal}>Calcular Total</button>
            :
            <div>
              <p>Atendente: {atendente ? atendente.nome : 'Indisponível'}</p>
              <p>Valor Total: R$ {total}</p>
              <p>Valor + 10%: R$ {totalGarcom}</p>
            </div>
          }
          <label style={{ marginTop:'10px' }}>
            Forma de Pagamento:
            <select
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
            >
              <option value="">Selecionar</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
            </select>
          </label>
          <button className={"close-order-button"} onClick={handleConcluir} disabled={isSubmitting}>
            {isSubmitting ? 'Concluindo...' : 'Concluir'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CloseOrder;
