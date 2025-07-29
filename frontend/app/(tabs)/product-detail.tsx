import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { ArrowLeft, Heart, Share, Shield, MapPin, Calendar, Eye, Star, MessageCircle, Phone, Mail, Zap, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useFadeIn } from '@/hooks/useAnimations';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { toast, showSuccess, showError, hideToast } = useToast();
  const fadeAnim = useFadeIn();

  // Données de démonstration (normalement récupérées via l'ID)
  const product = {
    id: 1,
    marque: 'Yamaha',
    modele: 'YZ450F',
    annee: 2023,
    prix: 8500,
    localisation: 'Lyon (69)',
    distance: '12 km',
    images: [
      'https://images.pexels.com/photos/163210/motorcycles-race-helmets-pilots-163210.jpeg',
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg',
      'https://images.pexels.com/photos/163210/motorcycles-race-helmets-pilots-163210.jpeg'
    ],
    vendeur: {
      nom: 'Alex Martin',
      note: 4.8,
      ventes: 12,
      verifie: true,
      avatar: 'AM',
      membre_depuis: 'Janvier 2023',
      telephone: '+33 6 12 34 56 78',
      email: 'alex.martin@email.com'
    },
    caracteristiques: {
      heures: 45,
      cylindree: 450,
      type: '4 temps',
      etat: 'Excellent',
      couleur: 'Bleu Racing',
      modifications: ['Pot Akrapovic', 'Filtre à air K&N', 'Pneus neufs'],
      entretien: 'Révision complète effectuée',
      premiere_main: true
    },
    tokenId: 'MX-2023-YZ450F-001',
    certification: 'Or',
    dateAnnonce: '15 janvier 2024',
    vues: 234,
    favoris: 18,
    description: 'Magnifique Yamaha YZ450F de 2023 en excellent état. Très peu utilisée, seulement 45h au compteur. Entretien suivi religieusement, toutes les révisions effectuées en concession. Quelques modifications de qualité pour améliorer les performances. Vente cause arrêt de la pratique.',
    historique: [
      { date: '15/01/2024', action: 'Mise en vente', details: 'Annonce créée' },
      { date: '10/01/2024', action: 'Révision', details: 'Entretien complet chez Yamaha' },
      { date: '15/03/2023', action: 'Achat', details: 'Première mise en circulation' }
    ]
  };

  const getCertificationColor = (certification: string) => {
    switch (certification) {
      case 'Or': return '#FFD700';
      case 'Argent': return '#C0C0C0';
      case 'Bronze': return '#CD7F32';
      default: return '#888888';
    }
  };

  const handleContact = (method: string) => {
    if (method === 'phone') {
      showSuccess('Numéro copié dans le presse-papier');
    } else if (method === 'email') {
      showSuccess('Email copié dans le presse-papier');
    } else if (method === 'message') {
      showSuccess('Chat ouvert avec le vendeur');
    }
  };

  const handleTransaction = () => {
    showSuccess('Transaction sécurisée initiée');
  };

  const handleShare = () => {
    showSuccess('Lien partagé avec succès');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showSuccess(isFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris');
  };

  return (
    <View style={styles.container}>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail produit</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Heart 
              size={20} 
              color={isFavorite ? '#FF6B6B' : '#FFFFFF'} 
              fill={isFavorite ? '#FF6B6B' : 'transparent'}
              strokeWidth={2} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Share size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Galerie d'images */}
        <View style={styles.imageSection}>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setSelectedImageIndex(index);
            }}
          >
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.productImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          
          <View style={styles.imageIndicator}>
            <Text style={styles.imageCount}>
              {selectedImageIndex + 1} / {product.images.length}
            </Text>
          </View>

          <View style={styles.certificationBadge}>
            <Shield
              size={12}
              color={getCertificationColor(product.certification)}
              strokeWidth={2}
            />
            <Text style={[styles.certificationText, { color: getCertificationColor(product.certification) }]}>
              {product.certification}
            </Text>
          </View>
        </View>

        {/* Informations principales */}
        <Animated.View style={[styles.mainInfoCard, { opacity: fadeAnim }]}>
          <View style={styles.titleSection}>
            <Text style={styles.productTitle}>
              {product.marque} {product.modele}
            </Text>
            <Text style={styles.productYear}>{product.annee}</Text>
          </View>
          
          <Text style={styles.productPrice}>{product.prix.toLocaleString()}€</Text>
          
          <View style={styles.locationInfo}>
            <MapPin size={16} color="#888888" strokeWidth={2} />
            <Text style={styles.locationText}>{product.localisation}</Text>
            <Text style={styles.distanceText}>• {product.distance}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Eye size={16} color="#888888" strokeWidth={2} />
              <Text style={styles.statText}>{product.vues} vues</Text>
            </View>
            <View style={styles.statItem}>
              <Heart size={16} color="#888888" strokeWidth={2} />
              <Text style={styles.statText}>{product.favoris} favoris</Text>
            </View>
            <View style={styles.statItem}>
              <Calendar size={16} color="#888888" strokeWidth={2} />
              <Text style={styles.statText}>{product.dateAnnonce}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Caractéristiques */}
        <Animated.View style={[styles.characteristicsCard, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>Caractéristiques</Text>
          <View style={styles.characteristicsList}>
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Heures moteur:</Text>
              <Text style={styles.characteristicValue}>{product.caracteristiques.heures}h</Text>
            </View>
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Cylindrée:</Text>
              <Text style={styles.characteristicValue}>{product.caracteristiques.cylindree} cc</Text>
            </View>
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Type moteur:</Text>
              <Text style={styles.characteristicValue}>{product.caracteristiques.type}</Text>
            </View>
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>État:</Text>
              <Text style={styles.characteristicValue}>{product.caracteristiques.etat}</Text>
            </View>
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Couleur:</Text>
              <Text style={styles.characteristicValue}>{product.caracteristiques.couleur}</Text>
            </View>
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Première main:</Text>
              <Text style={styles.characteristicValue}>
                {product.caracteristiques.premiere_main ? 'Oui' : 'Non'}
              </Text>
            </View>
          </View>

          {product.caracteristiques.modifications.length > 0 && (
            <View style={styles.modificationsSection}>
              <Text style={styles.modificationsTitle}>Modifications:</Text>
              {product.caracteristiques.modifications.map((mod, index) => (
                <Text key={index} style={styles.modificationItem}>• {mod}</Text>
              ))}
            </View>
          )}
        </Animated.View>

        {/* Description */}
        <Animated.View style={[styles.descriptionCard, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </Animated.View>

        {/* Certification blockchain */}
        <Animated.View style={[styles.blockchainCard, { opacity: fadeAnim }]}>
          <View style={styles.blockchainHeader}>
            <Shield size={24} color="#C4F112" strokeWidth={2} />
            <Text style={styles.blockchainTitle}>Certification Blockchain</Text>
          </View>
          <View style={styles.tokenInfo}>
            <Text style={styles.tokenLabel}>Token ID:</Text>
            <Text style={styles.tokenValue}>{product.tokenId}</Text>
          </View>
          <Text style={styles.blockchainDescription}>
            Cette moto est certifiée sur la blockchain avec un historique vérifiable et infalsifiable.
          </Text>
        </Animated.View>

        {/* Historique */}
        <Animated.View style={[styles.historyCard, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>Historique</Text>
          {product.historique.map((event, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.historyDate}>
                <Text style={styles.historyDateText}>{event.date}</Text>
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyAction}>{event.action}</Text>
                <Text style={styles.historyDetails}>{event.details}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Vendeur */}
        <Animated.View style={[styles.sellerCard, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>Vendeur</Text>
          <View style={styles.sellerInfo}>
            <View style={styles.sellerAvatar}>
              <Text style={styles.sellerAvatarText}>{product.vendeur.avatar}</Text>
            </View>
            <View style={styles.sellerDetails}>
              <View style={styles.sellerNameRow}>
                <Text style={styles.sellerName}>{product.vendeur.nom}</Text>
                {product.vendeur.verifie && (
                  <View style={styles.verifiedBadge}>
                    <Shield size={12} color="#4CAF50" strokeWidth={2} />
                  </View>
                )}
              </View>
              <View style={styles.sellerRating}>
                <Star size={14} color="#FFD700" fill="#FFD700" strokeWidth={2} />
                <Text style={styles.ratingText}>{product.vendeur.note}</Text>
                <Text style={styles.salesText}>• {product.vendeur.ventes} ventes</Text>
              </View>
              <Text style={styles.memberSince}>Membre depuis {product.vendeur.membre_depuis}</Text>
            </View>
          </View>
          
          <View style={styles.contactButtons}>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => handleContact('message')}
            >
              <MessageCircle size={18} color="#C4F112" strokeWidth={2} />
              <Text style={styles.contactButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => handleContact('phone')}
            >
              <Phone size={18} color="#C4F112" strokeWidth={2} />
              <Text style={styles.contactButtonText}>Appeler</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Avertissement sécurité */}
        <Animated.View style={[styles.securityWarning, { opacity: fadeAnim }]}>
          <AlertTriangle size={20} color="#FF9800" strokeWidth={2} />
          <Text style={styles.securityWarningText}>
            Privilégiez les transactions sécurisées via MX Link pour votre protection.
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Actions fixes */}
      <View style={styles.fixedActions}>
        <TouchableOpacity 
          style={styles.transactionButton}
          onPress={handleTransaction}
        >
          <Zap size={20} color="#000000" strokeWidth={2} />
          <Text style={styles.transactionButtonText}>Transaction sécurisée</Text>
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  content: {
    flex: 1,
    paddingBottom: 120,
  },
  imageSection: {
    position: 'relative',
    marginBottom: 24,
  },
  productImage: {
    width: width,
    height: 300,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageCount: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  certificationBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  certificationText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  mainInfoCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  productYear: {
    fontSize: 18,
    color: '#888888',
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C4F112',
    marginBottom: 12,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#888888',
    marginLeft: 4,
  },
  distanceText: {
    fontSize: 14,
    color: '#888888',
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#888888',
  },
  characteristicsCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  characteristicsList: {
    gap: 12,
  },
  characteristicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  characteristicLabel: {
    fontSize: 14,
    color: '#888888',
  },
  characteristicValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modificationsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  modificationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  modificationItem: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  descriptionCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  descriptionText: {
    fontSize: 16,
    color: '#888888',
    lineHeight: 24,
  },
  blockchainCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C4F112',
  },
  blockchainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  blockchainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C4F112',
    marginLeft: 8,
  },
  tokenInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tokenLabel: {
    fontSize: 14,
    color: '#888888',
  },
  tokenValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C4F112',
  },
  blockchainDescription: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
  },
  historyCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  historyItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  historyDate: {
    width: 80,
    marginRight: 16,
  },
  historyDateText: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '600',
  },
  historyContent: {
    flex: 1,
  },
  historyAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  historyDetails: {
    fontSize: 12,
    color: '#888888',
  },
  sellerCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sellerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C4F112',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sellerAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  sellerDetails: {
    flex: 1,
  },
  sellerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700',
    marginLeft: 4,
  },
  salesText: {
    fontSize: 14,
    color: '#888888',
    marginLeft: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#888888',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C4F112',
  },
  securityWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  securityWarningText: {
    fontSize: 14,
    color: '#FF9800',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  fixedActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  transactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4F112',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 12,
  },
  transactionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});