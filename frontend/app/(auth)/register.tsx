import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowRight, User, Mail, Phone, Lock, Eye, EyeOff, Check, MapPin, Calendar } from 'lucide-react-native';
import { Link, router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView, ThemedText, ThemedButton, ThemedInput } from '@/components/ThemedComponents';
import { useAccessibility } from '@/hooks/useAccessibility';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const { theme, setThemeMode } = useTheme();
  const { getAccessibleProps } = useAccessibility();
  
  const [formData, setFormData] = useState({
    // Authentification
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    
    // Identité légale
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    
    // Adresse postale
    numero_voie: '',
    nom_voie: '',
    code_postal: '',
    commune: '',
    complement_adresse: '',
    adresse_complete: '', // Pour la recherche
    
    // Profil public
    pseudo: '',
    biographie: '',
    
    // Rôle
    role: 'particulier',
    
    // Conditions
    acceptTerms: false,
    newsletter: false,
    
    // Préférences
    themeMode: 'dark', // 'light' ou 'dark'
    accessibilityMode: false,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Recherche d'adresse via API Adresse .gouv
  const searchAddress = async (query: string) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
      return;
    }

    try {
      const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      setAddressSuggestions(data.features || []);
      setShowAddressSuggestions(true);
    } catch (error) {
      console.error('Erreur recherche adresse:', error);
    }
  };

  const selectAddress = (feature: any) => {
    const properties = feature.properties;
    updateFormData('numero_voie', properties.housenumber || '');
    updateFormData('nom_voie', properties.street || '');
    updateFormData('code_postal', properties.postcode || '');
    updateFormData('commune', properties.city || '');
    updateFormData('adresse_complete', properties.label || '');
    setShowAddressSuggestions(false);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length < 4) return { strength: 0, label: 'Faible', color: '#FF6B6B' };
    if (password.length < 8) return { strength: 33, label: 'Moyen', color: '#FFA726' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 100, label: 'Fort', color: '#4CAF50' };
    }
    return { strength: 66, label: 'Correct', color: '#C4F112' };
  };

  const roleOptions = [
    { label: 'Particulier', value: 'particulier' },
    { label: 'Garage/Professionnel', value: 'garage' },
  ];

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
          Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
          return false;
        }
        if (!formData.email.includes('@')) {
          Alert.alert('Erreur', 'Format d\'email invalide');
          return false;
        }
        if (formData.telephone.length < 10) {
          Alert.alert('Erreur', 'Numéro de téléphone invalide');
          return false;
        }
        break;
      case 2:
        if (!formData.date_naissance || !formData.lieu_naissance || !formData.pseudo) {
          Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
          return false;
        }
        if (formData.pseudo.length < 3) {
          Alert.alert('Erreur', 'Le pseudo doit contenir au moins 3 caractères');
          return false;
        }
        break;
      case 3:
        if (!formData.adresse_complete || !formData.code_postal || !formData.commune) {
          Alert.alert('Erreur', 'Veuillez sélectionner une adresse valide');
          return false;
        }
        break;
      case 4:
        if (!formData.password || !formData.confirmPassword) {
          Alert.alert('Erreur', 'Veuillez remplir les champs mot de passe');
          return false;
        }
        if (formData.password.length < 8) {
          Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
          return false;
        }
        break;
      case 5:
        if (!formData.acceptTerms) {
          Alert.alert('Erreur', 'Vous devez accepter les conditions d\'utilisation');
          return false;
        }
        break;
    }
    return true;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <User size={20} color="#C4F112" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.prenom}
                  onChangeText={(text) => updateFormData('prenom', text)}
                  placeholder="Prénom"
                  placeholderTextColor="#666666"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <User size={20} color="#C4F112" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.nom}
                  onChangeText={(text) => updateFormData('nom', text)}
                  placeholder="Nom"
                  placeholderTextColor="#666666"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Mail size={20} color="#C4F112" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => updateFormData('email', text)}
                placeholder="votre@email.com"
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Phone size={20} color="#C4F112" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.telephone}
                onChangeText={(text) => updateFormData('telephone', text)}
                placeholder="06 XX XX XX XX"
                placeholderTextColor="#666666"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Type de compte</Text>
                <Picker
                  selectedValue={formData.role}
                  onValueChange={(value) => updateFormData('role', value)}
                  style={styles.picker}
                  dropdownIconColor="#C4F112"
                >
                  {roleOptions.map((option) => (
                    <Picker.Item 
                      key={option.value} 
                      label={option.label} 
                      value={option.value}
                      color="#FFFFFF"
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </>
        );

      case 2:
        return (
          <>
            <View style={styles.inputGroup}>
              <Calendar size={20} color="#C4F112" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.date_naissance}
                onChangeText={(text) => updateFormData('date_naissance', text)}
                placeholder="Date de naissance (JJ/MM/AAAA)"
                placeholderTextColor="#666666"
              />
            </View>

            <View style={styles.inputGroup}>
              <MapPin size={20} color="#C4F112" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.lieu_naissance}
                onChangeText={(text) => updateFormData('lieu_naissance', text)}
                placeholder="Lieu de naissance"
                placeholderTextColor="#666666"
              />
            </View>

            <View style={styles.inputGroup}>
              <User size={20} color="#C4F112" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.pseudo}
                onChangeText={(text) => updateFormData('pseudo', text)}
                placeholder="Pseudo (unique)"
                placeholderTextColor="#666666"
              />
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.biographie}
                onChangeText={(text) => updateFormData('biographie', text)}
                placeholder="Biographie (optionnel)"
                placeholderTextColor="#666666"
                multiline={true}
                numberOfLines={3}
              />
            </View>
          </>
        );

      case 3:
        return (
          <>
            <View style={styles.inputGroup}>
              <MapPin size={20} color="#C4F112" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.adresse_complete}
                onChangeText={(text) => {
                  updateFormData('adresse_complete', text);
                  searchAddress(text);
                }}
                placeholder="Rechercher votre adresse..."
                placeholderTextColor="#666666"
              />
            </View>

            {showAddressSuggestions && addressSuggestions.length > 0 && (
              <View style={styles.suggestionsList}>
                {addressSuggestions.map((suggestion: any, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => selectAddress(suggestion)}
                  >
                    <Text style={styles.suggestionText}>
                      {suggestion?.properties?.label || ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <TextInput
                  style={styles.input}
                  value={formData.numero_voie}
                  onChangeText={(text) => updateFormData('numero_voie', text)}
                  placeholder="N° voie"
                  placeholderTextColor="#666666"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 2, marginLeft: 8 }]}>
                <TextInput
                  style={styles.input}
                  value={formData.nom_voie}
                  onChangeText={(text) => updateFormData('nom_voie', text)}
                  placeholder="Nom de la voie"
                  placeholderTextColor="#666666"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <TextInput
                  style={styles.input}
                  value={formData.code_postal}
                  onChangeText={(text) => updateFormData('code_postal', text)}
                  placeholder="Code postal"
                  placeholderTextColor="#666666"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 2, marginLeft: 8 }]}>
                <TextInput
                  style={styles.input}
                  value={formData.commune}
                  onChangeText={(text) => updateFormData('commune', text)}
                  placeholder="Commune"
                  placeholderTextColor="#666666"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                value={formData.complement_adresse}
                onChangeText={(text) => updateFormData('complement_adresse', text)}
                placeholder="Complément d'adresse (optionnel)"
                placeholderTextColor="#666666"
              />
            </View>
          </>
        );

      case 4:
        const passwordStrength = getPasswordStrength();
        return (
          <>
            <View style={styles.inputGroup}>
              <Lock size={20} color="#C4F112" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(text) => updateFormData('password', text)}
                placeholder="Mot de passe (min. 8 caractères)"
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

            <View style={styles.passwordStrength}>
              <View style={styles.strengthBar}>
                <View 
                  style={[
                    styles.strengthFill, 
                    { 
                      width: `${passwordStrength.strength}%`,
                      backgroundColor: passwordStrength.color 
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                {passwordStrength.label}
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Lock size={20} color="#C4F112" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={(text) => updateFormData('confirmPassword', text)}
                placeholder="Confirmer le mot de passe"
                placeholderTextColor="#666666"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#666666" />
                ) : (
                  <Eye size={20} color="#666666" />
                )}
              </TouchableOpacity>
            </View>
          </>
        );

      case 5:
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={{fontSize:14, color:'#C4F112', marginBottom:8}}>Préférences d'affichage</Text>
              <View style={styles.themeSelector}>
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    formData.themeMode === 'light' && styles.themeOptionSelected
                  ]}
                  onPress={() => updateFormData('themeMode', 'light')}
                  {...getAccessibleProps('Mode clair', 'Sélectionner le thème clair')}
                >
                  <Text style={[
                    styles.themeOptionText,
                    formData.themeMode === 'light' && styles.themeOptionTextSelected
                  ]}>
                    🌞 Mode Clair
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    formData.themeMode === 'dark' && styles.themeOptionSelected
                  ]}
                  onPress={() => updateFormData('themeMode', 'dark')}
                  {...getAccessibleProps('Mode sombre', 'Sélectionner le thème sombre')}
                >
                  <Text style={[
                    styles.themeOptionText,
                    formData.themeMode === 'dark' && styles.themeOptionTextSelected
                  ]}>
                    🌙 Mode Sombre
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.checkboxGroup}
              onPress={() => updateFormData('accessibilityMode', !formData.accessibilityMode)}
              {...getAccessibleProps(
                'Mode accessible',
                'Active les fonctionnalités d\'accessibilité pour malvoyants et dyslexiques'
              )}
            >
              <View style={[styles.checkbox, formData.accessibilityMode && styles.checkboxChecked]}>
                {formData.accessibilityMode && <Check size={16} color="#000000" />}
              </View>
              <View style={styles.accessibilityInfo}>
                <Text style={styles.checkboxLabel}>
                  Mode accessible
                </Text>
                <Text style={{fontSize:12, color:'#888', marginTop:2}}>
                  Améliore l'expérience pour les personnes malvoyantes, dyslexiques ou à mobilité réduite
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.checkboxGroup}
              onPress={() => updateFormData('acceptTerms', !formData.acceptTerms)}
            >
              <View style={[styles.checkbox, formData.acceptTerms && styles.checkboxChecked]}>
                {formData.acceptTerms && <Check size={16} color="#000000" />}
              </View>
              <Text style={styles.checkboxLabel}>
                J'accepte les <Text style={styles.link}>conditions d'utilisation</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.checkboxGroup}
              onPress={() => updateFormData('newsletter', !formData.newsletter)}
            >
              <View style={[styles.checkbox, formData.newsletter && styles.checkboxChecked]}>
                {formData.newsletter && <Check size={16} color="#000000" />}
              </View>
              <Text style={styles.checkboxLabel}>
                Je souhaite recevoir les actualités MX-Link
              </Text>
            </TouchableOpacity>

            <View style={styles.settingsNote}>
              <Text style={styles.settingsNoteText}>
                💡 Ces préférences peuvent être modifiées à tout moment dans les paramètres de l'application.
              </Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Récapitulatif</Text>
              <Text style={styles.summaryText}>
                {formData.prenom} {formData.nom}
              </Text>
              <Text style={styles.summaryText}>{formData.email}</Text>
              <Text style={styles.summaryText}>{formData.telephone}</Text>
              <Text style={styles.summaryText}>@{formData.pseudo}</Text>
              <Text style={styles.summaryText}>{formData.adresse_complete}</Text>
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundImage} />
        <View style={styles.overlay} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => step > 1 ? setStep(step - 1) : router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.logoSection}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoSymbol}>⟨⟩</Text>
          </View>
          <Text style={styles.logoText}>MX-LINK</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(step / 5) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>Étape {step} sur 5</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>INSCRIPTION</Text>
          <Text style={styles.formSubtitle}>
            {step === 1 && "INFORMATIONS DE BASE"}
            {step === 2 && "IDENTITÉ ET PROFIL"}
            {step === 3 && "ADRESSE POSTALE"}
            {step === 4 && "SÉCURITÉ DU COMPTE"}
            {step === 5 && "FINALISATION"}
          </Text>

          {renderStepContent()}

          <View style={styles.formActions}>
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={() => {
                if (validateStep(step)) {
                  if (step < 5) {
                    setStep(step + 1);
                  } else {
                    // Appliquer les préférences de thème
                    setThemeMode(
                      formData.themeMode === 'dark',
                      formData.accessibilityMode
                    );
                    router.push('/(tabs)');
                  }
                }
              }}
            >
              <Text style={styles.submitButtonText}>
                {step < 5 ? 'CONTINUER' : 'CRÉER MON COMPTE'}
              </Text>
              <ArrowRight size={20} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.loginLink}>
          <Text style={styles.loginText}>Déjà un compte ?</Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>SE CONNECTER</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
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
    zIndex: 1,
  },
  header: {
    paddingTop: 60,
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(196, 241, 18, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#C4F112',
  },
  logoSymbol: {
    fontSize: 24,
    color: '#C4F112',
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: 4,
    backgroundColor: '#C4F112',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 24,
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
    marginBottom: 24,
    letterSpacing: 1,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingHorizontal: 16,
  },
  pickerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pickerLabel: {
    fontSize: 14,
    color: '#C4F112',
    marginBottom: 4,
  },
  picker: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  suggestionsList: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginTop: -16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  suggestionText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  passwordStrength: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  strengthFill: {
    height: 4,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#C4F112',
    borderColor: '#C4F112',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  link: {
    color: '#C4F112',
  },
  themeSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  themeOption: {
    flex: 1,
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeOptionSelected: {
    borderColor: '#C4F112',
    backgroundColor: 'rgba(196, 241, 18, 0.1)',
  },
  themeOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  themeOptionTextSelected: {
    color: '#C4F112',
  },
  accessibilityInfo: {
    flex: 1,
  },
  settingsNote: {
    backgroundColor: 'rgba(196, 241, 18, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(196, 241, 18, 0.3)',
  },
  settingsNoteText: {
    fontSize: 14,
    color: '#C4F112',
    lineHeight: 20,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C4F112',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  formActions: {
    marginTop: 16,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4F112',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  loginLink: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loginText: {
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