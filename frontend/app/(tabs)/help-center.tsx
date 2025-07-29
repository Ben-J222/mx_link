import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { ArrowLeft, Search, MessageCircle, Book, Video, CircleHelp as HelpCircle, ChevronRight, ChevronDown, Send } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView, ThemedText, ThemedButton, ThemedInput } from '@/components/ThemedComponents';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { useFadeIn } from '@/hooks/useAnimations';
import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function HelpCenterScreen() {
  const { theme } = useTheme();
  const { toast, showSuccess, hideToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const fadeAnim = useFadeIn();

  const helpCategories = [
    {
      id: 1,
      title: 'Tokenisation',
      icon: Book,
      description: 'Comment certifier ma moto',
      articles: 12
    },
    {
      id: 2,
      title: 'Transactions',
      icon: MessageCircle,
      description: 'Acheter et vendre en sécurité',
      articles: 8
    },
    {
      id: 3,
      title: 'Sécurité',
      icon: HelpCircle,
      description: 'Protection et confidentialité',
      articles: 6
    },
    {
      id: 4,
      title: 'Guides vidéo',
      icon: Video,
      description: 'Tutoriels pas à pas',
      articles: 15
    }
  ];

  const faqItems = [
    {
      id: 1,
      question: 'Comment tokeniser ma première moto ?',
      answer: 'Pour tokeniser votre moto, rendez-vous dans l\'onglet Token > Enregistrer ma moto. Suivez les étapes : informations de la moto, documents complémentaires, photos et vérification finale. Le processus prend environ 10 minutes.',
      category: 'tokenisation'
    },
    {
      id: 2,
      question: 'Mes données sont-elles sécurisées ?',
      answer: 'Oui, nous utilisons un chiffrement AES-256 de niveau militaire. Vos données sont stockées sur des serveurs sécurisés en France et nous respectons strictement le RGPD.',
      category: 'sécurité'
    },
    {
      id: 3,
      question: 'Comment fonctionne le système anti-vol ?',
      answer: 'Notre système permet de signaler instantanément un vol et d\'alerter la communauté dans un rayon de 50km. Les forces de l\'ordre ont accès à notre base de données pour faciliter les enquêtes.',
      category: 'sécurité'
    },
    {
      id: 4,
      question: 'Quels sont les frais de transaction ?',
      answer: 'Nous prélevons 2,5% sur chaque transaction réussie. Ce pourcentage diminue avec votre niveau de badge (jusqu\'à 1% pour les membres Diamant).',
      category: 'transactions'
    },
    {
      id: 5,
      question: 'Comment gagner des points et badges ?',
      answer: 'Vous gagnez des points en tokenisant vos motos (100 pts), en vendant (200 pts), en aidant la communauté (50-500 pts) et en parrainant de nouveaux membres (75 pts).',
      category: 'récompenses'
    }
  ];

  const quickActions = [
    { title: 'Signaler un bug', icon: HelpCircle, action: () => showSuccess('Formulaire de bug ouvert') },
    { title: 'Demander une fonctionnalité', icon: MessageCircle, action: () => showSuccess('Formulaire de suggestion ouvert') },
    { title: 'Contacter le support', icon: Send, action: () => setShowChat(true) },
    { title: 'Guides vidéo', icon: Video, action: () => showSuccess('Bibliothèque vidéo ouverte') }
  ];

  const CategoryCard = ({ category }) => (
    <Animated.View style={[styles.categoryCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <TouchableOpacity onPress={() => showSuccess(`Section ${category.title} ouverte`)}>
        <View style={styles.categoryHeader}>
          <View style={[styles.categoryIcon, { backgroundColor: theme.colors.surface }]}>
            <category.icon size={24} color={theme.colors.primary} strokeWidth={2} />
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} strokeWidth={2} />
        </View>
        <ThemedText weight="600" style={{ marginBottom: 4 }}>{category.title}</ThemedText>
        <ThemedText secondary size="small" style={{ marginBottom: 8 }}>
          {category.description}
        </ThemedText>
        <ThemedText secondary size="small">
          {category.articles} article{category.articles !== 1 ? 's' : ''}
        </ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );

  const FAQItem = ({ item, isExpanded, onToggle }) => (
    <Animated.View style={[styles.faqItem, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <TouchableOpacity onPress={onToggle}>
        <View style={styles.faqHeader}>
          <ThemedText weight="600" style={{ flex: 1 }}>{item.question}</ThemedText>
          {isExpanded ? (
            <ChevronDown size={20} color={theme.colors.primary} strokeWidth={2} />
          ) : (
            <ChevronRight size={20} color={theme.colors.textSecondary} strokeWidth={2} />
          )}
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={[styles.faqAnswer, { borderTopColor: theme.colors.border }]}>
          <ThemedText secondary style={{ lineHeight: 22 }}>{item.answer}</ThemedText>
        </View>
      )}
    </Animated.View>
  );

  const ChatSupport = () => (
    <ThemedView card style={styles.chatSupport}>
      <View style={styles.chatHeader}>
        <ThemedText size="large" weight="bold">Support MX Link</ThemedText>
        <TouchableOpacity onPress={() => setShowChat(false)}>
          <ThemedText style={{ color: theme.colors.primary }}>Fermer</ThemedText>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.chatMessage, { backgroundColor: theme.colors.surface }]}>
        <ThemedText secondary size="small" style={{ marginBottom: 4 }}>Support MX Link</ThemedText>
        <ThemedText>
          Bonjour ! Je suis l'assistant IA de MX Link. Comment puis-je vous aider aujourd'hui ?
        </ThemedText>
      </View>
      
      <View style={styles.chatInput}>
        <ThemedInput
          placeholder="Tapez votre message..."
          style={{ flex: 1, marginRight: 12 }}
        />
        <TouchableOpacity 
          style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => showSuccess('Message envoyé au support')}
        >
          <Send size={20} color="#000000" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
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
        <ThemedText size="large" weight="bold">Centre d'aide</ThemedText>
        <TouchableOpacity 
          style={[styles.chatButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => setShowChat(true)}
        >
          <MessageCircle size={20} color="#000000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {showChat && <ChatSupport />}
        
        {/* Search */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Search size={20} color={theme.colors.textSecondary} strokeWidth={2} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Rechercher dans l'aide..."
              placeholderTextColor={theme.colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
            Actions rapides
          </ThemedText>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickActionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
                onPress={action.action}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.surface }]}>
                  <action.icon size={20} color={theme.colors.primary} strokeWidth={2} />
                </View>
                <ThemedText size="small" weight="600" style={{ textAlign: 'center' }}>
                  {action.title}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
            Catégories d'aide
          </ThemedText>
          <View style={styles.categoriesGrid}>
            {helpCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.faqSection}>
          <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
            Questions fréquentes
          </ThemedText>
          {filteredFAQ.map(item => (
            <FAQItem
              key={item.id}
              item={item}
              isExpanded={expandedFAQ === item.id}
              onToggle={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
            />
          ))}
        </View>
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
  chatButton: {
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
  searchSection: {
    marginVertical: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: (width - 60) / 2,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoriesSection: {
    marginBottom: 32,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqSection: {
    marginBottom: 32,
  },
  faqItem: {
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
  },
  chatSupport: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chatMessage: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});