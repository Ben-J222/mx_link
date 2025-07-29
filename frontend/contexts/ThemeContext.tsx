import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  colors: {
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    border: string;
    shadow: string;
  };
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    reducedMotion: boolean;
  };
}

const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    card: '#FFFFFF',
    text: '#000000',
    textSecondary: '#666666',
    primary: '#C4F112',
    secondary: '#8BC34A',
    accent: '#FF6B6B',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    border: '#E0E0E0',
    shadow: 'rgba(0,0,0,0.1)',
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
  },
};

const darkTheme: Theme = {
  colors: {
    background: '#000000',
    surface: '#1E1E1E',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#888888',
    primary: '#C4F112',
    secondary: '#8BC34A',
    accent: '#FF6B6B',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    border: '#333333',
    shadow: 'rgba(255,255,255,0.1)',
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
  },
};

const accessibleLightTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#FFFFFF',
    surface: '#F8F8F8',
    text: '#000000',
    textSecondary: '#333333',
    primary: '#1B5E20',
    border: '#000000',
  },
  accessibility: {
    highContrast: true,
    largeText: true,
    reducedMotion: true,
  },
};

const accessibleDarkTheme: Theme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    background: '#000000',
    surface: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    primary: '#00E676',
    border: '#FFFFFF',
  },
  accessibility: {
    highContrast: true,
    largeText: true,
    reducedMotion: true,
  },
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  isAccessible: boolean;
  toggleTheme: () => void;
  toggleAccessibility: () => void;
  setThemeMode: (isDark: boolean, isAccessible: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [isAccessible, setIsAccessible] = useState(false);

  useEffect(() => {
    loadThemePreferences();
  }, []);

  const loadThemePreferences = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme_mode');
      const savedAccessibility = await AsyncStorage.getItem('accessibility_mode');
      
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
      if (savedAccessibility !== null) {
        setIsAccessible(savedAccessibility === 'true');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des préférences:', error);
    }
  };

  const saveThemePreferences = async (darkMode: boolean, accessibilityMode: boolean) => {
    try {
      await AsyncStorage.setItem('theme_mode', darkMode ? 'dark' : 'light');
      await AsyncStorage.setItem('accessibility_mode', accessibilityMode.toString());
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
    }
  };

  const getTheme = (): Theme => {
    if (isAccessible) {
      return isDark ? accessibleDarkTheme : accessibleLightTheme;
    }
    return isDark ? darkTheme : lightTheme;
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    saveThemePreferences(newIsDark, isAccessible);
  };

  const toggleAccessibility = () => {
    const newIsAccessible = !isAccessible;
    setIsAccessible(newIsAccessible);
    saveThemePreferences(isDark, newIsAccessible);
  };

  const setThemeMode = (darkMode: boolean, accessibilityMode: boolean) => {
    setIsDark(darkMode);
    setIsAccessible(accessibilityMode);
    saveThemePreferences(darkMode, accessibilityMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: getTheme(),
        isDark,
        isAccessible,
        toggleTheme,
        toggleAccessibility,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};