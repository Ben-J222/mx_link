import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export function useFadeIn(duration = 500, delay = 0) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return fadeAnim;
}

export function useSlideIn(direction: 'up' | 'down' | 'left' | 'right' = 'up', duration = 500, delay = 0) {
  const slideAnim = useRef(new Animated.Value(direction === 'up' || direction === 'left' ? -50 : 50)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const transform = direction === 'up' || direction === 'down' 
    ? [{ translateY: slideAnim }] 
    : [{ translateX: slideAnim }];

  return { transform };
}

export function useScale(duration = 300, delay = 0) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return scaleAnim;
}

export function usePulse() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startPulse = () => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { pulseAnim, startPulse };
}

export function useRotate(duration = 1000) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotate = () => {
      rotateAnim.setValue(0);
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => rotate());
    };
    rotate();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return { transform: [{ rotate: rotateInterpolate }] };
}