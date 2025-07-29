import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ArrowLeft, CreditCard, Shield, Lock, Check, CircleAlert as AlertCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView, ThemedText, ThemedButton, ThemedInput } from '@/components/ThemedComponents';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function PaymentScreen() {
  const { theme } = useTheme();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    amount: '8500',
    description: 'Yamaha YZ450F 2023'
  });

  const handlePayment = async () => {
    setLoading(true);
    
    // Validation
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName) {
      showError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    // Simulation paiement
    const timeoutId = setTimeout(() => {
      setLoading(false);
      showSuccess('Paiement sécurisé effectué avec succès !');
      const routerTimeoutId = setTimeout(() => {
        router.back();
      }, 2000);
      return () => clearTimeout(routerTimeoutId);
    }, 3000);
    
    return () => clearTimeout(timeoutId);
  };

  const PaymentMethodCard = ({ method, title, subtitle, icon: Icon, selected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.paymentMethodCard,
        { 
          backgroundColor: theme.colors.card, 
          borderColor: selected ? theme.colors.primary : theme.colors.border 
        }
      ]}
      onPress={onPress}
    >
      <View style={styles.paymentMethodContent}>
        <View style={[styles.paymentMethodIcon, { backgroundColor: theme.colors.surface }]}>
          <Icon size={24} color={selected ? theme.colors.primary : theme.colors.textSecondary} strokeWidth={2} />
        </View>
        <View style={styles.paymentMethodText}>
          <ThemedText weight="600">{title}</ThemedText>
          <ThemedText secondary size="small">{subtitle}</ThemedText>
        </View>
        {selected && (
          <View style={[styles.selectedIndicator, { backgroundColor: theme.colors.primary }]}>
            <Check size={16} color="#000000" strokeWidth={2} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

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
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <ThemedText size="large" weight="bold">Paiement sécurisé</ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Résumé de la commande */}
        <ThemedView card style={styles.orderSummary}>
          <ThemedText size="large" weight="bold" style={styles.sectionTitle}>Résumé de la commande</ThemedText>
          <View style={styles.orderItem}>
            <ThemedText>{formData.description}</ThemedText>
            <ThemedText weight="bold" style={{ color: theme.colors.primary }}>
              {parseInt(formData.amount).toLocaleString()}€
            </ThemedText>
          </View>
          <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
          <View style={styles.orderItem}>
            <ThemedText>Frais de transaction (2.5%)</ThemedText>
            <ThemedText>{Math.round(parseInt(formData.amount) * 0.025)}€</ThemedText>
          </View>
          <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
          <View style={styles.orderItem}>
            <ThemedText weight="bold">Total</ThemedText>
            <ThemedText weight="bold" size="large" style={{ color: theme.colors.primary }}>
              {(parseInt(formData.amount) + Math.round(parseInt(formData.amount) * 0.025)).toLocaleString()}€
            </ThemedText>
          </View>
        </ThemedView>

        {/* Méthodes de paiement */}
        <ThemedView card style={styles.paymentMethods}>
          <ThemedText size="large" weight="bold" style={styles.sectionTitle}>Méthode de paiement</ThemedText>
          
          <PaymentMethodCard
            method="card"
            title="Carte bancaire"
            subtitle="Visa, Mastercard, American Express"
            icon={CreditCard}
            selected={paymentMethod === 'card'}
            onPress={() => setPaymentMethod('card')}
          />
        </ThemedView>

        {/* Formulaire de carte */}
        {paymentMethod === 'card' && (
          <ThemedView card style={styles.cardForm}>
            <ThemedText size="large" weight="bold" style={styles.sectionTitle}>Informations de carte</ThemedText>
            
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Numéro de carte</ThemedText>
              <ThemedInput
                value={formData.cardNumber}
                onChangeText={(text) => setFormData({...formData, cardNumber: text})}
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <ThemedText style={styles.inputLabel}>Date d'expiration</ThemedText>
                <ThemedInput
                  value={formData.expiryDate}
                  onChangeText={(text) => setFormData({...formData, expiryDate: text})}
                  placeholder="MM/AA"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <ThemedText style={styles.inputLabel}>CVV</ThemedText>
                <ThemedInput
                  value={formData.cvv}
                  onChangeText={(text) => setFormData({...formData, cvv: text})}
                  placeholder="123"
                  keyboardType="numeric"
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Nom sur la carte</ThemedText>
              <ThemedInput
                value={formData.cardName}
                onChangeText={(text) => setFormData({...formData, cardName: text})}
                placeholder="JEAN DUPONT"
              />
            </View>
          </ThemedView>
        )}

        {/* Sécurité */}
        <ThemedView card style={styles.securityInfo}>
          <View style={styles.securityHeader}>
            <Shield size={24} color={theme.colors.primary} strokeWidth={2} />
            <ThemedText size="large" weight="bold">Paiement 100% sécurisé</ThemedText>
          </View>
          <View style={styles.securityFeatures}>
            <View style={styles.securityFeature}>
              <Lock size={16} color={theme.colors.primary} strokeWidth={2} />
              <ThemedText secondary size="small">Chiffrement SSL 256-bit</ThemedText>
            </View>
            <View style={styles.securityFeature}>
              <Shield size={16} color={theme.colors.primary} strokeWidth={2} />
              <ThemedText secondary size="small">Conforme PCI DSS</ThemedText>
            </View>
            <View style={styles.securityFeature}>
              <Check size={16} color={theme.colors.primary} strokeWidth={2} />
              <ThemedText secondary size="small">Séquestre automatique</ThemedText>
            </View>
          </View>
        </ThemedView>
      </ScrollView>

      {/* Bouton de paiement fixe */}
      <View style={[styles.footer, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.border }]}>
        <ThemedButton
          title={loading ? "Traitement en cours..." : "Payer maintenant"}
          onPress={handlePayment}
          disabled={loading}
          style={styles.payButton}
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner size={20} color={theme.colors.primary} />
            <ThemedText secondary size="small" style={styles.loadingText}>
              Traitement sécurisé en cours...
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  orderSummary: {
    padding: 20,
    marginVertical: 16,
    borderRadius: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
  paymentMethods: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
  },
  paymentMethodCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodText: {
    flex: 1,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardForm: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
  },
  securityInfo: {
    padding: 20,
    marginBottom: 100,
    borderRadius: 16,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  securityFeatures: {
    gap: 12,
  },
  securityFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    borderTopWidth: 1,
  },
  payButton: {
    marginBottom: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loadingText: {
    marginTop: 4,
  },
});