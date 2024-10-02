import { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import './DropDownProp.css';
import { useTheme } from './ThemeContext';

function DropDownProp() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme } = useTheme();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeChange = (theme) => {
    toggleTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button id="dropbtn" onClick={toggleDropDown}>
        Claro/Escuro
        {isOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      {isOpen && (
        <div className={`drop-content ${isOpen ? 'show' : ''}`}>
          <ul>
            <li onClick={() => handleThemeChange('light')}>Claro</li>
            <li onClick={() => handleThemeChange('dark')}>Escuro</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDownProp;
