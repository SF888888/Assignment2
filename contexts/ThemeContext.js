import React, { createContext, useState } from 'react';
import { colors } from './Styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(colors.light);

  const toggleTheme = () => {
    setTheme(theme === colors.light ? colors.dark : colors.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
