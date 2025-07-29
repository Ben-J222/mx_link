import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAccessibility } from '@/hooks/useAccessibility';

interface ThemedViewProps {
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
  surface?: boolean;
  card?: boolean;
}

export const ThemedView: React.FC<ThemedViewProps> = ({ 
  style, 
  children, 
  surface = false, 
  card = false 
}) => {
  const { theme } = useTheme();
  
  const backgroundColor = card 
    ? theme.colors.card 
    : surface 
    ? theme.colors.surface 
    : theme.colors.background;

  return (
    <View style={[{ backgroundColor }, style]}>
      {children}
    </View>
  );
};

interface ThemedTextProps {
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  secondary?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  weight?: 'normal' | 'bold' | '600';
  accessibilityLabel?: string;
}

export const ThemedText: React.FC<ThemedTextProps> = ({ 
  style, 
  children, 
  secondary = false,
  size = 'medium',
  weight = 'normal',
  accessibilityLabel
}) => {
  const { theme } = useTheme();
  const { getFontSize, getAccessibleProps } = useAccessibility();
  
  const color = secondary ? theme.colors.textSecondary : theme.colors.text;
  
  const fontSize = {
    small: getFontSize(12),
    medium: getFontSize(16),
    large: getFontSize(20),
    xlarge: getFontSize(24),
  }[size];

  const fontWeight = weight === 'bold' ? 'bold' : weight === '600' ? '600' : 'normal';

  const accessibleProps = accessibilityLabel 
    ? getAccessibleProps(accessibilityLabel)
    : {};

  return (
    <Text 
      style={[{ color, fontSize, fontWeight }, style]}
      {...accessibleProps}
    >
      {children}
    </Text>
  );
};

interface ThemedButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  variant = 'primary',
  disabled = false,
  accessibilityLabel,
  accessibilityHint
}) => {
  const { theme } = useTheme();
  const { getAccessibleProps, getFontSize } = useAccessibility();

  const getButtonStyle = () => {
    const baseStyle = {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      opacity: disabled ? 0.6 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.primary,
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.error,
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return '#000000';
      case 'secondary':
        return theme.colors.text;
      case 'outline':
        return theme.colors.primary;
      case 'danger':
        return '#FFFFFF';
      default:
        return theme.colors.text;
    }
  };

  const accessibleProps = getAccessibleProps(
    accessibilityLabel || title,
    accessibilityHint,
    'button'
  );

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      {...accessibleProps}
    >
      <Text
        style={[
          {
            color: getTextColor(),
            fontSize: getFontSize(16),
            fontWeight: 'bold',
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface ThemedInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  multiline?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const ThemedInput: React.FC<ThemedInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  textStyle,
  multiline = false,
  secureTextEntry = false,
  keyboardType = 'default',
  accessibilityLabel,
  accessibilityHint
}) => {
  const { theme } = useTheme();
  const { getAccessibleProps, getFontSize } = useAccessibility();

  const inputStyle = {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: theme.colors.text,
    fontSize: getFontSize(16),
  };

  const accessibleProps = getAccessibleProps(
    accessibilityLabel || placeholder || 'Champ de saisie',
    accessibilityHint,
    'text'
  );

  return (
    <TextInput
      style={[inputStyle, style, textStyle]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textSecondary}
      multiline={multiline}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      {...accessibleProps}
    />
  );
};