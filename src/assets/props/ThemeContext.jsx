/* eslint-disable react/prop-types */
// ThemeContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // ou 'dark'

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.className = theme; // Aplica a classe ao body
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
