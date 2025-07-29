import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Dimensions } from 'react-native';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react-native';
import { Link, router } from 'expo-router';
import BiometricAuth from '@/components/BiometricAuth';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import LoadingSpinner from '@/components/LoadingSpinner';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showBiometric, setShowBiometric] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast, showSuccess, showError, hideToast } = useToast();

  const handleLogin = () => {
    setLoading(true);
    
    // Validation basique
    if (!email || !password) {
      setLoading(false);
      showError('Veuillez remplir tous les champs');
      return;
    }
    
    if (!email.includes('@')) {
      setLoading(false);
      showError('Format d\'email invalide');
      return;
    }
    
    // Simulate login process
    const timeoutId = setTimeout(() => {
      setLoading(false);
      showSuccess('Connexion réussie !');
      const routerTimeoutId = setTimeout(() => {
        router.push('/(tabs)');
      }, 1000);
      return () => clearTimeout(routerTimeoutId);
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  };
  
  const handleBiometricSuccess = () => {
    setShowBiometric(false);
    showSuccess('Authentification biométrique réussie !');
    setTimeout(() => {
      router.push('/(tabs)');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />
      
      {showBiometric && (
        <BiometricAuth
          onSuccess={handleBiometricSuccess}
          onCancel={() => setShowBiometric(false)}
        />
      )}
      
      {/* Background avec overlay */}
      <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundImage} />
        <View style={styles.overlay} />
      </View>

      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoSymbol}>⟨⟩</Text>
          </View>
          <Text style={styles.logoText}>MX-LINK</Text>
          <Text style={styles.tagline}>SYSTÈME D'AUTHENTIFICATION</Text>
        </View>

        {/* Badges */}
        <View style={styles.badges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🔒 SÉCURISÉ</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⚡ RAPIDE</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🛡️ FIABLE</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>CONNEXION</Text>
          <Text style={styles.formSubtitle}>ACCÉDEZ À VOTRE ESPACE MX-LINK</Text>

          <View style={styles.inputGroup}>
            <Mail size={20} color="#C4F112" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="votre@email.com"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Lock size={20} color="#C4F112" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="•••••••"
              placeholderTextColor="#666666"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="#666666" />
              ) : (
                <Eye size={20} color="#666666" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner size={20} color="#000000" />
            ) : (
              <>
                <Text style={styles.submitButtonText}>SE CONNECTER</Text>
                <ArrowRight size={20} color="#000000" />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.biometricButton}
            onPress={() => setShowBiometric(true)}
          >
            <Text style={styles.biometricButtonText}>Utiliser la biométrie</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom link */}
        <View style={styles.registerLink}>
          <Text style={styles.registerText}>Pas encore de compte ?</Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>CRÉER UN COMPTE</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    opacity: 0.3,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'center',
    zIndex: 1,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(196, 241, 18, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#C4F112',
  },
  logoSymbol: {
    fontSize: 32,
    color: '#C4F112',
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 12,
    color: '#888888',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  badges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 40,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(196, 241, 18, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(196, 241, 18, 0.3)',
  },
  badgeText: {
    fontSize: 10,
    color: '#C4F112',
    fontWeight: '600',
  },
  form: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: '#333333',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C4F112',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  formSubtitle: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 1,
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 20,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    paddingHorizontal: 48,
    paddingVertical: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4F112',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  biometricButton: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  biometricButtonText: {
    fontSize: 14,
    color: '#C4F112',
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#C4F112',
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 32,
  },
  registerText: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#C4F112',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});