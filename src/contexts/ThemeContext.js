import React from 'react';
import { COLORS } from '../Theme/colors';
export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [COLORS, setTheme] = React.useState('light');

  const [colors, setColors] = React.useState(COLORS.light);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
