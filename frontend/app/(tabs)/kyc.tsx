import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ArrowLeft, ArrowRight, Camera, Upload, Check, FileText, User, CreditCard, Shield } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView, ThemedText, ThemedButton, ThemedInput } from '@/components/ThemedComponents';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function KYCScreen() {
  const { theme } = useTheme();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState({
    identityCard: { uploaded: false, verified: false },
    proofOfAddress: { uploaded: false, verified: false },
    bankStatement: { uploaded: false, verified: false }
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    nationality: 'Française',
    profession: '',
    income: ''
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmitKYC();
      }
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.dateOfBirth) {
          showError('Veuillez remplir tous les champs obligatoires');
          return false;
        }
        break;
      case 2:
        if (!documents.identityCard.uploaded || !documents.proofOfAddress.uploaded) {
          showError('Veuillez télécharger tous les documents requis');
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmitKYC = async () => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
      showSuccess('Dossier KYC soumis avec succès !');
      const routerTimeoutId = setTimeout(() => {
        router.back();
      }, 2000);
      return () => clearTimeout(routerTimeoutId);
    }, 3000);
    
    return () => clearTimeout(timeoutId);
  };

  const handleDocumentUpload = (docType: string) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: { uploaded: true, verified: false }
    }));
    showSuccess('Document téléchargé avec succès');
    
    // Simulation vérification
    setTimeout(() => {
      setDocuments(prev => ({
        ...prev,
        [docType]: { uploaded: true, verified: true }
      }));
      showSuccess('Document vérifié automatiquement');
    }, 2000);
  };

  const ProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { backgroundColor: theme.colors.surface }]}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${(currentStep / totalSteps) * 100}%`,
              backgroundColor: theme.colors.primary 
            }
          ]} 
        />
      </View>
      <ThemedText secondary size="small" style={styles.progressText}>
        Étape {currentStep} sur {totalSteps}
      </ThemedText>
    </View>
  );

  const DocumentCard = ({ title, subtitle, docType, icon: Icon, required = true }) => {
    const doc = documents[docType];
    return (
      <ThemedView card style={[styles.documentCard, { borderColor: theme.colors.border }]}>
        <View style={styles.documentHeader}>
          <View style={[styles.documentIcon, { backgroundColor: theme.colors.surface }]}>
            <Icon size={24} color={theme.colors.primary} strokeWidth={2} />
          </View>
          <View style={styles.documentInfo}>
            <ThemedText weight="600">{title}</ThemedText>
            <ThemedText secondary size="small">{subtitle}</ThemedText>
            {required && <ThemedText size="small" style={{ color: theme.colors.error }}>*Obligatoire</ThemedText>}
          </View>
          <View style={styles.documentStatus}>
            {doc.verified ? (
              <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
                <Check size={16} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.statusText}>Vérifié</Text>
              </View>
            ) : doc.uploaded ? (
              <View style={[styles.statusBadge, { backgroundColor: '#FF9800' }]}>
                <LoadingSpinner size={16} color="#FFFFFF" />
                <Text style={styles.statusText}>Vérification...</Text>
              </View>
            ) : (
              <TouchableOpacity 
                style={[styles.uploadButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => handleDocumentUpload(docType)}
              >
                <Upload size={16} color="#000000" strokeWidth={2} />
                <Text style={styles.uploadButtonText}>Télécharger</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ThemedView>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ThemedView card style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <User size={48} color={theme.colors.primary} strokeWidth={2} />
              <ThemedText size="xlarge" weight="bold">Informations personnelles</ThemedText>
              <ThemedText secondary>Renseignez vos informations d'identité</ThemedText>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <ThemedText style={styles.inputLabel}>Prénom *</ThemedText>
                  <ThemedInput
                    value={personalInfo.firstName}
                    onChangeText={(text) => setPersonalInfo({...personalInfo, firstName: text})}
                    placeholder="Jean"
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <ThemedText style={styles.inputLabel}>Nom *</ThemedText>
                  <ThemedInput
                    value={personalInfo.lastName}
                    onChangeText={(text) => setPersonalInfo({...personalInfo, lastName: text})}
                    placeholder="Dupont"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Date de naissance *</ThemedText>
                <ThemedInput
                  value={personalInfo.dateOfBirth}
                  onChangeText={(text) => setPersonalInfo({...personalInfo, dateOfBirth: text})}
                  placeholder="JJ/MM/AAAA"
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Lieu de naissance</ThemedText>
                <ThemedInput
                  value={personalInfo.placeOfBirth}
                  onChangeText={(text) => setPersonalInfo({...personalInfo, placeOfBirth: text})}
                  placeholder="Paris, France"
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Profession</ThemedText>
                <ThemedInput
                  value={personalInfo.profession}
                  onChangeText={(text) => setPersonalInfo({...personalInfo, profession: text})}
                  placeholder="Ingénieur"
                />
              </View>
            </View>
          </ThemedView>
        );

      case 2:
        return (
          <ThemedView card style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <FileText size={48} color={theme.colors.primary} strokeWidth={2} />
              <ThemedText size="xlarge" weight="bold">Documents d'identité</ThemedText>
              <ThemedText secondary>Téléchargez vos documents officiels</ThemedText>
            </View>

            <View style={styles.documentsContainer}>
              <DocumentCard
                title="Pièce d'identité"
                subtitle="Carte d'identité, passeport ou permis de conduire"
                docType="identityCard"
                icon={CreditCard}
                required={true}
              />

              <DocumentCard
                title="Justificatif de domicile"
                subtitle="Facture récente (moins de 3 mois)"
                docType="proofOfAddress"
                icon={FileText}
                required={true}
              />

              <DocumentCard
                title="Relevé bancaire"
                subtitle="RIB ou relevé de compte récent"
                docType="bankStatement"
                icon={CreditCard}
                required={false}
              />
            </View>
          </ThemedView>
        );

      case 3:
        return (
          <ThemedView card style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <Shield size={48} color={theme.colors.primary} strokeWidth={2} />
              <ThemedText size="xlarge" weight="bold">Vérification finale</ThemedText>
              <ThemedText secondary>Vérifiez vos informations avant soumission</ThemedText>
            </View>

            <View style={styles.reviewContainer}>
              <ThemedView card style={styles.reviewSection}>
                <ThemedText weight="bold" style={styles.reviewTitle}>Informations personnelles</ThemedText>
                <View style={styles.reviewItem}>
                  <ThemedText secondary>Nom complet:</ThemedText>
                  <ThemedText>{personalInfo.firstName} {personalInfo.lastName}</ThemedText>
                </View>
                <View style={styles.reviewItem}>
                  <ThemedText secondary>Date de naissance:</ThemedText>
                  <ThemedText>{personalInfo.dateOfBirth}</ThemedText>
                </View>
                <View style={styles.reviewItem}>
                  <ThemedText secondary>Profession:</ThemedText>
                  <ThemedText>{personalInfo.profession || 'Non renseignée'}</ThemedText>
                </View>
              </ThemedView>

              <ThemedView card style={styles.reviewSection}>
                <ThemedText weight="bold" style={styles.reviewTitle}>Documents téléchargés</ThemedText>
                {Object.entries(documents).map(([key, doc]) => (
                  <View key={key} style={styles.reviewItem}>
                    <ThemedText secondary>
                      {key === 'identityCard' ? 'Pièce d\'identité' : 
                       key === 'proofOfAddress' ? 'Justificatif domicile' : 
                       'Relevé bancaire'}:
                    </ThemedText>
                    <View style={styles.docStatus}>
                      {doc.verified ? (
                        <Text style={styles.verifiedText}>✓ Vérifié</Text>
                      ) : doc.uploaded ? (
                        <Text style={styles.pendingText}>⏳ En cours</Text>
                      ) : (
                        <Text style={styles.missingText}>✗ Manquant</Text>
                      )}
                    </View>
                  </View>
                ))}
              </ThemedView>
            </View>
          </ThemedView>
        );

      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />

      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <ThemedText size="large" weight="bold">Vérification KYC</ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ProgressBar />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.border }]}>
        <ThemedButton
          title={loading ? "Soumission en cours..." : currentStep < totalSteps ? "Continuer" : "Soumettre le dossier"}
          onPress={handleNext}
          disabled={loading}
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner size={20} color={theme.colors.primary} />
            <ThemedText secondary size="small">
              Vérification des documents en cours...
            </ThemedText>
          </View>
        )}
      </View>
    </ThemedView>
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
  placeholder: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  progressText: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  formContainer: {
    gap: 16,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputGroup: {
    marginBottom: 4,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  documentsContainer: {
    gap: 16,
  },
  documentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  uploadButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  reviewContainer: {
    gap: 16,
  },
  reviewSection: {
    padding: 16,
    borderRadius: 12,
  },
  reviewTitle: {
    marginBottom: 12,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  docStatus: {
    alignItems: 'flex-end',
  },
  verifiedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  pendingText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
  },
  missingText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
});