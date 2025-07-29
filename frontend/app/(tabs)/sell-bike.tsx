import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SellBikeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendre ma moto</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.comingSoon}>
          <Plus size={64} color="#C4F112" strokeWidth={2} />
          <Text style={styles.comingSoonTitle}>Bientôt disponible</Text>
          <Text style={styles.comingSoonText}>
            La fonctionnalité de vente sera disponible prochainement.
            En attendant, vous pouvez tokeniser vos motos.
          </Text>
          <TouchableOpacity 
            style={styles.tokenizeButton}
            onPress={() => router.push('/(tabs)/tokenize')}
          >
            <Text style={styles.tokenizeButtonText}>Tokeniser ma moto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  comingSoon: {
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 40,
    borderWidth: 1,
    borderColor: '#333333',
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  tokenizeButton: {
    backgroundColor: '#C4F112',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  tokenizeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});