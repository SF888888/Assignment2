import React, { createContext, useState } from 'react';

const colorSchemes = {
  scheme1: {
    background: '#e3f2fd',
    text: '#0d47a1',
    navigationBar: '#1976d2',
  },
  scheme2: {
    background: '#fffde7',
    text: '#f57f17',
    navigationBar: '#fbc02d',
  },
};
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
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
export default ThemeContext;