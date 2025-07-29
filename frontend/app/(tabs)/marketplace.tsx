import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Dimensions } from 'react-native';
import { ArrowLeft, Search, Filter, MapPin, Calendar, Shield, Heart, Eye, MessageCircle, Star, ChevronDown, Grid3x3 as Grid3X3, List, SlidersHorizontal } from 'lucide-react-native';
import { router } from 'expo-router';
import { useFadeIn } from '@/hooks/useAnimations';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { Animated } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function MarketplaceScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [filters, setFilters] = useState({
    marque: '',
    prixMin: '',
    prixMax: '',
    anneeMin: '',
    anneeMax: '',
    localisation: '',
    rayon: '50',
    etat: '',
    certification: '',
  });

  const { toast, showSuccess, showError, hideToast } = useToast();
  const fadeAnim = useFadeIn();

  // Données de démonstration
  const motos = [
    {
      id: 1,
      marque: 'Yamaha',
      modele: 'YZ450F',
      annee: 2023,
      prix: 8500,
      localisation: 'Lyon (69)',
      distance: '12 km',
      images: ['https://images.pexels.com/photos/163210/motorcycles-race-helmets-pilots-163210.jpeg'],
      vendeur: {
        nom: 'Alex Martin',
        note: 4.8,
        ventes: 12,
        verifie: true,
      },
      caracteristiques: {
        heures: 45,
        cylindree: 450,
        type: '4 temps',
        etat: 'Excellent',
      },
      tokenId: 'MX-2023-YZ450F-001',
      certification: 'Or',
      dateAnnonce: '2024-01-15',
      vues: 234,
      favoris: 18,
    },
    {
      id: 2,
      marque: 'Honda',
      modele: 'CRF250R',
      annee: 2022,
      prix: 6800,
      localisation: 'Marseille (13)',
      distance: '45 km',
      images: ['https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'],
      vendeur: {
        nom: 'Pierre Dubois',
        note: 4.6,
        ventes: 8,
        verifie: true,
      },
      caracteristiques: {
        heures: 78,
        cylindree: 250,
        type: '4 temps',
        etat: 'Très bon',
      },
      tokenId: 'MX-2022-CRF250R-002',
      certification: 'Argent',
      dateAnnonce: '2024-01-14',
      vues: 156,
      favoris: 12,
    },
    {
      id: 3,
      marque: 'KTM',
      modele: '350 SX-F',
      annee: 2024,
      prix: 9200,
      localisation: 'Paris (75)',
      distance: '8 km',
      images: ['https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'],
      vendeur: {
        nom: 'Marie Leroy',
        note: 4.9,
        ventes: 15,
        verifie: true,
      },
      caracteristiques: {
        heures: 12,
        cylindree: 350,
        type: '4 temps',
        etat: 'Neuf',
      },
      tokenId: 'MX-2024-350SXF-003',
      certification: 'Or',
      dateAnnonce: '2024-01-16',
      vues: 312,
      favoris: 25,
    },
    {
      id: 4,
      marque: 'Kawasaki',
      modele: 'KX250',
      annee: 2021,
      prix: 5500,
      localisation: 'Toulouse (31)',
      distance: '25 km',
      images: ['https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg'],
      vendeur: {
        nom: 'Thomas Garcia',
        note: 4.5,
        ventes: 6,
        verifie: false,
      },
      caracteristiques: {
        heures: 120,
        cylindree: 250,
        type: '2 temps',
        etat: 'Bon',
      },
      tokenId: 'MX-2021-KX250-004',
      certification: 'Bronze',
      dateAnnonce: '2024-01-13',
      vues: 89,
      favoris: 7,
    },
  ];

  const toggleFavorite = (motoId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(motoId)) {
      newFavorites.delete(motoId);
      showSuccess('Retiré des favoris');
    } else {
      newFavorites.add(motoId);
      showSuccess('Ajouté aux favoris');
    }
    setFavorites(newFavorites);
  };

  const getCertificationColor = (certification: string) => {
    switch (certification) {
      case 'Or': return '#FFD700';
      case 'Argent': return '#C0C0C0';
      case 'Bronze': return '#CD7F32';
      default: return '#888888';
    }
  };

  const MotoCard = ({ moto, isGrid }: { moto: any; isGrid: boolean }) => (
    <Animated.View style={[
      isGrid ? styles.gridCard : styles.listCard,
      { opacity: fadeAnim }
    ]}>
      <TouchableOpacity
        onPress={() => {
          router.push('/(tabs)/product-detail');
        }}
      >
        <View style={isGrid ? styles.gridImageContainer : styles.listImageContainer}>
          <Image
            source={{ uri: moto.images[0] }}
            style={isGrid ? styles.gridImage : styles.listImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(moto.id)}
          >
            <Heart
              size={20}
              color={favorites.has(moto.id) ? '#FF6B6B' : '#FFFFFF'}
              fill={favorites.has(moto.id) ? '#FF6B6B' : 'transparent'}
              strokeWidth={2}
            />
          </TouchableOpacity>
          <View style={styles.certificationBadge}>
            <Shield
              size={12}
              color={getCertificationColor(moto.certification)}
              strokeWidth={2}
            />
            <Text style={[styles.certificationText, { color: getCertificationColor(moto.certification) }]}>
              {moto.certification}
            </Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.motoTitle}>
              {moto.marque} {moto.modele}
            </Text>
            <Text style={styles.motoYear}>{moto.annee}</Text>
          </View>

          <Text style={styles.motoPrice}>{moto.prix.toLocaleString()}€</Text>

          <View style={styles.motoDetails}>
            <View style={styles.detailItem}>
              <MapPin size={14} color="#888888" strokeWidth={2} />
              <Text style={styles.detailText}>{moto.localisation}</Text>
            </View>
            <View style={styles.detailItem}>
              <Calendar size={14} color="#888888" strokeWidth={2} />
              <Text style={styles.detailText}>{moto.caracteristiques.heures}h</Text>
            </View>
          </View>

          <View style={styles.vendeurInfo}>
            <View style={styles.vendeurDetails}>
              <Text style={styles.vendeurNom}>{moto.vendeur.nom}</Text>
              {moto.vendeur.verifie && (
                <Shield size={12} color="#4CAF50" strokeWidth={2} />
              )}
            </View>
            <View style={styles.vendeurNote}>
              <Star size={12} color="#FFD700" fill="#FFD700" strokeWidth={2} />
              <Text style={styles.noteText}>{moto.vendeur.note}</Text>
            </View>
          </View>

          <View style={styles.cardStats}>
            <View style={styles.statItem}>
              <Eye size={12} color="#888888" strokeWidth={2} />
              <Text style={styles.statText}>{moto.vues}</Text>
            </View>
            <View style={styles.statItem}>
              <Heart size={12} color="#888888" strokeWidth={2} />
              <Text style={styles.statText}>{moto.favoris}</Text>
            </View>
            <TouchableOpacity style={styles.contactButton}>
              <MessageCircle size={14} color="#C4F112" strokeWidth={2} />
              <Text style={styles.contactText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const FilterModal = () => (
    showFilters && (
      <View style={styles.filterModal}>
        <View style={styles.filterHeader}>
          <Text style={styles.filterTitle}>Filtres</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Text style={styles.closeFilter}>Fermer</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.filterContent}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Prix</Text>
            <View style={styles.priceInputs}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min"
                placeholderTextColor="#666666"
                value={filters.prixMin}
                onChangeText={(text) => setFilters({...filters, prixMin: text})}
                keyboardType="numeric"
              />
              <Text style={styles.priceSeparator}>-</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="Max"
                placeholderTextColor="#666666"
                value={filters.prixMax}
                onChangeText={(text) => setFilters({...filters, prixMax: text})}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Année</Text>
            <View style={styles.priceInputs}>
              <TextInput
                style={styles.priceInput}
                placeholder="De"
                placeholderTextColor="#666666"
                value={filters.anneeMin}
                onChangeText={(text) => setFilters({...filters, anneeMin: text})}
                keyboardType="numeric"
              />
              <Text style={styles.priceSeparator}>-</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="À"
                placeholderTextColor="#666666"
                value={filters.anneeMax}
                onChangeText={(text) => setFilters({...filters, anneeMax: text})}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.applyFiltersButton}>
            <Text style={styles.applyFiltersText}>Appliquer les filtres</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />

      <FilterModal />

      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Marketplace</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.viewModeButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? (
              <List size={20} color={theme.colors.primary} strokeWidth={2} />
            ) : (
              <Grid3X3 size={20} color={theme.colors.primary} strokeWidth={2} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={20} color={theme.colors.textSecondary} strokeWidth={2} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Rechercher une moto..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => setShowFilters(true)}
        >
          <SlidersHorizontal size={20} color={theme.colors.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.sortSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.sortOptions}>
            {[
              { key: 'recent', label: 'Plus récentes' },
              { key: 'price-asc', label: 'Prix croissant' },
              { key: 'price-desc', label: 'Prix décroissant' },
              { key: 'distance', label: 'Proximité' },
              { key: 'popular', label: 'Populaires' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.sortOption,
                  sortBy === option.key && styles.activeSortOption
                ]}
                onPress={() => setSortBy(option.key)}
              >
                <Text style={[
                  styles.sortOptionText,
                  sortBy === option.key && styles.activeSortOptionText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{motos.length} motos disponibles</Text>
        <Text style={styles.resultsLocation}>Dans un rayon de 50km</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
          {motos.map((moto) => (
            <MotoCard key={moto.id} moto={moto} isGrid={viewMode === 'grid'} />
          ))}
        </View>
      </ScrollView>
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
  viewModeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  sortSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sortOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  sortOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
  },
  activeSortOption: {
    backgroundColor: '#C4F112',
    borderColor: '#C4F112',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '600',
  },
  activeSortOptionText: {
    color: '#000000',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resultsLocation: {
    fontSize: 14,
    color: '#888888',
  },
  content: {
    flex: 1,
    paddingBottom: 100, // Espace pour la navbar fixe
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  listContainer: {
    gap: 16,
  },
  gridCard: {
    width: (width - 64) / 2,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
  },
  listCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  gridImageContainer: {
    position: 'relative',
    height: 140,
  },
  listImageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  listImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  certificationBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  certificationText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  motoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  motoYear: {
    fontSize: 14,
    color: '#888888',
  },
  motoPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C4F112',
    marginBottom: 8,
  },
  motoDetails: {
    gap: 4,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#888888',
  },
  vendeurInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vendeurDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  vendeurNom: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  vendeurNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  noteText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: '#888888',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(196, 241, 18, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  contactText: {
    fontSize: 11,
    color: '#C4F112',
    fontWeight: '600',
  },
  filterModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.95)',
    zIndex: 1000,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeFilter: {
    fontSize: 16,
    color: '#C4F112',
    fontWeight: '600',
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceInput: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
  },
  priceSeparator: {
    color: '#888888',
    fontSize: 16,
  },
  applyFiltersButton: {
    backgroundColor: '#C4F112',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  applyFiltersText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});