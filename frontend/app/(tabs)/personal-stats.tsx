import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ArrowLeft, TrendingUp, DollarSign, Eye, Users, Calendar, Award, ChartBar as BarChart3, ChartPie as PieChart, Activity } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView, ThemedText, ThemedButton } from '@/components/ThemedComponents';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { useFadeIn } from '@/hooks/useAnimations';
import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function PersonalStatsScreen() {
  const { theme } = useTheme();
  const { toast, showSuccess, hideToast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedTab, setSelectedTab] = useState('overview');
  const fadeAnim = useFadeIn();

  const garageStats = {
    totalValue: 24500,
    totalBikes: 3,
    averageValue: 8167,
    valueEvolution: '+12%',
    mostValuable: 'Yamaha YZ450F 2023',
    oldestBike: 'Honda CRF250R 2020'
  };

  const activityStats = {
    totalViews: 1247,
    totalSales: 2,
    totalPurchases: 3,
    totalMessages: 89,
    responseTime: '2h',
    satisfactionScore: 4.8
  };

  const monthlyData = [
    { month: 'Jan', sales: 0, purchases: 1, value: 8500 },
    { month: 'Fév', sales: 1, purchases: 0, value: -6800 },
    { month: 'Mar', sales: 0, purchases: 1, value: 9200 },
    { month: 'Avr', sales: 1, purchases: 1, value: 2400 },
    { month: 'Mai', sales: 0, purchases: 0, value: 0 },
    { month: 'Juin', sales: 0, purchases: 0, value: 0 }
  ];

  const bikePortfolio = [
    {
      id: 1,
      make: 'Yamaha',
      model: 'YZ450F',
      year: 2023,
      purchasePrice: 8500,
      currentValue: 8200,
      evolution: -3.5,
      purchaseDate: '15/01/2024'
    },
    {
      id: 2,
      make: 'Honda',
      model: 'CRF250R',
      year: 2020,
      purchasePrice: 6800,
      currentValue: 5800,
      evolution: -14.7,
      purchaseDate: '10/03/2023'
    },
    {
      id: 3,
      make: 'KTM',
      model: '350 SX-F',
      year: 2024,
      purchasePrice: 9200,
      currentValue: 10500,
      evolution: +14.1,
      purchaseDate: '20/03/2024'
    }
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <Animated.View style={[styles.statCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: theme.colors.surface }]}>
          <Icon size={20} color={color} strokeWidth={2} />
        </View>
        {trend && (
          <View style={styles.trendContainer}>
            <TrendingUp size={12} color={trend.startsWith('+') ? '#4CAF50' : '#FF6B6B'} strokeWidth={2} />
            <Text style={[styles.trendText, { color: trend.startsWith('+') ? '#4CAF50' : '#FF6B6B' }]}>
              {trend}
            </Text>
          </View>
        )}
      </View>
      <ThemedText size="xlarge" weight="bold" style={{ color, marginBottom: 4 }}>
        {value}
      </ThemedText>
      <ThemedText secondary size="small">{title}</ThemedText>
      {subtitle && <ThemedText secondary size="small">{subtitle}</ThemedText>}
    </Animated.View>
  );

  const BikeCard = ({ bike }) => (
    <Animated.View style={[styles.bikeCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.bikeHeader}>
        <View style={styles.bikeInfo}>
          <ThemedText weight="600">{bike.make} {bike.model}</ThemedText>
          <ThemedText secondary size="small">{bike.year}</ThemedText>
        </View>
        <View style={styles.bikeValue}>
          <ThemedText weight="bold" style={{ color: theme.colors.primary }}>
            {bike.currentValue.toLocaleString()}€
          </ThemedText>
          <View style={[
            styles.evolutionBadge,
            { backgroundColor: bike.evolution > 0 ? '#4CAF50' : '#FF6B6B' }
          ]}>
            <Text style={styles.evolutionText}>
              {bike.evolution > 0 ? '+' : ''}{bike.evolution.toFixed(1)}%
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.bikeDetails}>
        <View style={styles.bikeDetailRow}>
          <ThemedText secondary size="small">Prix d'achat:</ThemedText>
          <ThemedText size="small">{bike.purchasePrice.toLocaleString()}€</ThemedText>
        </View>
        <View style={styles.bikeDetailRow}>
          <ThemedText secondary size="small">Acheté le:</ThemedText>
          <ThemedText size="small">{bike.purchaseDate}</ThemedText>
        </View>
        <View style={styles.bikeDetailRow}>
          <ThemedText secondary size="small">Plus/Moins-value:</ThemedText>
          <ThemedText 
            size="small" 
            style={{ color: bike.evolution > 0 ? '#4CAF50' : '#FF6B6B' }}
          >
            {bike.evolution > 0 ? '+' : ''}{(bike.currentValue - bike.purchasePrice).toLocaleString()}€
          </ThemedText>
        </View>
      </View>
    </Animated.View>
  );

  const PeriodButton = ({ period, label, isActive, onPress }) => (
    <TouchableOpacity
      style={[
        styles.periodButton,
        { 
          backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
          borderColor: theme.colors.border 
        }
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.periodButtonText,
        { color: isActive ? '#000000' : theme.colors.text }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
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
        <ThemedText size="large" weight="bold">Mes Statistiques</ThemedText>
        <View style={styles.placeholder} />
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        <PeriodButton
          period="week"
          label="7j"
          isActive={selectedPeriod === 'week'}
          onPress={() => setSelectedPeriod('week')}
        />
        <PeriodButton
          period="month"
          label="30j"
          isActive={selectedPeriod === 'month'}
          onPress={() => setSelectedPeriod('month')}
        />
        <PeriodButton
          period="year"
          label="1an"
          isActive={selectedPeriod === 'year'}
          onPress={() => setSelectedPeriod('year')}
        />
      </View>

      {/* Garage Value Overview */}
      <Animated.View style={[styles.garageOverview, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.garageHeader}>
          <ThemedText size="large" weight="bold">Valeur totale du garage</ThemedText>
          <View style={[styles.evolutionBadge, { backgroundColor: '#4CAF50' }]}>
            <Text style={styles.evolutionText}>{garageStats.valueEvolution}</Text>
          </View>
        </View>
        <ThemedText style={{ fontSize: 32, fontWeight: 'bold', color: theme.colors.primary, textAlign: 'center' }}>
          {garageStats.totalValue.toLocaleString()}€
        </ThemedText>
        <ThemedText secondary style={{ textAlign: 'center' }}>
          {garageStats.totalBikes} motos • Moyenne {garageStats.averageValue.toLocaleString()}€
        </ThemedText>
      </Animated.View>

      <View style={styles.tabsSection}>
        <TabButton
          id="overview"
          label="Vue d'ensemble"
          isActive={selectedTab === 'overview'}
          onPress={() => setSelectedTab('overview')}
        />
        <TabButton
          id="portfolio"
          label="Portfolio"
          isActive={selectedTab === 'portfolio'}
          onPress={() => setSelectedTab('portfolio')}
        />
        <TabButton
          id="activity"
          label="Activité"
          isActive={selectedTab === 'activity'}
          onPress={() => setSelectedTab('activity')}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && (
          <View style={styles.overviewSection}>
            <View style={styles.statsGrid}>
              <StatCard
                title="Valeur garage"
                value={`${(garageStats.totalValue / 1000).toFixed(0)}k€`}
                subtitle="3 motos"
                icon={DollarSign}
                color={theme.colors.primary}
                trend={garageStats.valueEvolution}
              />
              <StatCard
                title="Vues profil"
                value={activityStats.totalViews}
                subtitle="Ce mois"
                icon={Eye}
                color="#2196F3"
                trend="+15%"
              />
              <StatCard
                title="Ventes"
                value={activityStats.totalSales}
                subtitle="Total"
                icon={TrendingUp}
                color="#4CAF50"
              />
              <StatCard
                title="Note moyenne"
                value={activityStats.satisfactionScore}
                subtitle="⭐ Satisfaction"
                icon={Award}
                color="#FFD700"
              />
            </View>
          </View>
        )}

        {selectedTab === 'portfolio' && (
          <View style={styles.portfolioSection}>
            <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
              Portfolio détaillé
            </ThemedText>
            {bikePortfolio.map(bike => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </View>
        )}

        {selectedTab === 'activity' && (
          <View style={styles.activitySection}>
            <View style={styles.statsGrid}>
              <StatCard
                title="Messages"
                value={activityStats.totalMessages}
                subtitle="Conversations"
                icon={Users}
                color="#FF9800"
              />
              <StatCard
                title="Temps réponse"
                value={activityStats.responseTime}
                subtitle="Moyenne"
                icon={Activity}
                color="#9C27B0"
              />
            </View>
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
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginVertical: 16,
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  garageOverview: {
    margin: 24,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  garageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  evolutionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  evolutionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabsSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
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
  overviewSection: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 60) / 2,
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
  portfolioSection: {
    marginBottom: 32,
  },
  bikeCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  bikeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bikeInfo: {
    flex: 1,
  },
  bikeValue: {
    alignItems: 'flex-end',
  },
  bikeDetails: {
    gap: 8,
  },
  bikeDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activitySection: {
    marginBottom: 32,
  },
});