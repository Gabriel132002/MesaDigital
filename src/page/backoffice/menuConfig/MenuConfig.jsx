import { useState } from 'react';

import './MenuConfig.css';

function MenuConfig() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', section: '', name: '', description: '', price: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [image, setImage] = useState(null);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setNewItem({ ...newItem, [field]: value });
  };

  // Handle adding a new item
  const handleAddItem = () => {
    setMenuItems([...menuItems, { ...newItem, image }]);
    setNewItem({ title: '', section: '', name: '', description: '', price: '' });
    setImage(null);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle editing or deleting an item
  const handleEditOrDelete = (item, action) => {
    if (action === 'edit') {
      setEditingItem(item);
      setNewItem(item);
      setImage(item.image);
    } else if (action === 'delete') {
      setMenuItems(menuItems.filter((menuItem) => menuItem !== item));
    }
  };

  // Handle save edit
  const handleSaveEdit = () => {
    setMenuItems(menuItems.map((item) => (item === editingItem ? { ...newItem, image } : item)));
    setEditingItem(null);
    setNewItem({ title: '', section: '', name: '', description: '', price: '' });
    setImage(null);
  };

  return (
    <div className="menu-config">
      <h1>Configuração do Cardápio</h1>
      <div className="menu-inputs">
        <input
          type="text"
          placeholder="Inserir Título"
          value={newItem.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('section-input').focus()}
        />
        <input
          type="text"
          id="section-input"
          placeholder="Inserir Seção"
          value={newItem.section}
          onChange={(e) => handleInputChange('section', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('name-input').focus()}
        />
        <input
          type="text"
          id="name-input"
          placeholder="Nome do Item"
          value={newItem.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('description-input').focus()}
        />
        <input
          type="text"
          id="description-input"
          placeholder="Descrição"
          value={newItem.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('price-input').focus()}
        />
        <input
          type="text"
          id="price-input"
          placeholder="Preço"
          value={newItem.price}
          onChange={(e) => handleInputChange('price', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
        />
        <label htmlFor="image-upload" className="image-upload-label">
          {image ? <img src={image} alt="Imagem do item" /> : 'Selecionar Imagem'}
        </label>
        <input
          type="file"
          id="image-upload"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
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
            {item.image && <img src={item.image} alt={item.name} />}
            <h3>{item.title}</h3>
            <p><strong>Seção:</strong> {item.section}</p>
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
