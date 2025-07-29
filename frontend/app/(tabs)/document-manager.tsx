import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ArrowLeft, Upload, FileText, Camera, Search, Filter, Download, Eye, Trash2, Plus, Folder, Calendar } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView, ThemedText, ThemedButton } from '@/components/ThemedComponents';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { useFadeIn } from '@/hooks/useAnimations';
import { Animated } from 'react-native';

export default function DocumentManagerScreen() {
  const { theme } = useTheme();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const fadeAnim = useFadeIn();

  const documents = [
    {
      id: 1,
      name: 'Facture achat YZ450F',
      type: 'invoice',
      bikeId: 'MX-2023-YZ450F-001',
      bikeName: 'Yamaha YZ450F 2023',
      date: '15/01/2024',
      size: '2.4 MB',
      category: 'purchase',
      extractedData: {
        amount: '8500€',
        seller: 'Moto Center Lyon',
        warranty: '12 mois'
      }
    },
    {
      id: 2,
      name: 'Carnet entretien révision',
      type: 'maintenance',
      bikeId: 'MX-2023-YZ450F-001',
      bikeName: 'Yamaha YZ450F 2023',
      date: '10/01/2024',
      size: '1.8 MB',
      category: 'maintenance',
      extractedData: {
        service: 'Révision complète',
        garage: 'Yamaha Service',
        nextService: '50h'
      }
    },
    {
      id: 3,
      name: 'Certificat conformité',
      type: 'certificate',
      bikeId: 'MX-2022-CRF250R-002',
      bikeName: 'Honda CRF250R 2022',
      date: '05/01/2024',
      size: '0.9 MB',
      category: 'certificate',
      extractedData: {
        issuer: 'Honda France',
        validity: '5 ans',
        standard: 'CE'
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'Tous', count: documents.length },
    { id: 'purchase', label: 'Achats', count: 1 },
    { id: 'maintenance', label: 'Entretien', count: 1 },
    { id: 'certificate', label: 'Certificats', count: 1 },
    { id: 'warranty', label: 'Garanties', count: 0 }
  ];

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'invoice': return <FileText size={20} color={theme.colors.primary} strokeWidth={2} />;
      case 'maintenance': return <Calendar size={20} color="#4CAF50" strokeWidth={2} />;
      case 'certificate': return <FileText size={20} color="#2196F3" strokeWidth={2} />;
      default: return <FileText size={20} color={theme.colors.textSecondary} strokeWidth={2} />;
    }
  };

  const DocumentCard = ({ document }) => (
    <Animated.View style={[styles.documentCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.documentHeader}>
        <View style={[styles.documentIcon, { backgroundColor: theme.colors.surface }]}>
          {getDocumentIcon(document.type)}
        </View>
        <View style={styles.documentInfo}>
          <ThemedText weight="600">{document.name}</ThemedText>
          <ThemedText secondary size="small">{document.bikeName}</ThemedText>
          <ThemedText secondary size="small">{document.date} • {document.size}</ThemedText>
        </View>
        <View style={styles.documentActions}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}>
            <Eye size={16} color={theme.colors.primary} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}>
            <Download size={16} color={theme.colors.primary} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
      
      {document.extractedData && (
        <View style={[styles.extractedData, { backgroundColor: theme.colors.surface }]}>
          <ThemedText size="small" weight="600" style={{ marginBottom: 4 }}>Données extraites (OCR)</ThemedText>
          {Object.entries(document.extractedData).map(([key, value]) => (
            <View key={key} style={styles.dataRow}>
              <ThemedText secondary size="small">{key}:</ThemedText>
              <ThemedText size="small" weight="600">{value}</ThemedText>
            </View>
          ))}
        </View>
      )}
    </Animated.View>
  );

  const CategoryChip = ({ category, isActive, onPress }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        { 
          backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
          borderColor: theme.colors.border 
        }
      ]}
      onPress={onPress}
    >
      <ThemedText 
        size="small" 
        weight="600" 
        style={{ color: isActive ? '#000000' : theme.colors.text }}
      >
        {category.label}
      </ThemedText>
      <View style={[
        styles.categoryCount,
        { backgroundColor: isActive ? 'rgba(0,0,0,0.2)' : theme.colors.border }
      ]}>
        <Text style={[
          styles.categoryCountText,
          { color: isActive ? '#000000' : theme.colors.textSecondary }
        ]}>
          {category.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.bikeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <ThemedText size="large" weight="bold">Gestion Documentaire</ThemedText>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => showSuccess('Upload de document ouvert')}
        >
          <Plus size={20} color="#000000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Search size={20} color={theme.colors.textSecondary} strokeWidth={2} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Rechercher un document..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Filter size={20} color={theme.colors.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesList}>
            {categories.map(category => (
              <CategoryChip
                key={category.id}
                category={category}
                isActive={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.uploadSection}>
          <TouchableOpacity 
            style={[styles.uploadCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }]}
            onPress={() => showSuccess('Sélection de fichier ouvert')}
          >
            <Upload size={32} color={theme.colors.primary} strokeWidth={2} />
            <ThemedText weight="600" style={{ marginTop: 8 }}>Ajouter un document</ThemedText>
            <ThemedText secondary size="small">PDF, JPG, PNG jusqu'à 10MB</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.documentsSection}>
          <View style={styles.sectionHeader}>
            <ThemedText size="large" weight="bold">
              {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
            </ThemedText>
          </View>
          
          {filteredDocuments.map(document => (
            <DocumentCard key={document.id} document={document} />
          ))}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginVertical: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
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
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  categoriesSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  categoriesList: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
  },
  categoryCount: {
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  categoryCountText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  documentsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  documentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extractedData: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
});