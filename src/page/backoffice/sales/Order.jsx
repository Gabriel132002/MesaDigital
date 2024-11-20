import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';
import axios from 'axios';

function Order() {
  const [comandas, setComandas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Função para buscar todas as comandas
  useEffect(() => {
    const fetchComandas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/mesa/comanda/get-all");
        setComandas(response.data);
      } catch (err) {
        setError("Erro ao carregar comandas. Tente novamente." + err);
      } finally {
        setLoading(false);
      }
    };
    fetchComandas();
  }, []);

  // Função para redirecionar para Nova Comanda
  const handleNewOrder = () => {
    navigate('/backoffice/sales/neworder');
  };

  // Função para redirecionar para os detalhes de uma comanda
  const handleOrderDetails = (orderId) => {
    const formattedId = String(orderId).padStart(3, '0'); // Formata o ID com 3 dígitos
    navigate(`/backoffice/sales/orderdetails/${formattedId}`); // Navega para OrderDetails com ID formatado
  };

  // Filtrar comandas abertas e fechadas
  const comandasAbertas = comandas.filter((comanda) => comanda.status === "ABERTA");
  const comandasFechadas = comandas.filter((comanda) => comanda.status === "FECHADA");

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
      {loading && <p>Carregando comandas...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="order-section">
          <div className="order-open">
            <h2>Abertas</h2>
            {comandasAbertas.length > 0 ? (
              <ul>
                {comandasAbertas.map((comanda) => (
                  <li key={comanda.id} onClick={() => handleOrderDetails(comanda.id)}>
                    Comanda #{String(comanda.id).padStart(3, '0')} - Mesa {comanda.numeroMesa} - R$ {comanda.valor}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma comanda aberta.</p>
            )}
          </div>
          <div className="order-closed">
            <h2>Fechadas</h2>
            {comandasFechadas.length > 0 ? (
              <ul>
                {comandasFechadas.map((comanda) => (
                  <li key={comanda.id} onClick={() => handleOrderDetails(comanda.id)}>
                    Comanda #{String(comanda.id).padStart(3, '0')} - Mesa {comanda.numeroMesa} - R$ {comanda.valor}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma comanda fechada.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
