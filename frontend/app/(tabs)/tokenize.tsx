import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Shield, Camera, Upload, Check, CircleAlert as AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

export default function TokenizeScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bikeData, setBikeData] = useState({
    // Informations techniques
    marque: '',
    typeMoteur: '', // 2 temps ou 4 temps
    modele: '',
    cylindree: '',
    type: 'cross',
    annee: '',
    
    // Numéros de série
    n_serie_cadre: '',
    n_moteur: '',
    
    // Heures moteur
    heures_achat: '',
    heures_actuelles: '',
    
    // Historique
    nb_proprietaires_precedents: '0',
    modifications_proprietaire: {},
    historique: {},
    
    // Certification
    niveau_certification: 'bronze',
    certifie_par_garage: false,
    
    // Photos
    nombre_photos: 0,
  });

  // Base de données des motos avec modèles et cylindrées
  const motosDatabase = {
    'Yamaha': {
      '2 temps': {
        'YZ125': [125],
        'YZ250': [250],
        'YZ85': [85],
        'PW50': [50],
        'TTR125': [125]
      },
      '4 temps': {
        'YZ450F': [450],
        'YZ250F': [250],
        'YZ125F': [125],
        'WR450F': [450],
        'WR250F': [250],
        'TTR230': [230]
      }
    },
    'Honda': {
      '2 temps': {
        'CR125R': [125],
        'CR250R': [250],
        'CR85R': [85],
        'CRF150R': [150]
      },
      '4 temps': {
        'CRF450R': [450],
        'CRF250R': [250],
        'CRF150R': [150],
        'CRF125F': [125],
        'XR650L': [650]
      }
    },
    'KTM': {
      '2 temps': {
        '125 SX': [125],
        '250 SX': [250],
        '300 XC': [300],
        '150 SX': [150]
      },
      '4 temps': {
        '450 SX-F': [450],
        '350 SX-F': [350],
        '250 SX-F': [250],
        '125 SX-F': [125],
        '500 EXC-F': [500]
      }
    },
    'Kawasaki': {
      '2 temps': {
        'KX125': [125],
        'KX250': [250],
        'KX85': [85],
        'KX65': [65]
      },
      '4 temps': {
        'KX450F': [450],
        'KX250F': [250],
        'KLX450R': [450],
        'KLX140': [140]
      }
    },
    'Suzuki': {
      '2 temps': {
        'RM125': [125],
        'RM250': [250],
        'RM85': [85],
        'JR50': [50]
      },
      '4 temps': {
        'RMZ450': [450],
        'RMZ250': [250],
        'DRZ400': [400],
        'LTR450': [450]
      }
    }
  };

  // Obtenir les types de moteur disponibles pour une marque
  const getTypesMoteur = () => {
    if (!bikeData.marque || !motosDatabase[bikeData.marque]) return [];
    return Object.keys(motosDatabase[bikeData.marque]);
  };

  // Obtenir les modèles disponibles pour une marque et un type
  const getModeles = () => {
    if (!bikeData.marque || !bikeData.typeMoteur || !motosDatabase[bikeData.marque]?.[bikeData.typeMoteur]) return [];
    return Object.keys(motosDatabase[bikeData.marque][bikeData.typeMoteur]);
  };

  // Obtenir les cylindrées disponibles pour un modèle
  const getCylindrees = () => {
    if (!bikeData.marque || !bikeData.typeMoteur || !bikeData.modele) return [];
    const modeleData = motosDatabase[bikeData.marque]?.[bikeData.typeMoteur]?.[bikeData.modele];
    return modeleData || [];
  };

  // Réinitialiser les sélections en cascade
  const handleMarqueChange = (marque) => {
    setBikeData({
      ...bikeData,
      marque,
      typeMoteur: '',
      modele: '',
      cylindree: ''
    });
  };

  const handleTypeMoteurChange = (typeMoteur) => {
    setBikeData({
      ...bikeData,
      typeMoteur,
      modele: '',
      cylindree: ''
    });
  };

  const handleModeleChange = (modele) => {
    setBikeData({
      ...bikeData,
      modele,
      cylindree: ''
    });
  };

  // Options pour les menus déroulants
  const typesMotos = [
    { label: 'Cross', value: 'cross' },
    { label: 'Enduro', value: 'enduro' },
    { label: 'Supermotard', value: 'supermotard' },
    { label: 'Quad', value: 'quad' },
    { label: 'Autre', value: 'autre' },
  ];

  const niveauxCertification = [
    { label: 'Bronze', value: 'bronze' },
    { label: 'Argent', value: 'argent' },
    { label: 'Or', value: 'or' },
  ];

  const marques = [
    '',
    'Yamaha', 'Honda', 'KTM', 'Kawasaki', 'Suzuki', 'Husqvarna', 
    'Beta', 'GasGas', 'Sherco', 'TM Racing', 'Autre'
  ];

  const annees = Array.from({ length: 55 }, (_, i) => 2025 - i); // 1970 à 2025

  const ProgressBar = ({ step, totalSteps }) => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(step / totalSteps) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>Étape {step} sur {totalSteps}</Text>
    </View>
  );

  const InputField = ({ label, value, onChangeText, placeholder, keyboardType = 'default', required = false }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666666"
        keyboardType={keyboardType}
      />
    </View>
  );

  const PickerField = ({ label, selectedValue, onValueChange, items, required = false }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor="#C4F112"
        >
          {items.map((item, index) => (
            <Picker.Item 
              key={index} 
              label={item.label || item} 
              value={item.value || item}
              color="#FFFFFF"
            />
          ))}
        </Picker>
      </View>
    </View>
  );

  const ActionCard = ({ icon: Icon, title, subtitle, onPress, completed = false }) => (
    <TouchableOpacity 
      style={[styles.actionCard, completed && styles.completedCard]} 
      onPress={onPress}
    >
      <View style={[styles.actionIcon, completed && styles.completedIcon]}>
        <Icon size={24} color={completed ? '#000000' : '#C4F112'} strokeWidth={2} />
      </View>
      <View style={styles.actionContent}>
        <Text style={[styles.actionTitle, completed && styles.completedTitle]}>{title}</Text>
        <Text style={[styles.actionSubtitle, completed && styles.completedSubtitle]}>{subtitle}</Text>
      </View>
      {completed && (
        <View style={styles.checkIcon}>
          <Check size={16} color="#000000" strokeWidth={2} />
        </View>
      )}
    </TouchableOpacity>
  );

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!bikeData.marque || !bikeData.typeMoteur || !bikeData.modele || !bikeData.cylindree || !bikeData.annee || !bikeData.n_serie_cadre) {
          Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
          return false;
        }
        break;
      case 2:
        if (bikeData.niveau_certification !== 'bronze' && !bikeData.n_moteur) {
          Alert.alert('Erreur', 'Le numéro moteur est requis pour les certifications Argent et Or');
          return false;
        }
        break;
    }
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Shield size={48} color="#C4F112" strokeWidth={2} />
              <Text style={styles.stepTitle}>Informations de la moto</Text>
              <Text style={styles.stepDescription}>
                Renseignez les détails techniques de votre moto
              </Text>
            </View>

            <View style={styles.formContainer}>
              <PickerField
                label="Marque"
                selectedValue={bikeData.marque}
                onValueChange={handleMarqueChange}
                items={marques}
                required={true}
              />

              {bikeData.marque && (
                <PickerField
                  label="Type de moteur"
                  selectedValue={bikeData.typeMoteur}
                  onValueChange={handleTypeMoteurChange}
                  items={['', ...getTypesMoteur()]}
                  required={true}
                />
              )}

              {bikeData.typeMoteur && (
                <PickerField
                  label="Modèle"
                  selectedValue={bikeData.modele}
                  onValueChange={handleModeleChange}
                  items={['', ...getModeles()]}
                  required={true}
                />
              )}

              {bikeData.modele && (
                <PickerField
                  label="Cylindrée (cc)"
                  selectedValue={bikeData.cylindree}
                  onValueChange={(value) => setBikeData({ ...bikeData, cylindree: value })}
                  items={['', ...getCylindrees().map(c => c.toString())]}
                  required={true}
                />
              )}

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <PickerField
                    label="Année"
                    selectedValue={bikeData.annee}
                    onValueChange={(value) => setBikeData({ ...bikeData, annee: value })}
                    items={['', ...annees]}
                    required={true}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <PickerField
                    label="Type de moto"
                    selectedValue={bikeData.type}
                    onValueChange={(value) => setBikeData({ ...bikeData, type: value })}
                    items={typesMotos}
                    required={true}
                  />
                </View>
              </View>

              <InputField
                label="Numéro de série du cadre"
                value={bikeData.n_serie_cadre}
                onChangeText={(text) => setBikeData({ ...bikeData, n_serie_cadre: text })}
                placeholder="Numéro gravé sur le cadre"
                required={true}
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Upload size={48} color="#C4F112" strokeWidth={2} />
              <Text style={styles.stepTitle}>Informations complémentaires</Text>
              <Text style={styles.stepDescription}>
                Détails supplémentaires selon le niveau de certification
              </Text>
            </View>

            <View style={styles.formContainer}>
              <PickerField
                label="Niveau de certification souhaité"
                selectedValue={bikeData.niveau_certification}
                onValueChange={(value) => setBikeData({ ...bikeData, niveau_certification: value })}
                items={niveauxCertification}
                required={true}
              />

              {bikeData.niveau_certification !== 'bronze' && (
                <InputField
                  label="Numéro moteur"
                  value={bikeData.n_moteur}
                  onChangeText={(text) => setBikeData({ ...bikeData, n_moteur: text })}
                  placeholder="Numéro gravé sur le moteur"
                  required={true}
                />
              )}

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <InputField
                    label="Heures à l'achat"
                    value={bikeData.heures_achat}
                    onChangeText={(text) => setBikeData({ ...bikeData, heures_achat: text })}
                    placeholder="0"
                    keyboardType="numeric"
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <InputField
                    label="Heures actuelles"
                    value={bikeData.heures_actuelles}
                    onChangeText={(text) => setBikeData({ ...bikeData, heures_actuelles: text })}
                    placeholder="0"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <InputField
                label="Nombre de propriétaires précédents"
                value={bikeData.nb_proprietaires_precedents}
                onChangeText={(text) => setBikeData({ ...bikeData, nb_proprietaires_precedents: text })}
                placeholder="0"
                keyboardType="numeric"
              />

              <View style={styles.checkboxGroup}>
                <TouchableOpacity 
                  style={styles.checkbox}
                  onPress={() => setBikeData({ ...bikeData, certifie_par_garage: !bikeData.certifie_par_garage })}
                >
                  <View style={[styles.checkboxBox, bikeData.certifie_par_garage && styles.checkboxChecked]}>
                    {bikeData.certifie_par_garage && <Check size={16} color="#000000" />}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    Certification par un garage partenaire
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Camera size={48} color="#C4F112" strokeWidth={2} />
              <Text style={styles.stepTitle}>Documents et photos</Text>
              <Text style={styles.stepDescription}>
                Ajoutez les preuves visuelles selon votre niveau de certification
              </Text>
            </View>

            <View style={styles.certificationInfo}>
              <Text style={styles.certificationTitle}>
                Certification {bikeData.niveau_certification.charAt(0).toUpperCase() + bikeData.niveau_certification.slice(1)}
              </Text>
              <Text style={styles.certificationDesc}>
                {bikeData.niveau_certification === 'bronze' && 'Minimum 3 photos requises'}
                {bikeData.niveau_certification === 'argent' && '6-10 photos haute qualité requises'}
                {bikeData.niveau_certification === 'or' && 'Photos + inspection garage requises'}
              </Text>
            </View>

            <View style={styles.actionsContainer}>
              <ActionCard
                icon={Camera}
                title="Photos de la moto"
                subtitle={`${bikeData.niveau_certification === 'bronze' ? '3 min' : bikeData.niveau_certification === 'argent' ? '6-10' : '10+'} photos requises`}
                onPress={() => {}}
              />
              
              <ActionCard
                icon={Upload}
                title="Documents de propriété"
                subtitle="Carte grise, facture d'achat"
                onPress={() => {}}
                completed={true}
              />

              {bikeData.niveau_certification === 'or' && (
                <ActionCard
                  icon={Shield}
                  title="Rapport d'inspection"
                  subtitle="Document du garage partenaire"
                  onPress={() => {}}
                />
              )}
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Check size={48} color="#C4F112" strokeWidth={2} />
              <Text style={styles.stepTitle}>Vérification finale</Text>
              <Text style={styles.stepDescription}>
                Vérifiez toutes les informations avant la certification
              </Text>
            </View>

            <View style={styles.reviewContainer}>
              <View style={styles.reviewCard}>
                <Text style={styles.reviewTitle}>Résumé de la moto</Text>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Moto:</Text>
                  <Text style={styles.reviewValue}>{bikeData.marque} {bikeData.modele}</Text>
                </View>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Type moteur:</Text>
                  <Text style={styles.reviewValue}>{bikeData.typeMoteur}</Text>
                </View>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Année:</Text>
                  <Text style={styles.reviewValue}>{bikeData.annee}</Text>
                </View>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Type:</Text>
                  <Text style={styles.reviewValue}>{bikeData.type}</Text>
                </View>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Cylindrée:</Text>
                  <Text style={styles.reviewValue}>{bikeData.cylindree} cc</Text>
                </View>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Série cadre:</Text>
                  <Text style={styles.reviewValue}>{bikeData.n_serie_cadre}</Text>
                </View>
                {bikeData.n_moteur && (
                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Série moteur:</Text>
                    <Text style={styles.reviewValue}>{bikeData.n_moteur}</Text>
                  </View>
                )}
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Certification:</Text>
                  <Text style={styles.reviewValue}>{bikeData.niveau_certification}</Text>
                </View>
              </View>

              <View style={styles.warningCard}>
                <AlertCircle size={20} color="#FF6B6B" strokeWidth={2} />
                <Text style={styles.warningText}>
                  Une fois certifiée, ces informations seront enregistrées de façon permanente.
                </Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        // Soumettre le formulaire
        Alert.alert(
          'Certification en cours',
          'Votre moto est en cours de certification. Vous recevrez une notification une fois le processus terminé.',
          [{ text: 'OK', onPress: () => router.push('/(tabs)') }]
        );
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tokenisation</Text>
        <View style={styles.placeholder} />
      </View>

      <ProgressBar step={currentStep} totalSteps={4} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 1 && (
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.secondaryButtonText}>Précédent</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.primaryButton, currentStep === 1 && styles.fullWidthButton]}
          onPress={handleNext}
        >
          <Text style={styles.primaryButtonText}>
            {currentStep === 4 ? 'Certifier sur blockchain' : 'Continuer'}
          </Text>
          <ArrowRight size={20} color="#000000" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: 24,
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 100, // Espace pour la navbar fixe
  },
  stepContainer: {
    marginBottom: 32,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    gap: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  inputGroup: {
    marginBottom: 4,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
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
  pickerContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  picker: {
    color: '#FFFFFF',
    backgroundColor: '#1E1E1E',
  },
  checkboxGroup: {
    marginTop: 8,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
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
  certificationInfo: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#C4F112',
  },
  certificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C4F112',
    marginBottom: 4,
  },
  certificationDesc: {
    fontSize: 14,
    color: '#888888',
  },
  actionsContainer: {
    gap: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  completedCard: {
    backgroundColor: '#C4F112',
    borderColor: '#C4F112',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  completedIcon: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  completedTitle: {
    color: '#000000',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#888888',
  },
  completedSubtitle: {
    color: 'rgba(0,0,0,0.7)',
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewContainer: {
    gap: 20,
  },
  reviewCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewLabel: {
    fontSize: 16,
    color: '#888888',
  },
  reviewValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  warningText: {
    fontSize: 14,
    color: '#FF6B6B',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4F112',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
  },
  fullWidthButton: {
    flex: 1,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#333333',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});