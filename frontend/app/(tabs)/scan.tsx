import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, Scan, Shield, CircleCheck as CheckCircle, CircleAlert as AlertCircle, X, ArrowLeft, Zap, ShoppingBag, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function MarketScreen() {
  const { theme } = useTheme();
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const mockScanResult = {
    verified: true,
    make: 'Yamaha',
    model: 'YZ450F',
    year: '2022',
    owner: 'Alex Martin',
    status: 'Certifiée',
    tokenId: 'MX-2022-YZ450F-001',
    lastUpdated: '15 janvier 2024',
    securityLevel: 'A1-SECURE',
  };

  const handleScan = () => {
    setIsScanning(true);
    const timeoutId = setTimeout(() => {
      setScanResult(mockScanResult);
      setIsScanning(false);
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  };

  const InfoCard = ({ title, value, icon: Icon, color }) => (
    <View style={[styles.infoCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.infoCardHeader}>
        <Icon size={18} color={color} strokeWidth={2} />
        <Text style={[styles.infoCardTitle, { color: theme.colors.textSecondary }]}>{title}</Text>
      </View>
      <Text style={[styles.infoCardValue, { color }]}>{value}</Text>
    </View>
  );

  const renderContent = () => {
    if (scanResult) {
      return (
        <View style={styles.tabContent}>
          <View style={styles.resultHeader}>
            <View style={styles.verificationBadge}>
              <CheckCircle size={20} color="#4CAF50" strokeWidth={2} />
              <Text style={styles.verificationText}>Vérifiée</Text>
            </View>
            <TouchableOpacity 
              style={[styles.closeButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
              onPress={() => setScanResult(null)}
            >
              <X size={20} color={theme.colors.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.bikeInfoSection}>
            <View style={[styles.bikeIcon, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}>
              <Shield size={40} color={theme.colors.primary} strokeWidth={2} />
            </View>
            <Text style={[styles.bikeTitle, { color: theme.colors.text }]}>
              {scanResult.make} {scanResult.model}
            </Text>
            <Text style={[styles.bikeYear, { color: theme.colors.textSecondary }]}>{scanResult.year}</Text>
            <View style={[styles.securityBadge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.securityLevel}>{scanResult.securityLevel}</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <InfoCard
              title="Propriétaire"
              value={scanResult.owner}
              icon={Shield}
              color={theme.colors.primary}
            />
            <InfoCard
              title="Statut"
              value={scanResult.status}
              icon={CheckCircle}
              color="#4CAF50"
            />
            <InfoCard
              title="Token ID"
              value={scanResult.tokenId}
              icon={Shield}
              color={theme.colors.primary}
            />
            <InfoCard
              title="Dernière MAJ"
              value={scanResult.lastUpdated}
              icon={AlertCircle}
              color={theme.colors.textSecondary}
            />
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={[styles.primaryActionButton, { backgroundColor: theme.colors.primary }]}>
              <Zap size={20} color="#000000" strokeWidth={2} />
              <Text style={styles.primaryActionText}>Démarrer transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondaryActionButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              <Text style={[styles.secondaryActionText, { color: theme.colors.text }]}>Voir l'historique</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.securityNotice, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }]}>
            <Shield size={16} color={theme.colors.primary} strokeWidth={2} />
            <Text style={[styles.securityNoticeText, { color: theme.colors.primary }]}>
              Cette moto est certifiée sur la blockchain et sécurisée pour les transactions.
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        <View style={styles.scanSection}>
          <Text style={[styles.scanTitle, { color: theme.colors.text }]}>Scanner QR Code</Text>
          <Text style={[styles.scanSubtitle, { color: theme.colors.textSecondary }]}>
            Scannez le QR code de la moto pour vérifier son authenticité
          </Text>
        </View>

        <View style={styles.scanArea}>
          <View style={[styles.scanFrame, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.scanCorner} />
            <View style={[styles.scanCorner, styles.scanCornerTopRight]} />
            <View style={[styles.scanCorner, styles.scanCornerBottomLeft]} />
            <View style={[styles.scanCorner, styles.scanCornerBottomRight]} />
            
            {isScanning ? (
              <View style={styles.scanningIndicator}>
                <View style={[styles.scanningPulse, { backgroundColor: `${theme.colors.primary}20` }]}>
                  <Shield size={32} color={theme.colors.primary} strokeWidth={2} />
                </View>
                <Text style={[styles.scanningText, { color: theme.colors.primary }]}>Analyse en cours...</Text>
                <View style={styles.scanningDots}>
                  <View style={[styles.dot, styles.dotActive, { backgroundColor: theme.colors.primary }]} />
                  <View style={[styles.dot, { backgroundColor: theme.colors.border }]} />
                  <View style={[styles.dot, { backgroundColor: theme.colors.border }]} />
                </View>
              </View>
            ) : (
              <View style={styles.scanPlaceholder}>
                <Scan size={48} color={theme.colors.primary} strokeWidth={2} />
                <Text style={[styles.scanPlaceholderText, { color: theme.colors.textSecondary }]}>
                  Positionnez le QR code dans le cadre
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={[styles.instructionsCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.instructionsTitle, { color: theme.colors.text }]}>Instructions</Text>
          <View style={styles.instructionsList}>
            <View style={styles.instructionItem}>
              <View style={[styles.instructionDot, { backgroundColor: theme.colors.primary }]} />
              <Text style={[styles.instructionText, { color: theme.colors.textSecondary }]}>Pointez vers le QR code de la moto</Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={[styles.instructionDot, { backgroundColor: theme.colors.primary }]} />
              <Text style={[styles.instructionText, { color: theme.colors.textSecondary }]}>Assurez-vous d'avoir un bon éclairage</Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={[styles.instructionDot, { backgroundColor: theme.colors.primary }]} />
              <Text style={[styles.instructionText, { color: theme.colors.textSecondary }]}>Tenez l'appareil stable</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.scanButton, 
            { backgroundColor: theme.colors.primary },
            isScanning && styles.scanButtonDisabled
          ]}
          onPress={handleScan}
          disabled={isScanning}
        >
          <Camera size={24} color="#000000" strokeWidth={2} />
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Scan en cours...' : 'Démarrer le scan'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Scanner QR</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Contenu du scanner */}
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  scanTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scanSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  scanSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scanArea: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scanFrame: {
    width: width - 80,
    height: width - 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
  },
  scanCorner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#C4F112',
    top: 12,
    left: 12,
    borderTopLeftRadius: 4,
  },
  scanCornerTopRight: {
    top: 12,
    right: 12,
    left: 'auto',
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 0,
    borderTopRightRadius: 4,
  },
  scanCornerBottomLeft: {
    bottom: 12,
    top: 'auto',
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
  },
  scanCornerBottomRight: {
    bottom: 12,
    right: 12,
    top: 'auto',
    left: 'auto',
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 4,
  },
  scanningIndicator: {
    alignItems: 'center',
  },
  scanningPulse: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scanningText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  scanningDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#C4F112',
  },
  scanPlaceholder: {
    alignItems: 'center',
  },
  scanPlaceholderText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  instructionsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  instructionsList: {
    gap: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  instructionText: {
    fontSize: 14,
    flex: 1,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 12,
  },
  scanButtonDisabled: {
    opacity: 0.6,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  verificationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 8,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  bikeInfoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  bikeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
  },
  bikeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bikeYear: {
    fontSize: 16,
    marginBottom: 12,
  },
  securityBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  securityLevel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  infoGrid: {
    marginBottom: 24,
    gap: 12,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoCardTitle: {
    fontSize: 14,
    marginLeft: 8,
  },
  infoCardValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  primaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  secondaryActionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
  },
  secondaryActionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  securityNoticeText: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});