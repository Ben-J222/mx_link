import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Search, Filter, MapPin, Clock, TriangleAlert as AlertTriangle, Eye, ArrowLeft, ChartBar as BarChart3, TrendingUp, Users } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';

export default function SearchScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showStatistics, setShowStatistics] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');

  const stolenBikes = [
    {
      id: 1,
      make: 'Yamaha',
      model: 'YZ450F',
      year: '2022',
      color: 'Bleu Racing',
      location: 'Lyon, France',
      reportedAt: 'Il y a 3 heures',
      status: 'stolen',
      reward: '500€',
    },
    {
      id: 2,
      make: 'Honda',
      model: 'CRF250R',
      year: '2023',
      color: 'Rouge Honda',
      location: 'Marseille, France',
      reportedAt: 'Il y a 1 jour',
      status: 'found',
      reward: '300€',
    },
    {
      id: 3,
      make: 'KTM',
      model: '350 SX-F',
      year: '2021',
      color: 'Orange KTM',
      location: 'Paris, France',
      reportedAt: 'Il y a 2 jours',
      status: 'stolen',
      reward: '750€',
    },
  ];

  // Données statistiques par région
  const statistiquesRegions = [
    { region: 'Île-de-France', vols: 450, pourcentage: 25, tendance: '+12%', types: { garage: 40, rue: 35, domicile: 25 } },
    { region: 'Auvergne-Rhône-Alpes', vols: 320, pourcentage: 18, tendance: '+8%', types: { garage: 45, rue: 30, domicile: 25 } },
    { region: 'Provence-Alpes-Côte d\'Azur', vols: 280, pourcentage: 16, tendance: '+15%', types: { garage: 35, rue: 40, domicile: 25 } },
    { region: 'Occitanie', vols: 180, pourcentage: 10, tendance: '+5%', types: { garage: 50, rue: 25, domicile: 25 } },
    { region: 'Nouvelle-Aquitaine', vols: 150, pourcentage: 8, tendance: '+3%', types: { garage: 45, rue: 30, domicile: 25 } },
    { region: 'Grand Est', vols: 120, pourcentage: 7, tendance: '-2%', types: { garage: 40, rue: 35, domicile: 25 } },
    { region: 'Hauts-de-France', vols: 110, pourcentage: 6, tendance: '+7%', types: { garage: 35, rue: 40, domicile: 25 } },
    { region: 'Pays de la Loire', vols: 90, pourcentage: 5, tendance: '+1%', types: { garage: 50, rue: 25, domicile: 25 } },
    { region: 'Bretagne', vols: 60, pourcentage: 3, tendance: '-5%', types: { garage: 55, rue: 20, domicile: 25 } },
    { region: 'Normandie', vols: 50, pourcentage: 3, tendance: '0%', types: { garage: 45, rue: 30, domicile: 25 } },
  ];

  const typesVol = [
    { type: 'Garage/Box', count: 680, pourcentage: 42, couleur: '#FF6B6B' },
    { type: 'Voie publique', count: 520, pourcentage: 32, couleur: '#4CAF50' },
    { type: 'Domicile', count: 400, pourcentage: 25, couleur: '#2196F3' },
    { type: 'Transport', count: 20, pourcentage: 1, couleur: '#FF9800' },
  ];
  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <View style={[styles.statCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: theme.colors.surface }]}>
          <Icon size={18} color={color} strokeWidth={2} />
        </View>
        {trend && (
          <View style={styles.trendContainer}>
            <TrendingUp size={12} color={trend.startsWith('+') ? '#4CAF50' : trend.startsWith('-') ? '#FF6B6B' : '#888888'} strokeWidth={2} />
            <Text style={[styles.trendText, { color: trend.startsWith('+') ? '#4CAF50' : trend.startsWith('-') ? '#FF6B6B' : '#888888' }]}>{trend}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{title}</Text>
      {subtitle && <Text style={[styles.statSubtitle, { color: theme.colors.textSecondary }]}>{subtitle}</Text>}
    </View>
  );

  const RegionCard = ({ region }) => (
    <TouchableOpacity 
      style={[styles.regionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      onPress={() => setSelectedRegion(region.region)}
    >
      <View style={styles.regionHeader}>
        <Text style={[styles.regionName, { color: theme.colors.text }]}>{region.region}</Text>
        <View style={styles.regionStats}>
          <Text style={[styles.regionCount, { color: theme.colors.primary }]}>{region.vols}</Text>
          <Text style={[styles.regionTrend, { 
            color: region.tendance.startsWith('+') ? '#4CAF50' : region.tendance.startsWith('-') ? '#FF6B6B' : '#888888' 
          }]}>{region.tendance}</Text>
        </View>
      </View>
      <View style={styles.regionProgress}>
        <View style={[styles.regionProgressBar, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.regionProgressFill, { width: `${region.pourcentage}%`, backgroundColor: theme.colors.primary }]} />
        </View>
        <Text style={[styles.regionPercentage, { color: theme.colors.textSecondary }]}>{region.pourcentage}%</Text>
      </View>
      <View style={styles.regionTypes}>
        <View style={styles.typeItem}>
          <View style={[styles.typeDot, { backgroundColor: '#FF6B6B' }]} />
          <Text style={[styles.typeText, { color: theme.colors.textSecondary }]}>Garage {region.types.garage}%</Text>
        </View>
        <View style={styles.typeItem}>
          <View style={[styles.typeDot, { backgroundColor: '#4CAF50' }]} />
          <Text style={[styles.typeText, { color: theme.colors.textSecondary }]}>Rue {region.types.rue}%</Text>
        </View>
        <View style={styles.typeItem}>
          <View style={[styles.typeDot, { backgroundColor: '#2196F3' }]} />
          <Text style={[styles.typeText, { color: theme.colors.textSecondary }]}>Domicile {region.types.domicile}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const TypeVolCard = ({ type }) => (
    <View style={[styles.typeVolCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.typeVolHeader}>
        <View style={[styles.typeVolIcon, { backgroundColor: type.couleur }]} />
        <Text style={[styles.typeVolName, { color: theme.colors.text }]}>{type.type}</Text>
      </View>
      <Text style={[styles.typeVolCount, { color: theme.colors.primary }]}>{type.count}</Text>
      <Text style={[styles.typeVolPercentage, { color: theme.colors.textSecondary }]}>{type.pourcentage}% des vols</Text>
    </View>
  );

  const FilterChip = ({ title, value, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.filterChip, isActive && styles.activeFilterChip]}
      onPress={onPress}
    >
      <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const BikeCard = ({ bike }) => (
    <View style={styles.bikeCard}>
      <View style={styles.bikeCardHeader}>
        <View style={styles.bikeMainInfo}>
          <Text style={styles.bikeTitle}>{bike.make} {bike.model}</Text>
          <Text style={styles.bikeSubtitle}>{bike.year} • {bike.color}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, bike.status === 'found' && styles.foundBadge]}>
            <Text style={[styles.statusText, bike.status === 'found' && styles.foundStatusText]}>
              {bike.status === 'found' ? 'Retrouvée' : 'Volée'}
            </Text>
          </View>
          <Text style={styles.rewardText}>Récompense: {bike.reward}</Text>
        </View>
      </View>
      
      <View style={styles.bikeDetails}>
        <View style={styles.detailRow}>
          <MapPin size={16} color="#888888" strokeWidth={2} />
          <Text style={styles.detailText}>{bike.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color="#888888" strokeWidth={2} />
          <Text style={styles.detailText}>Signalée {bike.reportedAt}</Text>
        </View>
      </View>
      
      <View style={styles.bikeActions}>
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Eye size={16} color="#C4F112" strokeWidth={2} />
          <Text style={styles.viewDetailsText}>Voir détails</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportSightingButton}>
          <AlertTriangle size={16} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.reportSightingText}>Signaler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredBikes = stolenBikes.filter(bike => {
    const matchesSearch = bike.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bike.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || bike.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Recherche</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Toggle Statistiques */}
        <View style={styles.toggleSection}>
          <TouchableOpacity 
            style={[styles.toggleButton, { backgroundColor: showStatistics ? theme.colors.primary : theme.colors.surface, borderColor: theme.colors.border }]}
            onPress={() => setShowStatistics(!showStatistics)}
          >
            <BarChart3 size={20} color={showStatistics ? '#000000' : theme.colors.primary} strokeWidth={2} />
            <Text style={[styles.toggleButtonText, { color: showStatistics ? '#000000' : theme.colors.text }]}>
              {showStatistics ? 'Masquer' : 'Voir'} les statistiques
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section Statistiques */}
        {showStatistics && (
          <>
            {/* Statistiques générales */}
            <View style={styles.statsGenerales}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Statistiques nationales</Text>
              <View style={styles.statsGrid}>
                <StatCard
                  title="Total vols 2024"
                  value="1,820"
                  subtitle="France entière"
                  icon={AlertTriangle}
                  color="#FF6B6B"
                  trend="+8%"
                />
                <StatCard
                  title="Taux récupération"
                  value="23%"
                  subtitle="Motos retrouvées"
                  icon={TrendingUp}
                  color="#4CAF50"
                  trend="+5%"
                />
                <StatCard
                  title="Délai moyen"
                  value="12j"
                  subtitle="Signalement → Récupération"
                  icon={Clock}
                  color="#2196F3"
                  trend="-2j"
                />
                <StatCard
                  title="Communauté"
                  value="15,420"
                  subtitle="Utilisateurs actifs"
                  icon={Users}
                  color="#C4F112"
                  trend="+25%"
                />
              </View>
            </View>

            {/* Types de vol */}
            <View style={styles.typesVolSection}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Types de vol les plus fréquents</Text>
              <View style={styles.typesVolGrid}>
                {typesVol.map((type, index) => (
                  <TypeVolCard key={index} type={type} />
                ))}
              </View>
            </View>

            {/* Filtre par région */}
            <View style={styles.regionFilterSection}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Filtrer par région</Text>
              <View style={[styles.pickerContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                <Picker
                  selectedValue={selectedRegion}
                  onValueChange={setSelectedRegion}
                  style={[styles.picker, { color: theme.colors.text }]}
                  dropdownIconColor={theme.colors.primary}
                >
                  <Picker.Item label="Toutes les régions" value="all" color={theme.colors.text} />
                  {statistiquesRegions.map((region) => (
                    <Picker.Item 
                      key={region.region} 
                      label={region.region} 
                      value={region.region}
                      color={theme.colors.text}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Carte des régions */}
            <View style={styles.carteRegionsSection}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Répartition par région</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
                Cliquez sur une région pour voir les détails
              </Text>
              <View style={styles.regionsGrid}>
                {(selectedRegion === 'all' ? statistiquesRegions : statistiquesRegions.filter(r => r.region === selectedRegion)).map((region, index) => (
                  <RegionCard key={index} region={region} />
                ))}
              </View>
            </View>
          </>
        )}

        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Base de données communautaire</Text>
          <Text style={styles.sectionSubtitle}>
            Recherchez des motos volées et aidez la communauté
          </Text>
        </View>

        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#888888" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Marque, modèle ou numéro de châssis..."
              placeholderTextColor="#888888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#C4F112" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Filtres */}
        <View style={styles.filtersContainer}>
          <FilterChip
            title="Toutes"
            value="all"
            isActive={activeFilter === 'all'}
            onPress={() => setActiveFilter('all')}
          />
          <FilterChip
            title="Volées"
            value="stolen"
            isActive={activeFilter === 'stolen'}
            onPress={() => setActiveFilter('stolen')}
          />
          <FilterChip
            title="Retrouvées"
            value="found"
            isActive={activeFilter === 'found'}
            onPress={() => setActiveFilter('found')}
          />
        </View>

        {/* Bouton signaler un vol */}
        <TouchableOpacity style={styles.reportTheftButton}>
          <View style={styles.reportTheftContent}>
            <AlertTriangle size={24} color="#000000" strokeWidth={2} />
            <View style={styles.reportTheftText}>
              <Text style={styles.reportTheftTitle}>Signaler un vol</Text>
              <Text style={styles.reportTheftSubtitle}>Déclarez le vol de votre moto</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Résultats */}
        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>
            {filteredBikes.length} résultat{filteredBikes.length !== 1 ? 's' : ''} trouvé{filteredBikes.length !== 1 ? 's' : ''}
          </Text>
          
          {filteredBikes.map(bike => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </View>

        {/* Message d'aide */}
        <View style={styles.helpCard}>
          <AlertTriangle size={20} color="#C4F112" strokeWidth={2} />
          <Text style={styles.helpText}>
            Vous avez repéré une moto volée ? Signalez-la immédiatement pour aider à la retrouver et réclamez votre récompense.
          </Text>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 100, // Espace pour la navbar fixe
  },
  searchSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#888888',
    lineHeight: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
  },
  activeFilterChip: {
    backgroundColor: '#C4F112',
    borderColor: '#C4F112',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
  },
  activeFilterChipText: {
    color: '#000000',
  },
  reportTheftButton: {
    backgroundColor: '#C4F112',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  reportTheftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportTheftText: {
    marginLeft: 16,
    flex: 1,
  },
  reportTheftTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  reportTheftSubtitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
  },
  resultsSection: {
    marginBottom: 24,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  bikeCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
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
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  foundBadge: {
    backgroundColor: '#4CAF50',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  foundStatusText: {
    color: '#FFFFFF',
  },
  rewardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C4F112',
  },
  bikeDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#888888',
    marginLeft: 8,
  },
  bikeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  viewDetailsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C4F112',
  },
  reportSightingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
  },
  reportSightingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#C4F112',
  },
  helpText: {
    fontSize: 14,
    color: '#C4F112',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  toggleSection: {
    marginBottom: 24,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    gap: 8,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsGenerales: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  statSubtitle: {
    fontSize: 10,
  },
  typesVolSection: {
    marginBottom: 32,
  },
  typesVolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeVolCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  typeVolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  typeVolIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  typeVolName: {
    fontSize: 14,
    fontWeight: '600',
  },
  typeVolCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  typeVolPercentage: {
    fontSize: 11,
  },
  regionFilterSection: {
    marginBottom: 32,
  },
  pickerContainer: {
    borderRadius: 12,
    borderWidth: 1,
  },
  picker: {
    height: 50,
  },
  carteRegionsSection: {
    marginBottom: 32,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  regionsGrid: {
    gap: 12,
  },
  regionCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  regionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  regionStats: {
    alignItems: 'flex-end',
  },
  regionCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  regionTrend: {
    fontSize: 12,
    fontWeight: '600',
  },
  regionProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  regionProgressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  regionProgressFill: {
    height: 4,
    borderRadius: 2,
  },
  regionPercentage: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 30,
  },
  regionTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 10,
  },
});