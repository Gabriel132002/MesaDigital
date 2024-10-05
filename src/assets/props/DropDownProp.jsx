import { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import './DropDownProp.css';
import { useTheme } from './ThemeContext';

function DropDownProp() {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { toggleTheme } = useTheme();

  const [selectedTheme, setSelectedTheme] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState('portugues');

  const toggleThemeDropDown = () => {
    setIsThemeOpen(!isThemeOpen);
    if (isLanguageOpen) setIsLanguageOpen(false);
  };

  const toggleLanguageDropDown = () => {
    setIsLanguageOpen(!isLanguageOpen);
    if (isThemeOpen) setIsThemeOpen(false);
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    setIsThemeOpen(false);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
  };

  const handleSubmit = () => {
    toggleTheme(selectedTheme)
    
  };

  return (
    <div className="dropdown">
      {/* Theme button */}
      <button id="theme" onClick={toggleThemeDropDown}>
        Claro/Escuro
        {isThemeOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      {isThemeOpen && (
        <div className={`drop-content ${isThemeOpen ? 'show' : ''}`}>
          <ul>
            <li onClick={() => handleThemeChange('light')}>Claro</li>
            <li onClick={() => handleThemeChange('dark')}>Escuro</li>
          </ul>
        </div>
      )}

      {/* Language Button */}
      <button id="language" onClick={toggleLanguageDropDown}>
        Idioma
        {isLanguageOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      <div className={`drop-content ${isLanguageOpen ? 'show' : ''}`}>
        <ul>
          {/* <li>Português</li>
          <li>Inglês</li>
          <li>Espanhol</li> */}
        </ul>
      </div>
      {/* Submit button */}
      <div id="submit-container">
        <button id="submit" type="button" onClick={handleSubmit}>
          Atualizar
        </button>
      </div>
    </div>
  );
}

export default DropDownProp;
