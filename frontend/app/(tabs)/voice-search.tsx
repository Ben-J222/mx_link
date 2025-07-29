import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ArrowLeft, Mic, Search, Filter, MapPin, DollarSign, Calendar, Palette } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView, ThemedText, ThemedButton } from '@/components/ThemedComponents';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { useFadeIn } from '@/hooks/useAnimations';
import { Animated } from 'react-native';

export default function VoiceSearchScreen() {
  const { theme } = useTheme();
  const { toast, showSuccess, hideToast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceQuery, setVoiceQuery] = useState('');
  const fadeAnim = useFadeIn();

  const [filters, setFilters] = useState({
    budget: { min: '', max: '' },
    distance: '50',
    year: { min: '', max: '' },
    condition: '',
    color: ''
  });

  const recentSearches = [
    'Yamaha YZ450F moins de 8000 euros',
    'Honda CRF250R près de Lyon',
    'KTM 350 SX-F 2023 bleu',
    'Kawasaki KX250 bon état'
  ];

  const suggestedSearches = [
    'Cherche moto cross 250cc budget 6000 euros',
    'Yamaha YZ dans un rayon de 30km',
    'Honda rouge 2022 excellent état',
    'KTM orange moins de 10000 euros'
  ];

  const searchResults = [
    {
      id: 1,
      make: 'Yamaha',
      model: 'YZ450F',
      year: 2023,
      price: 7800,
      location: 'Lyon (69)',
      distance: '15 km',
      condition: 'Excellent',
      color: 'Bleu',
      match: 95
    },
    {
      id: 2,
      make: 'Yamaha',
      model: 'YZ250F',
      year: 2022,
      price: 6200,
      location: 'Villeurbanne (69)',
      distance: '18 km',
      condition: 'Très bon',
      color: 'Blanc',
      match: 87
    }
  ];

  const handleVoiceSearch = () => {
    setIsListening(true);
    
    // Simulation de reconnaissance vocale
    setTimeout(() => {
      const mockVoiceResult = 'Cherche Yamaha YZ450F moins de 8000 euros près de Lyon';
      setVoiceQuery(mockVoiceResult);
      setSearchQuery(mockVoiceResult);
      setIsListening(false);
      showSuccess('Recherche vocale terminée');
    }, 3000);
  };

  const VoiceButton = () => (
    <TouchableOpacity
      style={[
        styles.voiceButton,
        { 
          backgroundColor: isListening ? '#FF6B6B' : theme.colors.primary,
          transform: [{ scale: isListening ? 1.1 : 1 }]
        }
      ]}
      onPress={handleVoiceSearch}
      disabled={isListening}
    >
      <Mic size={32} color="#000000" strokeWidth={2} />
      {isListening && (
        <View style={styles.listeningIndicator}>
          <Animated.View style={[styles.pulse, { opacity: fadeAnim }]} />
        </View>
      )}
    </TouchableOpacity>
  );

  const FilterSlider = ({ label, value, onValueChange, min = 0, max = 100, unit = '' }) => (
    <View style={styles.filterSlider}>
      <ThemedText weight="600" style={{ marginBottom: 8 }}>{label}</ThemedText>
      <View style={styles.sliderContainer}>
        <ThemedText secondary size="small">{min}{unit}</ThemedText>
        <View style={[styles.slider, { backgroundColor: theme.colors.surface }]}>
          <View style={[
            styles.sliderFill,
            { 
              width: `${(value / max) * 100}%`,
              backgroundColor: theme.colors.primary 
            }
          ]} />
          <View style={[
            styles.sliderThumb,
            { 
              left: `${(value / max) * 100}%`,
              backgroundColor: theme.colors.primary 
            }
          ]} />
        </View>
        <ThemedText secondary size="small">{max}{unit}</ThemedText>
      </View>
      <ThemedText style={{ color: theme.colors.primary, textAlign: 'center' }}>
        {value}{unit}
      </ThemedText>
    </View>
  );

  const SearchResultCard = ({ result }) => (
    <Animated.View style={[styles.resultCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.resultHeader}>
        <View style={styles.resultInfo}>
          <ThemedText weight="600">{result.make} {result.model}</ThemedText>
          <ThemedText secondary size="small">{result.year} • {result.condition}</ThemedText>
        </View>
        <View style={styles.matchScore}>
          <View style={[styles.matchBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.matchText}>{result.match}%</Text>
          </View>
          <ThemedText weight="bold" style={{ color: theme.colors.primary }}>
            {result.price.toLocaleString()}€
          </ThemedText>
        </View>
      </View>
      
      <View style={styles.resultDetails}>
        <View style={styles.detailItem}>
          <MapPin size={14} color={theme.colors.textSecondary} strokeWidth={2} />
          <ThemedText secondary size="small">{result.location} • {result.distance}</ThemedText>
        </View>
        <View style={styles.detailItem}>
          <Palette size={14} color={theme.colors.textSecondary} strokeWidth={2} />
          <ThemedText secondary size="small">{result.color}</ThemedText>
        </View>
      </View>
    </Animated.View>
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
        <ThemedText size="large" weight="bold">Recherche Vocale</ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Voice Search Section */}
        <View style={styles.voiceSection}>
          <ThemedText size="large" weight="bold" style={{ textAlign: 'center', marginBottom: 8 }}>
            Recherche par la voix
          </ThemedText>
          <ThemedText secondary style={{ textAlign: 'center', marginBottom: 32 }}>
            Dites ce que vous cherchez, nous nous occupons du reste
          </ThemedText>
          
          <View style={styles.voiceContainer}>
            <VoiceButton />
            {isListening && (
              <ThemedText style={{ color: theme.colors.primary, textAlign: 'center', marginTop: 16 }}>
                🎤 Écoute en cours...
              </ThemedText>
            )}
            {voiceQuery && !isListening && (
              <View style={[styles.voiceResult, { backgroundColor: theme.colors.surface }]}>
                <ThemedText weight="600" style={{ marginBottom: 4 }}>Vous avez dit :</ThemedText>
                <ThemedText style={{ color: theme.colors.primary }}>"{voiceQuery}"</ThemedText>
              </View>
            )}
          </View>
        </View>

        {/* Text Search Fallback */}
        <View style={styles.textSearchSection}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Search size={20} color={theme.colors.textSecondary} strokeWidth={2} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Ou tapez votre recherche..."
              placeholderTextColor={theme.colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Smart Filters */}
        <View style={styles.filtersSection}>
          <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
            Filtres intelligents
          </ThemedText>
          
          <FilterSlider
            label="Budget maximum"
            value={8000}
            min={1000}
            max={15000}
            unit="€"
          />
          
          <FilterSlider
            label="Distance"
            value={50}
            min={5}
            max={200}
            unit="km"
          />
          
          <FilterSlider
            label="Année minimum"
            value={2020}
            min={2010}
            max={2024}
          />
        </View>

        {/* Recent Searches */}
        <View style={styles.recentSection}>
          <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
            Recherches récentes
          </ThemedText>
          {recentSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.searchItem, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
              onPress={() => {
                setSearchQuery(search);
                showSuccess('Recherche appliquée');
              }}
            >
              <Search size={16} color={theme.colors.textSecondary} strokeWidth={2} />
              <ThemedText style={{ flex: 1, marginLeft: 12 }}>{search}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Suggested Searches */}
        <View style={styles.suggestionsSection}>
          <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
            Recherches suggérées
          </ThemedText>
          {suggestedSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.searchItem, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
              onPress={() => {
                setSearchQuery(search);
                showSuccess('Recherche suggérée appliquée');
              }}
            >
              <Mic size={16} color={theme.colors.primary} strokeWidth={2} />
              <ThemedText style={{ flex: 1, marginLeft: 12 }}>{search}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search Results */}
        {searchQuery && (
          <View style={styles.resultsSection}>
            <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
              Résultats pour "{searchQuery}"
            </ThemedText>
            {searchResults.map(result => (
              <SearchResultCard key={result.id} result={result} />
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  voiceSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  voiceContainer: {
    alignItems: 'center',
  },
  voiceButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  listeningIndicator: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 107, 107, 0.3)',
  },
  pulse: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 107, 107, 0.5)',
  },
  voiceResult: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  textSearchSection: {
    marginBottom: 32,
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
  filtersSection: {
    marginBottom: 32,
  },
  filterSlider: {
    marginBottom: 24,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  slider: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    height: 4,
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    top: -6,
    marginLeft: -8,
  },
  recentSection: {
    marginBottom: 32,
  },
  suggestionsSection: {
    marginBottom: 32,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  resultsSection: {
    marginBottom: 32,
  },
  resultCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  resultInfo: {
    flex: 1,
  },
  matchScore: {
    alignItems: 'flex-end',
  },
  matchBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  matchText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  resultDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});