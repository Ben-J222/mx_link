import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Shield, Search, Scan, Lock, Zap, Award, Bell, ChevronRight, Activity, TrendingUp, MessageCircle, TriangleAlert as AlertTriangle, Clock, MapPin } from 'lucide-react-native';
import { useFadeIn, useSlideIn } from '@/hooks/useAnimations';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import NotificationCenter from '@/components/NotificationCenter';
import { Animated } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme } = useTheme();
  const [userLevel] = useState('ELITE-MX');
  const [showNotifications, setShowNotifications] = useState(false);
  const { toast, showSuccess, hideToast } = useToast();
  
  const fadeAnim = useFadeIn(800);
  const slideAnim = useSlideIn('up', 600, 200);

  // Données des dernières nouvelles du forum
  const dernieresNouvelles = [
    {
      id: 1,
      titre: "Nouvelle réglementation 2024",
      auteur: "AdminMX",
      temps: "Il y a 2h",
      reponses: 23,
      type: "annonce"
    },
    {
      id: 2,
      titre: "Conseils entretien moteur 4T",
      auteur: "MecanoExpert",
      temps: "Il y a 4h",
      reponses: 15,
      type: "discussion"
    },
    {
      id: 3,
      titre: "Nouveau circuit près de Lyon",
      auteur: "RiderLyon",
      temps: "Il y a 6h",
      reponses: 8,
      type: "info"
    }
  ];

  // Données des derniers vols signalés
  const derniersVols = [
    {
      id: 1,
      marque: "Yamaha",
      modele: "YZ450F",
      annee: "2023",
      lieu: "Lyon 7ème",
      temps: "Il y a 1h",
      recompense: "800€"
    },
    {
      id: 2,
      marque: "Honda",
      modele: "CRF250R",
      annee: "2022",
      lieu: "Marseille",
      temps: "Il y a 3h",
      recompense: "600€"
    },
    {
      id: 3,
      marque: "KTM",
      modele: "350 SX-F",
      annee: "2024",
      lieu: "Paris 15ème",
      temps: "Il y a 5h",
      recompense: "1200€"
    }
  ];

  const FeatureCard = ({ icon: Icon, title, subtitle, onPress, featured = false }) => (
    <Animated.View style={{ opacity: fadeAnim, ...slideAnim }}>
      <TouchableOpacity 
        style={[
          styles.featureCard, 
          { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
          featured && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
        ]} 
        onPress={() => {
          onPress();
          showSuccess(`${title} activé avec succès !`);
        }}
      >
        <View style={[
          styles.featureIcon, 
          { backgroundColor: theme.colors.surface },
          featured && { backgroundColor: 'rgba(0,0,0,0.1)' }
        ]}>
          <Icon size={28} color={featured ? '#000000' : '#C4F112'} strokeWidth={2} />
        </View>
        <View style={styles.featureContent}>
          <Text style={[
            styles.featureTitle, 
            { color: featured ? '#000000' : theme.colors.text }
          ]}>{title}</Text>
          <Text style={[
            styles.featureSubtitle, 
            { color: featured ? 'rgba(0,0,0,0.7)' : theme.colors.textSecondary }
          ]}>{subtitle}</Text>
        </View>
        <ChevronRight size={20} color={featured ? '#000000' : theme.colors.textSecondary} />
      </TouchableOpacity>
    </Animated.View>
  );

  const NouvelleCard = ({ nouvelle }) => (
    <Animated.View style={[
      styles.nouvelleCard, 
      { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }
    ]}>
      <View style={styles.nouvelleHeader}>
        <MessageCircle size={16} color="#C4F112" strokeWidth={2} />
        <Text style={styles.nouvelleType}>
          {nouvelle.type === 'annonce' ? 'Annonce' : nouvelle.type === 'discussion' ? 'Discussion' : 'Info'}
        </Text>
        <Text style={[styles.nouvelleTemps, { color: theme.colors.textSecondary }]}>{nouvelle.temps}</Text>
      </View>
      <Text style={[styles.nouvelleTitre, { color: theme.colors.text }]}>{nouvelle.titre}</Text>
      <View style={styles.nouvelleFooter}>
        <Text style={[styles.nouvelleAuteur, { color: theme.colors.textSecondary }]}>Par {nouvelle.auteur}</Text>
        <Text style={styles.nouvelleReponses}>{nouvelle.reponses} réponses</Text>
      </View>
    </Animated.View>
  );

  const VolCard = ({ vol }) => (
    <Animated.View style={[styles.volCard, { opacity: fadeAnim }]}>
      <View style={styles.volHeader}>
        <AlertTriangle size={16} color="#FF6B6B" strokeWidth={2} />
        <Text style={styles.volStatus}>VOLÉE</Text>
        <Text style={[styles.volTemps, { color: theme.colors.textSecondary }]}>{vol.temps}</Text>
      </View>
      <Text style={[styles.volMoto, { color: theme.colors.text }]}>{vol.marque} {vol.modele} {vol.annee}</Text>
      <View style={styles.volFooter}>
        <View style={styles.volLieu}>
          <MapPin size={12} color={theme.colors.textSecondary} strokeWidth={2} />
          <Text style={[styles.volLieuText, { color: theme.colors.textSecondary }]}>{vol.lieu}</Text>
        </View>
        <Text style={styles.volRecompense}>Récompense: {vol.recompense}</Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />
      
      <NotificationCenter
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header moderne */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, backgroundColor: theme.colors.background }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={[styles.greeting, { color: theme.colors.text }]}>Bonjour Alex</Text>
              <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Votre garage sécurisé</Text>
            </View>
            <TouchableOpacity 
              style={[styles.notificationButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
              onPress={() => setShowNotifications(true)}
            >
              <Bell size={22} color={theme.colors.primary} strokeWidth={2} />
              <View style={[styles.notificationDot, { backgroundColor: theme.colors.primary }]} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Action principale */}
        <Animated.View style={{ opacity: fadeAnim, ...slideAnim }}>
          <TouchableOpacity 
            style={[styles.primaryAction, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              showSuccess('Redirection vers la tokenisation...');
              setTimeout(() => {
                router.push('/(tabs)/tokenize');
              }, 1000);
            }}
          >
            <View style={styles.primaryActionContent}>
              <View style={styles.primaryActionIcon}>
                <Shield size={24} color="#000000" strokeWidth={2} />
              </View>
              <View style={styles.primaryActionText}>
                <Text style={[styles.primaryActionTitle, { color: '#000000' }]}>Tokeniser ma moto</Text>
                <Text style={[styles.primaryActionSubtitle, { color: 'rgba(0,0,0,0.7)' }]}>Certification blockchain</Text>
              </View>
              <View style={styles.primaryActionArrow}>
                <ChevronRight size={20} color="#000000" strokeWidth={2} />
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Dernières nouvelles du forum */}
        <Animated.View style={[styles.nouvellesSection, { opacity: fadeAnim, backgroundColor: theme.colors.background }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Dernières nouvelles</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/forum')}>
              <Text style={[styles.voirTout, { color: theme.colors.primary }]}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nouvellesList}>
            {dernieresNouvelles.map(nouvelle => (
              <NouvelleCard key={nouvelle.id} nouvelle={nouvelle} />
            ))}
          </View>
        </Animated.View>

        {/* Derniers vols signalés */}
        <Animated.View style={[styles.volsSection, { opacity: fadeAnim, backgroundColor: theme.colors.background }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Vols récents</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/theft-detail')}>
              <Text style={[styles.voirTout, { color: theme.colors.primary }]}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.volsList}>
            {derniersVols.map(vol => (
              <VolCard key={vol.id} vol={vol} />
            ))}
          </View>
        </Animated.View>

        {/* Fonctionnalités */}
        <Animated.View style={[styles.featuresSection, { opacity: fadeAnim, backgroundColor: theme.colors.background }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Actions rapides</Text>
          
          <FeatureCard
            icon={Search}
            title="Rechercher une moto volée"
            subtitle="Base de données communautaire"
            onPress={() => router.push('/(tabs)/search')}
          />
          
          <FeatureCard
            icon={Scan}
            title="Scanner QR Code"
            subtitle="Vérification instantanée"
            onPress={() => router.push('/(tabs)/scan')}
          />
          
          <FeatureCard
            icon={Zap}
            title="Transaction sécurisée"
            subtitle="Échange peer-to-peer"
            onPress={() => router.push('/(tabs)/marketplace')}
            featured={true}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 100, // Espace pour la navbar fixe
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  primaryAction: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 20,
    overflow: 'hidden',
  },
  primaryActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  primaryActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  primaryActionText: {
    flex: 1,
  },
  primaryActionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  primaryActionSubtitle: {
    fontSize: 14,
  },
  primaryActionArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuresSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 16,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featuredIcon: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featuredTitle: {
    color: '#000000',
  },
  featureSubtitle: {
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  voirTout: {
    fontSize: 14,
    fontWeight: '600',
  },
  nouvellesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  nouvellesList: {
    gap: 12,
  },
  nouvelleCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  nouvelleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  nouvelleType: {
    fontSize: 12,
    color: '#C4F112',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  nouvelleTemps: {
    fontSize: 12,
    marginLeft: 'auto',
  },
  nouvelleTitre: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  nouvelleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nouvelleAuteur: {
    fontSize: 12,
  },
  nouvelleReponses: {
    fontSize: 12,
    color: '#C4F112',
    fontWeight: '600',
  },
  volsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  volsList: {
    gap: 12,
  },
  volCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  volHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  volStatus: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  volTemps: {
    fontSize: 12,
    marginLeft: 'auto',
  },
  volMoto: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  volFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  volLieu: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  volLieuText: {
    fontSize: 12,
    marginLeft: 4,
  },
  volRecompense: {
    fontSize: 12,
    color: '#C4F112',
    fontWeight: '600',
  },
});