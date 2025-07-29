import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Zap, Shield, DollarSign, Eye, Users, Award, Menu, X, Camera, FileText, CircleCheck as CheckCircle, Search, MapPin, TriangleAlert as AlertTriangle, MessageCircle } from 'lucide-react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const Header = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.logo}>
          <LinearGradient
            colors={['#C4F112', '#8BC34A']}
            style={styles.logoIcon}
          >
            <Zap size={24} color="#000000" strokeWidth={2} />
          </LinearGradient>
          <View>
            <Text style={styles.logoText}>MX Link</Text>
            <Text style={styles.logoSubtext}>Certification Numérique</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={24} color="#FFFFFF" strokeWidth={2} />
          ) : (
            <Menu size={24} color="#FFFFFF" strokeWidth={2} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.betaButton}>
          <Text style={styles.betaButtonText}>Rejoindre Beta</Text>
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <View style={styles.mobileMenu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Fonctionnalités</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Sécurité</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Récompenses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>À propos</Text>
          </TouchableOpacity>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Se connecter</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </View>
  );

  const Hero = () => (
    <LinearGradient
      colors={['#000000', '#1a1a1a', '#000000']}
      style={styles.hero}
    >
      <View style={styles.heroContent}>
        <View style={styles.badge}>
          <Shield size={16} color="#C4F112" strokeWidth={2} />
          <Text style={styles.badgeText}>Sécurité Militaire</Text>
        </View>

        <Text style={styles.heroTitle}>
          La Première{'\n'}Plateforme de{'\n'}
          <Text style={styles.heroTitleGradient}>Certification{'\n'}Numérique</Text>
          pour{'\n'}Motocross
        </Text>

        <Text style={styles.heroSubtitle}>
          Transformez un marché opaque de 450M€ en un écosystème 
          transparent et sécurisé. Certification infalsifiable, transactions 
          100% sécurisées, protection anti-vol.
        </Text>

        <View style={styles.heroButtons}>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Rejoindre la Beta</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>En savoir plus</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>300K</Text>
            <Text style={styles.statLabel}>Motocross</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>25K</Text>
            <Text style={styles.statLabel}>Transactions/an</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.5K</Text>
            <Text style={styles.statLabel}>Vols/an</Text>
          </View>
        </View>

        <View style={styles.featureCards}>
          <View style={styles.featureCard}>
            <View style={styles.featureCardIcon}>
              <Shield size={24} color="#C4F112" strokeWidth={2} />
            </View>
            <Text style={styles.featureCardTitle}>Token Unique</Text>
            <Text style={styles.featureCardSubtitle}>Certification infalsifiable</Text>
            <Text style={styles.featureCardDesc}>
              Chaque moto obtient un token numérique unique, garantissant son 
              authenticité et son historique.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureCardIcon}>
              <Users size={24} color="#C4F112" strokeWidth={2} />
            </View>
            <Text style={styles.featureCardTitle}>Séquestre Automatisé</Text>
            <Text style={styles.featureCardSubtitle}>Transactions 100% sécurisées</Text>
            <Text style={styles.featureCardDesc}>
              Protection complète acheteur/vendeur avec validation multi-étapes via 
              Stripe Connect.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureCardIcon}>
              <Zap size={24} color="#C4F112" strokeWidth={2} />
            </View>
            <Text style={styles.featureCardTitle}>IA Anti-Fraude</Text>
            <Text style={styles.featureCardSubtitle}>Détection proactive</Text>
            <Text style={styles.featureCardDesc}>
              Intelligence artificielle avancée pour identifier et bloquer les annonces 
              suspectes.
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );

  const Features = () => {
    const features = [
      {
        icon: Shield,
        title: 'Certification Numérique',
        description: 'Token unique par moto, document juridiquement sécurisé, historique inaltérable',
        points: ['Vérification instantanée', 'Blockchain-free', 'Conformité légale']
      },
      {
        icon: DollarSign,
        title: 'Transactions Sécurisées',
        description: 'Séquestre automatique, validation multi-étapes, protection acheteur/vendeur',
        points: ['Stripe Connect', 'Résolution litiges', 'Remboursement garanti']
      },
      {
        icon: Eye,
        title: 'Protection Anti-Vol',
        description: 'Base collaborative temps réel, alertes géolocalisées, API forces de l\'ordre',
        points: ['Alertes communautaires', 'Signalement instantané', 'Géolocalisation']
      },
      {
        icon: Users,
        title: 'Réseau Communautaire',
        description: 'Système de récompenses, ambassadeurs, gamification avancée',
        points: ['5 niveaux de badges', 'Récompenses exclusives', 'Effet réseau']
      },
      {
        icon: Zap,
        title: 'IA Anti-Fraude',
        description: 'Détection proactive des annonces suspectes, analyse comportementale',
        points: ['Machine Learning', 'Analyse temps réel', 'Prévention fraudes']
      },
      {
        icon: Award,
        title: 'Standards Militaires',
        description: 'Sécurité niveau nucléaire, chiffrement AES256, audit trail immuable',
        points: ['Zero Trust', 'MFA obligatoire', 'Penetration testing']
      }
    ];

    return (
      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Une Solution Complète et Sécurisée</Text>
        <Text style={styles.featuresSubtitle}>
          MX Link combine expertise militaire et passion motocross pour créer la première 
          plateforme de certification numérique dédiée aux motos non-immatriculées.
        </Text>
        
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <IconComponent size={24} color="#C4F112" strokeWidth={2} />
                </View>
                <Text style={styles.featureItemTitle}>{feature.title}</Text>
                <Text style={styles.featureItemDesc}>{feature.description}</Text>
                <View style={styles.featurePoints}>
                  {feature.points.map((point, pointIndex) => (
                    <Text key={pointIndex} style={styles.featurePoint}>• {point}</Text>
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        <LinearGradient
          colors={['#C4F112', '#8BC34A']}
          style={styles.ctaCard}
        >
          <Text style={styles.ctaTitle}>Prêt à Révolutionner Vos Transactions Motocross ?</Text>
          <Text style={styles.ctaSubtitle}>
            Rejoignez les early adopters et façonnez l'avenir du marché motocross français.
          </Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Demander un Accès Beta</Text>
            </TouchableOpacity>
          </Link>
        </LinearGradient>
      </View>
    );
  };

  const TokenizationProcess = () => (
    <View style={styles.processSection}>
      <Text style={styles.processTitle}>Processus de Tokenisation Intelligente</Text>
      
      <View style={styles.processSteps}>
        <View style={styles.processStep}>
          <View style={[styles.processIcon, { backgroundColor: '#C4F112' }]}>
            <Camera size={24} color="#000000" strokeWidth={2} />
          </View>
          <Text style={styles.processStepTitle}>Capture</Text>
          <Text style={styles.processStepDesc}>Photos et données techniques de la moto</Text>
        </View>

        <View style={styles.processStep}>
          <View style={[styles.processIcon, { backgroundColor: '#888888' }]}>
            <Shield size={24} color="#C4F112" strokeWidth={2} />
          </View>
          <Text style={styles.processStepTitle}>Vérification</Text>
          <Text style={styles.processStepDesc}>IA vérifie cohérence et authenticité</Text>
        </View>

        <View style={styles.processStep}>
          <View style={[styles.processIcon, { backgroundColor: '#333333' }]}>
            <FileText size={24} color="#C4F112" strokeWidth={2} />
          </View>
          <Text style={styles.processStepTitle}>Génération</Text>
          <Text style={styles.processStepDesc}>Token unique et document PDF officiel</Text>
        </View>

        <View style={styles.processStep}>
          <View style={[styles.processIcon, { backgroundColor: '#1E1E1E' }]}>
            <CheckCircle size={24} color="#C4F112" strokeWidth={2} />
          </View>
          <Text style={styles.processStepTitle}>Certification</Text>
          <Text style={styles.processStepDesc}>Identité permanente et infalsifiable</Text>
        </View>
      </View>
    </View>
  );

  const CertificationLevels = () => (
    <View style={styles.levelsSection}>
      <Text style={styles.levelsTitle}>Niveaux de Certification</Text>
      
      <View style={styles.levelsGrid}>
        <View style={styles.levelCard}>
          <View style={[styles.levelIcon, { backgroundColor: '#C4F112' }]}>
            <Award size={24} color="#000000" strokeWidth={2} />
          </View>
          <Text style={styles.levelTitle}>Bronze</Text>
          <View style={styles.levelFeatures}>
            <Text style={styles.levelFeature}>• Marque, modèle, année, cylindrée</Text>
            <Text style={styles.levelFeature}>• Numéros de cadre et moteur</Text>
            <Text style={styles.levelFeature}>• 3 photos minimum</Text>
            <Text style={styles.levelFeature}>• Coordonnées propriétaire</Text>
          </View>
        </View>

        <View style={styles.levelCard}>
          <View style={[styles.levelIcon, { backgroundColor: '#888888' }]}>
            <Shield size={24} color="#C4F112" strokeWidth={2} />
          </View>
          <Text style={styles.levelTitle}>Argent</Text>
          <View style={styles.levelFeatures}>
            <Text style={styles.levelFeature}>• Toutes les infos Bronze +</Text>
            <Text style={styles.levelFeature}>• 6-10 photos haute qualité</Text>
            <Text style={styles.levelFeature}>• Historique de propriété</Text>
            <Text style={styles.levelFeature}>• Modifications déclarées</Text>
            <Text style={styles.levelFeature}>• Kilométrage</Text>
          </View>
        </View>

        <View style={styles.levelCard}>
          <View style={[styles.levelIcon, { backgroundColor: '#333333' }]}>
            <CheckCircle size={24} color="#C4F112" strokeWidth={2} />
          </View>
          <Text style={styles.levelTitle}>Or</Text>
          <View style={styles.levelFeatures}>
            <Text style={styles.levelFeature}>• Toutes les infos Argent +</Text>
            <Text style={styles.levelFeature}>• Vérification garage partenaire</Text>
            <Text style={styles.levelFeature}>• Historique entretien complet</Text>
            <Text style={styles.levelFeature}>• Rapport d'inspection</Text>
            <Text style={styles.levelFeature}>• Garantie authenticité</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const Benefits = () => (
    <View style={styles.benefitsSection}>
      <Text style={styles.benefitsTitle}>Bénéfices pour Tous</Text>
      
      <View style={styles.benefitsGrid}>
        <View style={styles.benefitCard}>
          <View style={[styles.benefitIcon, { backgroundColor: '#C4F112' }]}>
            <Text style={[styles.benefitLetter, { color: '#000000' }]}>V</Text>
          </View>
          <Text style={styles.benefitTitle}>Vendeurs</Text>
          <Text style={styles.benefitDesc}>
            Valorisation maximale avec un dossier complet et vérifiable
          </Text>
        </View>

        <View style={styles.benefitCard}>
          <View style={[styles.benefitIcon, { backgroundColor: '#888888' }]}>
            <Text style={[styles.benefitLetter, { color: '#C4F112' }]}>A</Text>
          </View>
          <Text style={styles.benefitTitle}>Acheteurs</Text>
          <Text style={styles.benefitDesc}>
            Transparence totale sur l'historique et l'authenticité
          </Text>
        </View>

        <View style={styles.benefitCard}>
          <View style={[styles.benefitIcon, { backgroundColor: '#333333' }]}>
            <Text style={[styles.benefitLetter, { color: '#C4F112' }]}>C</Text>
          </View>
          <Text style={styles.benefitTitle}>Communauté</Text>
          <Text style={styles.benefitDesc}>
            Base de données fiable et vérifiée pour tous
          </Text>
        </View>
      </View>
    </View>
  );

  const AntiTheft = () => (
    <View style={styles.antiTheftSection}>
      <View style={styles.antiTheftBadge}>
        <Shield size={16} color="#FF6B6B" strokeWidth={2} />
        <Text style={styles.antiTheftBadgeText}>Protection Anti-Vol</Text>
      </View>
      
      <Text style={styles.antiTheftTitle}>Système Anti-Vol Nouvelle Génération</Text>
      <Text style={styles.antiTheftDesc}>
        Un réseau collaboratif ultra-réactif qui protège la communauté contre le vol, avec des 
        alertes temps réel et une intelligence artificielle avancée.
      </Text>

      <View style={styles.antiTheftFeatures}>
        <View style={styles.antiTheftFeature}>
          <View style={[styles.antiTheftFeatureIcon, { backgroundColor: '#C4F112' }]}>
            <Search size={20} color="#000000" strokeWidth={2} />
          </View>
          <Text style={styles.antiTheftFeatureTitle}>Numéro de Cadre/Moteur</Text>
          <Text style={styles.antiTheftFeatureDesc}>Recherche exacte ou partielle</Text>
        </View>

        <View style={styles.antiTheftFeature}>
          <View style={[styles.antiTheftFeatureIcon, { backgroundColor: '#888888' }]}>
            <MapPin size={20} color="#C4F112" strokeWidth={2} />
          </View>
          <Text style={styles.antiTheftFeatureTitle}>Caractéristiques</Text>
          <Text style={styles.antiTheftFeatureDesc}>Marque, modèle, couleur, année</Text>
        </View>

        <View style={styles.antiTheftFeature}>
          <View style={[styles.antiTheftFeatureIcon, { backgroundColor: '#333333' }]}>
            <Zap size={20} color="#C4F112" strokeWidth={2} />
          </View>
          <Text style={styles.antiTheftFeatureTitle}>Reconnaissance Photo</Text>
          <Text style={styles.antiTheftFeatureDesc}>IA compare avec la base</Text>
        </View>

        <View style={styles.antiTheftFeature}>
          <View style={[styles.antiTheftFeatureIcon, { backgroundColor: '#1E1E1E' }]}>
            <Users size={20} color="#C4F112" strokeWidth={2} />
          </View>
          <Text style={styles.antiTheftFeatureTitle}>Zone Géographique</Text>
          <Text style={styles.antiTheftFeatureDesc}>Alertes localisées</Text>
        </View>
      </View>

      <View style={styles.theftReportSteps}>
        <Text style={styles.theftReportTitle}>Déclaration de Vol en 3 Étapes</Text>
        
        <View style={styles.theftStep}>
          <View style={[styles.theftStepIcon, { backgroundColor: '#C4F112' }]}>
            <AlertTriangle size={20} color="#000000" strokeWidth={2} />
          </View>
          <View style={styles.theftStepContent}>
            <Text style={styles.theftStepTitle}>Signalement Express</Text>
            <Text style={styles.theftStepTime}>30 secondes</Text>
            <Text style={styles.theftStepDesc}>Token ou VIN + Photo du dépôt de plainte + Dernière localisation</Text>
          </View>
        </View>

        <View style={styles.theftStep}>
          <View style={[styles.theftStepIcon, { backgroundColor: '#888888' }]}>
            <Zap size={20} color="#C4F112" strokeWidth={2} />
          </View>
          <View style={styles.theftStepContent}>
            <Text style={styles.theftStepTitle}>Diffusion Automatique</Text>
            <Text style={styles.theftStepTime}>Instantané</Text>
            <Text style={styles.theftStepDesc}>Alerte push 50km + Email garages + Base nationale</Text>
          </View>
        </View>

        <View style={styles.theftStep}>
          <View style={[styles.theftStepIcon, { backgroundColor: '#333333' }]}>
            <MessageCircle size={20} color="#C4F112" strokeWidth={2} />
          </View>
          <View style={styles.theftStepContent}>
            <Text style={styles.theftStepTitle}>Suivi Temps Réel</Text>
            <Text style={styles.theftStepTime}>Continu</Text>
            <Text style={styles.theftStepDesc}>Statut évolutif + Carte signalements + Messagerie directe</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const Footer = () => (
    <View style={styles.piedDePage}>
      <View style={styles.contenuPiedDePage}>
        {/* Logo et description */}
        <View style={styles.marquePiedDePage}>
          <View style={styles.logoPiedDePage}>
            <LinearGradient
              colors={['#C4F112', '#8BC34A']}
              style={styles.iconeLogoStyle}
            >
              <Zap size={20} color="#000000" strokeWidth={2} />
            </LinearGradient>
            <View>
              <Text style={styles.texteLogoPiedDePage}>MX Link</Text>
              <Text style={styles.sousTexteLogoPiedDePage}>Certification Numérique</Text>
            </View>
          </View>
          <Text style={styles.descriptionPiedDePage}>
            La première plateforme de certification numérique pour motocross. 
            Sécurisez vos transactions et protégez votre passion.
          </Text>
        </View>

        {/* Liens Rapides */}
        <View style={styles.sectionPiedDePage}>
          <Text style={styles.titreSectionPiedDePage}>Liens Rapides</Text>
          <TouchableOpacity style={styles.lienPiedDePage}>
            <Text style={styles.texteLienPiedDePage}>Fonctionnalités</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lienPiedDePage}>
            <Text style={styles.texteLienPiedDePage}>Sécurité</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lienPiedDePage}>
            <Text style={styles.texteLienPiedDePage}>À propos</Text>
          </TouchableOpacity>
        </View>

        {/* Services */}
        <View style={styles.sectionPiedDePage}>
          <Text style={styles.titreSectionPiedDePage}>Services</Text>
          <TouchableOpacity style={styles.lienPiedDePage}>
            <Text style={styles.texteLienPiedDePage}>Certification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lienPiedDePage}>
            <Text style={styles.texteLienPiedDePage}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lienPiedDePage}>
            <Text style={styles.texteLienPiedDePage}>Protection</Text>
          </TouchableOpacity>
        </View>

        {/* Contact */}
        <View style={styles.sectionPiedDePage}>
          <Text style={styles.titreSectionPiedDePage}>Contact</Text>
          <Text style={styles.texteContactPiedDePage}>support@mxlink.com</Text>
          <Text style={styles.texteContactPiedDePage}>+33 1 23 45 67 89</Text>
        </View>
      </View>

      <View style={styles.basPiedDePage}>
        <Text style={styles.droitsAuteur}>© 2024 MX Link. Tous droits réservés.</Text>
        <View style={styles.liensLegaux}>
          <TouchableOpacity>
            <Text style={styles.lienLegal}>Mentions légales</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.lienLegal}>Confidentialité</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />
      <Hero />
      <Features />
      <TokenizationProcess />
      <CertificationLevels />
      <Benefits />
      <AntiTheft />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoSubtext: {
    fontSize: 12,
    color: '#888888',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  betaButton: {
    backgroundColor: '#C4F112',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    display: 'none', // Hidden on mobile, shown on desktop
  },
  betaButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  mobileMenu: {
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingVertical: 8,
  },
  menuItem: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  hero: {
    paddingTop: 140,
    paddingBottom: 80,
    paddingHorizontal: 24,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(196, 241, 18, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(196, 241, 18, 0.3)',
    marginBottom: 24,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C4F112',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 44,
    marginBottom: 16,
  },
  heroTitleGradient: {
    color: '#C4F112',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#888888',
    lineHeight: 24,
    marginBottom: 32,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 48,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#C4F112',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    flex: 1,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 48,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C4F112',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888888',
  },
  featureCards: {
    gap: 16,
    width: '100%',
  },
  featureCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  featureCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureCardSubtitle: {
    fontSize: 14,
    color: '#C4F112',
    marginBottom: 8,
  },
  featureCardDesc: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
  },
  features: {
    backgroundColor: '#0A0A0A',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  featuresTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  featuresSubtitle: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  featuresGrid: {
    gap: 24,
    marginBottom: 48,
  },
  featureItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featureItemDesc: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
    marginBottom: 16,
  },
  featurePoints: {
    gap: 4,
  },
  featurePoint: {
    fontSize: 12,
    color: '#C4F112',
  },
  ctaCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.7)',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  processSection: {
    backgroundColor: '#0A0A0A',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  processTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 48,
  },
  processSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 24,
  },
  processStep: {
    alignItems: 'center',
    flex: 1,
    minWidth: 120,
  },
  processIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  processStepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  processStepDesc: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
  levelsSection: {
    backgroundColor: '#000000',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  levelsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 48,
  },
  levelsGrid: {
    gap: 24,
  },
  levelCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
  levelIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  levelFeatures: {
    gap: 8,
  },
  levelFeature: {
    fontSize: 14,
    color: '#888888',
  },
  benefitsSection: {
    backgroundColor: '#0A0A0A',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  benefitsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 48,
  },
  benefitsGrid: {
    gap: 24,
  },
  benefitCard: {
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: '#333333',
  },
  benefitIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  benefitLetter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C4F112',
  },
  benefitTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  benefitDesc: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
  antiTheftSection: {
    backgroundColor: '#0A0A0A',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  antiTheftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 24,
    gap: 6,
  },
  antiTheftBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  antiTheftTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  antiTheftDesc: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  antiTheftFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 48,
  },
  antiTheftFeature: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  antiTheftFeatureIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  antiTheftFeatureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  antiTheftFeatureDesc: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
  },
  theftReportSteps: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
  theftReportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  theftStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 16,
  },
  theftStepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  theftStepContent: {
    flex: 1,
  },
  theftStepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  theftStepTime: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 8,
  },
  theftStepDesc: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
  },
  piedDePage: {
    backgroundColor: '#0A0A0A',
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  contenuPiedDePage: {
    gap: 32,
    marginBottom: 32,
  },
  marquePiedDePage: {
    gap: 12,
  },
  logoPiedDePage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  texteLogoPiedDePage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sousTexteLogoPiedDePage: {
    fontSize: 12,
    color: '#888888',
  },
  descriptionPiedDePage: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
  },
  sectionPiedDePage: {
    gap: 12,
  },
  titreSectionPiedDePage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  lienPiedDePage: {
    paddingVertical: 4,
  },
  texteLienPiedDePage: {
    fontSize: 14,
    color: '#888888',
  },
  texteContactPiedDePage: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  basPiedDePage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  droitsAuteur: {
    fontSize: 12,
    color: '#666666',
  },
  liensLegaux: {
    flexDirection: 'row',
    gap: 16,
  },
  lienLegal: {
    fontSize: 12,
    color: '#666666',
  },
});