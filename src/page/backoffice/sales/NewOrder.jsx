import React, { useState, useEffect } from 'react';
import './NewOrder.css'; // Importa o CSS específico para o componente

function NewOrder() {
  const [orderDetails, setOrderDetails] = useState({
    number: '', // Número da comanda
    employee: '', // ID do funcionário responsável
    table: '', // Número da mesa
    observation: '', // Observação
  });

  const [employees, setEmployees] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para buscar os funcionários do backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/list/users');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleInputChange = (field, value) => {
    setOrderDetails({ ...orderDetails, [field]: value });
  };

  // Função para criar uma nova comanda
  const handleCreateOrder = async () => {
    setIsSubmitting(true);
    const { number, employee, table, observation } = orderDetails;

    // Validação básica
    if (!number || !employee || !table) {
      alert('Preencha todos os campos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/mesa/comanda/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          numComanda: parseInt(number, 10),
          funcionarioId: parseInt(employee, 10),
          numMesa: parseInt(table, 10),
          observacao: observation,
        }),
      });

      if (response.ok) {
        alert('Comanda criada com sucesso!');
        setOrderDetails({ number: '', employee: '', table: '', observation: '' });
      } else {
        alert('Erro ao criar comanda.');
      }
    } catch (error) {
      console.error('Erro ao criar comanda:', error);
      alert('Erro ao criar comanda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-order-container">
      <div className="new-order-card">
        <h1>Criar Comanda</h1>
        <div className="new-order-form">
          {/* Número da Comanda */}
          <input
            type="number"
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
              employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.nome}
                </option>
              ))
            ) : (
              <option disabled>Nenhum funcionário cadastrado</option>
            )}
          </select>

          {/* Número da Mesa */}
          <input
            type="number"
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
          <button
            className="new-order-button"
            onClick={handleCreateOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Criando...' : 'Criar Comanda'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
