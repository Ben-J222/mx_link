import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ArrowLeft, Award, Star, Trophy, Crown, Zap, Target, TrendingUp, Users, Gift } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView, ThemedText, ThemedButton } from '@/components/ThemedComponents';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { useFadeIn } from '@/hooks/useAnimations';
import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function GamificationScreen() {
  const { theme } = useTheme();
  const { toast, showSuccess, hideToast } = useToast();
  const [selectedTab, setSelectedTab] = useState('overview');
  const fadeAnim = useFadeIn();

  const userProgress = {
    currentLevel: 'ELITE-MX',
    currentPoints: 2847,
    nextLevelPoints: 5000,
    rank: 127,
    totalUsers: 15420
  };

  const badges = [
    {
      id: 1,
      name: 'Première Moto',
      description: 'Tokeniser sa première moto',
      icon: Award,
      earned: true,
      points: 100,
      rarity: 'common',
      earnedDate: '15/01/2024'
    },
    {
      id: 2,
      name: 'Détective MX',
      description: 'Aider à retrouver 5 motos volées',
      icon: Target,
      earned: true,
      points: 250,
      rarity: 'rare',
      earnedDate: '20/01/2024'
    },
    {
      id: 3,
      name: 'Vendeur du Mois',
      description: 'Plus de 5 ventes en un mois',
      icon: Trophy,
      earned: false,
      points: 500,
      rarity: 'epic',
      progress: 3,
      target: 5
    },
    {
      id: 4,
      name: 'Expert Sécurité',
      description: 'Score sécurité > 90%',
      icon: Star,
      earned: true,
      points: 150,
      rarity: 'uncommon',
      earnedDate: '18/01/2024'
    },
    {
      id: 5,
      name: 'Héros Anti-Vol',
      description: 'Signaler 10 motos volées',
      icon: Zap,
      earned: false,
      points: 300,
      rarity: 'rare',
      progress: 7,
      target: 10
    },
    {
      id: 6,
      name: 'Légende MX',
      description: 'Atteindre le niveau LEGEND',
      icon: Crown,
      earned: false,
      points: 1000,
      rarity: 'legendary',
      progress: 2847,
      target: 10000
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Thomas Expert', points: 8945, level: 'LEGEND-MX', avatar: 'TE' },
    { rank: 2, name: 'Sarah Pro', points: 7234, level: 'MASTER-MX', avatar: 'SP' },
    { rank: 3, name: 'Mike Champion', points: 6789, level: 'MASTER-MX', avatar: 'MC' },
    { rank: 126, name: 'Pierre Novice', points: 2856, level: 'ELITE-MX', avatar: 'PN' },
    { rank: 127, name: 'Alex Martin (Vous)', points: 2847, level: 'ELITE-MX', avatar: 'AM', isCurrentUser: true },
    { rank: 128, name: 'Julie Rider', points: 2834, level: 'ELITE-MX', avatar: 'JR' },
  ];

  const pointsActivities = [
    { action: 'Tokeniser une moto', points: 100, icon: Award },
    { action: 'Vendre une moto', points: 200, icon: Trophy },
    { action: 'Acheter une moto', points: 50, icon: Star },
    { action: 'Signaler un vol', points: 100, icon: Target },
    { action: 'Aider à retrouver', points: 500, icon: Zap },
    { action: 'Parrainage réussi', points: 75, icon: Users },
    { action: 'Avis positif reçu', points: 25, icon: Star },
    { action: 'Connexion quotidienne', points: 5, icon: Gift }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#888888';
      case 'uncommon': return '#4CAF50';
      case 'rare': return '#2196F3';
      case 'epic': return '#9C27B0';
      case 'legendary': return '#FF9800';
      default: return theme.colors.textSecondary;
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Commun';
      case 'uncommon': return 'Peu commun';
      case 'rare': return 'Rare';
      case 'epic': return 'Épique';
      case 'legendary': return 'Légendaire';
      default: return 'Inconnu';
    }
  };

  const BadgeCard = ({ badge }) => (
    <Animated.View style={[
      styles.badgeCard, 
      { 
        opacity: fadeAnim, 
        backgroundColor: theme.colors.card, 
        borderColor: badge.earned ? getRarityColor(badge.rarity) : theme.colors.border 
      }
    ]}>
      <View style={styles.badgeHeader}>
        <View style={[
          styles.badgeIcon, 
          { backgroundColor: badge.earned ? getRarityColor(badge.rarity) : theme.colors.surface }
        ]}>
          <badge.icon 
            size={24} 
            color={badge.earned ? '#FFFFFF' : theme.colors.textSecondary} 
            strokeWidth={2} 
          />
        </View>
        <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(badge.rarity) }]}>
          <Text style={styles.rarityText}>{getRarityLabel(badge.rarity)}</Text>
        </View>
      </View>
      
      <ThemedText weight="600" style={{ marginBottom: 4 }}>{badge.name}</ThemedText>
      <ThemedText secondary size="small" style={{ marginBottom: 8 }}>
        {badge.description}
      </ThemedText>
      
      {badge.earned ? (
        <View style={styles.earnedInfo}>
          <ThemedText style={{ color: getRarityColor(badge.rarity) }} weight="600">
            +{badge.points} points
          </ThemedText>
          <ThemedText secondary size="small">Obtenu le {badge.earnedDate}</ThemedText>
        </View>
      ) : (
        <View style={styles.progressInfo}>
          {badge.progress !== undefined && (
            <View style={styles.progressBar}>
              <View style={[styles.progressBarBg, { backgroundColor: theme.colors.surface }]}>
                <View style={[
                  styles.progressBarFill, 
                  { 
                    width: `${(badge.progress / badge.target) * 100}%`,
                    backgroundColor: getRarityColor(badge.rarity) 
                  }
                ]} />
              </View>
              <ThemedText secondary size="small">
                {badge.progress}/{badge.target}
              </ThemedText>
            </View>
          )}
          <ThemedText style={{ color: theme.colors.textSecondary }}>
            {badge.points} points à gagner
          </ThemedText>
        </View>
      )}
    </Animated.View>
  );

  const LeaderboardItem = ({ item }) => (
    <Animated.View style={[
      styles.leaderboardItem, 
      { 
        opacity: fadeAnim, 
        backgroundColor: item.isCurrentUser ? `${theme.colors.primary}20` : theme.colors.card,
        borderColor: item.isCurrentUser ? theme.colors.primary : theme.colors.border
      }
    ]}>
      <View style={styles.rankSection}>
        <Text style={[
          styles.rankNumber, 
          { color: item.rank <= 3 ? '#FFD700' : theme.colors.textSecondary }
        ]}>
          #{item.rank}
        </Text>
        {item.rank <= 3 && (
          <Trophy size={16} color="#FFD700" strokeWidth={2} />
        )}
      </View>
      
      <View style={[styles.userAvatar, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.userAvatarText}>{item.avatar}</Text>
      </View>
      
      <View style={styles.userInfo}>
        <ThemedText weight="600">{item.name}</ThemedText>
        <ThemedText secondary size="small">{item.level}</ThemedText>
      </View>
      
      <View style={styles.pointsSection}>
        <ThemedText weight="bold" style={{ color: theme.colors.primary }}>
          {item.points.toLocaleString()}
        </ThemedText>
        <ThemedText secondary size="small">points</ThemedText>
      </View>
    </Animated.View>
  );

  const PointsActivityItem = ({ activity }) => (
    <View style={[styles.activityItem, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={[styles.activityIcon, { backgroundColor: theme.colors.surface }]}>
        <activity.icon size={20} color={theme.colors.primary} strokeWidth={2} />
      </View>
      <View style={styles.activityInfo}>
        <ThemedText weight="600">{activity.action}</ThemedText>
      </View>
      <ThemedText weight="bold" style={{ color: theme.colors.primary }}>
        +{activity.points}
      </ThemedText>
    </View>
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
        <ThemedText size="large" weight="bold">Récompenses</ThemedText>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Overview */}
      <Animated.View style={[styles.progressOverview, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.levelSection}>
          <View style={[styles.levelBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.levelText}>{userProgress.currentLevel}</Text>
          </View>
          <ThemedText weight="bold" style={{ fontSize: 24, color: theme.colors.primary }}>
            {userProgress.currentPoints.toLocaleString()} pts
          </ThemedText>
          <ThemedText secondary size="small">
            {(userProgress.nextLevelPoints - userProgress.currentPoints).toLocaleString()} pts pour le niveau suivant
          </ThemedText>
        </View>
        
        <View style={styles.rankSection}>
          <ThemedText secondary size="small">Classement</ThemedText>
          <ThemedText weight="bold" style={{ fontSize: 20, color: theme.colors.primary }}>
            #{userProgress.rank}
          </ThemedText>
          <ThemedText secondary size="small">
            sur {userProgress.totalUsers.toLocaleString()}
          </ThemedText>
        </View>
      </Animated.View>

      <View style={styles.tabsSection}>
        <TabButton
          id="overview"
          label="Vue d'ensemble"
          isActive={selectedTab === 'overview'}
          onPress={() => setSelectedTab('overview')}
        />
        <TabButton
          id="badges"
          label="Badges"
          isActive={selectedTab === 'badges'}
          onPress={() => setSelectedTab('badges')}
        />
        <TabButton
          id="leaderboard"
          label="Classement"
          isActive={selectedTab === 'leaderboard'}
          onPress={() => setSelectedTab('leaderboard')}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && (
          <View style={styles.overviewSection}>
            <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
              Comment gagner des points
            </ThemedText>
            {pointsActivities.map((activity, index) => (
              <PointsActivityItem key={index} activity={activity} />
            ))}
          </View>
        )}

        {selectedTab === 'badges' && (
          <View style={styles.badgesSection}>
            <View style={styles.badgesGrid}>
              {badges.map(badge => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'leaderboard' && (
          <View style={styles.leaderboardSection}>
            <ThemedText size="large" weight="bold" style={{ marginBottom: 16 }}>
              Classement mensuel
            </ThemedText>
            {leaderboard.map(item => (
              <LeaderboardItem key={item.rank} item={item} />
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
  progressOverview: {
    flexDirection: 'row',
    margin: 24,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  levelSection: {
    flex: 1,
    alignItems: 'center',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  rankSection: {
    flex: 1,
    alignItems: 'center',
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
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  badgesSection: {
    marginBottom: 32,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rarityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  earnedInfo: {
    alignItems: 'center',
  },
  progressInfo: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    marginBottom: 8,
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
  },
  progressBarFill: {
    height: 4,
    borderRadius: 2,
  },
  leaderboardSection: {
    marginBottom: 32,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  rankSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  userInfo: {
    flex: 1,
  },
  pointsSection: {
    alignItems: 'flex-end',
  },
});