import { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import './DropDownProp.css';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';

function DropDownProp() {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();

  const [selectedTheme, setSelectedTheme] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState('Português');
  const [languageCode, setLanguageCode] = useState('pt'); // Armazena o código do idioma

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

  const handleLanguageSelect = (language, code) => {
    setSelectedLanguage(language);
    setLanguageCode(code); // Armazena o código do idioma para uso posterior
    setIsLanguageOpen(false);
  };

  const handleSubmit = () => {
    toggleTheme(selectedTheme);
    i18n.changeLanguage(languageCode); // Aplica o idioma selecionado ao clicar em "Atualizar"
  };

  return (
    <div className="dropdown">
      {/* Botão de tema */}
      <button id="theme" onClick={toggleThemeDropDown}>
        {t('theme')}
        {isThemeOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      {isThemeOpen && (
        <div className={`drop-content ${isThemeOpen ? 'show' : ''}`}>
          <ul>
            <li onClick={() => handleThemeChange('light')}>{t('light')}</li>
            <li onClick={() => handleThemeChange('dark')}>{t('dark')}</li>
          </ul>
        </div>
      )}

      {/* Botão de idioma */}
      <button id="language" onClick={toggleLanguageDropDown}>
        {t('language')}: {selectedLanguage}
        {isLanguageOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      {isLanguageOpen && (
        <div className={`drop-content ${isLanguageOpen ? 'show' : ''}`}>
          <ul>
            <li onClick={() => handleLanguageSelect('Português', 'pt')}>Português</li>
            <li onClick={() => handleLanguageSelect('Inglês', 'en')}>Inglês</li>
          </ul>
        </div>
      )}

      {/* Botão de submissão */}
      <div id="submit-container">
        <button id="submit" type="button" onClick={handleSubmit}>
          {t('update')}
        </button>
      </div>
    </div>
  );
}

export default DropDownProp;
