import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { User, Shield, Award, Settings, Bell, Lock, LogOut, ChevronRight, ArrowLeft, TrendingUp } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const { theme, isDark, isAccessible, toggleTheme, toggleAccessibility } = useTheme();
  const { getAccessibleProps, getFontSize } = useAccessibility();
  const { toast, showSuccess, showError, hideToast } = useToast();

  const userStats = {
    name: 'Alex Martin',
    level: 'ELITE-MX',
    points: 2847,
    bikesOwned: 3,
    transactionsCompleted: 18,
    securityScore: 92,
    joinDate: 'Janvier 2024',
    rank: '#127',
  };

  const achievements = [
    { id: 1, title: 'Première Certification', earned: true, points: 100, rarity: 'common' },
    { id: 2, title: 'Détective MX', earned: true, points: 250, rarity: 'rare' },
    { id: 3, title: 'Expert Sécurité', earned: false, points: 500, rarity: 'epic' },
    { id: 4, title: 'Gardien Communauté', earned: true, points: 150, rarity: 'uncommon' },
  ];

  const handleThemeToggle = () => {
    toggleTheme();
    showSuccess(isDark ? 'Mode clair activé' : 'Mode sombre activé');
  };

  const handleAccessibilityToggle = () => {
    toggleAccessibility();
    showSuccess(isAccessible ? 'Mode accessible désactivé' : 'Mode accessible activé');
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <View style={styles.statCard}>
      <View style={styles.statCardHeader}>
        <Icon size={18} color={color} strokeWidth={2} />
        <Text style={styles.statCardTitle}>{title}</Text>
      </View>
      <Text style={[styles.statCardValue, { color }]}>{value}</Text>
      {trend && (
        <View style={styles.trendContainer}>
          <TrendingUp size={12} color="#4CAF50" strokeWidth={2} />
          <Text style={styles.trendText}>+{trend}%</Text>
        </View>
      )}
    </View>
  );

  const SettingRow = ({ icon: Icon, title, subtitle, onPress, rightElement }) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress}>
      <View style={styles.settingIcon}>
        <Icon size={20} color="#C4F112" strokeWidth={2} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || <ChevronRight size={20} color="#666666" />}
    </TouchableOpacity>
  );

  const AchievementBadge = ({ achievement }) => {
    const getRarityColor = (rarity) => {
      switch (rarity) {
        case 'common': return '#888888';
        case 'uncommon': return '#4CAF50';
        case 'rare': return '#2196F3';
        case 'epic': return '#9C27B0';
        default: return '#888888';
      }
    };

    return (
      <View style={[
        styles.achievementBadge, 
        achievement.earned && styles.earnedBadge,
        { borderColor: getRarityColor(achievement.rarity) }
      ]}>
        <Award 
          size={20} 
          color={achievement.earned ? getRarityColor(achievement.rarity) : '#666666'} 
          strokeWidth={2} 
        />
        <Text style={[
          styles.badgeTitle, 
          achievement.earned && { color: getRarityColor(achievement.rarity) }
        ]}>
          {achievement.title}
        </Text>
        <Text style={[
          styles.badgePoints, 
          achievement.earned && { color: getRarityColor(achievement.rarity) }
        ]}>
          +{achievement.points} pts
        </Text>
      </View>
    );
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
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => router.push('/(tabs)/edit-profile')}
        >
          <Text style={styles.editButtonText}>Modifier</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profil utilisateur */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={32} color="#C4F112" strokeWidth={2} />
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{userStats.level}</Text>
            </View>
          </View>
          <Text style={styles.userName}>{userStats.name}</Text>
          <Text style={styles.userRank}>Classement {userStats.rank}</Text>
        </View>

        {/* Score de sécurité */}
        <View style={styles.securityCard}>
          <View style={styles.securityHeader}>
            <Shield size={24} color="#C4F112" strokeWidth={2} />
            <Text style={styles.securityTitle}>Score de Sécurité</Text>
          </View>
          <View style={styles.securityContent}>
            <Text style={styles.securityScore}>{userStats.securityScore}%</Text>
            <Text style={styles.securityStatus}>Niveau Expert</Text>
          </View>
          <View style={styles.securityBar}>
            <View style={[styles.securityProgress, { width: `${userStats.securityScore}%` }]} />
          </View>
        </View>

        {/* Statistiques */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Points"
              value={userStats.points}
              icon={Award}
              color="#C4F112"
              trend={15}
            />
            <StatCard
              title="Motos"
              value={userStats.bikesOwned}
              icon={Shield}
              color="#C4F112"
            />
            <StatCard
              title="Transactions"
              value={userStats.transactionsCompleted}
              icon={Lock}
              color="#C4F112"
              trend={8}
            />
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Succès</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.achievementsList}>
              {achievements.map(achievement => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Paramètres */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          
          <SettingRow
            icon={Bell}
            title="Notifications"
            subtitle="Alertes de sécurité et mises à jour"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#333333', true: '#C4F112' }}
                thumbColor={notificationsEnabled ? '#000000' : '#666666'}
              />
            }
          />
          
          <SettingRow
            icon={Lock}
            title="Authentification biométrique"
            subtitle="Empreinte digitale ou Face ID"
            rightElement={
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '#333333', true: '#C4F112' }}
                thumbColor={biometricEnabled ? '#000000' : '#666666'}
              />
            }
          />
          
          <SettingRow
            icon={Shield}
            title="Confidentialité et sécurité"
            subtitle="Gérer vos paramètres de sécurité"
            onPress={() => router.push('/(tabs)/security-settings')}
          />
          
          <SettingRow
            icon={Settings}
            title="Paramètres de l'app"
            subtitle="Thème, langue et plus"
            onPress={() => router.push('/(tabs)/app-settings')}
          />
          
          <SettingRow
            icon={Settings}
            title="Thème d'affichage"
            subtitle={isDark ? "Mode sombre activé" : "Mode clair activé"}
            rightElement={
              <Switch
                value={isDark}
                onValueChange={handleThemeToggle}
                trackColor={{ false: '#333333', true: '#C4F112' }}
                thumbColor={isDark ? '#000000' : '#666666'}
                {...getAccessibleProps(
                  'Basculer le thème',
                  isDark ? 'Passer en mode clair' : 'Passer en mode sombre'
                )}
              />
            }
          />
          
          <SettingRow
            icon={Shield}
            title="Mode accessible"
            subtitle="Améliore l'expérience pour malvoyants et dyslexiques"
            rightElement={
              <Switch
                value={isAccessible}
                onValueChange={handleAccessibilityToggle}
                trackColor={{ false: '#333333', true: '#C4F112' }}
                thumbColor={isAccessible ? '#000000' : '#666666'}
                {...getAccessibleProps(
                  'Mode accessible',
                  'Active les fonctionnalités d\'accessibilité'
                )}
              />
            }
          />
        </View>

        {/* Actions du compte */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => router.push('/')}
          >
            <LogOut size={20} color="#FF6B6B" strokeWidth={2} />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>

        {/* Informations du pied de page */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            Membre depuis {userStats.joinDate}
          </Text>
          <Text style={styles.footerText}>
            MX Link v2.0.0
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
  editButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C4F112',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 100, // Espace pour la navbar fixe
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#C4F112',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#C4F112',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userRank: {
    fontSize: 16,
    color: '#888888',
  },
  securityCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#333333',
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  securityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  securityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C4F112',
  },
  securityStatus: {
    fontSize: 16,
    color: '#888888',
  },
  securityBar: {
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
  },
  securityProgress: {
    height: 6,
    backgroundColor: '#C4F112',
    borderRadius: 3,
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
    borderWidth: 1,
    borderColor: '#333333',
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCardTitle: {
    fontSize: 12,
    color: '#888888',
    marginLeft: 6,
    fontWeight: '600',
  },
  statCardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 11,
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '600',
  },
  achievementsSection: {
    marginBottom: 32,
  },
  achievementsList: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 24,
  },
  achievementBadge: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 2,
    borderColor: '#333333',
  },
  earnedBadge: {
    backgroundColor: '#1E1E1E',
  },
  badgeTitle: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '600',
  },
  badgePoints: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '600',
  },
  settingsSection: {
    marginBottom: 32,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#888888',
  },
  actionsSection: {
    marginBottom: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  footerInfo: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
});