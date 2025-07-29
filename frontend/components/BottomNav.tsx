import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Chrome as Home, Shield, Search, Scan, User, Plus, Bike, TriangleAlert as AlertTriangle, FileSearch, ShoppingBag, FileText, Calculator, Users, Award, CircleHelp as HelpCircle, Mic, ChartBar as BarChart3 } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';

export default function BottomNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      id: 'home',
      label: 'Accueil',
      icon: Home,
      path: '/(tabs)',
    },
    {
      id: 'token',
      label: 'Token',
      icon: Shield,
      subMenu: [
        { label: 'Enregistrer ma moto', path: '/(tabs)/tokenize', icon: Plus },
        { label: 'Mes motos', path: '/(tabs)/my-bikes', icon: Bike },
      ],
    },
    {
      id: 'vol',
      label: 'Vol',
      icon: AlertTriangle,
      subMenu: [
        { label: 'Rechercher un vol', path: '/(tabs)/search', icon: Search },
        { label: 'Signaler un vol', path: '/(tabs)/report-theft', icon: FileSearch },
      ],
    },
    {
      id: 'market',
      label: 'Market',
      icon: ShoppingBag,
      subMenu: [
        { label: 'Marketplace', path: '/(tabs)/marketplace', icon: ShoppingBag },
        { label: 'Vendre ma moto', path: '/(tabs)/sell-bike', icon: Plus },
        { label: 'Scanner QR', path: '/(tabs)/scan', icon: Scan },
        { label: 'Gestion docs', path: '/(tabs)/document-manager', icon: FileText },
        { label: 'Système devis', path: '/(tabs)/quote-system', icon: Calculator },
      ],
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: User,
      path: '/(tabs)/profile',
      subMenu: [
        { label: 'Mon profil', path: '/(tabs)/profile', icon: User },
        { label: 'Communauté', path: '/(tabs)/social-feed', icon: Users },
        { label: 'Récompenses', path: '/(tabs)/gamification', icon: Award },
        { label: 'Centre d\'aide', path: '/(tabs)/help-center', icon: HelpCircle },
        { label: 'Recherche vocale', path: '/(tabs)/voice-search', icon: Mic },
        { label: 'Mes statistiques', path: '/(tabs)/personal-stats', icon: BarChart3 },
      ],
    },
  ];

  const handleItemClick = (item: any) => {
    if (item.subMenu) {
      setActiveMenu(activeMenu === item.id ? null : item.id);
    } else {
      if (pathname !== item.path) {
        router.push(item.path);
      }
      setActiveMenu(null);
    }
  };

  const isActive = (item: any) => {
    if (item.path) {
      return pathname === item.path;
    }
    if (item.subMenu) {
      return item.subMenu.some((subItem: any) => pathname === subItem.path);
    }
    return false;
  };

  return (
    <>
      {/* Overlay pour fermer le menu */}
      {activeMenu && (
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={() => setActiveMenu(null)}
          activeOpacity={1}
        />
      )}

      {/* Sub-menus */}
      {menuItems.map(item => (
        item.subMenu && activeMenu === item.id && (
          <View key={item.id} style={styles.subMenu}>
            {item.subMenu.map(subItem => {
              const SubIcon = subItem.icon;
              return (
                <TouchableOpacity
                  key={subItem.path}
                  onPress={() => {
                    router.push(subItem.path);
                    setActiveMenu(null);
                  }}
                  style={styles.subMenuItem}
                >
                  <View style={styles.subMenuIconContainer}>
                    <SubIcon size={20} color="#C4F112" strokeWidth={2} />
                  </View>
                  <Text style={styles.subMenuLabel}>{subItem.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )
      ))}

      {/* Navigation principale */}
      <View style={styles.nav}>
        {menuItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item) || activeMenu === item.id;
          
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleItemClick(item)}
              style={[styles.navItem, active && styles.activeNavItem]}
            >
              <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
                <Icon 
                  size={24} 
                  color={active ? '#000000' : '#666666'} 
                  strokeWidth={2} 
                />
              </View>
              <Text style={[styles.label, active && styles.activeLabel]}>
                {item.label}
              </Text>
              {item.subMenu && (
                <View style={styles.arrowContainer}>
                  <Text style={[styles.arrow, active && styles.activeArrow]}>
                    {activeMenu === item.id ? '▼' : '▲'}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    backdropFilter: 'blur(20px)',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 12,
    height: 80,
    zIndex: 1000,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  activeNavItem: {
    // Styles pour l'item actif
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: '#C4F112',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  activeLabel: {
    color: '#C4F112',
  },
  arrowContainer: {
    position: 'absolute',
    top: 4,
    right: '50%',
    transform: [{ translateX: 8 }],
  },
  arrow: {
    fontSize: 8,
    color: '#666666',
  },
  activeArrow: {
    color: '#C4F112',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  subMenu: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(30, 30, 30, 0.98)',
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 16,
    padding: 8,
    zIndex: 999,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
  },
  subMenuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(196, 241, 18, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  subMenuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
});