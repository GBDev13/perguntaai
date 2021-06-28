import { ReactNode, createContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import darkTheme from '../styles/darkTheme';
import lightTheme from '../styles/lightTheme';

type ThemeContextType = {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
};

type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('@perguntaai-theme');
    if(!savedTheme) {
      localStorage.setItem('@perguntaai-theme', 'dark');
    } else {
      setCurrentTheme(savedTheme)
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
