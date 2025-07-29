import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ArrowLeft, Plus, Shield, Calendar, MapPin, MoveVertical as MoreVertical, Eye, CreditCard as Edit, Trash2, TriangleAlert as AlertTriangle, ShoppingBag } from 'lucide-react-native';
import { router } from 'expo-router';
import { BikeCardSkeleton, StatCardSkeleton } from '@/components/SkeletonLoader';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { useFadeIn } from '@/hooks/useAnimations';
import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function MyBikesScreen() {
  const [selectedBike, setSelectedBike] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast, showSuccess, showError, hideToast } = useToast();
  const fadeAnim = useFadeIn();

  const bikes = [
    {
      id: 1,
      make: 'Yamaha',
      model: 'YZ450F',
      year: '2023',
      color: 'Bleu Racing',
      status: 'certified',
      tokenId: 'MX-2023-YZ450F-001',
      registeredAt: '15 janvier 2024',
      location: 'Lyon, France',
      securityLevel: 'A1-SECURE',
    },
    {
      id: 2,
      make: 'Honda',
      model: 'CRF250R',
      year: '2022',
      color: 'Rouge Honda',
      status: 'pending',
      tokenId: 'MX-2022-CRF250R-002',
      registeredAt: '20 janvier 2024',
      location: 'Paris, France',
      securityLevel: 'B2-PENDING',
    },
    {
      id: 3,
      make: 'KTM',
      model: '350 SX-F',
      year: '2024',
      color: 'Orange KTM',
      status: 'certified',
      tokenId: 'MX-2024-350SXF-003',
      registeredAt: '10 janvier 2024',
      location: 'Marseille, France',
      securityLevel: 'A1-SECURE',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'certified': return '#4CAF50';
      case 'pending': return '#FFA726';
      case 'rejected': return '#FF6B6B';
      default: return '#888888';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'certified': return 'Certifiée';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejetée';
      default: return 'Inconnu';
    }
  };

  const BikeCard = ({ bike }: { bike: any }) => (
    <Animated.View style={[styles.bikeCard, { opacity: fadeAnim }]}>
      <View style={styles.bikeCardHeader}>
        <View style={styles.bikeMainInfo}>
          <Text style={styles.bikeTitle}>{bike.make} {bike.model}</Text>
          <Text style={styles.bikeSubtitle}>{bike.year} • {bike.color}</Text>
        </View>
        <View style={styles.bikeActions}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bike.status) }]}>
            <Text style={styles.statusText}>{getStatusLabel(bike.status)}</Text>
          </View>
          <TouchableOpacity 
            style={styles.moreButton}
            onPress={() => setSelectedBike(selectedBike === bike.id ? null : bike.id)}
          >
            <MoreVertical size={20} color="#888888" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bikeDetails}>
        <View style={styles.detailRow}>
          <Shield size={16} color="#C4F112" strokeWidth={2} />
          <Text style={styles.detailLabel}>Token ID:</Text>
          <Text style={styles.detailValue}>{bike.tokenId}</Text>
        </View>
        <View style={styles.detailRow}>
          <Calendar size={16} color="#888888" strokeWidth={2} />
          <Text style={styles.detailLabel}>Enregistrée:</Text>
          <Text style={styles.detailValue}>{bike.registeredAt}</Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={16} color="#888888" strokeWidth={2} />
          <Text style={styles.detailLabel}>Localisation:</Text>
          <Text style={styles.detailValue}>{bike.location}</Text>
        </View>
      </View>

      <View style={styles.securitySection}>
        <Text style={styles.securityLabel}>Niveau de sécurité</Text>
        <View style={styles.securityBadge}>
          <Text style={styles.securityLevel}>{bike.securityLevel}</Text>
        </View>
      </View>

      {selectedBike === bike.id && (
        <View style={styles.actionMenu}>
          <TouchableOpacity 
            style={styles.actionMenuItem}
            onPress={() => showSuccess('Détails de la moto affichés')}
          >
            <Eye size={18} color="#C4F112" strokeWidth={2} />
            <Text style={styles.actionMenuText}>Voir détails</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionMenuItem}
            onPress={() => showSuccess('Mode édition activé')}
          >
            <Edit size={18} color="#C4F112" strokeWidth={2} />
            <Text style={styles.actionMenuText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionMenuItem, styles.dangerAction]}
            onPress={() => showError('Suppression annulée')}
          >
            <Trash2 size={18} color="#FF6B6B" strokeWidth={2} />
            <Text style={[styles.actionMenuText, styles.dangerText]}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );

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
        <Text style={styles.headerTitle}>Mes Motos</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/(tabs)/tokenize')}
        >
          <Plus size={24} color="#000000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques</Text>
          <View style={styles.statsGrid}>
            {loading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <Animated.View style={[styles.statCard, { opacity: fadeAnim }]}>
                  <Text style={styles.statValue}>{bikes.length}</Text>
                  <Text style={styles.statLabel}>Motos totales</Text>
                </Animated.View>
                <Animated.View style={[styles.statCard, { opacity: fadeAnim }]}>
                  <Text style={styles.statValue}>
                    {bikes.filter(b => b.status === 'certified').length}
                  </Text>
                  <Text style={styles.statLabel}>Certifiées</Text>
                </Animated.View>
                <Animated.View style={[styles.statCard, { opacity: fadeAnim }]}>
                  <Text style={styles.statValue}>
                    {bikes.filter(b => b.status === 'pending').length}
                  </Text>
                  <Text style={styles.statLabel}>En attente</Text>
                </Animated.View>
              </>
            )}
          </View>
        </View>

        {/* Actions rapides */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => {
                showSuccess('Redirection vers signalement de vol...');
                router.push('/(tabs)/report-theft');
              }}
            >
              <AlertTriangle size={24} color="#FF6B6B" strokeWidth={2} />
              <Text style={styles.quickActionText}>Signaler un vol</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => {
                showSuccess('Redirection vers mise en vente...');
                router.push('/(tabs)/marketplace');
              }}
            >
              <ShoppingBag size={24} color="#C4F112" strokeWidth={2} />
              <Text style={styles.quickActionText}>Mettre en vente</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bikesSection}>
          <Text style={styles.sectionTitle}>Mes véhicules</Text>
          {loading ? (
            <>
              <BikeCardSkeleton />
              <BikeCardSkeleton />
              <BikeCardSkeleton />
            </>
          ) : (
            bikes.map(bike => (
              <BikeCard key={bike.id} bike={bike} />
            ))
          )}
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity 
            style={styles.addBikeButton}
            onPress={() => {
              showSuccess('Redirection vers l\'ajout de moto');
              router.push('/(tabs)/tokenize');
            }}
          >
            <Plus size={24} color="#000000" strokeWidth={2} />
            <Text style={styles.addBikeButtonText}>Ajouter une nouvelle moto</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom: 100,
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C4F112',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C4F112',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
  },
  bikesSection: {
    marginBottom: 32,
  },
  bikeCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
    position: 'relative',
  },
  bikeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bikeMainInfo: {
    flex: 1,
  },
  bikeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bikeSubtitle: {
    fontSize: 14,
    color: '#888888',
  },
  bikeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bikeDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888888',
    minWidth: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  securitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  securityLabel: {
    fontSize: 14,
    color: '#888888',
  },
  securityBadge: {
    backgroundColor: '#C4F112',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  securityLevel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  actionMenu: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 8,
    zIndex: 10,
    minWidth: 150,
  },
  actionMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  actionMenuText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  dangerAction: {
    // Styles pour les actions dangereuses
  },
  dangerText: {
    color: '#FF6B6B',
  },
  addBikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4F112',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 32,
    gap: 12,
  },
  addBikeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});