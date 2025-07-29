import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface NotificationData {
  id: string;
  title: string;
  body: string;
  data?: any;
  timestamp: number;
  read: boolean;
  type: 'security' | 'transaction' | 'theft' | 'system' | 'marketing';
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync();
    loadStoredNotifications();
    
    // Écouter les notifications reçues
    const notificationListener = Notifications.addNotificationReceivedListener(handleNotificationReceived);
    const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Platform.OS === 'web') {
        console.log('Push notifications not supported on web');
        return;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Permission for notifications denied');
        setPermissionGranted(false);
        return;
      }

      setPermissionGranted(true);
      
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
      
      // Sauvegarder le token pour l'envoyer au serveur
      await AsyncStorage.setItem('expo_push_token', token);
      
    } catch (error) {
      console.error('Error registering for push notifications:', error);
    }
  };

  const loadStoredNotifications = async () => {
    try {
      const stored = await AsyncStorage.getItem('notifications');
      if (stored) {
        setNotifications(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const saveNotifications = async (notifs: NotificationData[]) => {
    try {
      await AsyncStorage.setItem('notifications', JSON.stringify(notifs));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  };

  const handleNotificationReceived = (notification: Notifications.Notification) => {
    const newNotification: NotificationData = {
      id: notification.request.identifier,
      title: notification.request.content.title || '',
      body: notification.request.content.body || '',
      data: notification.request.content.data,
      timestamp: Date.now(),
      read: false,
      type: notification.request.content.data?.type || 'system',
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      saveNotifications(updated);
      return updated;
    });
  };

  const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
    const notificationData = response.notification.request.content.data;
    
    // Marquer comme lue
    markAsRead(response.notification.request.identifier);
    
    // Navigation basée sur le type
    if (notificationData?.screen) {
      // router.push(notificationData.screen);
    }
  };

  const sendLocalNotification = useCallback(async (
    title: string, 
    body: string, 
    data?: any,
    type: NotificationData['type'] = 'system'
  ) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { ...data, type },
        },
        trigger: null, // Immédiat
      });
    } catch (error) {
      console.error('Error sending local notification:', error);
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      );
      saveNotifications(updated);
      return updated;
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(notif => ({ ...notif, read: true }));
      saveNotifications(updated);
      return updated;
    });
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(notif => notif.id !== id);
      saveNotifications(updated);
      return updated;
    });
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    saveNotifications([]);
  }, []);

  // Notifications prédéfinies pour différents événements
  const notifyBikeTokenized = useCallback((bikeName: string) => {
    sendLocalNotification(
      'Moto certifiée avec succès',
      `Votre ${bikeName} a été tokenisée et sécurisée sur la blockchain.`,
      { screen: '/(tabs)/my-bikes' },
      'security'
    );
  }, [sendLocalNotification]);

  const notifyTheftAlert = useCallback((bikeInfo: string, location: string) => {
    sendLocalNotification(
      'Alerte vol dans votre région',
      `${bikeInfo} signalée volée près de ${location}`,
      { screen: '/(tabs)/search' },
      'theft'
    );
  }, [sendLocalNotification]);

  const notifyTransactionUpdate = useCallback((status: string, bikeName: string) => {
    sendLocalNotification(
      'Mise à jour transaction',
      `Transaction pour ${bikeName} : ${status}`,
      { screen: '/(tabs)/marketplace' },
      'transaction'
    );
  }, [sendLocalNotification]);

  const notifyNewMessage = useCallback((senderName: string) => {
    sendLocalNotification(
      'Nouveau message',
      `${senderName} vous a envoyé un message`,
      { screen: '/(tabs)/profile' },
      'system'
    );
  }, [sendLocalNotification]);

  const getUnreadCount = useCallback(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const getNotificationsByType = useCallback((type: NotificationData['type']) => {
    return notifications.filter(n => n.type === type);
  }, [notifications]);

  return {
    notifications,
    expoPushToken,
    permissionGranted,
    unreadCount: getUnreadCount(),
    
    // Actions
    sendLocalNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    
    // Notifications spécifiques
    notifyBikeTokenized,
    notifyTheftAlert,
    notifyTransactionUpdate,
    notifyNewMessage,
    
    // Utilitaires
    getNotificationsByType,
  };
}