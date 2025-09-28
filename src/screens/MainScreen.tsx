import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useApp } from '../context/AppContext';

interface MainScreenProps {
  onLogout: () => void;
  onFindServices: () => void;
  onOfferSkills: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onLogout, onFindServices, onOfferSkills }) => {
  const { showAsProvider, showAsEmployer } = useApp();
  
  // Calculate how many feature cards will be shown
  const visibleCardsCount = (showAsEmployer ? 1 : 0) + (showAsProvider ? 1 : 0) + 2; // +2 for Rate & Review and Secure Payments
  
  // Determine card width and layout based on visible cards
  let cardWidth: string;
  let isVerticalLayout = false;
  
  if (visibleCardsCount === 2) {
    cardWidth = '100%'; // Two cards stacked vertically
    isVerticalLayout = true;
  } else if (visibleCardsCount === 3) {
    cardWidth = '48%'; // Three cards: 2 on top row, 1 on bottom
  } else {
    cardWidth = '48%'; // Four cards: 2x2 grid (default)
  }
  
  // Special case: if only one view is enabled, stack cards vertically
  const isOnlyOneViewEnabled = (showAsEmployer && !showAsProvider) || (!showAsEmployer && showAsProvider);
  if (isOnlyOneViewEnabled) {
    cardWidth = '100%'; // Full width for vertical stacking
    isVerticalLayout = true;
  }
  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.logo}>SkillB</Text>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome to SkillB!</Text>
          <Text style={styles.welcomeSubtitle}>
            Your skills marketplace is ready to go
          </Text>
        </View>

        <View style={[styles.featureGrid, isVerticalLayout && styles.verticalGrid]}>
          {showAsEmployer && (
            <TouchableOpacity style={[styles.featureCard, { width: cardWidth }]} onPress={onFindServices}>
              <Text style={styles.featureEmoji}>🔍</Text>
              <Text style={styles.featureTitle}>Find Services</Text>
              <Text style={styles.featureDescription}>
                Discover skilled professionals in your area
              </Text>
            </TouchableOpacity>
          )}

          {showAsProvider && (
            <TouchableOpacity style={[styles.featureCard, { width: cardWidth }]} onPress={onOfferSkills}>
              <Text style={styles.featureEmoji}>💼</Text>
              <Text style={styles.featureTitle}>Offer Skills</Text>
              <Text style={styles.featureDescription}>
                Showcase your expertise and earn money
              </Text>
            </TouchableOpacity>
          )}

          <View style={[styles.featureCard, { width: cardWidth }]}>
            <Text style={styles.featureEmoji}>⭐</Text>
            <Text style={styles.featureTitle}>Rate & Review</Text>
            <Text style={styles.featureDescription}>
              Build trust through honest feedback
            </Text>
          </View>

          <View style={[styles.featureCard, { width: cardWidth }]}>
            <Text style={styles.featureEmoji}>💳</Text>
            <Text style={styles.featureTitle}>Secure Payments</Text>
            <Text style={styles.featureDescription}>
              Safe and reliable transaction system
            </Text>
          </View>
        </View>

        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready to get started?</Text>
          <Text style={styles.ctaDescription}>
            {showAsEmployer && showAsProvider 
              ? 'Browse services or create your profile to begin'
              : showAsEmployer 
                ? 'Browse services to find skilled professionals'
                : 'Create your profile to start offering services'
            }
          </Text>
          {showAsEmployer && (
            <TouchableOpacity style={styles.ctaButton} onPress={onFindServices}>
              <Text style={styles.ctaButtonText}>Find Services</Text>
            </TouchableOpacity>
          )}
          {showAsProvider && !showAsEmployer && (
            <TouchableOpacity style={styles.ctaButton} onPress={onOfferSkills}>
              <Text style={styles.ctaButtonText}>Offer Skills</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoutButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  verticalGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    minHeight: 120,
  },
  featureEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 16,
  },
  ctaCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  ctaDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  ctaButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MainScreen;
