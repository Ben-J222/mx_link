import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { ArrowLeft, Shield, Lock, Eye, EyeOff, Key, Smartphone, Bell, UserCheck, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { router } from 'expo-router';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { useTheme } from '@/contexts/ThemeContext';

export default function SecuritySettingsScreen() {
  const { theme } = useTheme();
  const { toast, showSuccess, showError, hideToast } = useToast();
  
  const [settings, setSettings] = useState({
    biometricAuth: true,
    twoFactorAuth: false,
    loginNotifications: true,
    deviceTracking: true,
    dataEncryption: true,
    autoLogout: false,
    suspiciousActivityAlerts: true,
    passwordExpiry: false,
  });

  const [securityScore] = useState(85);

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    showSuccess(`Paramètre ${value ? 'activé' : 'désactivé'}`);
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Changer le mot de passe',
      'Vous allez recevoir un email pour réinitialiser votre mot de passe.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Envoyer', onPress: () => showSuccess('Email de réinitialisation envoyé') },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Supprimer le compte',
      'Cette action est irréversible. Toutes vos données seront définitivement supprimées.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => showError('Suppression annulée pour la démo')
        },
      ]
    );
  };

  const SettingRow = ({ icon: Icon, title, subtitle, value, onValueChange, danger = false }) => (
    <View style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={[styles.settingIcon, { backgroundColor: theme.colors.surface }]}>
        <Icon size={20} color={danger ? '#FF6B6B' : theme.colors.primary} strokeWidth={2} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: danger ? '#FF6B6B' : theme.colors.text }]}>{title}</Text>
        {subtitle && <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>{subtitle}</Text>}
      </View>
      {onValueChange ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
          thumbColor={value ? '#000000' : theme.colors.textSecondary}
        />
      ) : (
        <TouchableOpacity>
          <Text style={[styles.actionText, { color: danger ? '#FF6B6B' : theme.colors.primary }]}>
            Modifier
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const SecurityScoreCard = () => (
    <View style={[styles.scoreCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.scoreHeader}>
        <Shield size={24} color={theme.colors.primary} strokeWidth={2} />
        <Text style={[styles.scoreTitle, { color: theme.colors.text }]}>Score de Sécurité</Text>
      </View>
      <View style={styles.scoreContent}>
        <Text style={[styles.scoreValue, { color: theme.colors.primary }]}>{securityScore}%</Text>
        <Text style={[styles.scoreStatus, { color: theme.colors.textSecondary }]}>
          {securityScore >= 80 ? 'Excellent' : securityScore >= 60 ? 'Bon' : 'À améliorer'}
        </Text>
      </View>
      <View style={[styles.scoreBar, { backgroundColor: theme.colors.surface }]}>
        <View style={[styles.scoreProgress, { width: `${securityScore}%`, backgroundColor: theme.colors.primary }]} />
      </View>
      <Text style={[styles.scoreDescription, { color: theme.colors.textSecondary }]}>
        Votre compte est bien protégé. Continuez à utiliser l'authentification à deux facteurs.
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Sécurité</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SecurityScoreCard />

        {/* Authentification */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Authentification</Text>
          
          <SettingRow
            icon={Smartphone}
            title="Authentification biométrique"
            subtitle="Touch ID, Face ID ou empreinte digitale"
            value={settings.biometricAuth}
            onValueChange={(value) => updateSetting('biometricAuth', value)}
          />
          
          <SettingRow
            icon={Key}
            title="Authentification à deux facteurs"
            subtitle="Code SMS ou application d'authentification"
            value={settings.twoFactorAuth}
            onValueChange={(value) => updateSetting('twoFactorAuth', value)}
          />
          
          <TouchableOpacity 
            style={[styles.actionRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
            onPress={handleChangePassword}
          >
            <View style={[styles.settingIcon, { backgroundColor: theme.colors.surface }]}>
              <Lock size={20} color={theme.colors.primary} strokeWidth={2} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Changer le mot de passe</Text>
              <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
                Dernière modification il y a 3 mois
              </Text>
            </View>
            <Text style={[styles.actionText, { color: theme.colors.primary }]}>Modifier</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications de sécurité */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notifications de sécurité</Text>
          
          <SettingRow
            icon={Bell}
            title="Alertes de connexion"
            subtitle="Notification lors de nouvelles connexions"
            value={settings.loginNotifications}
            onValueChange={(value) => updateSetting('loginNotifications', value)}
          />
          
          <SettingRow
            icon={AlertTriangle}
            title="Activité suspecte"
            subtitle="Alertes en cas d'activité inhabituelle"
            value={settings.suspiciousActivityAlerts}
            onValueChange={(value) => updateSetting('suspiciousActivityAlerts', value)}
          />
        </View>

        {/* Confidentialité */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Confidentialité</Text>
          
          <SettingRow
            icon={Eye}
            title="Suivi des appareils"
            subtitle="Surveiller les connexions depuis d'autres appareils"
            value={settings.deviceTracking}
            onValueChange={(value) => updateSetting('deviceTracking', value)}
          />
          
          <SettingRow
            icon={Shield}
            title="Chiffrement des données"
            subtitle="Chiffrement AES-256 de vos données sensibles"
            value={settings.dataEncryption}
            onValueChange={(value) => updateSetting('dataEncryption', value)}
          />
          
          <SettingRow
            icon={Lock}
            title="Déconnexion automatique"
            subtitle="Se déconnecter après 30 minutes d'inactivité"
            value={settings.autoLogout}
            onValueChange={(value) => updateSetting('autoLogout', value)}
          />
        </View>

        {/* Actions dangereuses */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Zone de danger</Text>
          
          <TouchableOpacity 
            style={[styles.dangerRow, { backgroundColor: theme.colors.card, borderColor: '#FF6B6B' }]}
            onPress={handleDeleteAccount}
          >
            <View style={[styles.settingIcon, { backgroundColor: 'rgba(255, 107, 107, 0.1)' }]}>
              <AlertTriangle size={20} color="#FF6B6B" strokeWidth={2} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: '#FF6B6B' }]}>Supprimer le compte</Text>
              <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
                Action irréversible - toutes vos données seront perdues
              </Text>
            </View>
            <Text style={styles.dangerText}>Supprimer</Text>
          </TouchableOpacity>
        </View>

        {/* Informations de sécurité */}
        <View style={[styles.infoCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }]}>
          <Shield size={20} color={theme.colors.primary} strokeWidth={2} />
          <Text style={[styles.infoText, { color: theme.colors.primary }]}>
            Vos données sont protégées par un chiffrement de niveau militaire et des protocoles de sécurité avancés.
          </Text>
        </View>
      </ScrollView>
    </View>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  scoreCard: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  scoreContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreStatus: {
    fontSize: 16,
  },
  scoreBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 12,
  },
  scoreProgress: {
    height: 6,
    borderRadius: 3,
  },
  scoreDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dangerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});