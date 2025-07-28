import { Theme, ThemeContextType } from '@/interfaces/themeContext.interface';
import React, { createContext, useContext, useState } from 'react';
import { darkColors, lightColors } from '../constants/Colors';

const THEME_KEY = 'APP_THEME';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('dark'); // Default to dark

    //   useEffect(() => {
    //     const loadTheme = async () => {
    //       const savedTheme = await getFromSecureStorage(THEME_KEY);

    //       if (savedTheme === 'light' || savedTheme === 'dark') {
    //         setTheme(savedTheme);
    //       } else {
    //         await saveToSecureStorage(THEME_KEY, 'dark');
    //       }
    //     };

    //     loadTheme();
    //   }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        // await saveToSecureStorage(THEME_KEY, newTheme);
    };

    const colors = theme === 'dark' ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
