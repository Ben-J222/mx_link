import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ArrowLeft, TrendingUp, Users, DollarSign, Eye, MessageCircle, Star, Calendar, ChartBar as BarChart3, ChartPie as PieChart, Settings } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView, ThemedText, ThemedButton } from '@/components/ThemedComponents';
import { useFadeIn } from '@/hooks/useAnimations';
import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProDashboardScreen() {
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const fadeAnim = useFadeIn();

  const stats = {
    totalSales: 45,
    revenue: 287500,
    avgPrice: 6388,
    conversionRate: 12.5,
    totalViews: 15420,
    messages: 89,
    rating: 4.8,
    responseTime: '2h'
  };

  const recentSales = [
    { id: 1, bike: 'Yamaha YZ450F 2023', price: 8500, buyer: 'Alex M.', date: '15/01/2024', status: 'completed' },
    { id: 2, bike: 'Honda CRF250R 2022', price: 6800, buyer: 'Pierre D.', date: '12/01/2024', status: 'pending' },
    { id: 3, bike: 'KTM 350 SX-F 2024', price: 9200, buyer: 'Marie L.', date: '10/01/2024', status: 'completed' },
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <Animated.View style={[styles.statCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: theme.colors.surface }]}>
          <Icon size={20} color={color} strokeWidth={2} />
        </View>
        {trend && (
          <View style={styles.trendContainer}>
            <TrendingUp size={12} color="#4CAF50" strokeWidth={2} />
            <Text style={styles.trendText}>+{trend}%</Text>
          </View>
        )}
      </View>
      <ThemedText size="xlarge" weight="bold" style={{ color }}>{value}</ThemedText>
      <ThemedText secondary size="small">{title}</ThemedText>
      {subtitle && <ThemedText secondary size="small">{subtitle}</ThemedText>}
    </Animated.View>
  );

  const SaleCard = ({ sale }) => (
    <Animated.View style={[styles.saleCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.saleHeader}>
        <View style={styles.saleInfo}>
          <ThemedText weight="600">{sale.bike}</ThemedText>
          <ThemedText secondary size="small">Acheteur: {sale.buyer}</ThemedText>
        </View>
        <View style={styles.salePrice}>
          <ThemedText weight="bold" style={{ color: theme.colors.primary }}>
            {sale.price.toLocaleString()}€
          </ThemedText>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: sale.status === 'completed' ? '#4CAF50' : '#FF9800' }
          ]}>
            <Text style={styles.statusText}>
              {sale.status === 'completed' ? 'Terminée' : 'En cours'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.saleFooter}>
        <View style={styles.saleDate}>
          <Calendar size={12} color={theme.colors.textSecondary} strokeWidth={2} />
          <ThemedText secondary size="small">{sale.date}</ThemedText>
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

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <ThemedText size="large" weight="bold">Dashboard Pro</ThemedText>
        <TouchableOpacity 
          style={[styles.settingsButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
        >
          <Settings size={20} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Sélecteur de période */}
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

        {/* Statistiques principales */}
        <View style={styles.statsSection}>
          <ThemedText size="large" weight="bold" style={styles.sectionTitle}>
            Vue d'ensemble
          </ThemedText>
          <View style={styles.statsGrid}>
            <StatCard
              title="Chiffre d'affaires"
              value={`${(stats.revenue / 1000).toFixed(0)}k€`}
              subtitle="Ce mois"
              icon={DollarSign}
              color={theme.colors.primary}
              trend={15}
            />
            <StatCard
              title="Ventes"
              value={stats.totalSales}
              subtitle="Motos vendues"
              icon={TrendingUp}
              color={theme.colors.primary}
              trend={8}
            />
            <StatCard
              title="Prix moyen"
              value={`${(stats.avgPrice / 1000).toFixed(1)}k€`}
              subtitle="Par transaction"
              icon={BarChart3}
              color={theme.colors.primary}
            />
            <StatCard
              title="Taux conversion"
              value={`${stats.conversionRate}%`}
              subtitle="Vues → Ventes"
              icon={PieChart}
              color={theme.colors.primary}
              trend={3}
            />
          </View>
        </View>

        {/* Métriques d'engagement */}
        <View style={styles.engagementSection}>
          <ThemedText size="large" weight="bold" style={styles.sectionTitle}>
            Engagement
          </ThemedText>
          <View style={styles.engagementGrid}>
            <StatCard
              title="Vues totales"
              value={`${(stats.totalViews / 1000).toFixed(1)}k`}
              subtitle="Ce mois"
              icon={Eye}
              color="#2196F3"
            />
            <StatCard
              title="Messages"
              value={stats.messages}
              subtitle="Conversations"
              icon={MessageCircle}
              color="#FF9800"
            />
            <StatCard
              title="Note moyenne"
              value={stats.rating}
              subtitle="⭐ Satisfaction"
              icon={Star}
              color="#FFD700"
            />
            <StatCard
              title="Temps réponse"
              value={stats.responseTime}
              subtitle="Moyenne"
              icon={Clock}
              color="#9C27B0"
            />
          </View>
        </View>

        {/* Ventes récentes */}
        <View style={styles.salesSection}>
          <View style={styles.sectionHeader}>
            <ThemedText size="large" weight="bold">Ventes récentes</ThemedText>
            <TouchableOpacity>
              <ThemedText style={{ color: theme.colors.primary }} weight="600">Voir tout</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.salesList}>
            {recentSales.map(sale => (
              <SaleCard key={sale.id} sale={sale} />
            ))}
          </View>
        </View>

        {/* Actions rapides */}
        <View style={styles.actionsSection}>
          <ThemedText size="large" weight="bold" style={styles.sectionTitle}>
            Actions rapides
          </ThemedText>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
              onPress={() => router.push('/(tabs)/tokenize')}
            >
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.surface }]}>
                <TrendingUp size={24} color={theme.colors.primary} strokeWidth={2} />
              </View>
              <ThemedText weight="600">Nouvelle annonce</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
              onPress={() => router.push('/(tabs)/marketplace')}
            >
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.surface }]}>
                <BarChart3 size={24} color={theme.colors.primary} strokeWidth={2} />
              </View>
              <ThemedText weight="600">Analyser marché</ThemedText>
            </TouchableOpacity>
          </View>
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  periodSelector: {
    flexDirection: 'row',
    marginVertical: 20,
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
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
    color: '#4CAF50',
    fontWeight: '600',
  },
  engagementSection: {
    marginBottom: 32,
  },
  engagementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  salesSection: {
    marginBottom: 32,
  },
  salesList: {
    gap: 12,
  },
  saleCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  saleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  saleInfo: {
    flex: 1,
  },
  salePrice: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  saleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saleDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionsSection: {
    marginBottom: 32,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    gap: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});