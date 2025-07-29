import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Fingerprint, Eye } from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';

interface BiometricAuthProps {
  onSuccess: () => void;
  onCancel?: () => void;
  title?: string;
  subtitle?: string;
}

export default function BiometricAuth({ 
  onSuccess, 
  onCancel, 
  title = "Authentification biométrique",
  subtitle = "Utilisez votre empreinte ou Face ID pour vous connecter"
}: BiometricAuthProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [biometricType, setBiometricType] = useState<string>('');

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      
      setIsSupported(compatible && enrolled);
      
      if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        setBiometricType('Face ID');
      } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        setBiometricType('Touch ID');
      } else {
        setBiometricType('Biométrie');
      }
    } catch (error) {
      console.error('Erreur vérification biométrie:', error);
      setIsSupported(false);
    }
  };

  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: title,
        cancelLabel: 'Annuler',
        fallbackLabel: 'Utiliser le code',
        disableDeviceFallback: false,
      });

      if (result.success) {
        onSuccess();
      } else {
        if (result.error === 'user_cancel' || result.error === 'system_cancel') {
          onCancel?.();
        } else {
          Alert.alert(
            'Authentification échouée',
            'Impossible de vous authentifier. Veuillez réessayer.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Erreur authentification:', error);
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de l\'authentification.',
        [{ text: 'OK' }]
      );
    }
  };

  if (!isSupported) {
    return null;
  }

  const getIcon = () => {
    if (biometricType === 'Face ID') {
      return <Eye size={32} color="#C4F112" strokeWidth={2} />;
    }
    return <Fingerprint size={32} color="#C4F112" strokeWidth={2} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {getIcon()}
        </View>
        
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        
        <TouchableOpacity style={styles.authButton} onPress={authenticate}>
          <Text style={styles.authButtonText}>
            Utiliser {biometricType}
          </Text>
        </TouchableOpacity>
        
        {onCancel && (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#333333',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  authButton: {
    backgroundColor: '#C4F112',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    marginBottom: 16,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 12,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
});