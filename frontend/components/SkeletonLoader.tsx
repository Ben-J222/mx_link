import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export function SkeletonLoader({ width = '100%', height = 20, borderRadius = 4, style }: SkeletonProps) {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, []);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity: pulseAnim,
        },
        style,
      ]}
    />
  );
}

export function BikeCardSkeleton() {
  return (
    <View style={styles.bikeCardSkeleton}>
      <View style={styles.bikeCardHeader}>
        <View style={styles.bikeMainInfo}>
          <SkeletonLoader width="60%" height={20} style={{ marginBottom: 8 }} />
          <SkeletonLoader width="40%" height={16} />
        </View>
        <View style={styles.bikeActions}>
          <SkeletonLoader width={60} height={24} borderRadius={12} />
          <SkeletonLoader width={32} height={32} borderRadius={16} />
        </View>
      </View>
      
      <View style={styles.bikeDetails}>
        <SkeletonLoader width="80%" height={16} style={{ marginBottom: 8 }} />
        <SkeletonLoader width="70%" height={16} style={{ marginBottom: 8 }} />
        <SkeletonLoader width="60%" height={16} />
      </View>
      
      <View style={styles.securitySection}>
        <SkeletonLoader width="50%" height={16} />
        <SkeletonLoader width={80} height={24} borderRadius={12} />
      </View>
    </View>
  );
}

export function StatCardSkeleton() {
  return (
    <View style={styles.statCardSkeleton}>
      <View style={styles.statCardHeader}>
        <SkeletonLoader width={18} height={18} borderRadius={9} />
        <SkeletonLoader width="60%" height={12} style={{ marginLeft: 6 }} />
      </View>
      <SkeletonLoader width="40%" height={24} style={{ marginBottom: 4 }} />
      <SkeletonLoader width="30%" height={12} />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#333333',
  },
  bikeCardSkeleton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  bikeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bikeMainInfo: {
    flex: 1,
  },
  bikeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bikeDetails: {
    marginBottom: 16,
  },
  securitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statCardSkeleton: {
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
});