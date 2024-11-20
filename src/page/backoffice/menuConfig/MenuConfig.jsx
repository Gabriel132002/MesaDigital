import './MenuConfig.css';
import SideBar from '../../SideBar';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

function MenuConfig() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [backgroundImageCover, setBackgroundImageCover] = useState('');
  const [imageContainerBackground, setImageContainerBackground] = useState('');

  const price = '00,00';

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImageCover(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div>
      <header>
        <div id="side-button-container">
          <button id="side-button" onClick={toggleSideBar}>
            <FaBars size={30} />
          </button>
        </div>
        {isSideBarOpen && <SideBar onClose={handleClose} />}
      </header>
      <div id="global-sales-card">
        <div
          id="Sales-page-card"
          style={{ backgroundImage: `url(${backgroundImageCover})` }}
        >
          {/* Botão para carregar a imagem */}
          <label
            htmlFor="imageUpload"
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              zIndex: 2,
            }}
          >
            Adicionar Imagem
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleUploadImage}
          />
          <div id="card-title">Cardápio</div>
        </div>
        <div id="create-section">Inserir seção</div>
        <form action="" method="post" id="form-sales-page">
          <div id="input-container">
            <input type="text" name="name" placeholder="Nome" />
            <input type="text" name="definition" placeholder="Definição" />
            <div id="price">Preço: R${price}</div>
          </div>
          <div
            id="image-container"
            onClick={() =>
              document.getElementById('imageInputContainer').click()
            }
          >
            {imageContainerBackground ? (
              <img src={imageContainerBackground} alt="User Upload" />
            ) : (
              <p>Adicionar uma imagem</p>
            )}
            <input
              id="imageInputContainer"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setImageContainerBackground(event.target.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </form>

        <div id="info-container">
          <div id="text-container">
            <div id="info-section">Seção criada</div>
            <p id="item-title">Item cardápio X</p>

            <div>Caractrística do item</div>
            <div>Preço: R${price}</div>
          </div>
          <img
            src={imageContainerBackground}
            alt="Item imagem"
            id="info-image"
            style={{
              height: '100px',
              width: '150px',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MenuConfig;