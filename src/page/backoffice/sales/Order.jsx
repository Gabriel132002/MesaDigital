import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';
import axios from 'axios';

function Order() {
  const [comandas, setComandas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleNewOrder = () => {
    navigate('/backoffice/sales/neworder');
  };

  const handleOrderDetails = (orderId) => {
    const formattedId = String(orderId);
    navigate(`/backoffice/sales/orderdetails/${formattedId}`);
  };

  const comandasAbertas = comandas.filter((comanda) => comanda.status === "ABERTA");
  const comandasFechadas = comandas.filter((comanda) => comanda.status === "FECHADA");

  return (
    <div className="order">
      <h1 className="order-title">Comandas</h1>

      <div className="order-buttons">
        <button onClick={handleNewOrder}>Nova Comanda</button>
        <button>Fechar Caixa</button>
      </div>

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
                    Comanda #{String(comanda.id)} - Mesa {comanda.numeroMesa}
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
                    Comanda #{String(comanda.id)} - Mesa {comanda.numeroMesa}
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
