import { useTheme } from '@/contexts/ThemeContext';
import { AccessibilityInfo } from 'react-native';
import { useEffect, useState } from 'react';

export const useAccessibility = () => {
  const { theme, isAccessible } = useTheme();
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);

  useEffect(() => {
    // Vérifier si un lecteur d'écran est actif
    AccessibilityInfo.isScreenReaderEnabled().then(setScreenReaderEnabled);
    
    // Vérifier si l'utilisateur préfère moins d'animations
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotionEnabled);

    // Écouter les changements
    const screenReaderListener = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setScreenReaderEnabled
    );
    
    const reduceMotionListener = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotionEnabled
    );

    return () => {
      screenReaderListener?.remove();
      reduceMotionListener?.remove();
    };
  }, []);

  const getAccessibleProps = (label: string, hint?: string, role?: string) => ({
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityRole: role as any,
  });

  const getFontSize = (baseSize: number) => {
    return isAccessible || theme.accessibility.largeText ? baseSize * 1.2 : baseSize;
  };

  const getAnimationDuration = (baseDuration: number) => {
    return theme.accessibility.reducedMotion || reduceMotionEnabled ? 0 : baseDuration;
  };

  const getContrastRatio = () => {
    return theme.accessibility.highContrast ? 7 : 4.5; // WCAG AAA vs AA
  };

  return {
    screenReaderEnabled,
    reduceMotionEnabled,
    isAccessible,
    getAccessibleProps,
    getFontSize,
    getAnimationDuration,
    getContrastRatio,
    theme,
  };
};