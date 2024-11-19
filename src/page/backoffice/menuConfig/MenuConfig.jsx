import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa'; // Ícone para imagem
import './MenuConfig.css';

function MenuConfig() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', name: '', description: '', price: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [image, setImage] = useState(null);

  // Manipular mudanças nos campos de entrada
  const handleInputChange = (field, value) => {
    setNewItem({ ...newItem, [field]: value });
  };

  // Adicionar novo item
  const handleAddItem = () => {
    setMenuItems([...menuItems, { ...newItem, image }]);
    setNewItem({ title: '', name: '', description: '', price: '' });
    setImage(null);
  };

  // Upload de imagem
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Edição e exclusão de itens
  const handleEditOrDelete = (item, action) => {
    if (action === 'edit') {
      setEditingItem(item);
      setNewItem(item);
      setImage(item.image);
    } else if (action === 'delete') {
      setMenuItems(menuItems.filter((menuItem) => menuItem !== item));
    }
  };

  // Salvar edições
  const handleSaveEdit = () => {
    setMenuItems(menuItems.map((item) => (item === editingItem ? { ...newItem, image } : item)));
    setEditingItem(null);
    setNewItem({ title: '', name: '', description: '', price: '' });
    setImage(null);
  };

  return (
    <div className="menu-config">
      <div className="header">
        <h1>Inserir Título</h1>
        <label htmlFor="image-upload" className="image-upload-label">
          <FaImage />
        </label>
        <input
          type="file"
          id="image-upload"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
      </div>

      <div className="menu-inputs">
        <input
          type="text"
          placeholder="Inserir seção"
          value={newItem.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('name-input').focus()}
        />
        <input
          type="text"
          id="name-input"
          placeholder="Nome"
          value={newItem.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('description-input').focus()}
        />
        <textarea
          id="description-input"
          placeholder="Descrição"
          value={newItem.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('price-input').focus()}
        />
        <input
          type="text"
          id="price-input"
          placeholder="Preço R$ 00,00"
          value={newItem.price}
          onChange={(e) => handleInputChange('price', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
        />
      </div>

      {editingItem ? (
        <button onClick={handleSaveEdit}>Salvar Edição</button>
      ) : (
        <button onClick={handleAddItem}>Adicionar Item</button>
      )}

      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-item"
            onContextMenu={(e) => {
              e.preventDefault();
              handleEditOrDelete(item, 'edit');
            }}
            onDoubleClick={() => handleEditOrDelete(item, 'delete')}
          >
            {item.image && <img src={item.image} alt="Imagem do item" />}
            <h3>{item.title}</h3>
            <p><strong>Nome:</strong> {item.name}</p>
            <p><strong>Descrição:</strong> {item.description}</p>
            <p><strong>Preço:</strong> R$ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuConfig;
