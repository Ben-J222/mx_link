import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { ArrowLeft, Palette, Globe, Volume2, Vibrate, Download, Trash2, Info, Moon, Sun, Eye, Check } from 'lucide-react-native';
import { router } from 'expo-router';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { useTheme } from '@/contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';

export default function AppSettingsScreen() {
  const { theme, isDark, isAccessible, toggleTheme, toggleAccessibility, setThemeMode } = useTheme();
  const { toast, showSuccess, showError, hideToast } = useToast();
  
  const [settings, setSettings] = useState({
    language: 'fr',
    soundEnabled: true,
    vibrationEnabled: true,
    autoDownloadImages: true,
    dataCompression: false,
    analyticsEnabled: true,
    crashReporting: true,
    betaFeatures: false,
    tempThemeMode: isDark ? 'dark' : 'light',
    tempAccessibilityMode: isAccessible,
  });

  const [cacheSize] = useState('245 MB');
  const [appVersion] = useState('2.0.0');

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    showSuccess(`Paramètre ${value ? 'activé' : 'désactivé'}`);
  };

  const handleClearCache = () => {
    Alert.alert(
      'Vider le cache',
      'Cette action supprimera les données temporaires et pourrait ralentir l\'application temporairement.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Vider', 
          onPress: () => showSuccess('Cache vidé avec succès')
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Réinitialiser les paramètres',
      'Tous les paramètres seront remis aux valeurs par défaut.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => showSuccess('Paramètres réinitialisés')
        },
      ]
    );
  };

  const handleThemeToggle = () => {
    const newIsDark = !isDark;
    setThemeMode(newIsDark, isAccessible);
    setSettings(prev => ({ ...prev, tempThemeMode: newIsDark ? 'dark' : 'light' }));
    showSuccess(newIsDark ? 'Mode sombre activé' : 'Mode clair activé');
  };

  const handleAccessibilityToggle = () => {
    const newIsAccessible = !isAccessible;
    setThemeMode(isDark, newIsAccessible);
    setSettings(prev => ({ ...prev, tempAccessibilityMode: newIsAccessible }));
    showSuccess(newIsAccessible ? 'Mode accessible activé' : 'Mode accessible désactivé');
  };

  const handleLanguageChange = (language: string) => {
    setSettings(prev => ({ ...prev, language }));
    showSuccess('Langue mise à jour');
  };

  const SettingRow = ({ icon: Icon, title, subtitle, rightElement, onPress, danger = false }) => (
    <TouchableOpacity 
      style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.settingIcon, { backgroundColor: theme.colors.surface }]}>
        <Icon size={20} color={danger ? '#FF6B6B' : theme.colors.primary} strokeWidth={2} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: danger ? '#FF6B6B' : theme.colors.text }]}>{title}</Text>
        {subtitle && <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>{subtitle}</Text>}
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  const languages = [
    { label: 'Français', value: 'fr' },
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Deutsch', value: 'de' },
    { label: 'Italiano', value: 'it' },
  ];

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
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Paramètres de l'app</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Apparence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Apparence</Text>
          
          <SettingRow
            icon={isDark ? Moon : Sun}
            title="Thème d'affichage"
            subtitle={`${isDark ? "Mode sombre" : "Mode clair"} activé - Appliqué à toute l'app`}
            rightElement={
              <Switch
                value={isDark}
                onValueChange={handleThemeToggle}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={isDark ? '#000000' : theme.colors.textSecondary}
              />
            }
          />
          
          <SettingRow
            icon={Eye}
            title="Mode accessible"
            subtitle={`${isAccessible ? "Activé" : "Désactivé"} - Contraste élevé et texte agrandi`}
            rightElement={
              <Switch
                value={isAccessible}
                onValueChange={handleAccessibilityToggle}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={isAccessible ? '#000000' : theme.colors.textSecondary}
              />
            }
          />
          
          <View style={[styles.themePreview, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.previewTitle, { color: theme.colors.text }]}>Aperçu du thème actuel</Text>
            <View style={styles.previewContent}>
              <View style={[styles.previewCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
                <Text style={[styles.previewText, { color: theme.colors.text }]}>Texte principal</Text>
                <Text style={[styles.previewSubtext, { color: theme.colors.textSecondary }]}>Texte secondaire</Text>
                <View style={[styles.previewButton, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.previewButtonText}>Bouton</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Langue */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Langue et région</Text>
          
          <View style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={[styles.settingIcon, { backgroundColor: theme.colors.surface }]}>
              <Globe size={20} color={theme.colors.primary} strokeWidth={2} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Langue</Text>
              <View style={[styles.pickerContainer, { backgroundColor: theme.colors.surface }]}>
                <Picker
                  selectedValue={settings.language}
                  onValueChange={handleLanguageChange}
                  style={styles.picker}
                  dropdownIconColor={theme.colors.primary}
                >
                  {languages.map((lang) => (
                    <Picker.Item 
                      key={lang.value} 
                      label={lang.label} 
                      value={lang.value}
                      color={theme.colors.text}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>

        {/* Audio et vibrations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Audio et vibrations</Text>
          
          <SettingRow
            icon={Volume2}
            title="Sons de l'application"
            subtitle="Sons de notification et d'interface"
            rightElement={
              <Switch
                value={settings.soundEnabled}
                onValueChange={(value) => updateSetting('soundEnabled', value)}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={settings.soundEnabled ? '#000000' : theme.colors.textSecondary}
              />
            }
          />
          
          <SettingRow
            icon={Vibrate}
            title="Vibrations"
            subtitle="Retour haptique pour les interactions"
            rightElement={
              <Switch
                value={settings.vibrationEnabled}
                onValueChange={(value) => updateSetting('vibrationEnabled', value)}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={settings.vibrationEnabled ? '#000000' : theme.colors.textSecondary}
              />
            }
          />
        </View>

        {/* Données et stockage */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Données et stockage</Text>
          
          <SettingRow
            icon={Download}
            title="Téléchargement automatique"
            subtitle="Images et contenus en Wi-Fi uniquement"
            rightElement={
              <Switch
                value={settings.autoDownloadImages}
                onValueChange={(value) => updateSetting('autoDownloadImages', value)}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={settings.autoDownloadImages ? '#000000' : theme.colors.textSecondary}
              />
            }
          />
          
          <SettingRow
            icon={Trash2}
            title="Vider le cache"
            subtitle={`Données temporaires : ${cacheSize}`}
            onPress={handleClearCache}
            rightElement={
              <Text style={[styles.actionText, { color: theme.colors.primary }]}>Vider</Text>
            }
          />
        </View>

        {/* Confidentialité et données */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Confidentialité et données</Text>
          
          <SettingRow
            icon={Info}
            title="Analyses d'utilisation"
            subtitle="Aider à améliorer l'application"
            rightElement={
              <Switch
                value={settings.analyticsEnabled}
                onValueChange={(value) => updateSetting('analyticsEnabled', value)}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={settings.analyticsEnabled ? '#000000' : theme.colors.textSecondary}
              />
            }
          />
          
          <SettingRow
            icon={Info}
            title="Rapports de crash"
            subtitle="Envoyer automatiquement les rapports d'erreur"
            rightElement={
              <Switch
                value={settings.crashReporting}
                onValueChange={(value) => updateSetting('crashReporting', value)}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={settings.crashReporting ? '#000000' : theme.colors.textSecondary}
              />
            }
          />
        </View>

        {/* Fonctionnalités avancées */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Fonctionnalités avancées</Text>
          
          <SettingRow
            icon={Info}
            title="Fonctionnalités bêta"
            subtitle="Accès aux nouvelles fonctionnalités en test"
            rightElement={
              <Switch
                value={settings.betaFeatures}
                onValueChange={(value) => updateSetting('betaFeatures', value)}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={settings.betaFeatures ? '#000000' : theme.colors.textSecondary}
              />
            }
          />
        </View>

        {/* Actions de réinitialisation */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Réinitialisation</Text>
          
          <SettingRow
            icon={Trash2}
            title="Réinitialiser les paramètres"
            subtitle="Remettre tous les paramètres par défaut"
            onPress={handleResetSettings}
            danger={true}
            rightElement={
              <Text style={styles.dangerText}>Réinitialiser</Text>
            }
          />
        </View>

        {/* Informations de l'application */}
        <View style={[styles.infoCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.infoTitle, { color: theme.colors.text }]}>Informations de l'application</Text>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Version :</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{appVersion}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Build :</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>2024.01.15</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Plateforme :</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>React Native</Text>
          </View>
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
  section: {
    marginBottom: 32,
    marginTop: 20,
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
  pickerContainer: {
    borderRadius: 8,
    marginTop: 8,
  },
  picker: {
    height: 40,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  themePreview: {
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  previewContent: {
    alignItems: 'center',
  },
  previewCard: {
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 150,
  },
  previewText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  previewSubtext: {
    fontSize: 14,
    marginBottom: 12,
  },
  previewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  previewButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});