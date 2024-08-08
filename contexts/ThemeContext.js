import React, { createContext, useState } from 'react';

const colorSchemes = {
  scheme1: {
    background: '#e3f2fd',
    text: '#0d47a1',
    fontSize: 16,
    navigationBar: '#1976d2',
    buttonBackground: '#6200ee',
    buttonText: '#ffffff',
  },
  scheme2: {
    background: '#fffde7',
    text: '#f57f17',
    fontSize: 16,
    navigationBar: '#fbc02d',
    buttonBackground: '#f57f17',
    buttonText: '#000000',
  },
};
const ThemeContext = createContext(false);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(colorSchemes.scheme1);

  const switchToScheme1 = () => {
    setTheme(colorSchemes.scheme1);
  };

  const switchToScheme2 = () => {
    setTheme(colorSchemes.scheme2);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchToScheme1, switchToScheme2 }}>
      {children}
    </ThemeContext.Provider>
  );
};
export {ThemeProvider};
export default ThemeContext;