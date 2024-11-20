import React, { useState } from 'react';
import './NewOrder.css'; // Importa o CSS específico para o componente

function NewOrder() {
  const [orderDetails, setOrderDetails] = useState({
    number: '', // Número da comanda
    employee: '', // Funcionário responsável
    table: '', // Número da mesa
    observation: '', // Observação
  });

  // Simulando funcionários cadastrados (substitua por dados reais, se necessário)
  const employees = []; // Deixe vazio para testar a mensagem "Nenhum funcionário cadastrado"

  const handleInputChange = (field, value) => {
    setOrderDetails({ ...orderDetails, [field]: value });
  };

  return (
    <div className="new-order-container">
      <div className="new-order-card">
        <h1>Criar Comanda</h1>
        <div className="new-order-form">
          {/* Número da Comanda */}
          <input
            type="text"
            placeholder="Número da Comanda"
            value={orderDetails.number}
            onChange={(e) => handleInputChange('number', e.target.value)}
          />

          {/* Funcionário Responsável */}
          <select
            value={orderDetails.employee}
            onChange={(e) => handleInputChange('employee', e.target.value)}
          >
            <option value="" disabled>
              Selecionar Funcionário
            </option>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <option key={index} value={employee}>
                  {employee}
                </option>
              ))
            ) : (
              <option disabled>Nenhum funcionário cadastrado</option>
            )}
          </select>

          {/* Número da Mesa */}
          <input
            type="text"
            placeholder="Número da Mesa"
            value={orderDetails.table}
            onChange={(e) => handleInputChange('table', e.target.value)}
          />

          {/* Observação */}
          <textarea
            placeholder="Observação"
            value={orderDetails.observation}
            onChange={(e) => handleInputChange('observation', e.target.value)}
          />

          {/* Botão Criar Comanda */}
          <button className="new-order-button">Criar Comanda</button>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
