import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { ArrowLeft, MessageCircle, ThumbsUp, Eye, Clock, Search, Filter, Plus, Pin } from 'lucide-react-native';
import { router } from 'expo-router';
import { useFadeIn } from '@/hooks/useAnimations';
import { Animated } from 'react-native';

export default function ForumScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const fadeAnim = useFadeIn();

  const categories = [
    { id: 'all', label: 'Tout', count: 156 },
    { id: 'annonces', label: 'Annonces', count: 12 },
    { id: 'technique', label: 'Technique', count: 45 },
    { id: 'circuits', label: 'Circuits', count: 23 },
    { id: 'vente', label: 'Vente', count: 34 },
    { id: 'general', label: 'Général', count: 42 },
  ];

  const discussions = [
    {
      id: 1,
      titre: "Nouvelle réglementation 2024",
      auteur: "AdminMX",
      avatar: "A",
      temps: "Il y a 2h",
      reponses: 23,
      vues: 156,
      likes: 12,
      type: "annonce",
      epingle: true,
      dernier_message: "Merci pour ces précisions importantes !",
      tags: ["Réglementation", "2024", "Important"]
    },
    {
      id: 2,
      titre: "Conseils entretien moteur 4T",
      auteur: "MecanoExpert",
      avatar: "M",
      temps: "Il y a 4h",
      reponses: 15,
      vues: 89,
      likes: 8,
      type: "technique",
      epingle: false,
      dernier_message: "Super tuto, très utile !",
      tags: ["Entretien", "4T", "Moteur"]
    },
    {
      id: 3,
      titre: "Nouveau circuit près de Lyon",
      auteur: "RiderLyon",
      avatar: "R",
      temps: "Il y a 6h",
      reponses: 8,
      vues: 45,
      likes: 5,
      type: "circuits",
      epingle: false,
      dernier_message: "J'ai hâte de tester !",
      tags: ["Lyon", "Circuit", "Nouveau"]
    },
    {
      id: 4,
      titre: "Vends YZ450F 2023 - État neuf",
      auteur: "SellerPro",
      avatar: "S",
      temps: "Il y a 8h",
      reponses: 12,
      vues: 78,
      likes: 3,
      type: "vente",
      epingle: false,
      dernier_message: "Prix négociable ?",
      tags: ["Yamaha", "YZ450F", "2023"]
    },
    {
      id: 5,
      titre: "Préparation saison 2024",
      auteur: "PrepRider",
      avatar: "P",
      temps: "Il y a 12h",
      reponses: 18,
      vues: 92,
      likes: 14,
      type: "general",
      epingle: false,
      dernier_message: "Excellents conseils !",
      tags: ["Préparation", "Saison", "Conseils"]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'annonce': return '#FF6B6B';
      case 'technique': return '#4CAF50';
      case 'circuits': return '#2196F3';
      case 'vente': return '#FF9800';
      case 'general': return '#9C27B0';
      default: return '#888888';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'annonce': return 'Annonce';
      case 'technique': return 'Technique';
      case 'circuits': return 'Circuits';
      case 'vente': return 'Vente';
      case 'general': return 'Général';
      default: return 'Autre';
    }
  };

  const CategoryChip = ({ category, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.categoryChip, isActive && styles.activeCategoryChip]}
      onPress={onPress}
    >
      <Text style={[styles.categoryChipText, isActive && styles.activeCategoryChipText]}>
        {category.label}
      </Text>
      <View style={[styles.categoryCount, isActive && styles.activeCategoryCount]}>
        <Text style={[styles.categoryCountText, isActive && styles.activeCategoryCountText]}>
          {category.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const DiscussionCard = ({ discussion }) => (
    <Animated.View style={[styles.discussionCard, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.discussionHeader}>
          <View style={styles.discussionMeta}>
            <View style={styles.authorInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{discussion.avatar}</Text>
              </View>
              <View>
                <Text style={styles.authorName}>{discussion.auteur}</Text>
                <Text style={styles.discussionTime}>{discussion.temps}</Text>
              </View>
            </View>
            <View style={styles.discussionActions}>
              {discussion.epingle && (
                <View style={styles.pinnedBadge}>
                  <Pin size={12} color="#C4F112" strokeWidth={2} />
                </View>
              )}
              <View style={[styles.typeBadge, { backgroundColor: getTypeColor(discussion.type) }]}>
                <Text style={styles.typeText}>{getTypeLabel(discussion.type)}</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.discussionTitle}>{discussion.titre}</Text>
        
        <View style={styles.tagsContainer}>
          {discussion.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.lastMessage}>"{discussion.dernier_message}"</Text>

        <View style={styles.discussionStats}>
          <View style={styles.statItem}>
            <MessageCircle size={16} color="#888888" strokeWidth={2} />
            <Text style={styles.statText}>{discussion.reponses}</Text>
          </View>
          <View style={styles.statItem}>
            <Eye size={16} color="#888888" strokeWidth={2} />
            <Text style={styles.statText}>{discussion.vues}</Text>
          </View>
          <View style={styles.statItem}>
            <ThumbsUp size={16} color="#888888" strokeWidth={2} />
            <Text style={styles.statText}>{discussion.likes}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.auteur.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || discussion.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forum MX</Text>
        <TouchableOpacity style={styles.newPostButton}>
          <Plus size={24} color="#000000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section de recherche */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Search size={20} color="#888888" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher dans le forum..."
              placeholderTextColor="#888888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#C4F112" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Catégories */}
        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesList}>
              {categories.map(category => (
                <CategoryChip
                  key={category.id}
                  category={category}
                  isActive={activeCategory === category.id}
                  onPress={() => setActiveCategory(category.id)}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Statistiques */}
        <Animated.View style={[styles.statsCard, { opacity: fadeAnim }]}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1,247</Text>
            <Text style={styles.statLabel}>Membres</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>Discussions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2,834</Text>
            <Text style={styles.statLabel}>Messages</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>En ligne</Text>
          </View>
        </Animated.View>

        {/* Discussions */}
        <View style={styles.discussionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredDiscussions.length} discussion{filteredDiscussions.length !== 1 ? 's' : ''}
            </Text>
          </View>
          
          {filteredDiscussions.map(discussion => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
  newPostButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C4F112',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  searchSection: {
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
    paddingVertical: 12,
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
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  categoriesSection: {
    marginBottom: 20,
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
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    gap: 8,
  },
  activeCategoryChip: {
    backgroundColor: '#C4F112',
    borderColor: '#C4F112',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
  },
  activeCategoryChipText: {
    color: '#000000',
  },
  categoryCount: {
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  activeCategoryCount: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  categoryCountText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#888888',
  },
  activeCategoryCountText: {
    color: '#000000',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C4F112',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888888',
  },
  discussionsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  discussionCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  discussionHeader: {
    marginBottom: 12,
  },
  discussionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C4F112',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  discussionTime: {
    fontSize: 12,
    color: '#888888',
  },
  discussionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pinnedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(196, 241, 18, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  discussionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: '#C4F112',
    fontWeight: '600',
  },
  lastMessage: {
    fontSize: 14,
    color: '#888888',
    fontStyle: 'italic',
    marginBottom: 16,
    lineHeight: 20,
  },
  discussionStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#888888',
    marginLeft: 4,
    fontWeight: '600',
  },
});