import { Tabs } from 'expo-router';
import BottomNav from '@/components/BottomNav';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Cache la tab bar par défaut
        }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="tokenize" />
        <Tabs.Screen name="search" />
        <Tabs.Screen name="scan" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="my-bikes" />
        <Tabs.Screen name="report-theft" />
        <Tabs.Screen name="marketplace" />
        <Tabs.Screen name="sell-bike" />
        <Tabs.Screen name="forum" />
        <Tabs.Screen name="theft-detail" />
        <Tabs.Screen name="product-detail" />
        <Tabs.Screen name="edit-profile" />
        <Tabs.Screen name="security-settings" />
        <Tabs.Screen name="app-settings" />
        <Tabs.Screen name="payment" />
        <Tabs.Screen name="kyc" />
        <Tabs.Screen name="pro-dashboard" />
        <Tabs.Screen name="document-manager" />
        <Tabs.Screen name="quote-system" />
        <Tabs.Screen name="social-feed" />
        <Tabs.Screen name="gamification" />
        <Tabs.Screen name="help-center" />
        <Tabs.Screen name="voice-search" />
        <Tabs.Screen name="personal-stats" />
      </Tabs>
      <BottomNav />
    </>
  );
}