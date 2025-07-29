import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Dimensions } from 'react-native';
import { ArrowLeft, Heart, MessageCircle, Share, Camera, MapPin, Clock, MoveHorizontal as MoreHorizontal, Plus, Zap } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedView, ThemedText, ThemedButton } from '@/components/ThemedComponents';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import { useFadeIn } from '@/hooks/useAnimations';
import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function SocialFeedScreen() {
  const { theme } = useTheme();
  const { toast, showSuccess, hideToast } = useToast();
  const [likedPosts, setLikedPosts] = useState(new Set());
  const fadeAnim = useFadeIn();

  const posts = [
    {
      id: 1,
      user: {
        name: 'Alex Martin',
        avatar: 'AM',
        verified: true,
        level: 'ELITE-MX'
      },
      content: {
        text: 'Ma nouvelle Yamaha YZ450F vient d\'être tokenisée ! 🏍️ Prêt pour la saison 2024 ! #YZ450F #Yamaha #NewBike',
        image: 'https://images.pexels.com/photos/163210/motorcycles-race-helmets-pilots-163210.jpeg',
        location: 'Lyon, France',
        hashtags: ['#YZ450F', '#Yamaha', '#NewBike']
      },
      stats: {
        likes: 24,
        comments: 8,
        shares: 3
      },
      timestamp: 'Il y a 2h',
      type: 'tokenization'
    },
    {
      id: 2,
      user: {
        name: 'Marie Leroy',
        avatar: 'ML',
        verified: false,
        level: 'PRO-MX'
      },
      content: {
        text: 'Session parfaite au circuit de Ernée ! Conditions idéales 🌟 #Cross #Circuit #Perfect',
        image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
        location: 'Circuit de Ernée',
        hashtags: ['#Cross', '#Circuit', '#Perfect']
      },
      stats: {
        likes: 18,
        comments: 5,
        shares: 2
      },
      timestamp: 'Il y a 4h',
      type: 'session'
    },
    {
      id: 3,
      user: {
        name: 'Pierre Dubois',
        avatar: 'PD',
        verified: true,
        level: 'EXPERT-MX'
      },
      content: {
        text: 'Vente réussie de ma Honda CRF250R ! Merci MX Link pour la transaction sécurisée 🤝 #Sold #Honda #CRF250R',
        image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg',
        location: 'Marseille, France',
        hashtags: ['#Sold', '#Honda', '#CRF250R']
      },
      stats: {
        likes: 31,
        comments: 12,
        shares: 6
      },
      timestamp: 'Il y a 6h',
      type: 'sale'
    }
  ];

  const stories = [
    { id: 1, user: 'Vous', avatar: '+', isOwn: true },
    { id: 2, user: 'Alex M.', avatar: 'AM', hasStory: true },
    { id: 3, user: 'Marie L.', avatar: 'ML', hasStory: true },
    { id: 4, user: 'Pierre D.', avatar: 'PD', hasStory: true },
    { id: 5, user: 'Thomas G.', avatar: 'TG', hasStory: true }
  ];

  const toggleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
      showSuccess('Like retiré');
    } else {
      newLikedPosts.add(postId);
      showSuccess('Post liké !');
    }
    setLikedPosts(newLikedPosts);
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'tokenization': return '🔐';
      case 'session': return '🏁';
      case 'sale': return '💰';
      default: return '📱';
    }
  };

  const StoryItem = ({ story }) => (
    <TouchableOpacity style={styles.storyItem}>
      <View style={[
        styles.storyAvatar,
        { 
          backgroundColor: story.isOwn ? theme.colors.surface : theme.colors.primary,
          borderColor: story.hasStory ? theme.colors.primary : theme.colors.border
        }
      ]}>
        {story.isOwn ? (
          <Plus size={20} color={theme.colors.primary} strokeWidth={2} />
        ) : (
          <Text style={[styles.storyAvatarText, { color: story.hasStory ? '#000000' : theme.colors.text }]}>
            {story.avatar}
          </Text>
        )}
      </View>
      <ThemedText size="small" style={{ textAlign: 'center', marginTop: 4 }}>
        {story.user}
      </ThemedText>
    </TouchableOpacity>
  );

  const PostCard = ({ post }) => (
    <Animated.View style={[styles.postCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={[styles.userAvatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.userAvatarText}>{post.user.avatar}</Text>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.userNameRow}>
              <ThemedText weight="600">{post.user.name}</ThemedText>
              {post.user.verified && (
                <Text style={styles.verifiedBadge}>✓</Text>
              )}
              <View style={[styles.levelBadge, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.levelText, { color: theme.colors.primary }]}>{post.user.level}</Text>
              </View>
            </View>
            <View style={styles.postMeta}>
              <Text style={styles.postTypeIcon}>{getPostTypeIcon(post.type)}</Text>
              <ThemedText secondary size="small">{post.timestamp}</ThemedText>
              {post.content.location && (
                <>
                  <Text style={[styles.metaSeparator, { color: theme.colors.textSecondary }]}>•</Text>
                  <MapPin size={12} color={theme.colors.textSecondary} strokeWidth={2} />
                  <ThemedText secondary size="small">{post.content.location}</ThemedText>
                </>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity style={[styles.moreButton, { backgroundColor: theme.colors.surface }]}>
          <MoreHorizontal size={20} color={theme.colors.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.postContent}>
        <ThemedText style={{ lineHeight: 22, marginBottom: 12 }}>
          {post.content.text}
        </ThemedText>
        
        {post.content.image && (
          <Image
            source={{ uri: post.content.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => toggleLike(post.id)}
        >
          <Heart 
            size={20} 
            color={likedPosts.has(post.id) ? '#FF6B6B' : theme.colors.textSecondary}
            fill={likedPosts.has(post.id) ? '#FF6B6B' : 'transparent'}
            strokeWidth={2} 
          />
          <Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>
            {post.stats.likes + (likedPosts.has(post.id) ? 1 : 0)}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color={theme.colors.textSecondary} strokeWidth={2} />
          <Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>
            {post.stats.comments}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Share size={20} color={theme.colors.textSecondary} strokeWidth={2} />
          <Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>
            {post.stats.shares}
          </Text>
        </TouchableOpacity>
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
        <ThemedText size="large" weight="bold">Communauté MX</ThemedText>
        <TouchableOpacity 
          style={[styles.cameraButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => showSuccess('Création de post ouvert')}
        >
          <Camera size={20} color="#000000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stories */}
        <View style={styles.storiesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.storiesList}>
              {stories.map(story => (
                <StoryItem key={story.id} story={story} />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Create Post */}
        <Animated.View style={[styles.createPostCard, { opacity: fadeAnim, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.createPostHeader}>
            <View style={[styles.userAvatar, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.userAvatarText}>AM</Text>
            </View>
            <TouchableOpacity 
              style={[styles.createPostInput, { backgroundColor: theme.colors.surface }]}
              onPress={() => showSuccess('Création de post ouvert')}
            >
              <ThemedText secondary>Quoi de neuf dans votre garage ?</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.createPostActions}>
            <TouchableOpacity style={styles.createAction}>
              <Camera size={20} color={theme.colors.primary} strokeWidth={2} />
              <ThemedText style={{ color: theme.colors.primary }}>Photo</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createAction}>
              <MapPin size={20} color={theme.colors.primary} strokeWidth={2} />
              <ThemedText style={{ color: theme.colors.primary }}>Lieu</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createAction}>
              <Zap size={20} color={theme.colors.primary} strokeWidth={2} />
              <ThemedText style={{ color: theme.colors.primary }}>Activité</ThemedText>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Posts Feed */}
        <View style={styles.feedSection}>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
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
  cameraButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingBottom: 100,
  },
  storiesSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  storiesList: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
  },
  storyItem: {
    alignItems: 'center',
    width: 70,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  storyAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  createPostCard: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  createPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  createPostInput: {
    flex: 1,
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  createPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  createAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feedSection: {
    paddingHorizontal: 16,
  },
  postCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  userDetails: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  verifiedBadge: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
  },
  levelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postTypeIcon: {
    fontSize: 12,
  },
  metaSeparator: {
    fontSize: 12,
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});