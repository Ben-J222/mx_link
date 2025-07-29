import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Bell, X, Shield, Award, TriangleAlert as AlertTriangle, Info } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface Notification {
  id: string;
  type: 'security' | 'achievement' | 'alert' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationCenterProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ visible, onClose }: NotificationCenterProps) {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'security',
      title: 'Moto certifiée avec succès',
      message: 'Votre Yamaha YZ450F a été certifiée et ajoutée à votre garage.',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Badge "Expert Sécurité" débloqué',
      message: 'Félicitations ! Vous avez atteint le niveau Expert.',
      timestamp: new Date(Date.now() - 7200000),
      read: false,
    },
    {
      id: '3',
      type: 'alert',
      title: 'Alerte vol dans votre région',
      message: 'Une Honda CRF250R a été signalée volée près de Lyon.',
      timestamp: new Date(Date.now() - 10800000),
      read: true,
    },
    {
      id: '4',
      type: 'info',
      title: 'Nouvelle fonctionnalité disponible',
      message: 'Découvrez le nouveau système de scan QR amélioré.',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
    },
  ]);

  const [slideAnim] = useState(new Animated.Value(300));

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <Shield size={20} color={theme.colors.primary} strokeWidth={2} />;
      case 'achievement':
        return <Award size={20} color={theme.colors.primary} strokeWidth={2} />;
      case 'alert':
        return <AlertTriangle size={20} color={theme.colors.error} strokeWidth={2} />;
      case 'info':
        return <Info size={20} color={theme.colors.secondary} strokeWidth={2} />;
      default:
        return <Bell size={20} color={theme.colors.textSecondary} strokeWidth={2} />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      return 'À l\'instant';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: theme.colors.surface, borderLeftColor: theme.colors.border },
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Bell size={24} color={theme.colors.primary} strokeWidth={2} />
            <Text style={[styles.title, { color: theme.colors.text }]}>Notifications</Text>
            {unreadCount > 0 && (
              <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
                <Text style={[styles.badgeText, { color: '#FFFFFF' }]}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: theme.colors.card }]}>
            <X size={24} color={theme.colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {unreadCount > 0 && (
          <TouchableOpacity style={[styles.markAllButton, { borderBottomColor: theme.colors.border }]} onPress={markAllAsRead}>
            <Text style={[styles.markAllText, { color: theme.colors.primary }]}>Tout marquer comme lu</Text>
          </TouchableOpacity>
        )}

        <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationItem,
                { borderBottomColor: theme.colors.border },
                !notification.read && styles.unreadNotification,
                !notification.read && { backgroundColor: `${theme.colors.primary}10` },
              ]}
              onPress={() => markAsRead(notification.id)}
            >
              <View style={[styles.notificationIcon, { backgroundColor: theme.colors.card }]}>
                {getIcon(notification.type)}
              </View>
              <View style={styles.notificationContent}>
                <Text style={[styles.notificationTitle, { color: theme.colors.text }]}>{notification.title}</Text>
                <Text style={[styles.notificationMessage, { color: theme.colors.textSecondary }]}>{notification.message}</Text>
                <Text style={[styles.notificationTime, { color: theme.colors.textSecondary }]}>
                  {formatTime(notification.timestamp)}
                </Text>
              </View>
              {!notification.read && <View style={[styles.unreadDot, { backgroundColor: theme.colors.primary }]} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '85%',
    maxWidth: 400,
    borderLeftWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  badge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markAllButton: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  markAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    position: 'relative',
  },
  unreadNotification: {
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 20,
    right: 16,
  },
});