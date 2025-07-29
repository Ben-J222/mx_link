import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { ArrowLeft, Camera, MapPin, Calendar, TriangleAlert as AlertTriangle, Upload, Check } from 'lucide-react-native';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function ReportTheftScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [theftData, setTheftData] = useState({
    bikeInfo: {
      make: '',
      model: '',
      year: '',
      color: '',
      vin: '',
      licensePlate: '',
      bikeType: '',
      engineType: '',
      displacement: '',
    },
    theftDetails: {
      date: '',
      time: '',
      location: '',
      region: '',
      department: '',
      city: '',
      circumstances: '',
      theftType: '',
      securityMeasures: '',
      witnessCount: '0',
      policeReport: false,
      reportNumber: '',
      estimatedValue: '',
    },
    contact: {
      name: '',
      phone: '',
      email: '',
      reward: '',
    },
  });

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
              label={item || 'Sélectionner...'} 
              value={item}
              color="#FFFFFF"
            />
          ))}
        </Picker>
      </View>
    </View>
  );

  // Données pour les menus déroulants
  const marques = ['', 'Yamaha', 'Honda', 'KTM', 'Kawasaki', 'Suzuki', 'Husqvarna', 'Beta', 'GasGas', 'Sherco', 'TM Racing', 'Autre'];
  const typesMotos = ['', 'Cross', 'Enduro', 'Supermotard', 'Trial', 'Quad', 'Autre'];
  const typesMoteur = ['', '2 temps', '4 temps'];
  const cylindrees = ['', '50', '65', '85', '125', '150', '200', '250', '300', '350', '400', '450', '500', '650', 'Autre'];
  const couleurs = ['', 'Rouge', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Noir', 'Blanc', 'Gris', 'Violet', 'Rose', 'Multicolore', 'Autre'];
  
  const regions = [
    '', 'Île-de-France', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur', 'Occitanie', 
    'Nouvelle-Aquitaine', 'Grand Est', 'Hauts-de-France', 'Pays de la Loire', 'Bretagne', 
    'Normandie', 'Bourgogne-Franche-Comté', 'Centre-Val de Loire', 'Corse'
  ];
  
  const typesVol = [
    '', 'Garage/Box fermé', 'Garage/Box ouvert', 'Parking souterrain', 'Parking extérieur', 
    'Voie publique', 'Domicile (jardin)', 'Domicile (cour)', 'Transport (camion)', 'Circuit/Piste', 'Autre'
  ];
  
  const mesuresSecurite = [
    '', 'Aucune', 'Antivol U', 'Antivol chaîne', 'Antivol disque', 'Alarme', 
    'Garage fermé', 'Caméra surveillance', 'Gardiennage', 'Plusieurs antivols', 'Autre'
  ];

  const updateTheftData = (section: string, field: string, value: any) => {
    setTheftData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const ProgressBar = ({ step, totalSteps }: { step: number; totalSteps: number }) => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(step / totalSteps) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>Étape {step} sur {totalSteps}</Text>
    </View>
  );

  const InputField = ({ label, value, onChangeText, placeholder, multiline = false }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666666"
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <AlertTriangle size={48} color="#FF6B6B" strokeWidth={2} />
              <Text style={styles.stepTitle}>Informations du véhicule</Text>
              <Text style={styles.stepDescription}>
                Renseignez les détails de votre moto volée
              </Text>
            </View>

            <View style={styles.formContainer}>
              <PickerField
                label="Marque"
                selectedValue={theftData.bikeInfo.make}
                onValueChange={(value) => updateTheftData('bikeInfo', 'make', value)}
                items={marques}
                required={true}
              />

              <InputField
                label="Modèle"
                value={theftData.bikeInfo.model}
                onChangeText={(text) => updateTheftData('bikeInfo', 'model', text)}
                placeholder="Ex: YZ450F, CRF250R..."
              />

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <PickerField
                    label="Type de moto"
                    selectedValue={theftData.bikeInfo.bikeType}
                    onValueChange={(value) => updateTheftData('bikeInfo', 'bikeType', value)}
                    items={typesMotos}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <PickerField
                    label="Type moteur"
                    selectedValue={theftData.bikeInfo.engineType}
                    onValueChange={(value) => updateTheftData('bikeInfo', 'engineType', value)}
                    items={typesMoteur}
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <InputField
                    label="Année"
                    value={theftData.bikeInfo.year}
                    onChangeText={(text) => updateTheftData('bikeInfo', 'year', text)}
                    placeholder="2023"
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <PickerField
                    label="Cylindrée (cc)"
                    selectedValue={theftData.bikeInfo.displacement}
                    onValueChange={(value) => updateTheftData('bikeInfo', 'displacement', value)}
                    items={cylindrees}
                  />
                </View>
              </View>

              <PickerField
                label="Couleur principale"
                selectedValue={theftData.bikeInfo.color}
                onValueChange={(value) => updateTheftData('bikeInfo', 'color', value)}
                items={couleurs}
                required={true}
              />

              <InputField
                label="Numéro de châssis (VIN)"
                value={theftData.bikeInfo.vin}
                onChangeText={(text: string) => updateTheftData('bikeInfo', 'vin', text)}
                placeholder="Numéro VIN complet"
              />

              <InputField
                label="Plaque d'immatriculation"
                value={theftData.bikeInfo.licensePlate}
                onChangeText={(text: string) => updateTheftData('bikeInfo', 'licensePlate', text)}
                placeholder="AB-123-CD"
              />

              <InputField
                label="Valeur estimée (€)"
                value={theftData.theftDetails.estimatedValue}
                onChangeText={(text) => updateTheftData('theftDetails', 'estimatedValue', text)}
                placeholder="Ex: 8500"
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <MapPin size={48} color="#FF6B6B" strokeWidth={2} />
              <Text style={styles.stepTitle}>Détails du vol</Text>
              <Text style={styles.stepDescription}>
                Informations sur les circonstances du vol
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <InputField
                    label="Date du vol"
                    value={theftData.theftDetails.date}
                    onChangeText={(text) => updateTheftData('theftDetails', 'date', text)}
                    placeholder="JJ/MM/AAAA"
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <InputField
                    label="Heure (approximative)"
                    value={theftData.theftDetails.time}
                    onChangeText={(text) => updateTheftData('theftDetails', 'time', text)}
                    placeholder="HH:MM"
                  />
                </View>
              </View>

              <PickerField
                label="Région"
                selectedValue={theftData.theftDetails.region}
                onValueChange={(value) => updateTheftData('theftDetails', 'region', value)}
                items={regions}
                required={true}
              />

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <InputField
                    label="Département"
                    value={theftData.theftDetails.department}
                    onChangeText={(text) => updateTheftData('theftDetails', 'department', text)}
                    placeholder="Ex: 69, 13, 75..."
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <InputField
                    label="Ville"
                    value={theftData.theftDetails.city}
                    onChangeText={(text) => updateTheftData('theftDetails', 'city', text)}
                    placeholder="Ex: Lyon, Paris..."
                  />
                </View>
              </View>

              <InputField
                label="Adresse précise du vol"
                value={theftData.theftDetails.location}
                onChangeText={(text: string) => updateTheftData('theftDetails', 'location', text)}
                placeholder="Rue, parking, nom du lieu..."
              />

              <PickerField
                label="Type de lieu de vol"
                selectedValue={theftData.theftDetails.theftType}
                onValueChange={(value) => updateTheftData('theftDetails', 'theftType', value)}
                items={typesVol}
                required={true}
              />

              <PickerField
                label="Mesures de sécurité en place"
                selectedValue={theftData.theftDetails.securityMeasures}
                onValueChange={(value) => updateTheftData('theftDetails', 'securityMeasures', value)}
                items={mesuresSecurite}
                required={true}
              />

              <InputField
                label="Circonstances du vol"
                value={theftData.theftDetails.circumstances}
                onChangeText={(text: string) => updateTheftData('theftDetails', 'circumstances', text)}
                placeholder="Décrivez les circonstances du vol..."
                multiline={true}
              />

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <InputField
                    label="Nombre de témoins"
                    value={theftData.theftDetails.witnessCount}
                    onChangeText={(text) => updateTheftData('theftDetails', 'witnessCount', text)}
                    placeholder="0"
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]} />
              </View>

              <TouchableOpacity 
                style={styles.checkboxGroup}
                onPress={() => updateTheftData('theftDetails', 'policeReport', !theftData.theftDetails.policeReport)}
              >
                <View style={[styles.checkbox, theftData.theftDetails.policeReport && styles.checkboxChecked]}>
                  {theftData.theftDetails.policeReport && <Check size={16} color="#000000" />}
                </View>
                <Text style={styles.checkboxLabel}>
                  Plainte déposée auprès de la police
                </Text>
              </TouchableOpacity>

              {theftData.theftDetails.policeReport && (
                <InputField
                  label="Numéro de plainte"
                  value={theftData.theftDetails.reportNumber}
                  onChangeText={(text: string) => updateTheftData('theftDetails', 'reportNumber', text)}
                  placeholder="Numéro de dépôt de plainte"
                />
              )}
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Camera size={48} color="#FF6B6B" strokeWidth={2} />
              <Text style={styles.stepTitle}>Contact et récompense</Text>
              <Text style={styles.stepDescription}>
                Vos coordonnées et récompense éventuelle
              </Text>
            </View>

            <View style={styles.formContainer}>
              <InputField
                label="Nom complet"
                value={theftData.contact.name}
                onChangeText={(text: string) => updateTheftData('contact', 'name', text)}
                placeholder="Votre nom et prénom"
              />

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Téléphone</Text>
                  <TextInput
                    style={styles.input}
                    value={theftData.contact.phone}
                    onChangeText={(text) => updateTheftData('contact', 'phone', text)}
                    placeholder="06 XX XX XX XX"
                    placeholderTextColor="#666666"
                    keyboardType="phone-pad"
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={theftData.contact.email}
                    onChangeText={(text) => updateTheftData('contact', 'email', text)}
                    placeholder="email@exemple.com"
                    placeholderTextColor="#666666"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <InputField
                label="Récompense (optionnel)"
                value={theftData.contact.reward}
                onChangeText={(text: string) => updateTheftData('contact', 'reward', text)}
                placeholder="Montant en euros"
              />

              <View style={styles.photoSection}>
                <Text style={styles.photoTitle}>Photos du véhicule</Text>
                <TouchableOpacity style={styles.photoButton}>
                  <Camera size={24} color="#C4F112" strokeWidth={2} />
                  <Text style={styles.photoButtonText}>Ajouter des photos</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      'Signalement envoyé',
      'Votre signalement de vol a été enregistré. Nous vous contacterons si nous avons des informations.',
      [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            if (currentStep > 1) {
              setCurrentStep(currentStep - 1);
            } else {
              router.back();
            }
          }}
        >
          <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Signaler un vol</Text>
        <View style={styles.placeholder} />
      </View>

      <ProgressBar step={currentStep} totalSteps={3} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => currentStep < 3 ? setCurrentStep(currentStep + 1) : handleSubmit()}
        >
          <Text style={styles.primaryButtonText}>
            {currentStep < 3 ? 'Continuer' : 'Envoyer le signalement'}
          </Text>
          {currentStep < 3 ? (
            <ArrowLeft size={20} color="#000000" style={{ transform: [{ rotate: '180deg' }] }} />
          ) : (
            <Upload size={20} color="#000000" strokeWidth={2} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom: 100,
    paddingBottom: 120, // Espace pour la navbar fixe (augmenté car déjà 100)
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
    backgroundColor: '#FF6B6B',
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
  required: {
    color: '#FF6B6B',
  },
  pickerContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  picker: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
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
  photoSection: {
    marginTop: 16,
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#333333',
    borderStyle: 'dashed',
    gap: 8,
  },
  photoButtonText: {
    fontSize: 16,
    color: '#C4F112',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});