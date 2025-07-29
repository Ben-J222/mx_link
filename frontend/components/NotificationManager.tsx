import React, { useEffect, useRef } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { useToast } from '@/hooks/useToast';

interface NotificationManagerProps {
  children: React.ReactNode;
}

export default function NotificationManager({ children }: NotificationManagerProps) {
  const isMountedRef = useRef(true);
  const { 
    permissionGranted, 
    expoPushToken,
    notifyBikeTokenized,
    notifyTheftAlert,
    notifyTransactionUpdate 
  } = useNotifications();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    isMountedRef.current = true;
    
    if (permissionGranted && expoPushToken) {
      console.log('Push notifications ready:', expoPushToken);
      
      // Simulation de notifications pour la démo
      const timeout1 = setTimeout(() => {
        if (isMountedRef.current) {
          notifyBikeTokenized('Yamaha YZ450F 2023');
        }
      }, 5000);
      
      const timeout2 = setTimeout(() => {
        if (isMountedRef.current) {
          notifyTheftAlert('Honda CRF250R 2022', 'Lyon');
        }
      }, 10000);
      
      const timeout3 = setTimeout(() => {
        if (isMountedRef.current) {
          notifyTransactionUpdate('En cours de validation', 'KTM 350 SX-F');
        }
      }, 15000);
      
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        isMountedRef.current = false;
      };
    }
    
    return () => {
      isMountedRef.current = false;
    };
  }, [permissionGranted, expoPushToken, notifyBikeTokenized, notifyTheftAlert, notifyTransactionUpdate]);

  // Gestionnaire global des événements de notification
  useEffect(() => {
    // Ici on pourrait écouter des événements globaux de l'app
    // et déclencher des notifications appropriées
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return <>{children}</>;
}