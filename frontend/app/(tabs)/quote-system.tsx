import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ArrowLeft, Plus, Calculator, Send, Eye, CreditCard as Edit, Trash2, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView, ThemedText, ThemedButton, ThemedInput } from '@/components/ThemedComponents';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { useFadeIn } from '@/hooks/useAnimations';
import { Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function QuoteSystemScreen() {
  const { theme } = useTheme();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const [activeTab, setActiveTab] = useState('quotes');
  const [showNewQuote, setShowNewQuote] = useState(false);
  const fadeAnim = useFadeIn();

  const [quoteData, setQuoteData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    bikeInfo: '',
    services: [],
    parts: [],
    laborHours: 0,
    laborRate: 65,
    notes: ''
  });

  const quotes = [
    {
      id: 1,
      clientName: 'Pierre Dubois',
      bikeInfo: 'Yamaha YZ450F 2023',
      services: ['Révision complète', 'Changement pneus'],
      total: 485,
      status: 'pending',
      date: '15/01/2024',
      validUntil: '30/01/2024'
    },
    {
      id: 2,
      clientName: 'Marie Leroy',
      bikeInfo: 'Honda CRF250R 2022',
      services: ['Réparation embrayage'],
      total: 320,
      status: 'accepted',
      date: '12/01/2024',
      validUntil: '27/01/2024'
    },
    {
      id: 3,
      clientName: 'Alex Martin',
      bikeInfo: 'KTM 350 SX-F 2024',
      services: ['Entretien moteur', 'Réglage suspension'],
      total: 650,
      status: 'completed',
      date: '08/01/2024',
      validUntil: '23/01/2024'
    }
  ];

  const serviceTemplates = [
    { name: 'Révision complète', price: 150, duration: 2 },
    { name: 'Changement huile', price: 45, duration: 0.5 },
    { name: 'Réparation embrayage', price: 280, duration: 4 },
    { name: 'Changement pneus', price: 120, duration: 1 },
    { name: 'Réglage suspension', price: 85, duration: 1.5 },
    { name: 'Entretien moteur', price: 200, duration: 3 }
  ];

  const partsCatalog = [
    { name: 'Huile moteur 4T', price: 25, category: 'fluides' },
    { name: 'Filtre à air', price: 35, category: 'filtres' },
    { name: 'Plaquettes frein avant', price: 45, category: 'freinage' },
    { name: 'Chaîne 520', price: 65, category: 'transmission' },
    { name: 'Pneu avant 80/100-21', price: 85, category: 'pneumatiques' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'accepted': return '#4CAF50';
      case 'rejected': return '#FF6B6B';
      case 'completed': return '#2196F3';
      default: return theme.colors.textSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Accepté';
      case 'rejected': return 'Refusé';
      case 'completed': return 'Terminé';
      default: return 'Inconnu';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} color="#FF9800" strokeWidth={2} />;
      case 'accepted': return <CheckCircle size={16} color="#4CAF50" strokeWidth={2} />;
      case 'rejected': return <AlertCircle size={16} color="#FF6B6B" strokeWidth={2} />;
      case 'completed': return <CheckCircle size={16} color="#2196F3" strokeWidth={2} />;
      default: return <Clock size={16} color={theme.colors.textSecondary} strokeWidth={2} />;
    }
  };

  const QuoteCard = ({ quote }) => (
    <Animated.View style={[styles.quoteCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.quoteHeader}>
        <View style={styles.quoteInfo}>
          <ThemedText weight="600">{quote.clientName}</ThemedText>
          <ThemedText secondary size="small">{quote.bikeInfo}</ThemedText>
        </View>
        <View style={styles.quoteStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(quote.status) }]}>
            {getStatusIcon(quote.status)}
            <Text style={styles.statusText}>{getStatusLabel(quote.status)}</Text>
          </View>
          <ThemedText weight="bold" style={{ color: theme.colors.primary }}>
            {quote.total}€
          </ThemedText>
        </View>
      </View>
      
      <View style={styles.quoteServices}>
        {quote.services.map((service, index) => (
          <Text key={index} style={[styles.serviceItem, { color: theme.colors.textSecondary }]}>
            • {service}
          </Text>
        ))}
      </View>
      
      <View style={styles.quoteFooter}>
        <ThemedText secondary size="small">Créé le {quote.date}</ThemedText>
        <ThemedText secondary size="small">Valide jusqu'au {quote.validUntil}</ThemedText>
      </View>
      
      <View style={styles.quoteActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}>
          <Eye size={16} color={theme.colors.primary} strokeWidth={2} />
          <Text style={[styles.actionText, { color: theme.colors.primary }]}>Voir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}>
          <Edit size={16} color={theme.colors.primary} strokeWidth={2} />
          <Text style={[styles.actionText, { color: theme.colors.primary }]}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}>
          <Send size={16} color={theme.colors.primary} strokeWidth={2} />
          <Text style={[styles.actionText, { color: theme.colors.primary }]}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const NewQuoteForm = () => (
    <ThemedView card style={styles.newQuoteForm}>
      <ThemedText size="large" weight="bold" style={{ marginBottom: 20 }}>Nouveau devis</ThemedText>
      
      <View style={styles.formSection}>
        <ThemedText weight="600" style={{ marginBottom: 12 }}>Informations client</ThemedText>
        <ThemedInput
          value={quoteData.clientName}
          onChangeText={(text) => setQuoteData({...quoteData, clientName: text})}
          placeholder="Nom du client"
          style={{ marginBottom: 12 }}
        />
        <ThemedInput
          value={quoteData.clientEmail}
          onChangeText={(text) => setQuoteData({...quoteData, clientEmail: text})}
          placeholder="Email"
          keyboardType="email-address"
          style={{ marginBottom: 12 }}
        />
        <ThemedInput
          value={quoteData.clientPhone}
          onChangeText={(text) => setQuoteData({...quoteData, clientPhone: text})}
          placeholder="Téléphone"
          keyboardType="phone-pad"
          style={{ marginBottom: 12 }}
        />
        <ThemedInput
          value={quoteData.bikeInfo}
          onChangeText={(text) => setQuoteData({...quoteData, bikeInfo: text})}
          placeholder="Informations moto (marque, modèle, année)"
        />
      </View>

      <View style={styles.formSection}>
        <ThemedText weight="600" style={{ marginBottom: 12 }}>Services</ThemedText>
        <TouchableOpacity 
          style={[styles.addServiceButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => showSuccess('Sélection de service ouvert')}
        >
          <Plus size={20} color={theme.colors.primary} strokeWidth={2} />
          <ThemedText style={{ color: theme.colors.primary }}>Ajouter un service</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.formSection}>
        <ThemedText weight="600" style={{ marginBottom: 12 }}>Main d'œuvre</ThemedText>
        <View style={styles.laborSection}>
          <View style={styles.laborInput}>
            <ThemedText secondary size="small">Heures</ThemedText>
            <ThemedInput
              value={quoteData.laborHours.toString()}
              onChangeText={(text) => setQuoteData({...quoteData, laborHours: parseFloat(text) || 0})}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.laborInput}>
            <ThemedText secondary size="small">Taux horaire</ThemedText>
            <ThemedInput
              value={quoteData.laborRate.toString()}
              onChangeText={(text) => setQuoteData({...quoteData, laborRate: parseFloat(text) || 0})}
              placeholder="65"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.laborTotal}>
            <ThemedText secondary size="small">Total</ThemedText>
            <ThemedText weight="bold" style={{ color: theme.colors.primary }}>
              {(quoteData.laborHours * quoteData.laborRate).toFixed(0)}€
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.formActions}>
        <ThemedButton
          title="Annuler"
          variant="secondary"
          onPress={() => setShowNewQuote(false)}
          style={{ flex: 1, marginRight: 8 }}
        />
        <ThemedButton
          title="Créer le devis"
          onPress={() => {
            showSuccess('Devis créé avec succès');
            setShowNewQuote(false);
          }}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>
    </ThemedView>
  );

  const TabButton = ({ id, label, isActive, onPress }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        { 
          backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
          borderColor: theme.colors.border 
        }
      ]}
      onPress={onPress}
    >
      <ThemedText 
        weight="600" 
        style={{ color: isActive ? '#000000' : theme.colors.text }}
      >
        {label}
      </ThemedText>
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
        <ThemedText size="large" weight="bold">Système de Devis</ThemedText>
        <TouchableOpacity 
          style={[styles.newButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => setShowNewQuote(true)}
        >
          <Plus size={20} color="#000000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsSection}>
        <TabButton
          id="quotes"
          label="Devis"
          isActive={activeTab === 'quotes'}
          onPress={() => setActiveTab('quotes')}
        />
        <TabButton
          id="templates"
          label="Templates"
          isActive={activeTab === 'templates'}
          onPress={() => setActiveTab('templates')}
        />
        <TabButton
          id="catalog"
          label="Catalogue"
          isActive={activeTab === 'catalog'}
          onPress={() => setActiveTab('catalog')}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {showNewQuote && <NewQuoteForm />}
        
        {activeTab === 'quotes' && (
          <View style={styles.quotesSection}>
            <View style={styles.sectionHeader}>
              <ThemedText size="large" weight="bold">
                {quotes.length} devis
              </ThemedText>
              <TouchableOpacity>
                <ThemedText style={{ color: theme.colors.primary }} weight="600">Filtrer</ThemedText>
              </TouchableOpacity>
            </View>
            
            {quotes.map(quote => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </View>
        )}

        {activeTab === 'templates' && (
          <View style={styles.templatesSection}>
            <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
              Templates de services
            </ThemedText>
            {serviceTemplates.map((service, index) => (
              <Animated.View 
                key={index} 
                style={[styles.templateCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
              >
                <View style={styles.templateInfo}>
                  <ThemedText weight="600">{service.name}</ThemedText>
                  <ThemedText secondary size="small">{service.duration}h de main d'œuvre</ThemedText>
                </View>
                <ThemedText weight="bold" style={{ color: theme.colors.primary }}>
                  {service.price}€
                </ThemedText>
              </Animated.View>
            ))}
          </View>
        )}

        {activeTab === 'catalog' && (
          <View style={styles.catalogSection}>
            <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
              Catalogue pièces
            </ThemedText>
            {partsCatalog.map((part, index) => (
              <Animated.View 
                key={index} 
                style={[styles.partCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
              >
                <View style={styles.partInfo}>
                  <ThemedText weight="600">{part.name}</ThemedText>
                  <ThemedText secondary size="small">{part.category}</ThemedText>
                </View>
                <ThemedText weight="bold" style={{ color: theme.colors.primary }}>
                  {part.price}€
                </ThemedText>
              </Animated.View>
            ))}
          </View>
        )}
      </ScrollView>
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
  newButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginVertical: 16,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  newQuoteForm: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  formSection: {
    marginBottom: 20,
  },
  addServiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    gap: 8,
  },
  laborSection: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-end',
  },
  laborInput: {
    flex: 1,
  },
  laborTotal: {
    alignItems: 'center',
  },
  formActions: {
    flexDirection: 'row',
    marginTop: 20,
  },
  quotesSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quoteCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  quoteInfo: {
    flex: 1,
  },
  quoteStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  quoteServices: {
    marginBottom: 12,
  },
  serviceItem: {
    fontSize: 14,
    marginBottom: 2,
  },
  quoteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  quoteActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  templatesSection: {
    marginBottom: 32,
  },
  templateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  templateInfo: {
    flex: 1,
  },
  catalogSection: {
    marginBottom: 32,
  },
  partCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  partInfo: {
    flex: 1,
  },
});