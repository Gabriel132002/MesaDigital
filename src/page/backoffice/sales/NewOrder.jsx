import React, { useState } from 'react';
import './NewOrder.css'; // Importa o CSS específico para o componente

function NewOrder() {
  const [orderDetails, setOrderDetails] = useState({
    title: '',
    name: '',
    description: '',
    price: '',
  });

  const handleInputChange = (field, value) => {
    setOrderDetails({ ...orderDetails, [field]: value });
  };

  return (
    <div className="new-order-container">
      <div className="new-order-card">
        <h1>Create New Order</h1>
        <div className="new-order-form">
          <input
            type="text"
            placeholder="Order Title"
            value={orderDetails.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={orderDetails.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={orderDetails.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            value={orderDetails.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
          />
          <button className="new-order-button">Add Order</button>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
