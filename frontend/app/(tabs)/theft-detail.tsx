import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { ArrowLeft, MapPin, Clock, TriangleAlert as AlertTriangle, Eye, Phone, Mail, Share, Heart, MessageCircle } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useFadeIn } from '@/hooks/useAnimations';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function TheftDetailScreen() {
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast, showSuccess, showError, hideToast } = useToast();
  const fadeAnim = useFadeIn();

  // Données de démonstration (normalement récupérées via l'ID)
  const theftDetail = {
    id: 1,
    make: 'Yamaha',
    model: 'YZ450F',
    year: '2022',
    color: 'Bleu Racing',
    location: 'Lyon 7ème, France',
    reportedAt: 'Il y a 1 heure',
    status: 'stolen',
    reward: '800€',
    description: 'Moto volée dans un parking souterrain sécurisé. La moto était attachée avec un antivol U. Vol probablement commis par des professionnels.',
    images: [
      'https://images.pexels.com/photos/163210/motorcycles-race-helmets-pilots-163210.jpeg',
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'
    ],
    owner: {
      name: 'Alex Martin',
      phone: '+33 6 12 34 56 78',
      email: 'alex.martin@email.com',
      verified: true
    },
    details: {
      vin: 'JYARN23E*MA123456',
      licensePlate: 'AB-123-CD',
      theftDate: '15 janvier 2024',
      theftTime: '14:30',
      policeReport: 'N° 2024-001234',
      lastSeen: 'Parking Bellecour, Lyon 2ème'
    },
    sightings: [
      {
        id: 1,
        location: 'Villeurbanne',
        time: 'Il y a 30 min',
        reporter: 'Témoin anonyme',
        description: 'Vue près de la station essence Total'
      },
      {
        id: 2,
        location: 'Vénissieux',
        time: 'Il y a 2h',
        reporter: 'MotoWatch69',
        description: 'Aperçue dans un garage suspect'
      }
    ]
  };

  const handleContact = (method: string) => {
    if (method === 'phone') {
      showSuccess('Numéro copié dans le presse-papier');
    } else if (method === 'email') {
      showSuccess('Email copié dans le presse-papier');
    }
  };

  const handleReportSighting = () => {
    showSuccess('Formulaire de signalement ouvert');
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
        <Text style={styles.headerTitle}>Détail du vol</Text>
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
        {/* Images */}
        <View style={styles.imageSection}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {theftDetail.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.bikeImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View style={styles.imageIndicator}>
            <Text style={styles.imageCount}>1 / {theftDetail.images.length}</Text>
          </View>
        </View>

        {/* Alerte principale */}
        <Animated.View style={[styles.alertCard, { opacity: fadeAnim }]}>
          <View style={styles.alertHeader}>
            <AlertTriangle size={24} color="#FF6B6B" strokeWidth={2} />
            <Text style={styles.alertTitle}>MOTO VOLÉE</Text>
          </View>
          <Text style={styles.bikeTitle}>
            {theftDetail.make} {theftDetail.model} {theftDetail.year}
          </Text>
          <Text style={styles.bikeColor}>{theftDetail.color}</Text>
          
          <View style={styles.alertMeta}>
            <View style={styles.metaItem}>
              <MapPin size={16} color="#888888" strokeWidth={2} />
              <Text style={styles.metaText}>{theftDetail.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={16} color="#888888" strokeWidth={2} />
              <Text style={styles.metaText}>Signalée {theftDetail.reportedAt}</Text>
            </View>
          </View>

          <View style={styles.rewardBadge}>
            <Text style={styles.rewardText}>Récompense: {theftDetail.reward}</Text>
          </View>
        </Animated.View>

        {/* Description */}
        <Animated.View style={[styles.descriptionCard, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>Description du vol</Text>
          <Text style={styles.descriptionText}>{theftDetail.description}</Text>
        </Animated.View>

        {/* Détails techniques */}
        <Animated.View style={[styles.detailsCard, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>Informations techniques</Text>
          <View style={styles.detailsList}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Numéro VIN:</Text>
              <Text style={styles.detailValue}>{theftDetail.details.vin}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Plaque:</Text>
              <Text style={styles.detailValue}>{theftDetail.details.licensePlate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date du vol:</Text>
              <Text style={styles.detailValue}>{theftDetail.details.theftDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Heure:</Text>
              <Text style={styles.detailValue}>{theftDetail.details.theftTime}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>N° plainte:</Text>
              <Text style={styles.detailValue}>{theftDetail.details.policeReport}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Dernière position:</Text>
              <Text style={styles.detailValue}>{theftDetail.details.lastSeen}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Signalements récents */}
        <Animated.View style={[styles.sightingsCard, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>Signalements récents</Text>
          {theftDetail.sightings.map(sighting => (
            <View key={sighting.id} style={styles.sightingItem}>
              <View style={styles.sightingHeader}>
                <View style={styles.sightingLocation}>
                  <MapPin size={14} color="#C4F112" strokeWidth={2} />
                  <Text style={styles.sightingLocationText}>{sighting.location}</Text>
                </View>
                <Text style={styles.sightingTime}>{sighting.time}</Text>
              </View>
              <Text style={styles.sightingReporter}>Par {sighting.reporter}</Text>
              <Text style={styles.sightingDescription}>{sighting.description}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Contact propriétaire */}
        <Animated.View style={[styles.contactCard, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>Contact propriétaire</Text>
          <View style={styles.ownerInfo}>
            <View style={styles.ownerAvatar}>
              <Text style={styles.ownerAvatarText}>
                {theftDetail.owner.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.ownerDetails}>
              <Text style={styles.ownerName}>{theftDetail.owner.name}</Text>
              {theftDetail.owner.verified && (
                <Text style={styles.verifiedBadge}>✓ Vérifié</Text>
              )}
            </View>
          </View>
          
          <View style={styles.contactButtons}>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => handleContact('phone')}
            >
              <Phone size={18} color="#C4F112" strokeWidth={2} />
              <Text style={styles.contactButtonText}>Appeler</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => handleContact('email')}
            >
              <Mail size={18} color="#C4F112" strokeWidth={2} />
              <Text style={styles.contactButtonText}>Email</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Actions fixes */}
      <View style={styles.fixedActions}>
        <TouchableOpacity 
          style={styles.reportSightingButton}
          onPress={handleReportSighting}
        >
          <Eye size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.reportSightingText}>J'ai vu cette moto</Text>
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
  bikeImage: {
    width: width,
    height: 250,
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
  alertCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginLeft: 8,
    letterSpacing: 1,
  },
  bikeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bikeColor: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 16,
  },
  alertMeta: {
    gap: 8,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: '#888888',
    marginLeft: 8,
  },
  rewardBadge: {
    backgroundColor: '#C4F112',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  rewardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#888888',
    lineHeight: 24,
  },
  detailsCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  detailsList: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#888888',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sightingsCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  sightingItem: {
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sightingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sightingLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sightingLocationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C4F112',
    marginLeft: 4,
  },
  sightingTime: {
    fontSize: 12,
    color: '#888888',
  },
  sightingReporter: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  sightingDescription: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  contactCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#C4F112',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ownerAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  ownerDetails: {
    flex: 1,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  verifiedBadge: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
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
  reportSightingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 12,
  },
  reportSightingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});