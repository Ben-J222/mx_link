import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Save, Camera } from 'lucide-react-native';
import { router } from 'expo-router';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { useTheme } from '@/contexts/ThemeContext';

export default function EditProfileScreen() {
  const { theme } = useTheme();
  const { toast, showSuccess, showError, hideToast } = useToast();
  
  const [profileData, setProfileData] = useState({
    prenom: 'Alex',
    nom: 'Martin',
    email: 'alex.martin@email.com',
    telephone: '+33 6 12 34 56 78',
    pseudo: 'AlexMX69',
    biographie: 'Passionné de motocross depuis 15 ans. Toujours à la recherche de nouveaux circuits !',
    date_naissance: '15/03/1990',
    lieu_naissance: 'Lyon',
    adresse: '123 Rue de la République, 69002 Lyon',
    profession: 'Ingénieur',
    niveau_experience: 'Expert',
    marques_preferees: 'Yamaha, KTM',
  });

  const [isModified, setIsModified] = useState(false);

  const updateField = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setIsModified(true);
  };

  const handleSave = () => {
    // Validation basique
    if (!profileData.prenom || !profileData.nom || !profileData.email) {
      showError('Veuillez remplir les champs obligatoires');
      return;
    }

    if (!profileData.email.includes('@')) {
      showError('Format d\'email invalide');
      return;
    }

    // Simulation sauvegarde
    showSuccess('Profil mis à jour avec succès !');
    setIsModified(false);
    
    const timeoutId = setTimeout(() => {
      router.back();
    }, 1500);
    
    return () => clearTimeout(timeoutId);
  };

  const InputField = ({ label, value, onChangeText, placeholder, multiline = false, keyboardType = 'default', required = false }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />

      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => {
            if (isModified) {
              Alert.alert(
                'Modifications non sauvegardées',
                'Voulez-vous sauvegarder vos modifications ?',
                [
                  { text: 'Annuler', style: 'cancel' },
                  { text: 'Ignorer', onPress: () => router.back() },
                  { text: 'Sauvegarder', onPress: handleSave },
                ]
              );
            } else {
              router.back();
            }
          }}
        >
          <ArrowLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Modifier le profil</Text>
        <TouchableOpacity 
          style={[
            styles.saveButton, 
            { backgroundColor: isModified ? theme.colors.primary : theme.colors.surface }
          ]}
          onPress={handleSave}
          disabled={!isModified}
        >
          <Save size={20} color={isModified ? '#000000' : theme.colors.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo de profil */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatarContainer, { borderColor: theme.colors.primary }]}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.surface }]}>
              <User size={40} color={theme.colors.primary} strokeWidth={2} />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#000000" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.avatarText, { color: theme.colors.textSecondary }]}>
            Touchez pour changer la photo
          </Text>
        </View>

        {/* Informations personnelles */}
        <View style={[styles.section, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Informations personnelles</Text>
          
          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <InputField
                label="Prénom"
                value={profileData.prenom}
                onChangeText={(text) => updateField('prenom', text)}
                placeholder="Votre prénom"
                required={true}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <InputField
                label="Nom"
                value={profileData.nom}
                onChangeText={(text) => updateField('nom', text)}
                placeholder="Votre nom"
                required={true}
              />
            </View>
          </View>

          <InputField
            label="Email"
            value={profileData.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="votre@email.com"
            keyboardType="email-address"
            required={true}
          />

          <InputField
            label="Téléphone"
            value={profileData.telephone}
            onChangeText={(text) => updateField('telephone', text)}
            placeholder="+33 6 XX XX XX XX"
            keyboardType="phone-pad"
          />

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <InputField
                label="Date de naissance"
                value={profileData.date_naissance}
                onChangeText={(text) => updateField('date_naissance', text)}
                placeholder="JJ/MM/AAAA"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <InputField
                label="Lieu de naissance"
                value={profileData.lieu_naissance}
                onChangeText={(text) => updateField('lieu_naissance', text)}
                placeholder="Ville"
              />
            </View>
          </View>

          <InputField
            label="Adresse"
            value={profileData.adresse}
            onChangeText={(text) => updateField('adresse', text)}
            placeholder="Votre adresse complète"
            multiline={true}
          />
        </View>

        {/* Profil public */}
        <View style={[styles.section, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Profil public</Text>
          
          <InputField
            label="Pseudo"
            value={profileData.pseudo}
            onChangeText={(text) => updateField('pseudo', text)}
            placeholder="Votre pseudo unique"
            required={true}
          />

          <InputField
            label="Biographie"
            value={profileData.biographie}
            onChangeText={(text) => updateField('biographie', text)}
            placeholder="Parlez-nous de votre passion pour le motocross..."
            multiline={true}
          />
        </View>

        {/* Informations motocross */}
        <View style={[styles.section, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Informations motocross</Text>
          
          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <InputField
                label="Profession"
                value={profileData.profession}
                onChangeText={(text) => updateField('profession', text)}
                placeholder="Votre métier"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <InputField
                label="Niveau d'expérience"
                value={profileData.niveau_experience}
                onChangeText={(text) => updateField('niveau_experience', text)}
                placeholder="Débutant, Intermédiaire, Expert"
              />
            </View>
          </View>

          <InputField
            label="Marques préférées"
            value={profileData.marques_preferees}
            onChangeText={(text) => updateField('marques_preferees', text)}
            placeholder="Yamaha, Honda, KTM..."
          />
        </View>

        {/* Note de modification */}
        {isModified && (
          <View style={styles.modificationNote}>
            <Text style={styles.modificationText}>
              ⚠️ Vous avez des modifications non sauvegardées
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C4F112',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  required: {
    color: '#FF6B6B',
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modificationNote: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  modificationText: {
    fontSize: 14,
    color: '#FF9800',
    textAlign: 'center',
    fontWeight: '600',
  },
});